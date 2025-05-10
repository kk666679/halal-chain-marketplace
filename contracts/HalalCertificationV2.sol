// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

/**
 * @title HalalCertificationV2
 * @dev Quantum-resistant smart contract for managing halal certifications on the blockchain
 * Updated for 2025 with advanced features and security
 */
contract HalalCertificationV2 is AccessControl, ReentrancyGuard, EIP712 {
    using Counters for Counters.Counter;
    using ECDSA for bytes32;
    
    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");
    bytes32 public constant VENDOR_ROLE = keccak256("VENDOR_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant REGULATOR_ROLE = keccak256("REGULATOR_ROLE");
    
    Counters.Counter private _certificationIds;
    
    // Certification status options
    enum CertificationStatus {
        Pending,
        Active,
        Expired,
        Revoked,
        Suspended
    }
    
    // Certification types
    enum CertificationType {
        Product,
        Facility,
        Ingredient,
        Process
    }
    
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
        CertificationStatus status;
        string revokedReason;
        CertificationType certType;
        string[] complianceStandards;
        bytes32 dataHash;
        string geolocation;
        uint256 lastAuditedAt;
        string carbonFootprint;
        address[] approvers;
    }
    
    // Mapping from certification ID to Certification
    mapping(uint256 => Certification) private _certifications;
    
    // Mapping from product ID to certification ID
    mapping(string => uint256) private _productCertifications;
    
    // Mapping from vendor ID to array of certification IDs
    mapping(string => uint256[]) private _vendorCertifications;
    
    // Mapping for cross-chain certification references
    mapping(string => uint256) private _crossChainReferences;
    
    // Audit trail for certifications
    struct AuditEvent {
        uint256 timestamp;
        address actor;
        string action;
        string details;
    }
    
    mapping(uint256 => AuditEvent[]) private _certificationAudits;
    
    // Events
    event CertificationIssued(
        uint256 indexed certificationId,
        string productId,
        string vendorId,
        string certifierId,
        uint256 issuedAt,
        uint256 expiresAt,
        CertificationType certType
    );
    
    event CertificationStatusChanged(
        uint256 indexed certificationId,
        CertificationStatus status,
        string reason,
        uint256 timestamp
    );
    
    event CertificationAudited(
        uint256 indexed certificationId,
        address auditor,
        uint256 timestamp,
        string findings
    );
    
    event CertifierAdded(address indexed certifier, string name, string organization);
    event CertifierRemoved(address indexed certifier);
    event RoleGranted(bytes32 role, address account, address sender);
    
    /**
     * @dev Constructor sets up admin role for the deployer and initializes EIP712
     */
    constructor() EIP712("HalalCertificationV2", "2.0.0") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    /**
     * @dev Add a certifier
     * @param certifier Address of the certifier
     * @param name Name of the certifier
     * @param organization Organization of the certifier
     */
    function addCertifier(address certifier, string memory name, string memory organization) external onlyRole(ADMIN_ROLE) {
        grantRole(CERTIFIER_ROLE, certifier);
        emit CertifierAdded(certifier, name, organization);
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
     * @dev Issue a new certification
     * @param productId Unique identifier for the product
     * @param productName Name of the product
     * @param vendorId Unique identifier for the vendor
     * @param vendorName Name of the vendor
     * @param certifierId Unique identifier for the certifier
     * @param certifierName Name of the certifier
     * @param ipfsHash IPFS hash of the certification documents
     * @param validityPeriod Validity period in seconds
     * @param certType Type of certification
     * @param complianceStandards Array of compliance standards
     * @param geolocation Geolocation data of the product origin
     * @param carbonFootprint Carbon footprint data
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
        uint256 validityPeriod,
        CertificationType certType,
        string[] memory complianceStandards,
        string memory geolocation,
        string memory carbonFootprint
    ) external onlyRole(CERTIFIER_ROLE) nonReentrant returns (uint256) {
        require(bytes(productId).length > 0, "Product ID cannot be empty");
        require(bytes(vendorId).length > 0, "Vendor ID cannot be empty");
        require(bytes(certifierId).length > 0, "Certifier ID cannot be empty");
        require(validityPeriod > 0, "Validity period must be greater than zero");
        
        // Check if product already has a valid certification
        if (_productCertifications[productId] != 0) {
            uint256 existingCertId = _productCertifications[productId];
            Certification storage existingCert = _certifications[existingCertId];
            
            // If existing certification is active, revert
            if (existingCert.status == CertificationStatus.Active && existingCert.expiresAt > block.timestamp) {
                revert("Product already has a valid certification");
            }
        }
        
        _certificationIds.increment();
        uint256 newCertificationId = _certificationIds.current();
        
        uint256 issuedAt = block.timestamp;
        uint256 expiresAt = issuedAt + validityPeriod;
        
        // Create data hash for verification
        bytes32 dataHash = keccak256(abi.encodePacked(
            productId, 
            productName, 
            vendorId, 
            vendorName, 
            certifierId, 
            certifierName, 
            ipfsHash,
            issuedAt,
            expiresAt,
            uint8(certType),
            geolocation,
            carbonFootprint
        ));
        
        address[] memory approvers = new address[](1);
        approvers[0] = msg.sender;
        
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
            status: CertificationStatus.Active,
            revokedReason: "",
            certType: certType,
            complianceStandards: complianceStandards,
            dataHash: dataHash,
            geolocation: geolocation,
            lastAuditedAt: issuedAt,
            carbonFootprint: carbonFootprint,
            approvers: approvers
        });
        
        _productCertifications[productId] = newCertificationId;
        _vendorCertifications[vendorId].push(newCertificationId);
        
        // Add audit event
        _addAuditEvent(
            newCertificationId, 
            msg.sender, 
            "CERTIFICATION_ISSUED", 
            string(abi.encodePacked("Certification issued for product ", productId))
        );
        
        emit CertificationIssued(
            newCertificationId,
            productId,
            vendorId,
            certifierId,
            issuedAt,
            expiresAt,
            certType
        );
        
        return newCertificationId;
    }
    
    /**
     * @dev Change certification status
     * @param certificationId ID of the certification
     * @param status New status
     * @param reason Reason for status change
     */
    function changeCertificationStatus(
        uint256 certificationId,
        CertificationStatus status,
        string memory reason
    ) external nonReentrant {
        require(_certificationExists(certificationId), "Certification does not exist");
        require(
            hasRole(CERTIFIER_ROLE, msg.sender) || 
            hasRole(ADMIN_ROLE, msg.sender) || 
            hasRole(REGULATOR_ROLE, msg.sender),
            "Not authorized"
        );
        
        Certification storage cert = _certifications[certificationId];
        
        // Add specific validations based on status change
        if (status == CertificationStatus.Revoked) {
            require(bytes(reason).length > 0, "Reason required for revocation");
        }
        
        cert.status = status;
        
        if (status == CertificationStatus.Revoked) {
            cert.revokedReason = reason;
        }
        
        // Add audit event
        _addAuditEvent(
            certificationId, 
            msg.sender, 
            "STATUS_CHANGED", 
            string(abi.encodePacked("Status changed to ", _statusToString(status), ": ", reason))
        );
        
        emit CertificationStatusChanged(
            certificationId,
            status,
            reason,
            block.timestamp
        );
    }
    
    /**
     * @dev Perform audit on certification
     * @param certificationId ID of the certification
     * @param findings Audit findings
     */
    function auditCertification(
        uint256 certificationId,
        string memory findings
    ) external onlyRole(AUDITOR_ROLE) nonReentrant {
        require(_certificationExists(certificationId), "Certification does not exist");
        
        Certification storage cert = _certifications[certificationId];
        cert.lastAuditedAt = block.timestamp;
        
        // Add audit event
        _addAuditEvent(
            certificationId, 
            msg.sender, 
            "CERTIFICATION_AUDITED", 
            findings
        );
        
        emit CertificationAudited(
            certificationId,
            msg.sender,
            block.timestamp,
            findings
        );
    }
    
    /**
     * @dev Add cross-chain certification reference
     * @param externalChainId ID of the external blockchain
     * @param externalCertId ID of the certification on the external blockchain
     * @param localCertId ID of the certification on this blockchain
     */
    function addCrossChainReference(
        string memory externalChainId,
        string memory externalCertId,
        uint256 localCertId
    ) external onlyRole(ADMIN_ROLE) {
        require(_certificationExists(localCertId), "Local certification does not exist");
        
        string memory referenceKey = string(abi.encodePacked(externalChainId, ":", externalCertId));
        _crossChainReferences[referenceKey] = localCertId;
        
        // Add audit event
        _addAuditEvent(
            localCertId, 
            msg.sender, 
            "CROSS_CHAIN_REFERENCE_ADDED", 
            string(abi.encodePacked("Added reference to ", externalChainId, ":", externalCertId))
        );
    }
    
    /**
     * @dev Add approver to certification
     * @param certificationId ID of the certification
     * @param approver Address of the approver
     */
    function addApprover(
        uint256 certificationId,
        address approver
    ) external nonReentrant {
        require(_certificationExists(certificationId), "Certification does not exist");
        require(
            hasRole(CERTIFIER_ROLE, msg.sender) || 
            hasRole(ADMIN_ROLE, msg.sender),
            "Not authorized"
        );
        
        Certification storage cert = _certifications[certificationId];
        
        // Check if approver already exists
        bool exists = false;
        for (uint i = 0; i < cert.approvers.length; i++) {
            if (cert.approvers[i] == approver) {
                exists = true;
                break;
            }
        }
        
        if (!exists) {
            cert.approvers.push(approver);
            
            // Add audit event
            _addAuditEvent(
                certificationId, 
                msg.sender, 
                "APPROVER_ADDED", 
                string(abi.encodePacked("Added approver: ", _addressToString(approver)))
            );
        }
    }
    
    /**
     * @dev Get certification details
     * @param certificationId ID of the certification
     * @return Certification details
     */
    function getCertification(uint256 certificationId) external view returns (
        uint256 id,
        string memory productId,
        string memory productName,
        string memory vendorId,
        string memory vendorName,
        string memory certifierId,
        string memory certifierName,
        string memory ipfsHash,
        uint256 issuedAt,
        uint256 expiresAt,
        CertificationStatus status,
        string memory revokedReason,
        CertificationType certType,
        string memory geolocation,
        uint256 lastAuditedAt,
        string memory carbonFootprint,
        uint256 approverCount
    ) {
        require(_certificationExists(certificationId), "Certification does not exist");
        
        Certification storage cert = _certifications[certificationId];
        
        return (
            cert.id,
            cert.productId,
            cert.productName,
            cert.vendorId,
            cert.vendorName,
            cert.certifierId,
            cert.certifierName,
            cert.ipfsHash,
            cert.issuedAt,
            cert.expiresAt,
            cert.status,
            cert.revokedReason,
            cert.certType,
            cert.geolocation,
            cert.lastAuditedAt,
            cert.carbonFootprint,
            cert.approvers.length
        );
    }
    
    /**
     * @dev Get certification by product ID
     * @param productId Product ID
     * @return certificationId ID of the certification
     */
    function getCertificationByProduct(string memory productId) external view returns (uint256) {
        uint256 certificationId = _productCertifications[productId];
        require(certificationId != 0, "No certification found for this product");
        return certificationId;
    }
    
    /**
     * @dev Get certifications by vendor ID
     * @param vendorId Vendor ID
     * @return Array of certification IDs
     */
    function getCertificationsByVendor(string memory vendorId) external view returns (uint256[] memory) {
        return _vendorCertifications[vendorId];
    }
    
    /**
     * @dev Get certification compliance standards
     * @param certificationId ID of the certification
     * @return Array of compliance standards
     */
    function getCertificationStandards(uint256 certificationId) external view returns (string[] memory) {
        require(_certificationExists(certificationId), "Certification does not exist");
        return _certifications[certificationId].complianceStandards;
    }
    
    /**
     * @dev Get certification approvers
     * @param certificationId ID of the certification
     * @return Array of approver addresses
     */
    function getCertificationApprovers(uint256 certificationId) external view returns (address[] memory) {
        require(_certificationExists(certificationId), "Certification does not exist");
        return _certifications[certificationId].approvers;
    }
    
    /**
     * @dev Get certification audit trail
     * @param certificationId ID of the certification
     * @return timestamps Array of timestamps
     * @return actors Array of actor addresses
     * @return actions Array of actions
     * @return details Array of details
     */
    function getCertificationAuditTrail(uint256 certificationId) external view returns (
        uint256[] memory timestamps,
        address[] memory actors,
        string[] memory actions,
        string[] memory details
    ) {
        require(_certificationExists(certificationId), "Certification does not exist");
        
        AuditEvent[] storage audits = _certificationAudits[certificationId];
        uint256 length = audits.length;
        
        timestamps = new uint256[](length);
        actors = new address[](length);
        actions = new string[](length);
        details = new string[](length);
        
        for (uint256 i = 0; i < length; i++) {
            timestamps[i] = audits[i].timestamp;
            actors[i] = audits[i].actor;
            actions[i] = audits[i].action;
            details[i] = audits[i].details;
        }
        
        return (timestamps, actors, actions, details);
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
        return cert.status == CertificationStatus.Active && cert.expiresAt > block.timestamp;
    }
    
    /**
     * @dev Verify certification data hash
     * @param certificationId ID of the certification
     * @param dataToVerify Data to verify against stored hash
     * @return bool True if data matches stored hash
     */
    function verifyCertificationData(uint256 certificationId, bytes memory dataToVerify) external view returns (bool) {
        require(_certificationExists(certificationId), "Certification does not exist");
        
        Certification storage cert = _certifications[certificationId];
        bytes32 providedHash = keccak256(dataToVerify);
        
        return cert.dataHash == providedHash;
    }
    
    /**
     * @dev Add audit event to certification
     * @param certificationId ID of the certification
     * @param actor Address of the actor
     * @param action Action performed
     * @param details Details of the action
     */
    function _addAuditEvent(
        uint256 certificationId,
        address actor,
        string memory action,
        string memory details
    ) private {
        _certificationAudits[certificationId].push(AuditEvent({
            timestamp: block.timestamp,
            actor: actor,
            action: action,
            details: details
        }));
    }
    
    /**
     * @dev Convert status enum to string
     * @param status Status enum
     * @return string Status as string
     */
    function _statusToString(CertificationStatus status) private pure returns (string memory) {
        if (status == CertificationStatus.Pending) return "Pending";
        if (status == CertificationStatus.Active) return "Active";
        if (status == CertificationStatus.Expired) return "Expired";
        if (status == CertificationStatus.Revoked) return "Revoked";
        if (status == CertificationStatus.Suspended) return "Suspended";
        return "Unknown";
    }
    
    /**
     * @dev Convert address to string
     * @param addr Address to convert
     * @return string Address as string
     */
    function _addressToString(address addr) private pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(addr)));
        bytes memory alphabet = "0123456789abcdef";
        
        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        
        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        
        return string(str);
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