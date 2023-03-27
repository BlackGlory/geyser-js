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
interface IRateLimiterConfiguration extends JSONObject {
  duration: number | null
  limit: number | null
}

interface IGeyserClientOptions {
  server: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

interface IGeyserClientRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

class RateLimiterNotFound extends CustomError {}

class GeyserClient {
  constructor(options: IGeyserClientOptions)

  getAllRateLimiterIds(options?: IGeyserClientRequestOptions): Promise<string[]>

  getRateLimiter(
    rateLimiterId: string
  , options?: IGeyserClientRequestOptions
  ): Promise<IRateLimiterConfiguration | null>

  setRateLimiter(
    rateLimiterId: string
  , config: IRateLimiterConfiguration
  , options?: IGeyserClientRequestOptions
  ): Promise<void>

  removeRateLimiter(
    rateLimiterId: string
  , options?: IGeyserClientRequestOptions
  ): Promise<void>

  /**
   * @throws {RateLimiterNotFound}
   */
  resetRateLimiter(
    rateLimiterId: string
  , options?: IGeyserClientRequestOptions
  ): Promise<void>

  /**
   * @throws {RateLimiterNotFound}
   */
  acquireToken(rateLimiterId: string, options?: IGeyserClientRequestOptions): Promise<void>
}
```
