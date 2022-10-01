import { fetch } from 'extra-fetch'
import { del } from 'extra-request'
import { pathname } from 'extra-request/transformers/index.js'
import { ok } from 'extra-response'
import { IGeyserManagerRequestOptions, Base } from './base'

export class CycleManager extends Base {
  /**
   * @throws {AbortError}
   */
  async resetCycle(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/geyser/${namespace}/cycle`)
    )

    await fetch(req).then(ok)
  }
}
