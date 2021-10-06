import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname, searchParams, signal, keepalive }
  from 'extra-request/transformers/index.js'
import { ok } from 'extra-response'
import { timeoutSignal, raceAbortSignals } from 'extra-promise'

export { HTTPClientError } from '@blackglory/http-status'

export interface IGeyserClientOptions {
  server: string
  token?: string
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

    const req = get(
      url(this.options.server)
    , pathname(`geyser/${namespace}`)
    , token && searchParams({ token })
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }
}
