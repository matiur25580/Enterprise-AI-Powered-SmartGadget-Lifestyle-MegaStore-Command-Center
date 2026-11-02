module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = Number.isInteger(err.status) ? err.status : Number.isInteger(err.statusCode) ? err.statusCode : 500;
  const production = process.env.NODE_ENV === 'production';
  const message = production && status >= 500 ? 'Internal server error' : err.message || 'Internal server error';
  if (status >= 500) console.error(err);
  res.status(status).json({ success: false, message });
};
