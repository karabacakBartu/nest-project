const GetUsersResponse = {
  type: 'object',
  additionalProperties: false,
  properties: {
    status: { type: 'string', example: 'success' },
    statusCode: { type: 'number', example: 201 },
    message: { type: 'string', example: 'Users' },
    data: {
      type: 'object',
      additionalProperties: false,
      properties: {},
    },
  },
};
