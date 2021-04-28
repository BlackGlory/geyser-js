import { fetch } from 'extra-fetch'
import { password } from './utils'
import { get, put, del } from 'extra-request'
import { url, pathname, json, signal } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import type { IGeyserManagerOptions } from './geyser-manager'
import { IGeyserManagerRequestOptions } from './types'

interface IConfiguration {
  duration: number | null
  limit: number | null
}

export class ConfigurationClient {
  constructor(private options: IGeyserManagerOptions) {}

  async getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      url(this.options.server)
    , pathname('/admin/geyser-with-config')
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
  ): Promise<IConfiguration> {
    const req = get(
      url(this.options.server)
    , pathname(`/admin/geyser/${namespace}/config`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IConfiguration
  }

  async setDuration(
    namespace: string
  , val: number
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/geyser/${namespace}/config/duration`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeDuration(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/geyser/${namespace}/config/duration`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setLimit(
    namespace: string
  , val: number
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/geyser/${namespace}/config/limit`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeLimit(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/geyser/${namespace}/config/limit`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
