import { server } from './token-policy-manager.mock.js'
import { TokenPolicyManager } from '@manager/token-policy-manager.js'
import { ADMIN_PASSWORD } from '@test/utils.js'
import '@test/polyfill.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('TokenPolicyManager', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createManager()

    const result = await client.getNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test(`
    get(
      namespace: string
    ): Promise<{ acquireTokenRequired: boolean | null }>
  `, async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.get(namespace)

    expect(result).toStrictEqual({
      acquireTokenRequired: true
    })
  })

  test(`
    setAcquireTokenRequired(
      namespace: string
    , val: boolean
    ): Promise<void>
  `, async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = true

    const result = await client.setAcquireTokenRequired(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeAcquireTokenRequired(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeAcquireTokenRequired(namespace)

    expect(result).toBeUndefined()
  })
})

function createManager() {
  return new TokenPolicyManager({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
