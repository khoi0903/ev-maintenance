// src/repositories/inventoryRepository.js
const { poolPromise, sql } = require('../db');

class InventoryRepository {
  async listAll() {
    const pool = await poolPromise;
    const rs = await pool.request().query(`
      SELECT
        p.PartID,
        p.PartName,
        p.ModelID,
        m.Brand,
        m.ModelName,
        p.StockQuantity,
        p.MinStock,
        p.UnitPrice,
        p.CreatedAt,
        p.UpdatedAt
      FROM PartInventory p
      LEFT JOIN Model m ON m.ModelID = p.ModelID
      ORDER BY p.PartName;
    `);
    return rs.recordset || [];
  }

  async listLowStock() {
    const pool = await poolPromise;
    const rs = await pool.request().query(`
      SELECT
        p.PartID,
        p.PartName,
        p.ModelID,
        m.Brand,
        m.ModelName,
        p.StockQuantity,
        p.MinStock,
        p.UnitPrice,
        p.CreatedAt,
        p.UpdatedAt
      FROM PartInventory p
      LEFT JOIN Model m ON m.ModelID = p.ModelID
      WHERE p.StockQuantity < p.MinStock
      ORDER BY p.PartName;
    `);
    return rs.recordset || [];
  }
}

module.exports = new InventoryRepository();


