import { server } from '@test/client.mock.js'
import { GeyserClient } from '@src/client.js'
import { TOKEN } from './utils.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('GeyserClient', () => {
  test(`
    acquire(
      namespace: string
    , options?: { signal?: string, token?: string }
    ): Promise<string>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = await client.acquire(namespace)

    expect(result).toBeUndefined()
  })
})

function createClient() {
  return new GeyserClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
