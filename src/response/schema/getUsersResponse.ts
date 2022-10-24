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
      properties: {
        _id: { type: 'string', example: '6352a4994e9066ba357e153d' },
        name: { type: 'string', example: 'Bartu' },
        surname: { type: 'string', example: 'KARABACAK' },
        email: { type: 'string', example: 'bartu-18@gmail.com' },
        phoneNumber: { type: 'string', example: '+905374128256' },
        birthDate: { type: 'string', example: '1997-07-13T09:19:58.799Z' },
        gender: { type: 'string', example: 'M' },
        bookRights: { type: 'number', example: 6 },
        takenBook: { type: 'string', example: 'empty' },
      },
    },
  },
};

export { GetUsersResponse };
