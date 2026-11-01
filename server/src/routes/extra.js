const express = require('express');
const router = express.Router();
router.get('/analytics/summary', (req, res) => {
  res.json({ success: true, message: 'Analytics fetched', data: { totalProducts: 24, totalOrders: 156, revenue: 2500000 } });
});
router.post('/review/add', (req, res) => {
  res.json({ success: true, message: 'Review added' });
});
router.post('/coupon/apply', (req, res) => {
  res.json({ success: true, message: 'Coupon applied' });
});
module.exports = router;
