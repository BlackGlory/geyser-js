import { createRPCClient } from '@utils/rpc-client.js'
import { ClientProxy } from 'delight-rpc'
import { raceAbortSignals, timeoutSignal } from 'extra-abort'
import { IAPI, IRateLimiterConfig } from './contract.js'
import { isntUndefined } from '@blackglory/prelude'
export { IRateLimiterConfig, RateLimiterNotFound } from './contract.js'

export interface IGeyserClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

export class GeyserClient {
  static async create(options: IGeyserClientOptions): Promise<GeyserClient> {
    const { client, close } = await createRPCClient(
      options.server
    , options.retryIntervalForReconnection
    )
    return new GeyserClient(client, close, options.timeout)
  }

  private constructor(
    private client: ClientProxy<IAPI>
  , private closeClients: () => Promise<void>
  , private timeout?: number
  ) {}

  async close(): Promise<void> {
    await this.closeClients()
  }

  async getAllRateLimiterIds(signal?: AbortSignal): Promise<string[]> {
    return await this.client.getAllRateLimiterIds(this.withTimeout(signal))
  }

  async getRateLimiter(
    rateLimiterId: string
  , signal?: AbortSignal
  ): Promise<IRateLimiterConfig | null> {
    return await this.client.getRateLimiter(
      rateLimiterId
    , this.withTimeout(signal)
    )
  }

  async setRateLimiter(
    rateLimiterId: string
  , config: IRateLimiterConfig
  , signal?: AbortSignal
  ): Promise<void> {
    await this.client.setRateLimiter(
      rateLimiterId
    , config
    , this.withTimeout(signal)
    )
  }

  async removeRateLimiter(
    rateLimiterId: string
  , signal?: AbortSignal
  ): Promise<void> {
    await this.client.removeRateLimiter(rateLimiterId, this.withTimeout(signal))
  }

  /**
   * 重置速率限制器的状态.
   * 
   * @throws {RateLimiterNotFound}
   */
  async resetRateLimiter(
    rateLimiterId: string
  , signal?: AbortSignal
  ): Promise<void> {
    await this.client.removeRateLimiter(rateLimiterId, this.withTimeout(signal))
  }

  /**
   * @throws {RateLimiterNotFound}
   */
  async acquireToken(rateLimiterId: string, signal?: AbortSignal): Promise<void> {
    await this.client.acquireToken(rateLimiterId, this.withTimeout(signal))
  }

  private withTimeout(signal?: AbortSignal): AbortSignal {
    return raceAbortSignals([
      isntUndefined(this.timeout) && timeoutSignal(this.timeout)
    , signal
    ])
  }
}
