import { server } from '@test/configuration.mock'
import { ConfigurationClient } from '@src/configuration-client'
import { ADMIN_PASSWORD } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('ConfigurationClient', () => {
  it('getIds(): Promise<string[]>', async () => {
    const client = createClient()

    const result = client.getIds()
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual(['id'])
  })

  it('get(id: string): Promise<Configuration>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.get(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toStrictEqual({
      duration: null
    , limit: null
    })
  })

  it('setDuration(id: string, val: number): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = 100

    const result = client.setDuration(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeDuration(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeDuration(id)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('setLimit(id: string, val: number): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'
    const val = 100

    const result = client.setLimit(id, val)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })

  it('removeLimit(id: string): Promise<void>', async () => {
    const client = createClient()
    const id = 'id'

    const result = client.removeLimit(id)
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