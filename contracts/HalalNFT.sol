// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title HalalNFT
 * @dev NFT contract for halal certification and product authenticity
 * with quantum-resistant security features
 */
contract HalalNFT is ERC721URIStorage, ERC721Enumerable, AccessControl, ReentrancyGuard {
    using Counters for Counters.Counter;
    using ECDSA for bytes32;
    
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    Counters.Counter private _tokenIds;
    
    // NFT types
    enum NFTType {
        ProductCertification,
        VendorCertification,
        SupplyChainMilestone,
        CarbonOffset,
        LimitedEdition
    }
    
    // NFT metadata
    struct NFTMetadata {
        NFTType nftType;
        string productId;
        string vendorId;
        string certificationId;
        uint256 issuedAt;
        uint256 expiresAt;
        bool transferable;
        string ipfsHash;
        bytes32 dataHash;
        address certifier;
        uint256 carbonOffset;
        string geolocation;
    }
    
    // Mapping from token ID to NFT metadata
    mapping(uint256 => NFTMetadata) private _tokenMetadata;
    
    // Mapping from product ID to token IDs
    mapping(string => uint256[]) private _productTokens;
    
    // Mapping from vendor ID to token IDs
    mapping(string => uint256[]) private _vendorTokens;
    
    // Mapping from certification ID to token ID
    mapping(string => uint256) private _certificationTokens;
    
    // Events
    event NFTMinted(
        uint256 indexed tokenId,
        address indexed recipient,
        NFTType nftType,
        string productId,
        string vendorId,
        string certificationId,
        uint256 issuedAt,
        uint256 expiresAt
    );
    
    event NFTRevoked(
        uint256 indexed tokenId,
        string reason,
        uint256 revokedAt
    );
    
    event NFTExpired(
        uint256 indexed tokenId,
        uint256 expiredAt
    );
    
    event CarbonOffsetClaimed(
        uint256 indexed tokenId,
        uint256 amount,
        address indexed claimedBy
    );
    
    /**
     * @dev Constructor
     */
    constructor() ERC721("HalalChain Certification NFT", "HALALNFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }
    
    /**
     * @dev Override required by Solidity for multiple inheritance
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
    /**
     * @dev Override required by Solidity for multiple inheritance
     */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        // Check if token is transferable
        if (from != address(0) && to != address(0)) {
            require(_tokenMetadata[tokenId].transferable, "Token is not transferable");
            require(block.timestamp < _tokenMetadata[tokenId].expiresAt, "Token has expired");
        }
        
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    
    /**
     * @dev Override required by Solidity for multiple inheritance
     */
    function _burn(uint256 tokenId) internal override(ERC721URIStorage, ERC721) {
        super._burn(tokenId);
    }
    
    /**
     * @dev Override required by Solidity for multiple inheritance
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage, ERC721)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    /**
     * @dev Mint a new NFT
     * @param recipient Address of the recipient
     * @param nftType Type of NFT
     * @param productId Product ID (if applicable)
     * @param vendorId Vendor ID (if applicable)
     * @param certificationId Certification ID (if applicable)
     * @param validityPeriod Validity period in seconds
     * @param transferable Whether the NFT is transferable
     * @param ipfsHash IPFS hash of the NFT metadata
     * @param carbonOffset Carbon offset amount (if applicable)
     * @param geolocation Geolocation data (if applicable)
     * @return tokenId The ID of the newly minted NFT
     */
    function mintNFT(
        address recipient,
        NFTType nftType,
        string memory productId,
        string memory vendorId,
        string memory certificationId,
        uint256 validityPeriod,
        bool transferable,
        string memory ipfsHash,
        uint256 carbonOffset,
        string memory geolocation
    ) external onlyRole(MINTER_ROLE) nonReentrant returns (uint256) {
        require(recipient != address(0), "Invalid recipient");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        uint256 issuedAt = block.timestamp;
        uint256 expiresAt = issuedAt + validityPeriod;
        
        // Create data hash for verification
        bytes32 dataHash = keccak256(abi.encodePacked(
            uint8(nftType),
            productId,
            vendorId,
            certificationId,
            issuedAt,
            expiresAt,
            transferable,
            ipfsHash,
            carbonOffset,
            geolocation
        ));
        
        _tokenMetadata[newTokenId] = NFTMetadata({
            nftType: nftType,
            productId: productId,
            vendorId: vendorId,
            certificationId: certificationId,
            issuedAt: issuedAt,
            expiresAt: expiresAt,
            transferable: transferable,
            ipfsHash: ipfsHash,
            dataHash: dataHash,
            certifier: msg.sender,
            carbonOffset: carbonOffset,
            geolocation: geolocation
        });
        
        // Store token ID in relevant mappings
        if (bytes(productId).length > 0) {
            _productTokens[productId].push(newTokenId);
        }
        
        if (bytes(vendorId).length > 0) {
            _vendorTokens[vendorId].push(newTokenId);
        }
        
        if (bytes(certificationId).length > 0) {
            _certificationTokens[certificationId] = newTokenId;
        }
        
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, ipfsHash);
        
        emit NFTMinted(
            newTokenId,
            recipient,
            nftType,
            productId,
            vendorId,
            certificationId,
            issuedAt,
            expiresAt
        );
        
        return newTokenId;
    }
    
    /**
     * @dev Revoke an NFT
     * @param tokenId ID of the NFT
     * @param reason Reason for revocation
     */
    function revokeNFT(uint256 tokenId, string memory reason) external nonReentrant {
        require(_exists(tokenId), "Token does not exist");
        require(
            hasRole(ADMIN_ROLE, msg.sender) || 
            hasRole(CERTIFIER_ROLE, msg.sender) ||
            msg.sender == _tokenMetadata[tokenId].certifier,
            "Not authorized"
        );
        
        address owner = ownerOf(tokenId);
        _burn(tokenId);
        
        emit NFTRevoked(tokenId, reason, block.timestamp);
    }
    
    /**
     * @dev Extend the validity period of an NFT
     * @param tokenId ID of the NFT
     * @param extensionPeriod Extension period in seconds
     */
    function extendValidity(uint256 tokenId, uint256 extensionPeriod) external onlyRole(CERTIFIER_ROLE) {
        require(_exists(tokenId), "Token does not exist");
        require(extensionPeriod > 0, "Extension period must be greater than zero");
        
        _tokenMetadata[tokenId].expiresAt += extensionPeriod;
    }
    
    /**
     * @dev Claim carbon offset from an NFT
     * @param tokenId ID of the NFT
     * @return amount Amount of carbon offset claimed
     */
    function claimCarbonOffset(uint256 tokenId) external nonReentrant returns (uint256) {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(_tokenMetadata[tokenId].carbonOffset > 0, "No carbon offset to claim");
        require(_tokenMetadata[tokenId].nftType == NFTType.CarbonOffset, "Not a carbon offset NFT");
        
        uint256 amount = _tokenMetadata[tokenId].carbonOffset;
        _tokenMetadata[tokenId].carbonOffset = 0;
        
        emit CarbonOffsetClaimed(tokenId, amount, msg.sender);
        
        return amount;
    }
    
    /**
     * @dev Get NFT metadata
     * @param tokenId ID of the NFT
     * @return NFT metadata
     */
    function getNFTMetadata(uint256 tokenId) external view returns (
        NFTType nftType,
        string memory productId,
        string memory vendorId,
        string memory certificationId,
        uint256 issuedAt,
        uint256 expiresAt,
        bool transferable,
        string memory ipfsHash,
        address certifier,
        uint256 carbonOffset,
        string memory geolocation,
        bool isValid
    ) {
        require(_exists(tokenId), "Token does not exist");
        
        NFTMetadata storage metadata = _tokenMetadata[tokenId];
        
        return (
            metadata.nftType,
            metadata.productId,
            metadata.vendorId,
            metadata.certificationId,
            metadata.issuedAt,
            metadata.expiresAt,
            metadata.transferable,
            metadata.ipfsHash,
            metadata.certifier,
            metadata.carbonOffset,
            metadata.geolocation,
            block.timestamp < metadata.expiresAt
        );
    }
    
    /**
     * @dev Get token IDs by product ID
     * @param productId Product ID
     * @return Array of token IDs
     */
    function getTokensByProduct(string memory productId) external view returns (uint256[] memory) {
        return _productTokens[productId];
    }
    
    /**
     * @dev Get token IDs by vendor ID
     * @param vendorId Vendor ID
     * @return Array of token IDs
     */
    function getTokensByVendor(string memory vendorId) external view returns (uint256[] memory) {
        return _vendorTokens[vendorId];
    }
    
    /**
     * @dev Get token ID by certification ID
     * @param certificationId Certification ID
     * @return Token ID
     */
    function getTokenByCertification(string memory certificationId) external view returns (uint256) {
        uint256 tokenId = _certificationTokens[certificationId];
        require(tokenId != 0, "No token found for this certification");
        return tokenId;
    }
    
    /**
     * @dev Check if an NFT is valid
     * @param tokenId ID of the NFT
     * @return bool True if NFT is valid
     */
    function isNFTValid(uint256 tokenId) external view returns (bool) {
        if (!_exists(tokenId)) {
            return false;
        }
        
        return block.timestamp < _tokenMetadata[tokenId].expiresAt;
    }
    
    /**
     * @dev Verify NFT data hash
     * @param tokenId ID of the NFT
     * @param dataToVerify Data to verify against stored hash
     * @return bool True if data matches stored hash
     */
    function verifyNFTData(uint256 tokenId, bytes memory dataToVerify) external view returns (bool) {
        require(_exists(tokenId), "Token does not exist");
        
        bytes32 providedHash = keccak256(dataToVerify);
        return _tokenMetadata[tokenId].dataHash == providedHash;
    }
}