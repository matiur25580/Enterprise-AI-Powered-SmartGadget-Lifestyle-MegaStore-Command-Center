const PREVIOUS_STATUSES = Object.freeze({
  Shipped: ['Pending'],
  Delivered: ['Shipped'],
  Cancelled: ['Pending', 'Shipped'],
});

function allowedPreviousStatuses(nextStatus) {
  return PREVIOUS_STATUSES[nextStatus] || [];
}

module.exports = { allowedPreviousStatuses };
