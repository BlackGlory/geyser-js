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

  basicAuth?: {
    username: string
    password: string
  }
  timeout?: number
  retryIntervalForReconnection?: number
}

interface IGeyserClientRequestOptions {
  signal?: AbortSignal
  timeout?: number | false
}

class GeyserClient {
  static create(options: IGeyserClientOptions): Promise<GeyserClient>

  close(): Promise<void>

  getAllRateLimiterIds(
    signalOrOptions?: AbortSignal | IGeyserClientRequestOptions
  ): Promise<string[]>

  getRateLimiter(
    rateLimiterId: string
  , signalOrOptions?: AbortSignal | IGeyserClientRequestOptions
  ): Promise<IRateLimiterConfig | null>

  setRateLimiter(
    rateLimiterId: string
  , config: IRateLimiterConfig
  , signalOrOptions?: AbortSignal | IGeyserClientRequestOptions
  ): Promise<void>

  removeRateLimiter(
    rateLimiterId: string
  , signalOrOptions?: AbortSignal | IGeyserClientRequestOptions
  ): Promise<void>

  /**
   * 重置速率限制器的状态.
   * 
   * @throws {RateLimiterNotFound}
   */
  resetRateLimiter(
    rateLimiterId: string
  , signalOrOptions?: AbortSignal | IGeyserClientRequestOptions
  ): Promise<void>

  /**
   * @throws {RateLimiterNotFound}
   */
  acquireToken(
    rateLimiterId: string
  , signalOrOptions?: AbortSignal | IGeyserClientRequestOptions
  ): Promise<void>
}

/**
 * 速率限制器在未经配置的情况下, 相当于不存在.
 */
class RateLimiterNotFound extends CustomError {}
```
