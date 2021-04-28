import { fetch } from 'extra-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, json, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import { IGeyserManagerOptions } from './geyser-manager'
import { IGeyserManagerRequestOptions } from './types'

interface ITokenPolicy {
  acquireTokenRequired: boolean | null
}

export class TokenPolicyClient {
  constructor(private options: IGeyserManagerOptions) {}

  async getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/admin/geyser-with-token-policies')
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async get(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<ITokenPolicy> {
    const req = get(
      url(this.options.server)
    , pathname(`/admin/geyser/${namespace}/token-policies`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as ITokenPolicy
  }

  async setAcquireTokenRequired(
    namespace: string
  , val: boolean
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/geyser/${namespace}/token-policies/acquire-token-required`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeAcquireTokenRequired(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/geyser/${namespace}/token-policies/acquire-token-required`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
