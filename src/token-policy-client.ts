import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname, json } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IGeyserManagerRequestOptions, GeyserManagerBase } from './utils'

interface ITokenPolicy {
  acquireTokenRequired: boolean | null
}

export class TokenPolicyClient extends GeyserManagerBase {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/geyser-with-token-policies')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async get(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<ITokenPolicy> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/geyser/${namespace}/token-policies`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenPolicy
  }

  /**
   * @throws {AbortError}
   */
  async setAcquireTokenRequired(
    namespace: string
  , val: boolean
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/geyser/${namespace}/token-policies/acquire-token-required`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeAcquireTokenRequired(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/geyser/${namespace}/token-policies/acquire-token-required`)
    )

    await fetch(req).then(ok)
  }
}
