import { GeyserClient } from '@src/geyser-client.js'

const server = 'ws://geyser:8080'

describe('GeyserClient', () => {
  test('setRatelimiter, acquireToken', async () => {
    const client = await GeyserClient.create({ server })

    try {
      await client.setRateLimiter('id', {
        duration: null
      , limit: null
      })

      await client.acquireToken('id')
    } finally {
      await client.removeRateLimiter('id')
      await client.close()
    }
  })
})
