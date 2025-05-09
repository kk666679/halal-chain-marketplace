// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title VendorMarketplace
 * @dev Smart contract for managing vendors and products in the halal marketplace
 */
contract VendorMarketplace is AccessControl, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    bytes32 public constant VENDOR_ROLE = keccak256("VENDOR_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    Counters.Counter private _vendorIds;
    Counters.Counter private _productIds;
    
    struct Vendor {
        uint256 id;
        string name;
        string description;
        string location;
        string contactInfo;
        string ipfsHash;
        address walletAddress;
        bool isVerified;
        bool isActive;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 vendorId;
        uint256 price;
        uint256 stock;
        string category;
        string[] tags;
        string ipfsHash;
        bool isAvailable;
        bool isCertified;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    // Mapping from vendor ID to Vendor
    mapping(uint256 => Vendor) private _vendors;
    
    // Mapping from wallet address to vendor ID
    mapping(address => uint256) private _vendorAddresses;
    
    // Mapping from product ID to Product
    mapping(uint256 => Product) private _products;
    
    // Mapping from vendor ID to array of product IDs
    mapping(uint256 => uint256[]) private _vendorProducts;
    
    // Events
    event VendorRegistered(
        uint256 indexed vendorId,
        string name,
        address walletAddress,
        uint256 createdAt
    );
    
    event VendorUpdated(
        uint256 indexed vendorId,
        uint256 updatedAt
    );
    
    event VendorVerified(
        uint256 indexed vendorId,
        bool isVerified,
        uint256 updatedAt
    );
    
    event VendorStatusChanged(
        uint256 indexed vendorId,
        bool isActive,
        uint256 updatedAt
    );
    
    event ProductAdded(
        uint256 indexed productId,
        uint256 indexed vendorId,
        string name,
        uint256 price,
        uint256 createdAt
    );
    
    event ProductUpdated(
        uint256 indexed productId,
        uint256 updatedAt
    );
    
    event ProductCertificationChanged(
        uint256 indexed productId,
        bool isCertified,
        uint256 updatedAt
    );
    
    /**
     * @dev Constructor sets up admin role for the deployer
     */
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    /**
     * @dev Register a new vendor
     * @param name Name of the vendor
     * @param description Description of the vendor
     * @param location Location of the vendor
     * @param contactInfo Contact information of the vendor
     * @param ipfsHash IPFS hash of the vendor documents
     * @return vendorId The ID of the newly registered vendor
     */
    function registerVendor(
        string memory name,
        string memory description,
        string memory location,
        string memory contactInfo,
        string memory ipfsHash
    ) external returns (uint256) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(_vendorAddresses[msg.sender] == 0, "Vendor already registered");
        
        _vendorIds.increment();
        uint256 newVendorId = _vendorIds.current();
        
        uint256 timestamp = block.timestamp;
        
        _vendors[newVendorId] = Vendor({
            id: newVendorId,
            name: name,
            description: description,
            location: location,
            contactInfo: contactInfo,
            ipfsHash: ipfsHash,
            walletAddress: msg.sender,
            isVerified: false,
            isActive: true,
            createdAt: timestamp,
            updatedAt: timestamp
        });
        
        _vendorAddresses[msg.sender] = newVendorId;
        
        // Grant vendor role
        _grantRole(VENDOR_ROLE, msg.sender);
        
        emit VendorRegistered(
            newVendorId,
            name,
            msg.sender,
            timestamp
        );
        
        return newVendorId;
    }
    
    /**
     * @dev Update vendor information
     * @param vendorId ID of the vendor
     * @param name Name of the vendor
     * @param description Description of the vendor
     * @param location Location of the vendor
     * @param contactInfo Contact information of the vendor
     * @param ipfsHash IPFS hash of the vendor documents
     */
    function updateVendor(
        uint256 vendorId,
        string memory name,
        string memory description,
        string memory location,
        string memory contactInfo,
        string memory ipfsHash
    ) external {
        require(_vendorExists(vendorId), "Vendor does not exist");
        require(
            _vendors[vendorId].walletAddress == msg.sender || hasRole(ADMIN_ROLE, msg.sender),
            "Not authorized"
        );
        require(bytes(name).length > 0, "Name cannot be empty");
        
        Vendor storage vendor = _vendors[vendorId];
        
        vendor.name = name;
        vendor.description = description;
        vendor.location = location;
        vendor.contactInfo = contactInfo;
        vendor.ipfsHash = ipfsHash;
        vendor.updatedAt = block.timestamp;
        
        emit VendorUpdated(
            vendorId,
            block.timestamp
        );
    }
    
    /**
     * @dev Verify a vendor
     * @param vendorId ID of the vendor
     * @param isVerified Whether the vendor is verified
     */
    function verifyVendor(
        uint256 vendorId,
        bool isVerified
    ) external onlyRole(ADMIN_ROLE) {
        require(_vendorExists(vendorId), "Vendor does not exist");
        
        _vendors[vendorId].isVerified = isVerified;
        _vendors[vendorId].updatedAt = block.timestamp;
        
        emit VendorVerified(
            vendorId,
            isVerified,
            block.timestamp
        );
    }
    
    /**
     * @dev Change vendor status
     * @param vendorId ID of the vendor
     * @param isActive Whether the vendor is active
     */
    function changeVendorStatus(
        uint256 vendorId,
        bool isActive
    ) external {
        require(_vendorExists(vendorId), "Vendor does not exist");
        require(
            _vendors[vendorId].walletAddress == msg.sender || hasRole(ADMIN_ROLE, msg.sender),
            "Not authorized"
        );
        
        _vendors[vendorId].isActive = isActive;
        _vendors[vendorId].updatedAt = block.timestamp;
        
        emit VendorStatusChanged(
            vendorId,
            isActive,
            block.timestamp
        );
    }
    
    /**
     * @dev Add a new product
     * @param name Name of the product
     * @param description Description of the product
     * @param price Price of the product in wei
     * @param stock Stock quantity of the product
     * @param category Category of the product
     * @param tags Tags for the product
     * @param ipfsHash IPFS hash of the product documents
     * @return productId The ID of the newly added product
     */
    function addProduct(
        string memory name,
        string memory description,
        uint256 price,
        uint256 stock,
        string memory category,
        string[] memory tags,
        string memory ipfsHash
    ) external onlyRole(VENDOR_ROLE) returns (uint256) {
        require(bytes(name).length > 0, "Name cannot be empty");
        
        uint256 vendorId = _vendorAddresses[msg.sender];
        require(vendorId != 0, "Vendor not registered");
        require(_vendors[vendorId].isActive, "Vendor is not active");
        
        _productIds.increment();
        uint256 newProductId = _productIds.current();
        
        uint256 timestamp = block.timestamp;
        
        _products[newProductId] = Product({
            id: newProductId,
            name: name,
            description: description,
            vendorId: vendorId,
            price: price,
            stock: stock,
            category: category,
            tags: tags,
            ipfsHash: ipfsHash,
            isAvailable: true,
            isCertified: false,
            createdAt: timestamp,
            updatedAt: timestamp
        });
        
        _vendorProducts[vendorId].push(newProductId);
        
        emit ProductAdded(
            newProductId,
            vendorId,
            name,
            price,
            timestamp
        );
        
        return newProductId;
    }
    
    /**
     * @dev Update product information
     * @param productId ID of the product
     * @param name Name of the product
     * @param description Description of the product
     * @param price Price of the product in wei
     * @param stock Stock quantity of the product
     * @param category Category of the product
     * @param tags Tags for the product
     * @param ipfsHash IPFS hash of the product documents
     * @param isAvailable Whether the product is available
     */
    function updateProduct(
        uint256 productId,
        string memory name,
        string memory description,
        uint256 price,
        uint256 stock,
        string memory category,
        string[] memory tags,
        string memory ipfsHash,
        bool isAvailable
    ) external onlyRole(VENDOR_ROLE) {
        require(_productExists(productId), "Product does not exist");
        
        Product storage product = _products[productId];
        uint256 vendorId = _vendorAddresses[msg.sender];
        
        require(product.vendorId == vendorId, "Not product owner");
        require(bytes(name).length > 0, "Name cannot be empty");
        
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.category = category;
        product.tags = tags;
        product.ipfsHash = ipfsHash;
        product.isAvailable = isAvailable;
        product.updatedAt = block.timestamp;
        
        emit ProductUpdated(
            productId,
            block.timestamp
        );
    }
    
    /**
     * @dev Update product certification status
     * @param productId ID of the product
     * @param isCertified Whether the product is certified
     */
    function updateProductCertification(
        uint256 productId,
        bool isCertified
    ) external onlyRole(ADMIN_ROLE) {
        require(_productExists(productId), "Product does not exist");
        
        _products[productId].isCertified = isCertified;
        _products[productId].updatedAt = block.timestamp;
        
        emit ProductCertificationChanged(
            productId,
            isCertified,
            block.timestamp
        );
    }
    
    /**
     * @dev Get vendor details
     * @param vendorId ID of the vendor
     * @return Vendor details
     */
    function getVendor(uint256 vendorId) external view returns (Vendor memory) {
        require(_vendorExists(vendorId), "Vendor does not exist");
        return _vendors[vendorId];
    }
    
    /**
     * @dev Get vendor ID by wallet address
     * @param walletAddress Wallet address of the vendor
     * @return vendorId ID of the vendor
     */
    function getVendorIdByAddress(address walletAddress) external view returns (uint256) {
        uint256 vendorId = _vendorAddresses[walletAddress];
        require(vendorId != 0, "Vendor not found");
        return vendorId;
    }
    
    /**
     * @dev Get product details
     * @param productId ID of the product
     * @return Product details
     */
    function getProduct(uint256 productId) external view returns (Product memory) {
        require(_productExists(productId), "Product does not exist");
        return _products[productId];
    }
    
    /**
     * @dev Get all products for a vendor
     * @param vendorId ID of the vendor
     * @return Array of product IDs
     */
    function getVendorProducts(uint256 vendorId) external view returns (uint256[] memory) {
        require(_vendorExists(vendorId), "Vendor does not exist");
        return _vendorProducts[vendorId];
    }
    
    /**
     * @dev Check if vendor exists
     * @param vendorId ID of the vendor
     * @return bool True if vendor exists
     */
    function _vendorExists(uint256 vendorId) private view returns (bool) {
        return vendorId > 0 && vendorId <= _vendorIds.current();
    }
    
    /**
     * @dev Check if product exists
     * @param productId ID of the product
     * @return bool True if product exists
     */
    function _productExists(uint256 productId) private view returns (bool) {
        return productId > 0 && productId <= _productIds.current();
    }
}