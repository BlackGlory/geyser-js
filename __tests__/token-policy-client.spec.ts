import { server } from '@test/token-policy.mock'
import { TokenPolicyClient } from '@src/token-policy-client'
import { ADMIN_PASSWORD } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('TokenPolicyClient', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })

  test(`
    get(
      namespace: string
    ): Promise<{ acquireTokenRequired: boolean | null }>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.get(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      acquireTokenRequired: true
    })
  })

  test(`
    setAcquireTokenRequired(
      namespace: string
    , val: boolean
    ): Promise<void>
  `, async () => {
    const client = createClient()
    const namespace = 'namespace'
    const val = true

    const result = client.setAcquireTokenRequired(namespace, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('removeAcquireTokenRequired(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.removeAcquireTokenRequired(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createClient() {
  return new TokenPolicyClient({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
