import { IHTTPOptionsTransformer } from 'extra-request'
import { url, signal, keepalive, bearerAuth } from 'extra-request/lib/es2018/transformers'
import { timeoutSignal, raceAbortSignals } from 'extra-promise'
import type { IGeyserManagerOptions } from './geyser-manager'

export interface IGeyserManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

export class GeyserManagerBase {
  constructor(private options: IGeyserManagerOptions) {}

  protected getCommonTransformers(
    options: IGeyserManagerRequestOptions
  ): IHTTPOptionsTransformer[] {
    return [
      url(this.options.server)
    , bearerAuth(this.options.adminPassword)
    , signal(raceAbortSignals([
        options.signal
      , options.timeout !== false && (
          (options.timeout && timeoutSignal(options.timeout)) ??
          (this.options.timeout && timeoutSignal(this.options.timeout))
        )
      ]))
    , keepalive(options.keepalive ?? this.options.keepalive)
    ]
  }
}
