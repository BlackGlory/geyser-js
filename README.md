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
interface IGeyserManagerRequestOptions {
  signal?: AbortSignal
  keepalive?: boolean
  timeout?: number | false
}

interface IGeyserManagerOptions {
  server: string
  adminPassword: string
  keepalive?: boolean
  timeout?: number
}

class GeyserManager {
  constructor(options: IGeyserManagerOptions)

  Configuration: ConfigurationManager
  Cycle: CycleManager
  Blacklist: BlacklistManager
  Whitelist: WhitelistManager
  TokenPolicy: TokenPolicyManager
  Token: TokenManager
}
```

#### ConfigurationManager
```ts
interface IConfiguration {
  duration: number | null
  limit: number | null
}

class ConfigurationManager {
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

#### CycleManager
```ts
class CycleManager {
  resetCycle(
    namespace: string
  , options: IGeyserManagerRequestOptions = {}
  ): Promise<void>
}
```

#### BlacklistManager
```ts
class BlacklistManager {
  getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]>
  add(namespace: string, options: IGeyserManagerRequestOptions = {}): Promise<void>
  remove(namespace: string, options: IGeyserManagerRequestOptions = {}): Promise<void>
}
```

#### WhitelistManager
```ts
class WhitelistManager {
  getNamespaces(options: IGeyserManagerRequestOptions = {}): Promise<string[]>
  add(namespace: string, options: IGeyserManagerRequestOptions = {}): Promise<void>
  remove(namespace: string, options: IGeyserManagerRequestOptions = {}): Promise<void>
}
```

#### TokenPolicyManager
```ts
interface ITokenPolicy {
  acquireTokenRequired: boolean | null
}

class TokenPolicyManager {
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

#### TokenManager
```ts
interface ITokenInfo {
  token: string
  acquire: boolean
}

class TokenManager {
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
