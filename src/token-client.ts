import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import { IGeyserManagerRequestOptions, GeyserManagerBase } from './utils'

interface ITokenInfo {
  token: string
  acquire: boolean
}

export class TokenClient extends GeyserManagerBase {
  async getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/geyser-with-tokens')
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getTokens(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<ITokenInfo[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/geyser/${namespace}/tokens`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenInfo[]
  }

  async addAcquireToken(
    namespace: string
  , token: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/geyser/${namespace}/tokens/${token}/acquire`)
    )

    await fetch(req).then(ok)
  }

  async removeAcquireToken(
    namespace: string
  , token: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/geyser/${namespace}/tokens/${token}/acquire`)
    )

    await fetch(req).then(ok)
  }
}
