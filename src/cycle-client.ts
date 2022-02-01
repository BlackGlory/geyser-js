import { fetch } from 'extra-fetch'
import { del } from 'extra-request'
import { pathname } from 'extra-request/transformers/index.js'
import { ok } from 'extra-response'
import { IGeyserManagerRequestOptions, GeyserManagerBase } from './utils'

export class CycleClient extends GeyserManagerBase {
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
