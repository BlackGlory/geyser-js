import { fetch } from 'extra-fetch'
import { get, put, del } from 'extra-request'
import { appendPathname, json } from 'extra-request/transformers/index.js'
import { ok, toJSON } from 'extra-response'
import { IGeyserManagerRequestOptions, Base } from './base'

interface IConfiguration {
  duration: number | null
  limit: number | null
}

export class ConfigurationManager extends Base {
  /**
   * @throws {AbortError}
   */
  async getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname('/admin/geyser-with-config')
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
  ): Promise<IConfiguration> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/geyser/${namespace}/config`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as IConfiguration
  }

  /**
   * @throws {AbortError}
   */
  async setDuration(
    namespace: string
  , val: number
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/geyser/${namespace}/config/duration`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeDuration(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/geyser/${namespace}/config/duration`)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async setLimit(
    namespace: string
  , val: number
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/geyser/${namespace}/config/limit`)
    , json(val)
    )

    await fetch(req).then(ok)
  }

  /**
   * @throws {AbortError}
   */
  async removeLimit(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/admin/geyser/${namespace}/config/limit`)
    )

    await fetch(req).then(ok)
  }
}
