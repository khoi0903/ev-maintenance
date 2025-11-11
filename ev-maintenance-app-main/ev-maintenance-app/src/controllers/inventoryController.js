// src/controllers/inventoryController.js
const service = require('../services/inventoryService');

exports.listAll = async (_req, res) => {
  try {
    const data = await service.listAll();
    res.json({ success: true, data });
  } catch (err) {
    console.error('[inventory/listAll]', err);
    res.status(500).json({ success: false, message: 'Không thể tải danh sách tồn kho' });
  }
};

exports.listLowStock = async (_req, res) => {
  try {
    const data = await service.listLowStock();
    res.json({ success: true, data });
  } catch (err) {
    console.error('[inventory/listLowStock]', err);
    res.status(500).json({ success: false, message: 'Không thể tải danh sách tồn kho thấp' });
  }
};


