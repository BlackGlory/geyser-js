import { fetch } from 'extra-fetch'
import { del, get, IRequestOptionsTransformer, post, put } from 'extra-request'
import { url, appendPathname, signal, keepalive, basicAuth, header, json }
  from 'extra-request/transformers'
import { ok, toJSON } from 'extra-response'
import { timeoutSignal, raceAbortSignals } from 'extra-abort'
import { expectedVersion } from './utils.js'
import { Falsy, JSONObject } from 'justypes'
import { NotFound } from '@blackglory/http-status'
import { CustomError } from '@blackglory/errors'

export interface IRateLimiterConfig extends JSONObject {
  duration: number | null
  limit: number | null
}

export interface IGeyserClientOptions {
  server: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

export interface IGeyserClientRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export class RateLimiterNotFound extends CustomError {}

export class GeyserClient {
  constructor(private options: IGeyserClientOptions) {}

  async getAllRateLimiterIds(options: IGeyserClientRequestOptions = {}): Promise<string[]> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/rate-limiters`)
    )

    return await fetch(req)
      .then(ok)
      .then(toJSON) as string[]
  }

  async getRateLimiter(
    rateLimiterId: string
  , options: IGeyserClientRequestOptions = {}
  ): Promise<IRateLimiterConfig | null> {
    const req = get(
      ...this.getCommonTransformers(options)
    , appendPathname(`/rate-limiters/${rateLimiterId}`)
    )

    try {
      return await fetch(req)
        .then(ok)
        .then(toJSON) as IRateLimiterConfig
    } catch (e) {
      if (e instanceof NotFound) return null

      throw e
    }
  }

  async setRateLimiter(
    rateLimiterId: string
  , config: IRateLimiterConfig
  , options: IGeyserClientRequestOptions = {}
  ): Promise<void> {
    const req = put(
      ...this.getCommonTransformers(options)
    , appendPathname(`/rate-limiters/${rateLimiterId}`)
    , json(config)
    )

    await fetch(req).then(ok)
  }

  async removeRateLimiter(
    rateLimiterId: string
  , options: IGeyserClientRequestOptions = {}
  ): Promise<void> {
    const req = del(
      ...this.getCommonTransformers(options)
    , appendPathname(`/rate-limiters/${rateLimiterId}`)
    )

    await fetch(req).then(ok)
  }

  /**
   * 重置速率限制器的状态.
   * 
   * @throws {RateLimiterNotFound}
   */
  async resetRateLimiter(
    rateLimiterId: string
  , options: IGeyserClientRequestOptions = {}
  ): Promise<void> {
    const req = post(
      ...this.getCommonTransformers(options)
    , appendPathname(`/rate-limiters/${rateLimiterId}/reset`)
    )

    try {
      await fetch(req).then(ok)
    } catch (e) {
      if (e instanceof NotFound) throw new RateLimiterNotFound(e.message)

      throw e
    }
  }

  /**
   * @throws {RateLimiterNotFound}
   */
  async acquireToken(
    rateLimiterId: string
  , options: IGeyserClientRequestOptions = {}
  ): Promise<void> {
    const req = post(
      ...this.getCommonTransformers(options)
    , appendPathname(`/rate-limiters/${rateLimiterId}/acquire`)
    )

    try {
      await fetch(req).then(ok)
    } catch (e) {
      if (e instanceof NotFound) throw new RateLimiterNotFound(e.message)

      throw e
    }
  }

  private getCommonTransformers(
    options: IGeyserClientRequestOptions
  ): Array<IRequestOptionsTransformer | Falsy> {
    const auth = this.options.basicAuth

    return [
      url(this.options.server)
    , auth && basicAuth(auth.username, auth.password)
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , (options.keepalive ?? this.options.keepalive) && keepalive()
    , header('Accept-Version', expectedVersion)
    ]
  }
}
