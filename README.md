# geyser-js
## Install
```sh
npm install --save @blackglory/geyser-js
# or
yarn add @blackglory/geyser-js
```

## API
### GeyserClient
```ts
interface IRateLimiterConfig extends JSONObject {
  duration: number | null
  limit: number | null
}

interface IGeyserClientOptions {
  server: string
  timeout?: number
  retryIntervalForReconnection?: number
}

class GeyserClient {
  static create(options: IGeyserClientOptions): Promise<GeyserClient>

  close(): Promise<void>

  getAllRateLimiterIds(timeout?: number): Promise<string[]>

  getRateLimiter(rateLimiterId: string, timeout?: number): Promise<IRateLimiterConfig | null>

  setRateLimiter(
    rateLimiterId: string
  , config: IRateLimiterConfig
  , timeout?: number
  ): Promise<void>

  removeRateLimiter(rateLimiterId: string, timeout?: number): Promise<void>

  /**
   * 重置速率限制器的状态.
   * 
   * @throws {RateLimiterNotFound}
   */
  resetRateLimiter(rateLimiterId: string, timeout?: number): Promise<void>

  /**
   * @throws {RateLimiterNotFound}
   */
  acquireToken(rateLimiterId: string, timeout?: number): Promise<void>
}

/**
 * 速率限制器在未经配置的情况下, 相当于不存在.
 */
class RateLimiterNotFound extends CustomError {}
```
