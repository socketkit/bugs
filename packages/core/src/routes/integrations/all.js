import { verify } from '../../hooks.js'
import f from '../../server.js'

export default {
  method: 'GET',
  path: '/',
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            category: { type: 'string' },
            rows: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  slug: { type: 'string' },
                  integration: {
                    type: 'object',
                    properties: {
                      last_fetch: { type: 'string' },
                      state: { type: 'string' },
                    },
                  },
                  // requirement_schema: {
                  //   type: 'object',
                  //   properties: {
                  //     type: { type: 'string' },
                  //     required: { type: 'array', items: { type: 'string' } },
                  //     properties: { type: 'object', additionalProperties: true },
                  //   },
                  // },
                },
              },
            },
          },
        },
      },
    },
  },
  preHandler: verify,
  handler: async ({ accounts: [account] }) => {
    const appstore = await f.grpc.integrations.findAll({
      account_id: account.account_id,
    })

    return [
      {
        category: 'Data Sources',
        rows: [
          {
            slug: 'appstore-connect',
            title: 'AppStore Connect',
            description: 'Transactions and Sales support for Apple',
            integration: appstore.rows[0] ?? null,
          },
        ],
      },
    ]
  },
}
