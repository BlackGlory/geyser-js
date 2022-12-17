import { server } from './token-manager.mock'
import { TokenManager } from '@manager/token-manager'
import { ADMIN_PASSWORD } from '@test/utils'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('TokenManager', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createManager()

    const result = await client.getNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test(`
    getTokens(
      namespace: string
    ): Promise<Array<{ token: string; write: boolean; read: boolean }>>
  `, async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.getTokens(namespace)

    expect(result).toStrictEqual([{
      token: 'token'
    , acquire: true
    }])
  })

  test('addAcquireToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.addAcquireToken(namespace, token)

    expect(result).toBeUndefined()
  })

  test('removeAcquireToken(namespace: string, token: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const token = 'token'

    const result = await client.removeAcquireToken(namespace, token)

    expect(result).toBeUndefined()
  })
})

function createManager() {
  return new TokenManager({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
