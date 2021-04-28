import { server } from '@test/geyser.mock'
import { GeyserClient } from '@src/geyser-client'
import { TOKEN } from './utils'
import '@blackglory/jest-matchers'

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

    const result = client.acquire(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createClient() {
  return new GeyserClient({
    server: 'http://localhost'
  , token: TOKEN
  })
}
