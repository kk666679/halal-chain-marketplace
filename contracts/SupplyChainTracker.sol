// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title SupplyChainTracker
 * @dev Smart contract for tracking products through the halal supply chain
 */
contract SupplyChainTracker is AccessControl {
    using Counters for Counters.Counter;
    
    bytes32 public constant VENDOR_ROLE = keccak256("VENDOR_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant LOGISTICS_ROLE = keccak256("LOGISTICS_ROLE");
    
    Counters.Counter private _batchIds;
    
    enum Status {
        Created,
        InTransit,
        Delivered,
        Rejected
    }
    
    struct Location {
        string name;
        string latitude;
        string longitude;
        uint256 timestamp;
    }
    
    struct Batch {
        uint256 id;
        string productId;
        string vendorId;
        uint256 quantity;
        string originLocation;
        string destinationLocation;
        Status status;
        uint256 createdAt;
        uint256 updatedAt;
        string ipfsHash;
        bool isHalal;
    }
    
    // Mapping from batch ID to Batch
    mapping(uint256 => Batch) private _batches;
    
    // Mapping from batch ID to array of locations (tracking history)
    mapping(uint256 => Location[]) private _batchLocations;
    
    // Mapping from product ID to array of batch IDs
    mapping(string => uint256[]) private _productBatches;
    
    // Events
    event BatchCreated(
        uint256 indexed batchId,
        string productId,
        string vendorId,
        uint256 quantity,
        uint256 createdAt
    );
    
    event BatchStatusUpdated(
        uint256 indexed batchId,
        Status status,
        uint256 updatedAt
    );
    
    event LocationAdded(
        uint256 indexed batchId,
        string name,
        string latitude,
        string longitude,
        uint256 timestamp
    );
    
    event HalalStatusUpdated(
        uint256 indexed batchId,
        bool isHalal,
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
     * @dev Add a vendor
     * @param vendor Address of the vendor
     */
    function addVendor(address vendor) external onlyRole(ADMIN_ROLE) {
        grantRole(VENDOR_ROLE, vendor);
    }
    
    /**
     * @dev Remove a vendor
     * @param vendor Address of the vendor
     */
    function removeVendor(address vendor) external onlyRole(ADMIN_ROLE) {
        revokeRole(VENDOR_ROLE, vendor);
    }
    
    /**
     * @dev Add a logistics provider
     * @param provider Address of the logistics provider
     */
    function addLogisticsProvider(address provider) external onlyRole(ADMIN_ROLE) {
        grantRole(LOGISTICS_ROLE, provider);
    }
    
    /**
     * @dev Remove a logistics provider
     * @param provider Address of the logistics provider
     */
    function removeLogisticsProvider(address provider) external onlyRole(ADMIN_ROLE) {
        revokeRole(LOGISTICS_ROLE, provider);
    }
    
    /**
     * @dev Create a new batch
     * @param productId Unique identifier for the product
     * @param vendorId Unique identifier for the vendor
     * @param quantity Quantity of products in the batch
     * @param originLocation Origin location of the batch
     * @param destinationLocation Destination location of the batch
     * @param ipfsHash IPFS hash of the batch documents
     * @return batchId The ID of the newly created batch
     */
    function createBatch(
        string memory productId,
        string memory vendorId,
        uint256 quantity,
        string memory originLocation,
        string memory destinationLocation,
        string memory ipfsHash
    ) external onlyRole(VENDOR_ROLE) returns (uint256) {
        require(bytes(productId).length > 0, "Product ID cannot be empty");
        require(bytes(vendorId).length > 0, "Vendor ID cannot be empty");
        require(quantity > 0, "Quantity must be greater than zero");
        
        _batchIds.increment();
        uint256 newBatchId = _batchIds.current();
        
        uint256 timestamp = block.timestamp;
        
        _batches[newBatchId] = Batch({
            id: newBatchId,
            productId: productId,
            vendorId: vendorId,
            quantity: quantity,
            originLocation: originLocation,
            destinationLocation: destinationLocation,
            status: Status.Created,
            createdAt: timestamp,
            updatedAt: timestamp,
            ipfsHash: ipfsHash,
            isHalal: true // Default to true, can be updated later
        });
        
        // Add initial location
        Location memory initialLocation = Location({
            name: originLocation,
            latitude: "",
            longitude: "",
            timestamp: timestamp
        });
        
        _batchLocations[newBatchId].push(initialLocation);
        
        // Add batch to product's batches
        _productBatches[productId].push(newBatchId);
        
        emit BatchCreated(
            newBatchId,
            productId,
            vendorId,
            quantity,
            timestamp
        );
        
        return newBatchId;
    }
    
    /**
     * @dev Update batch status
     * @param batchId ID of the batch
     * @param status New status
     */
    function updateBatchStatus(
        uint256 batchId,
        Status status
    ) external {
        require(_batchExists(batchId), "Batch does not exist");
        require(
            hasRole(VENDOR_ROLE, msg.sender) || 
            hasRole(LOGISTICS_ROLE, msg.sender) || 
            hasRole(ADMIN_ROLE, msg.sender),
            "Caller is not authorized"
        );
        
        _batches[batchId].status = status;
        _batches[batchId].updatedAt = block.timestamp;
        
        emit BatchStatusUpdated(
            batchId,
            status,
            block.timestamp
        );
    }
    
    /**
     * @dev Add a location to batch tracking history
     * @param batchId ID of the batch
     * @param name Name of the location
     * @param latitude Latitude coordinates
     * @param longitude Longitude coordinates
     */
    function addLocation(
        uint256 batchId,
        string memory name,
        string memory latitude,
        string memory longitude
    ) external {
        require(_batchExists(batchId), "Batch does not exist");
        require(
            hasRole(LOGISTICS_ROLE, msg.sender) || 
            hasRole(ADMIN_ROLE, msg.sender),
            "Caller is not authorized"
        );
        
        uint256 timestamp = block.timestamp;
        
        Location memory newLocation = Location({
            name: name,
            latitude: latitude,
            longitude: longitude,
            timestamp: timestamp
        });
        
        _batchLocations[batchId].push(newLocation);
        _batches[batchId].updatedAt = timestamp;
        
        emit LocationAdded(
            batchId,
            name,
            latitude,
            longitude,
            timestamp
        );
    }
    
    /**
     * @dev Update halal status of a batch
     * @param batchId ID of the batch
     * @param isHalal Whether the batch is halal
     */
    function updateHalalStatus(
        uint256 batchId,
        bool isHalal
    ) external onlyRole(ADMIN_ROLE) {
        require(_batchExists(batchId), "Batch does not exist");
        
        _batches[batchId].isHalal = isHalal;
        _batches[batchId].updatedAt = block.timestamp;
        
        emit HalalStatusUpdated(
            batchId,
            isHalal,
            block.timestamp
        );
    }
    
    /**
     * @dev Get batch details
     * @param batchId ID of the batch
     * @return Batch details
     */
    function getBatch(uint256 batchId) external view returns (Batch memory) {
        require(_batchExists(batchId), "Batch does not exist");
        return _batches[batchId];
    }
    
    /**
     * @dev Get batch locations (tracking history)
     * @param batchId ID of the batch
     * @return Array of locations
     */
    function getBatchLocations(uint256 batchId) external view returns (Location[] memory) {
        require(_batchExists(batchId), "Batch does not exist");
        return _batchLocations[batchId];
    }
    
    /**
     * @dev Get all batches for a product
     * @param productId Product ID
     * @return Array of batch IDs
     */
    function getProductBatches(string memory productId) external view returns (uint256[] memory) {
        return _productBatches[productId];
    }
    
    /**
     * @dev Check if batch exists
     * @param batchId ID of the batch
     * @return bool True if batch exists
     */
    function _batchExists(uint256 batchId) private view returns (bool) {
        return batchId > 0 && batchId <= _batchIds.current();
    }
}