import { fetch } from 'extra-fetch'
import { get } from 'extra-request'
import { url, pathname, searchParams, signal, keepalive } from 'extra-request/lib/es2018/transformers'
import { ok } from 'extra-response'

export interface IGeyserClientOptions {
  server: string
  token?: string
  keepalive?: boolean
}

export interface IGeyserClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
}

export class GeyserClient {
  constructor(private options: IGeyserClientOptions) {}

  async acquire(
    id: string
  , options: IGeyserClientRequestOptions = {}
  ): Promise<void> {
    const token = options.token ?? this.options.token

    const req = get(
      url(this.options.server)
    , pathname(`geyser/${id}`)
    , token && searchParams({ token })
    , options.signal && signal(options.signal)
    , keepalive(options.keepalive ?? this.options.keepalive)
    )

    await fetch(req).then(ok)
  }
}
