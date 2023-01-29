import { server } from './configuration-manager.mock.js'
import { ConfigurationManager } from '@manager/configuration-manager.js'
import { ADMIN_PASSWORD } from '@test/utils.js'
import '@test/polyfill.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ConfigurationManager', () => {
  test('getNamespaces(): Promise<string[]>', async () => {
    const client = createManager()

    const result = await client.getNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })

  test('get(namespace: string): Promise<Configuration>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.get(namespace)

    expect(result).toStrictEqual({
      duration: null
    , limit: null
    })
  })

  test('setDuration(namespace: string, val: number): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = 100

    const result = await client.setDuration(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeDuration(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeDuration(namespace)

    expect(result).toBeUndefined()
  })

  test('setLimit(namespace: string, val: number): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'
    const val = 100

    const result = await client.setLimit(namespace, val)

    expect(result).toBeUndefined()
  })

  test('removeLimit(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.removeLimit(namespace)

    expect(result).toBeUndefined()
  })
})

function createManager() {
  return new ConfigurationManager({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
