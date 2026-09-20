import { createRPCClient } from '@utils/rpc-client.js'
import { ClientProxy } from 'delight-rpc'
import { isAbortSignal, raceAbortSignals, timeoutSignal } from 'extra-abort'
import { expectedVersion, IAPI, IRateLimiterConfig } from './contract.js'
export { IRateLimiterConfig, RateLimiterNotFound } from './contract.js'

export interface IGeyserClientOptions {
  server: string

  basicAuth?: {
    username: string
    password: string
  }
  timeout?: number
  retryIntervalForReconnection?: number
}

export interface IGeyserClientRequestOptions {
  signal?: AbortSignal
  timeout?: number | false
}

export class GeyserClient {
  static async create(options: IGeyserClientOptions): Promise<GeyserClient> {
    const { client, close } = await createRPCClient<IAPI>({
      url: options.server
    , retryIntervalForReconnection: options.retryIntervalForReconnection
    , timeoutForConnection: options.timeout
    , basicAuth: options.basicAuth
    , expectedVersion
    })

    return new GeyserClient(client, close, options.timeout)
  }

  private constructor(
    private client: ClientProxy<IAPI>
  , private closeClient: () => Promise<void>
  , private timeout?: number
  ) {}

  async close(): Promise<void> {
    await this.closeClient()
  }

  async getAllRateLimiterIds(
    signalOrOptions?: AbortSignal | IGeyserClientRequestOptions
  ): Promise<string[]> {
    return await this.client.getAllRateLimiterIds(
      this.createSignal(signalOrOptions)
    )
  }

  async getRateLimiter(
    rateLimiterId: string
  , signalOrOptions?: AbortSignal | IGeyserClientRequestOptions
  ): Promise<IRateLimiterConfig | null> {
    return await this.client.getRateLimiter(
      rateLimiterId
    , this.createSignal(signalOrOptions)
    )
  }

  async setRateLimiter(
    rateLimiterId: string
  , config: IRateLimiterConfig
  , signalOrOptions?: AbortSignal | IGeyserClientRequestOptions
  ): Promise<void> {
    await this.client.setRateLimiter(
      rateLimiterId
    , config
    , this.createSignal(signalOrOptions)
    )
  }

  async removeRateLimiter(
    rateLimiterId: string
  , signalOrOptions?: AbortSignal | IGeyserClientRequestOptions
  ): Promise<void> {
    await this.client.removeRateLimiter(
      rateLimiterId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * 重置速率限制器的状态.
   * 
   * @throws {RateLimiterNotFound}
   */
  async resetRateLimiter(
    rateLimiterId: string
  , signalOrOptions?: AbortSignal | IGeyserClientRequestOptions
  ): Promise<void> {
    await this.client.resetRateLimiter(
      rateLimiterId
    , this.createSignal(signalOrOptions)
    )
  }

  /**
   * @throws {RateLimiterNotFound}
   */
  async acquireToken(
    rateLimiterId: string
  , signalOrOptions?: AbortSignal | IGeyserClientRequestOptions
  ): Promise<void> {
    await this.client.acquireToken(
      rateLimiterId
    , this.createSignal(signalOrOptions)
    )
  }

  private createSignal(
    signalOrOptions: AbortSignal | IGeyserClientRequestOptions = {}
  ): AbortSignal {
    const options: IGeyserClientRequestOptions = isAbortSignal(signalOrOptions)
                                               ? { signal: signalOrOptions }
                                               : signalOrOptions

    return raceAbortSignals([
      options.signal
    , options.timeout !== false && (
        (options.timeout && timeoutSignal(options.timeout)) ??
        (this.timeout && timeoutSignal(this.timeout))
      )
    ])
  }
}
