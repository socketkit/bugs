import { verify } from '../../hooks.js'
import grpc from '../../grpc.js'

export default {
  method: 'GET',
  path: '/countries',
  schema: {
    query: {
      type: 'object',
      properties: {
        start_date: {
          type: 'string',
          format: 'date',
        },
        end_date: {
          type: 'string',
          format: 'date',
        },
      },
      required: ['start_date', 'end_date'],
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            country_id: { type: 'string' },
            total_count: { type: 'number' },
            total_direct_sale_count: { type: 'number' },
            total_trial_count: { type: 'number' },
            paid_converted_from_trial: { type: 'number' },
            revenue: { type: 'number' },
            churned_from_trial: { type: 'number' },
            churned_from_direct_sale: { type: 'number' },
          },
          required: [
            'country_id',
            'total_count',
            'total_direct_sale_count',
            'total_trial_count',
            'paid_converted_from_trial',
            'revenue',
            'churned_from_trial',
            'churned_from_direct_sale',
          ],
        },
      },
    },
  },
  preHandler: verify,
  handler: async ({ accounts: [account], query }) => {
    const { rows } = await grpc.subscriptions.groupByCountry({
      account_id: account.account_id,
      start_date: query.start_date,
      end_date: query.end_date,
    })

    return rows
  },
}
