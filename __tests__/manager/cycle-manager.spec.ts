import { server } from './cycle-manager.mock'
import { CycleManager } from '@manager/cycle-manager'
import { ADMIN_PASSWORD } from '@test/utils'
import '@blackglory/jest-matchers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('CycleManager', () => {
  test('removeDuration(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = client.resetCycle(namespace)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
  })
})

function createManager() {
  return new CycleManager({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
