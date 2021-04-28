import { fetch } from 'extra-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { IGeyserManagerOptions } from './geyser-manager'
import { IGeyserManagerRequestOptions } from './types'

interface ITokenInfo {
  token: string
  acquire: boolean
}

export class TokenClient {
  constructor(private options: IGeyserManagerOptions) {}

  async getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/admin/geyser-with-tokens')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
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
      url(this.options.server)
    , pathname(`/admin/geyser/${namespace}/tokens`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
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
      url(this.options.server)
    , pathname(`/admin/geyser/${namespace}/tokens/${token}/acquire`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeAcquireToken(
    namespace: string
  , token: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/geyser/${namespace}/tokens/${token}/acquire`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
