import { createRPCClient } from '@utils/rpc-client.js'
import { ClientProxy } from 'delight-rpc'
import { timeoutSignal, withAbortSignal } from 'extra-abort'
import { IAPI, IRateLimiterConfig } from './contract.js'
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

  async getAllRateLimiterIds(timeout?: number): Promise<string[]> {
    return await this.withTimeout(
      () => this.client.getAllRateLimiterIds()
    , timeout ?? this.timeout
    )
  }

  async getRateLimiter(
    rateLimiterId: string
  , timeout?: number
  ): Promise<IRateLimiterConfig | null> {
    return await this.withTimeout(
      () => this.client.getRateLimiter(rateLimiterId)
    , timeout ?? this.timeout
    )
  }

  async setRateLimiter(
    rateLimiterId: string
  , config: IRateLimiterConfig
  , timeout?: number
  ): Promise<void> {
    await this.withTimeout(
      () => this.client.setRateLimiter(rateLimiterId, config)
    , timeout ?? this.timeout
    )
  }

  async removeRateLimiter(rateLimiterId: string, timeout?: number): Promise<void> {
    await this.withTimeout(
      () => this.client.removeRateLimiter(rateLimiterId)
    , timeout ?? this.timeout
    )
  }

  /**
   * 重置速率限制器的状态.
   * 
   * @throws {RateLimiterNotFound}
   */
  async resetRateLimiter(rateLimiterId: string, timeout?: number): Promise<void> {
    await this.withTimeout(
      () => this.client.removeRateLimiter(rateLimiterId)
    , timeout ?? this.timeout
    )
  }

  /**
   * @throws {RateLimiterNotFound}
   */
  async acquireToken(rateLimiterId: string, timeout?: number): Promise<void> {
    await this.withTimeout(
      () => this.client.acquireToken(rateLimiterId)
    , timeout ?? this.timeout
    )
  }

  private async withTimeout<T>(
    fn: () => PromiseLike<T>
  , timeout: number | undefined = this.timeout
  ): Promise<T> {
    if (timeout) {
      return await withAbortSignal(timeoutSignal(timeout), fn)
    } else {
      return await fn()
    }
  }
}
