const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request data',
      errors: errors.array().map(({ path, param, msg }) => ({ field: path || param, message: msg })),
    });
  }
  next();
};

const productRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('category').isIn(['Mobile', 'AudioPower', 'Protection', 'Storage', 'Computing', 'Lifestyle']),
  body('price').isFloat({ min: 0 }).toFloat(),
  body('mrp').optional({ nullable: true }).isFloat({ min: 0 }).toFloat()
    .custom((value, { req }) => Number(value) >= Number(req.body.price))
    .withMessage('MRP cannot be lower than price'),
  body('stock').optional().isInt({ min: 0 }).toInt(),
  body('subcategory').optional({ nullable: true }).isString().isLength({ max: 100 }),
  body('brand').optional({ nullable: true }).isString().isLength({ max: 100 }),
  body('image').optional({ nullable: true }).isString().isLength({ max: 2048 }),
  body('comboTags').optional().isArray({ max: 30 }),
  body('comboTags.*').optional().isString().isLength({ max: 50 }),
];

const orderRules = [
  body('items').isArray({ min: 1, max: 50 }),
  body('items.*.productId').isMongoId(),
  body('items.*.qty').optional().isInt({ min: 1, max: 100 }).toInt(),
  body('address').isString().trim().notEmpty().isLength({ max: 500 }),
];

const authRules = {
  sendOtp: [body('email').isEmail().normalizeEmail(), body('role').isIn(['Customer', 'Seller'])],
  register: [
    body('fullName').trim().notEmpty().isLength({ max: 120 }),
    body('email').isEmail().normalizeEmail(),
    body('contact').trim().notEmpty().isLength({ max: 30 }),
    body('dob').matches(/^\d{8}$/).withMessage('Date of birth must use DDMMYYYY format')
      .custom(value => {
        const day=Number(value.slice(0,2));
        const month=Number(value.slice(2,4));
        const year=Number(value.slice(4,8));
        const date=new Date(Date.UTC(year,month-1,day));
        return year>=1900&&date.getUTCFullYear()===year&&date.getUTCMonth()===month-1&&date.getUTCDate()===day&&date<=new Date();
      }).withMessage('Date of birth must be a valid past date'),
    body('password').isString().isLength({ min: 8, max: 128 }),
    body('role').isIn(['Customer', 'Seller']),
    body('otp').isLength({ min: 6, max: 6 }).isNumeric(),
  ],
  login: [
    body('emailOrId').isString().trim().notEmpty().isLength({ max: 254 }),
    body('password').isString().notEmpty().isLength({ max: 128 }),
    body('role').isIn(['Admin', 'Seller', 'Customer', 'DeliveryAgent', 'SupportAgent', 'MarketingManager']),
  ],
};

module.exports = { validate, productRules, orderRules, authRules };
