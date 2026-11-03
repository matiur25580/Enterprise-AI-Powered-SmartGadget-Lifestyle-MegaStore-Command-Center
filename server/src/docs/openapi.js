const ref = name => ({ $ref: `#/components/schemas/${name}` });
const body = schema => ({ required: true, content: { 'application/json': { schema } } });
const jsonResponse = (description, schema) => ({
  description,
  content: { 'application/json': { schema } },
});
const errorRef = name => ({ $ref: `#/components/responses/${name}` });
const operation = (tag, summary, responses, additional = {}) => ({
  tags: [tag],
  summary,
  responses,
  ...additional,
});
const auth = { security: [{ bearerAuth: [] }] };
const badRequest = errorRef('BadRequest');
const unauthorized = errorRef('Unauthorized');
const forbidden = errorRef('Forbidden');
const authResponse = ref('AuthResponse');
const productInput = ref('ProductInput');
const orderRequest = ref('OrderRequest');
const uploadRequest = field => ({
  required: true,
  content: {
    'multipart/form-data': {
      schema: {
        type: 'object',
        required: [field],
        properties: { [field]: { type: 'string', format: 'binary' } },
      },
    },
  },
});
const uploadResponse = description => jsonResponse(description, {
  type: 'object',
  properties: { success: { type: 'boolean' }, url: { type: 'string' } },
});

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'MegaStore API',
    version: '2.0.0',
    description: 'Authentication, catalog, orders, coupon and referral endpoints. Checkout currently supports cash on delivery only; there are no online payment endpoints.',
  },
  servers: [{ url: '/' }],
  tags: [
    { name: 'Health' },
    { name: 'Authentication' },
    { name: 'Products' },
    { name: 'Orders' },
    { name: 'Coupons and referrals' },
    { name: 'Payment', description: 'No online payment endpoints are implemented; checkout supports cash on delivery.' },
    { name: 'Administration' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Invalid request data' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: { field: { type: 'string' }, message: { type: 'string' } },
            },
          },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: { success: { type: 'boolean' }, message: { type: 'string' } },
      },
      OtpRequest: {
        type: 'object',
        required: ['email', 'role'],
        properties: {
          email: { type: 'string', format: 'email' },
          role: { type: 'string', enum: ['Customer', 'Seller'] },
        },
      },
      ForgotPasswordRequest: {
        type: 'object',
        required: ['email', 'role'],
        properties: {
          email: { type: 'string', format: 'email' },
          role: { type: 'string', enum: ['Admin', 'Seller', 'Customer', 'DeliveryAgent', 'SupportAgent', 'MarketingManager'] },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['fullName', 'email', 'contact', 'dob', 'password', 'role', 'otp'],
        properties: {
          fullName: { type: 'string', maxLength: 120 },
          email: { type: 'string', format: 'email' },
          contact: { type: 'string', maxLength: 30 },
          dob: { type: 'string', pattern: '^\\d{8}$', description: 'DDMMYYYY and a valid past date' },
          password: { type: 'string', minLength: 8, maxLength: 128 },
          role: { type: 'string', enum: ['Customer', 'Seller'] },
          otp: { type: 'string', pattern: '^\\d{6}$' },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['emailOrId', 'password', 'role'],
        properties: {
          emailOrId: { type: 'string' },
          password: { type: 'string' },
          role: { type: 'string', enum: ['Admin', 'Seller', 'Customer', 'DeliveryAgent', 'SupportAgent', 'MarketingManager'] },
        },
      },
      LoginResponse: {
        allOf: [
          authResponse,
          {
            type: 'object',
            properties: {
              token: { type: 'string' }, role: { type: 'string' }, uniqueId: { type: 'string' },
              fullName: { type: 'string' }, email: { type: 'string', format: 'email' },
            },
          },
        ],
      },
      ProductInput: {
        type: 'object',
        required: ['name', 'category', 'price'],
        properties: {
          name: { type: 'string', maxLength: 120 },
          category: { type: 'string', enum: ['Mobile', 'AudioPower', 'Protection', 'Storage', 'Computing', 'Lifestyle'] },
          subcategory: { type: 'string', maxLength: 100 },
          price: { type: 'number', minimum: 0 },
          mrp: { type: 'number', minimum: 0, description: 'Must be greater than or equal to price' },
          stock: { type: 'integer', minimum: 0 },
          brand: { type: 'string', maxLength: 100 },
          image: { type: 'string', maxLength: 2048 },
          comboTags: { type: 'array', maxItems: 30, items: { type: 'string', maxLength: 50 } },
        },
      },
      Product: {
        allOf: [
          productInput,
          {
            type: 'object',
            properties: { _id: { type: 'string' }, rating: { type: 'number' }, createdAt: { type: 'string', format: 'date-time' } },
          },
        ],
      },
      ProductListResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' }, total: { type: 'integer' }, pages: { type: 'integer' }, page: { type: 'integer' },
          products: { type: 'array', items: ref('Product') },
        },
      },
      OrderItemInput: {
        type: 'object',
        required: ['productId'],
        properties: {
          productId: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' },
          qty: { type: 'integer', minimum: 1, maximum: 100, default: 1 },
        },
      },
      OrderRequest: {
        type: 'object',
        required: ['items', 'address'],
        properties: {
          items: { type: 'array', minItems: 1, maxItems: 50, items: ref('OrderItemInput') },
          address: { type: 'string', maxLength: 500 },
        },
      },
      Order: {
        type: 'object',
        properties: {
          _id: { type: 'string' }, customerId: { type: 'string' }, customerEmail: { type: 'string', format: 'email' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                productId: { type: 'string' }, name: { type: 'string' }, price: { type: 'number' }, qty: { type: 'integer' },
              },
            },
          },
          total: { type: 'number' }, address: { type: 'string' },
          status: { type: 'string', enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] },
        },
      },
      OrderListResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' }, count: { type: 'integer' }, total: { type: 'integer' }, pages: { type: 'integer' },
          page: { type: 'integer' }, orders: { type: 'array', items: ref('Order') },
        },
      },
      CouponRequest: {
        type: 'object',
        required: ['code'],
        properties: { code: { type: 'string', pattern: '^[A-Za-z0-9_-]+$', maxLength: 40 } },
      },
      ReferralRequest: {
        type: 'object',
        required: ['code'],
        properties: { code: { type: 'string', pattern: '^[A-Za-z0-9_-]+$', maxLength: 80 } },
      },
    },
    responses: {
      BadRequest: { description: 'Invalid request data', content: { 'application/json': { schema: ref('Error') } } },
      Unauthorized: { description: 'A valid bearer token is required', content: { 'application/json': { schema: ref('Error') } } },
      Forbidden: { description: 'The current role cannot perform this action', content: { 'application/json': { schema: ref('Error') } } },
    },
  },
  paths: {
    '/api/health': {
      get: operation('Health', 'API and database health', {
        200: jsonResponse('Health status', {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'ok' },
            uptime: { type: 'number' },
            db: { type: 'string', enum: ['connected', 'disconnected'] },
          },
        }),
      }),
    },
    '/api/auth/send-otp': {
      post: operation('Authentication', 'Send registration OTP', {
        200: jsonResponse('OTP sent', authResponse),
        400: badRequest,
      }, { requestBody: body(ref('OtpRequest')) }),
    },
    '/api/auth/register': {
      post: operation('Authentication', 'Verify OTP and register', {
        200: jsonResponse('Account created', authResponse),
        400: badRequest,
      }, { requestBody: body(ref('RegisterRequest')) }),
    },
    '/api/auth/login': {
      post: operation('Authentication', 'Sign in and obtain a JWT', {
        200: jsonResponse('Authenticated', ref('LoginResponse')),
        400: badRequest,
      }, { requestBody: body(ref('LoginRequest')) }),
    },
    '/api/auth/forgot-password': {
      post: operation('Authentication', 'Send password reset OTP', {
        200: jsonResponse('Reset OTP sent', authResponse),
        400: badRequest,
      }, { requestBody: body(ref('ForgotPasswordRequest')) }),
    },
    '/api/auth/reset-password': {
      post: operation('Authentication', 'Verify reset OTP and set a new password', {
        200: jsonResponse('Password changed', authResponse),
        400: badRequest,
      }, {
        requestBody: body({
          type: 'object',
          required: ['email', 'role', 'otp', 'newPassword'],
          properties: {
            email: { type: 'string', format: 'email' },
            role: { type: 'string' },
            otp: { type: 'string', pattern: '^\\d{6}$' },
            newPassword: { type: 'string', minLength: 8, maxLength: 128 },
          },
        }),
      }),
    },
    '/api/products/all': {
      get: operation('Products', 'List products with filters and pagination', {
        200: jsonResponse('Product page', ref('ProductListResponse')),
        400: badRequest,
      }, {
        parameters: [
          { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1, default: 1 } },
          { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1, maximum: 60, default: 20 } },
          { in: 'query', name: 'category', schema: { type: 'string' } },
          { in: 'query', name: 'search', schema: { type: 'string' } },
          { in: 'query', name: 'minPrice', schema: { type: 'number' } },
          { in: 'query', name: 'maxPrice', schema: { type: 'number' } },
        ],
      }),
    },
    '/api/products/mine': {
      get: operation('Products', 'List products belonging to the authenticated seller', {
        200: jsonResponse('Seller product list', { type: 'object', properties: { success: { type: 'boolean' }, products: { type: 'array', items: ref('Product') } } }),
        401: unauthorized,
        403: forbidden,
      }, auth),
    },
    '/api/products/{id}': {
      parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' } }],
      get: operation('Products', 'Get product details', {
        200: jsonResponse('Product details', ref('Product')),
        404: { description: 'Product not found' },
      }),
      put: operation('Products', 'Update a product (Admin or owning Seller)', {
        200: { description: 'Product updated' },
        400: badRequest,
        401: unauthorized,
        403: forbidden,
      }, { ...auth, requestBody: body(productInput) }),
      delete: operation('Products', 'Delete a product (Admin or owning Seller)', {
        200: { description: 'Product deleted' },
        401: unauthorized,
        403: forbidden,
      }, auth),
    },
    '/api/products/combo/{id}': {
      get: operation('Products', 'Find product bundle recommendations', {
        200: { description: 'Matching products' },
        404: { description: 'Product not found' },
      }, { parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }] }),
    },
    '/api/products/add': {
      post: operation('Products', 'Create a product (Admin or Seller)', {
        200: { description: 'Product created' },
        400: badRequest,
        401: unauthorized,
      }, { ...auth, requestBody: body(productInput) }),
    },
    '/api/upload/product-photo': {
      post: operation('Products', 'Upload a product photo (Admin or Seller)', {
        200: uploadResponse('Photo uploaded'),
        400: badRequest,
        401: unauthorized,
        403: forbidden,
        413: { description: 'File exceeds the upload limit' },
      }, { ...auth, requestBody: uploadRequest('photo') }),
    },
    '/api/upload/review-video': {
      post: operation('Products', 'Upload a review video (Customer)', {
        200: uploadResponse('Review video uploaded'),
        400: badRequest,
        401: unauthorized,
        403: forbidden,
        413: { description: 'File exceeds the upload limit' },
      }, { ...auth, requestBody: uploadRequest('video') }),
    },
    '/api/products/stock/{id}': {
      put: operation('Products', 'Set stock (Admin or owning Seller)', {
        200: { description: 'Stock updated' },
        400: badRequest,
        401: unauthorized,
      }, {
        ...auth,
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: body({
          type: 'object',
          required: ['stock'],
          properties: { stock: { type: 'integer', minimum: 0 } },
        }),
      }),
    },
    '/api/products/seed': {
      post: operation('Products', 'Seed/expand demo catalog (Admin)', {
        200: { description: 'Catalog seeded' },
        401: unauthorized,
        403: forbidden,
      }, auth),
    },
    '/api/orders/create': {
      post: operation('Orders', 'Place an order (Customer)', {
        200: jsonResponse('Order created', {
          type: 'object',
          properties: { success: { type: 'boolean' }, order: ref('Order') },
        }),
        400: badRequest,
        401: unauthorized,
      }, { ...auth, requestBody: body(orderRequest) }),
    },
    '/api/orders/my': {
      get: operation('Orders', 'List the authenticated customer orders', {
        200: jsonResponse('Paginated orders', ref('OrderListResponse')),
        401: unauthorized,
      }, {
        ...auth,
        parameters: [
          { in: 'query', name: 'page', schema: { type: 'integer', minimum: 1, default: 1 } },
          { in: 'query', name: 'limit', schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 } },
        ],
      }),
    },
    '/api/orders/my/{email}': {
      get: operation('Orders', 'Legacy unpaginated order list by account email', {
        200: jsonResponse('Customer order list', ref('OrderListResponse')),
        401: unauthorized,
        403: forbidden,
      }, { ...auth, parameters: [{ in: 'path', name: 'email', required: true, schema: { type: 'string', format: 'email' } }] }),
    },
    '/api/orders/status/{id}': {
      put: operation('Orders', 'Update order status (Admin or DeliveryAgent)', {
        200: { description: 'Order updated' },
        400: badRequest,
        401: unauthorized,
        403: forbidden,
      }, {
        ...auth,
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: body({
          type: 'object',
          required: ['status'],
          properties: { status: { type: 'string', enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] } },
        }),
      }),
    },
    '/api/extra/analytics/summary': {
      get: operation('Administration', 'Get database-backed store summary (Admin)', {
        200: jsonResponse('Current database totals', {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                totalProducts: { type: 'integer' }, totalOrders: { type: 'integer' },
                totalUsers: { type: 'integer' }, revenue: { type: 'number' },
              },
            },
          },
        }),
        401: unauthorized,
        403: forbidden,
      }, auth),
    },
    '/api/extra/coupon/apply': {
      post: operation('Coupons and referrals', 'Validate and apply a coupon code', {
        200: jsonResponse('Coupon valid', {
          type: 'object',
          properties: { success: { type: 'boolean' }, discount: { type: 'number' } },
        }),
        400: badRequest,
      }, { requestBody: body(ref('CouponRequest')) }),
    },
    '/api/extra/referral/validate': {
      post: operation('Coupons and referrals', 'Check whether a referral code matches a user ID', {
        200: jsonResponse('Referral validation result', {
          type: 'object',
          properties: { success: { type: 'boolean' }, valid: { type: 'boolean' }, message: { type: 'string' } },
        }),
        400: badRequest,
      }, { requestBody: body(ref('ReferralRequest')) }),
    },
  },
};
