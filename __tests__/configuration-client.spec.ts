import { server } from '@test/configuration.mock'
import { ConfigurationClient } from '@src/configuration-client'
import { ADMIN_PASSWORD } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ConfigurationClient', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getNamespaces()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['namespace'])
  })

  test('get(namespace: string): Promise<Configuration>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.get(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      duration: null
    , limit: null
    })
  })

  test('setDuration(namespace: string, val: number): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const val = 100

    const result = client.setDuration(namespace, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('removeDuration(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.removeDuration(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('setLimit(namespace: string, val: number): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'
    const val = 100

    const result = client.setLimit(namespace, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  test('removeLimit(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.removeLimit(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createClient() {
  return new ConfigurationClient({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
