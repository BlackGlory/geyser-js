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

  async getIds(options: IGeyserManagerRequestOptions = {}): Promise<string[]> {
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

  async get(id: string, options: IGeyserManagerRequestOptions = {}): Promise<IConfiguration> {
    const req = get(
      url(this.options.server)
    , pathname(`/admin/geyser/${id}/config`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IConfiguration
  }

  async setDuration(id: string, val: number, options: IGeyserManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/geyser/${id}/config/duration`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeDuration(id: string, options: IGeyserManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/geyser/${id}/config/duration`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async setLimit(id: string, val: number, options: IGeyserManagerRequestOptions = {}): Promise<void> {
    const req = put(
      url(this.options.server)
    , pathname(`/admin/geyser/${id}/config/limit`)
    , password(this.options.adminPassword)
    , json(val)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }

  async removeLimit(id: string, options: IGeyserManagerRequestOptions = {}): Promise<void> {
    const req = del(
      url(this.options.server)
    , pathname(`/admin/geyser/${id}/config/limit`)
    , password(this.options.adminPassword)
    , options.signal && signal(options.signal)
    )

    await fetch(req).then(ok)
  }
}
