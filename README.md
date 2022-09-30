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
interface IGeyserClientOptions {
  server: string
  token?: string
  basicAuth?: {
    username: string
    password: string
  }
  keepalive?: boolean
  timeout?: number
}

interface IGeyserClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
  timeout?: number | false
}

class GeyserClient {
  constructor(options: IGeyserClientOptions)

  acquire(
    namespace: string
  , options: IGeyserClientRequestOptions = {}
  ): Promise<void>
}
```

### GeyserManager
```ts
interface IGeyserManagerOptions {
  server: string
  adminPassword: string
  keepalive?: boolean
  timeout?: number
}

class GeyserManager {
  constructor(options: IGeyserManagerOptions)

  Configuration: ConfigurationClient
  Cycle: CycleClient
  Blacklist: BlacklistClient
  Whitelist: WhitelistClient
  TokenPolicy: TokenPolicyClient
  Token: TokenClient
}
```

#### ConfigurationClient
```ts
interface IConfiguration {
  duration: number | null
  limit: number | null
}

class ConfigurationClient {
  getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]>
  get(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<IConfiguration>
  setDuration(
    namespace: string
  , val: number
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void>
  removeDuration(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void>
  setLimit(
    namespace: string
  , val: number
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void>
  removeLimit(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void>
}
```

#### CycleClient
```ts
class CycleClient {
  resetCycle(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void>
}
```

#### BlacklistClient
```ts
class BlacklistClient {
  getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]>
  add(namespace: string, options: IGeyserManagerRequestOptions = {}): Promise<void>
  remove(namespace: string, options: IGeyserManagerRequestOptions = {}): Promise<void>
}
```

#### WhitelistClient
```ts
class WhitelistClient {
  getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]>
  add(namespace: string, options: IGeyserManagerRequestOptions = {}): Promise<void>
  remove(namespace: string, options: IGeyserManagerRequestOptions = {}): Promise<void>
}
```

#### TokenPolicyClient
```ts
interface ITokenPolicy {
  acquireTokenRequired: boolean | null
}

class TokenPolicyClient {
  getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]>
  get(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<ITokenPolicy>
  setAcquireTokenRequired(
    namespace: string
  , val: boolean
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void>
  removeAcquireTokenRequired(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void>
}
```

#### TokenClient
```ts
interface ITokenInfo {
  token: string
  acquire: boolean
}

class TokenClient {
  getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]>
  getTokens(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<ITokenInfo[]>
  addAcquireToken(
    namespace: string
  , token: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void>
  removeAcquireToken(
    namespace: string
  , token: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void>
}
```
