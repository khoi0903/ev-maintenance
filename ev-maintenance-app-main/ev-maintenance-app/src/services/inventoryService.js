// src/services/inventoryService.js
const repo = require('../repositories/inventoryRepository');

class InventoryService {
  async listAll() {
    return repo.listAll();
  }

  async listLowStock() {
    return repo.listLowStock();
  }
}

module.exports = new InventoryService();


