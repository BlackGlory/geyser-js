import { server } from '@test/cycle.mock'
import { CycleClient } from '@src/cycle-client'
import { ADMIN_PASSWORD } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('CycleClient', () => {
  test('removeDuration(namespace: string): Promise<void>', async () => {
    const client = createClient()
    const namespace = 'namespace'

    const result = client.resetCycle(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createClient() {
  return new CycleClient({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
