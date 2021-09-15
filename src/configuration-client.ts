import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { pathname, json } from 'extra-request/lib/es2018/transformers'
import { ok, toJSON } from 'extra-response'
import { IGeyserManagerRequestOptions, GeyserManagerBase } from './utils'

interface IConfiguration {
  duration: number | null
  limit: number | null
}

export class ConfigurationClient extends GeyserManagerBase {
  async getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , pathname('/admin/geyser-with-config')
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
      ...this.getCommonTransformers(options)
    , pathname(`/admin/geyser/${namespace}/config`)
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
      ...this.getCommonTransformers(options)
    , pathname(`/admin/geyser/${namespace}/config/duration`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeDuration(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/geyser/${namespace}/config/duration`)
    )

    await fetch(req).then(ok)
  }

  async setLimit(
    namespace: string
  , val: number
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/geyser/${namespace}/config/limit`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  async removeLimit(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , pathname(`/admin/geyser/${namespace}/config/limit`)
    )

    await fetch(req).then(ok)
  }
}
