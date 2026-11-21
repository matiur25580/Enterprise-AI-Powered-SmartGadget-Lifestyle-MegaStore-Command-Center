const { allowedPreviousStatuses } = require('../src/utils/orderStatusPolicy');

describe('order status transition policy', () => {
  test('allows only forward transitions from non-terminal states', () => {
    expect(allowedPreviousStatuses('Shipped')).toEqual(['Pending']);
    expect(allowedPreviousStatuses('Delivered')).toEqual(['Shipped']);
    expect(allowedPreviousStatuses('Cancelled')).toEqual(['Pending', 'Shipped']);
  });

  test('does not allow resetting Pending or changing terminal states', () => {
    expect(allowedPreviousStatuses('Pending')).toEqual([]);
    expect(allowedPreviousStatuses('Refunded')).toEqual([]);
    expect(allowedPreviousStatuses('Delivered')).not.toContain('Delivered');
    expect(allowedPreviousStatuses('Cancelled')).not.toContain('Cancelled');
  });
});
