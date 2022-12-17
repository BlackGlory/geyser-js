import { server } from '@test/client.mock'
import { GeyserClient } from '@src/client'
import { TOKEN } from './utils'

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
