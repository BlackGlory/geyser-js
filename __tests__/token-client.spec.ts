import { server } from '@test/token.mock'
import { TokenClient } from '@src/token-client'
import { ADMIN_PASSWORD } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('TokenClient', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })

  test(`
    getTokens(
      namespace: string
    ): Promise<Array<{ token: string; write: boolean; read: boolean }>>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.getTokens(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual([{
      token: 'token'
    , acquire: true
    }])
  })

  test('addAcquireToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const token = 'token'

    const result = client.addAcquireToken(namespace, token)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('removeAcquireToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const token = 'token'

    const result = client.removeAcquireToken(namespace, token)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createClient() {
  return new TokenClient({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
