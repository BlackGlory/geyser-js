import { server } from './cycle-manager.mock.js'
import { CycleManager } from '@manager/cycle-manager.js'
import { ADMIN_PASSWORD } from '@test/utils.js'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('CycleManager', () => {
  test('removeDuration(namespace: string): Promise<void>', async () => {
    const client = createManager()
    const namespace = 'namespace'

    const result = await client.resetCycle(namespace)

    expect(result).toBeUndefined()
  })
})

function createManager() {
  return new CycleManager({
    server: 'http://localhost'
  , adminPassword: ADMIN_PASSWORD
  })
}
