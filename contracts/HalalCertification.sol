// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title HalalCertification
 * @dev Smart contract for managing halal certifications on the blockchain
 */
contract HalalCertification is AccessControl {
    using Counters for Counters.Counter;
    
    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");
    bytes32 public constant VENDOR_ROLE = keccak256("VENDOR_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    Counters.Counter private _certificationIds;
    
    struct Certification {
        uint256 id;
        string productId;
        string productName;
        string vendorId;
        string vendorName;
        string certifierId;
        string certifierName;
        string ipfsHash;
        uint256 issuedAt;
        uint256 expiresAt;
        bool isRevoked;
        string revokedReason;
    }
    
    // Mapping from certification ID to Certification
    mapping(uint256 => Certification) private _certifications;
    
    // Mapping from product ID to certification ID
    mapping(string => uint256) private _productCertifications;
    
    // Events
    event CertificationIssued(
        uint256 indexed certificationId,
        string productId,
        string vendorId,
        string certifierId,
        uint256 issuedAt,
        uint256 expiresAt
    );
    
    event CertificationRevoked(
        uint256 indexed certificationId,
        string reason,
        uint256 revokedAt
    );
    
    event CertifierAdded(address indexed certifier);
    event CertifierRemoved(address indexed certifier);
    event VendorAdded(address indexed vendor);
    event VendorRemoved(address indexed vendor);
    
    /**
     * @dev Constructor sets up admin role for the deployer
     */
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    /**
     * @dev Add a certifier
     * @param certifier Address of the certifier
     */
    function addCertifier(address certifier) external onlyRole(ADMIN_ROLE) {
        grantRole(CERTIFIER_ROLE, certifier);
        emit CertifierAdded(certifier);
    }
    
    /**
     * @dev Remove a certifier
     * @param certifier Address of the certifier
     */
    function removeCertifier(address certifier) external onlyRole(ADMIN_ROLE) {
        revokeRole(CERTIFIER_ROLE, certifier);
        emit CertifierRemoved(certifier);
    }
    
    /**
     * @dev Add a vendor
     * @param vendor Address of the vendor
     */
    function addVendor(address vendor) external onlyRole(ADMIN_ROLE) {
        grantRole(VENDOR_ROLE, vendor);
        emit VendorAdded(vendor);
    }
    
    /**
     * @dev Remove a vendor
     * @param vendor Address of the vendor
     */
    function removeVendor(address vendor) external onlyRole(ADMIN_ROLE) {
        revokeRole(VENDOR_ROLE, vendor);
        emit VendorRemoved(vendor);
    }
    
    /**
     * @dev Issue a new certification
     * @param productId Unique identifier for the product
     * @param productName Name of the product
     * @param vendorId Unique identifier for the vendor
     * @param vendorName Name of the vendor
     * @param certifierId Unique identifier for the certifier
     * @param certifierName Name of the certifier
     * @param ipfsHash IPFS hash of the certification documents
     * @param validityPeriod Validity period in seconds
     * @return certificationId The ID of the newly issued certification
     */
    function issueCertification(
        string memory productId,
        string memory productName,
        string memory vendorId,
        string memory vendorName,
        string memory certifierId,
        string memory certifierName,
        string memory ipfsHash,
        uint256 validityPeriod
    ) external onlyRole(CERTIFIER_ROLE) returns (uint256) {
        require(bytes(productId).length > 0, "Product ID cannot be empty");
        require(bytes(vendorId).length > 0, "Vendor ID cannot be empty");
        require(bytes(certifierId).length > 0, "Certifier ID cannot be empty");
        require(validityPeriod > 0, "Validity period must be greater than zero");
        
        // Check if product already has a valid certification
        if (_productCertifications[productId] != 0) {
            uint256 existingCertId = _productCertifications[productId];
            Certification storage existingCert = _certifications[existingCertId];
            
            // If existing certification is not expired or revoked, revert
            if (existingCert.expiresAt > block.timestamp && !existingCert.isRevoked) {
                revert("Product already has a valid certification");
            }
        }
        
        _certificationIds.increment();
        uint256 newCertificationId = _certificationIds.current();
        
        uint256 issuedAt = block.timestamp;
        uint256 expiresAt = issuedAt + validityPeriod;
        
        _certifications[newCertificationId] = Certification({
            id: newCertificationId,
            productId: productId,
            productName: productName,
            vendorId: vendorId,
            vendorName: vendorName,
            certifierId: certifierId,
            certifierName: certifierName,
            ipfsHash: ipfsHash,
            issuedAt: issuedAt,
            expiresAt: expiresAt,
            isRevoked: false,
            revokedReason: ""
        });
        
        _productCertifications[productId] = newCertificationId;
        
        emit CertificationIssued(
            newCertificationId,
            productId,
            vendorId,
            certifierId,
            issuedAt,
            expiresAt
        );
        
        return newCertificationId;
    }
    
    /**
     * @dev Revoke a certification
     * @param certificationId ID of the certification to revoke
     * @param reason Reason for revocation
     */
    function revokeCertification(
        uint256 certificationId,
        string memory reason
    ) external onlyRole(CERTIFIER_ROLE) {
        require(_certificationExists(certificationId), "Certification does not exist");
        require(!_certifications[certificationId].isRevoked, "Certification is already revoked");
        
        _certifications[certificationId].isRevoked = true;
        _certifications[certificationId].revokedReason = reason;
        
        emit CertificationRevoked(certificationId, reason, block.timestamp);
    }
    
    /**
     * @dev Get certification details
     * @param certificationId ID of the certification
     * @return Certification details
     */
    function getCertification(uint256 certificationId) external view returns (Certification memory) {
        require(_certificationExists(certificationId), "Certification does not exist");
        return _certifications[certificationId];
    }
    
    /**
     * @dev Get certification by product ID
     * @param productId Product ID
     * @return Certification details
     */
    function getCertificationByProduct(string memory productId) external view returns (Certification memory) {
        uint256 certificationId = _productCertifications[productId];
        require(certificationId != 0, "No certification found for this product");
        return _certifications[certificationId];
    }
    
    /**
     * @dev Check if a certification is valid
     * @param certificationId ID of the certification
     * @return bool True if certification is valid
     */
    function isCertificationValid(uint256 certificationId) external view returns (bool) {
        if (!_certificationExists(certificationId)) {
            return false;
        }
        
        Certification storage cert = _certifications[certificationId];
        return !cert.isRevoked && cert.expiresAt > block.timestamp;
    }
    
    /**
     * @dev Check if a product has a valid certification
     * @param productId Product ID
     * @return bool True if product has a valid certification
     */
    function isProductCertified(string memory productId) external view returns (bool) {
        uint256 certificationId = _productCertifications[productId];
        if (certificationId == 0) {
            return false;
        }
        
        Certification storage cert = _certifications[certificationId];
        return !cert.isRevoked && cert.expiresAt > block.timestamp;
    }
    
    /**
     * @dev Check if certification exists
     * @param certificationId ID of the certification
     * @return bool True if certification exists
     */
    function _certificationExists(uint256 certificationId) private view returns (bool) {
        return certificationId > 0 && certificationId <= _certificationIds.current();
    }
}