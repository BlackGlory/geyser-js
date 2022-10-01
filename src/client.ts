import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname, searchParams, signal, keepalive, basicAuth, header }
  from 'extra-request/transformers/index.js'
import { ok } from 'extra-response'
import { timeoutSignal, raceAbortSignals } from 'extra-abort'
import { expectedVersion } from './utils'

export { HTTPClientError } from '@blackglory/http-status'

export interface IGeyserClientOptions {
  server: string
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

export interface IGeyserClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

export class GeyserClient {
  constructor(private options: IGeyserClientOptions) {}

  /**
   * @throws {AbortError}
   */
  async acquire(
    namespace: string
  , options: IGeyserClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token
    const auth = this.options.basicAuth

    const req = get(
      url(this.options.server)
    , pathname(`geyser/${namespace}`)
    , auth && basicAuth(auth.username, auth.password)
    , token && searchParams({ token })
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , (options.keepalive ?? this.options.keepalive) && keepalive()
    , header('Accept-Version', expectedVersion)
    )

    await fetch(req).then(ok)
  }
}
