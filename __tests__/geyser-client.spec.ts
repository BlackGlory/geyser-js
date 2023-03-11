import { server } from '@test/geyser-client.mock.js'
import { GeyserClient, RateLimiterNotFound } from '@src/geyser-client.js'
import { getErrorPromise } from 'return-style'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('GeyserClient', () => {
  test('getAllRateLimiterIds', async () => {
    const client = createClient()

    const result = await client.getAllRateLimiterIds()

    expect(result).toStrictEqual([])
  })

  describe('getRateLimiter', () => {
    test('not found', async () => {
      const client = createClient()

      const result = await client.getRateLimiter('not-found')

      expect(result).toBe(null)
    })

    test('found', async () => {
      const client = createClient()

      const result = await client.getRateLimiter('found')

      expect(result).toStrictEqual({
        duration: null
      , limit: null
      })
    })
  })

  test('setRateLimiter', async () => {
    const client = createClient()

    await client.setRateLimiter('id', {
      duration: null
    , limit: null
    })
  })

  test('removeRateLimiter', async () => {
    const client = createClient()

    await client.removeRateLimiter('id')
  })

  describe('resetRateLimiter', () => {
    test('not found', async () => {
      const client = createClient()

      const err = await getErrorPromise(client.resetRateLimiter('not-found'))

      expect(err).toBeInstanceOf(RateLimiterNotFound)
    })

    test('found', async () => {
      const client = createClient()

      await client.resetRateLimiter('found')
    })
  })

  describe('acquireToken', () => {
    test('not found', async () => {
      const client = createClient()

      const err = await getErrorPromise(client.acquireToken('not-found'))

      expect(err).toBeInstanceOf(RateLimiterNotFound)
    })

    test('found', async () => {
      const client = createClient()

      await client.acquireToken('found')
    })
  })
})

function createClient() {
  return new GeyserClient({ server: 'http://localhost' })
}
