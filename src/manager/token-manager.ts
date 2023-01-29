import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { appendPathname } from 'extra-request/transformers'
import { ok, toJSON } from 'extra-response'
import { IGeyserManagerRequestOptions, Base } from './base.js'

interface ITokenInfo {
  token: string
  acquire: boolean
}

export class TokenManager extends Base {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/admin/geyser-with-tokens')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  /**
   * @throws {AbortError}
   */
  async getTokens(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<ITokenInfo[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/geyser/${namespace}/tokens`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenInfo[]
  }

  /**
   * @throws {AbortError}
   */
  async addAcquireToken(
    namespace: string
  , token: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/geyser/${namespace}/tokens/${token}/acquire`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeAcquireToken(
    namespace: string
  , token: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/geyser/${namespace}/tokens/${token}/acquire`)
    )

    await fetch(req).then(ok)
  }
}
