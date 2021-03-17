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
new GeyserClient({
  server: string
, token?: string
, keepalive?: boolean
})
```

```ts
interface IGeyserClientRequestOptions {
  signal?: AbortSignal
  token?: string
  keepalive?: boolean
}
```

#### acquire

```ts
GeyserClient#acquire(id: string, options?: IGeyserClientRequestOptions): Promise<void>
```

### GeyserManager

```ts
new GeyserManager({
  server: string
, adminPassword: string
})
```

```ts
interface IGeyserManagerRequestOptions {
  signal?: AbortSignal
}
```

#### Configuration

##### getIds

```ts
GeyserManager#Configuration.getIds(options?: IGeyserManagerRequestOptions): Promise<string[]>
```

##### get

```ts
GeyserManager#Configuration.get(id: string, options?: IGeyserManagerRequestOptions): Promise<{
  duration: number | null
  limit: number | null
}>
```

##### setDuration

```ts
GeyserManager#Configuration.setDuration(id: string, val: number, options?: IGeyserManagerRequestOptions): Promise<void>
```

##### removeDuration

```ts
GeyserManager#Configuration.removeDuration(id: string, options?: IGeyserManagerRequestOptions): Promise<void>
```

##### setLimit

```ts
GeyserManager#Configuration.setLimit(id: string, val: number, options?: IGeyserManagerRequestOptions): Promise<void>
```

##### removeLimit

```ts
GeyserManager#Configuration.removeLimit(id: string, options?: IGeyserManagerRequestOptions): Promise<void>
```

#### Blacklist

##### getIds

```ts
GeyserManager#Blacklist.getIds(options?: IGeyserManagerRequestOptions): Promise<string[]>
```

##### add

```ts
GeyserManager#Blacklist.add(id: string, options?: IGeyserManagerRequestOptions): Promise<void>
```

##### remove

```ts
GeyserManager#Blacklist.remove(id: string, options?: IGeyserManagerRequestOptions): Promise<void>
```

#### Whitelist

##### getIds

```ts
GeyserManager#Whitelist.getIds(options?: IGeyserManagerRequestOptions): Promise<string[]>
```

##### add

```ts
GeyserManager#Whitelist.add(id: string, options?: IGeyserManagerRequestOptions): Promise<void>
```

##### remove

```ts
GeyserManager#Whitelist.remove(id: string, options?: IGeyserManagerRequestOptions): Promise<void>
```

#### TokenPolicy

##### getIds

```ts
GeyserManager#TokenPolicy.getIds(options?: IGeyserManagerRequestOptions): Promise<string[]>
```

##### get

```ts
GeyserManager#TokenPolicy.get(id: string, options?: IGeyserManagerRequestOptions): Promise<{
  acquireTokenRequired: boolean | null
}>
```

##### setAcquireTokenRequired

```ts
GeyserManager#TokenPolicy.setAcquireTokenRequired(id: string, val: boolean, options?: IGeyserManagerRequestOptions): Promise<void>
```

##### removeAcquireTokenRequired

```ts
GeyserManager#TokenPolicy.removeAcquireTokenRequired(id: string, options?: IGeyserManagerRequestOptions): Promise<void>
```

#### Token

##### getIds

```ts
GeyserManager#Token.getIds(options?: IGeyserManagerRequestOptions): Promise<string[]>
```

##### getTokens

```ts
GeyserManager#Token.getTokens(id: string, options?: IGeyserManagerRequestOptions): Promise<Array<{
  acquire: boolean
}>>
```

##### addAcquireToken

```ts
GeyserManager#Token.addAcquireToken(id: string, token: string, options?: IGeyserManagerRequestOptions): Promise<void>
```

##### removeAcquireToken

```ts
GeyserManager#Token.removeAcquireToken(id: string, token: string, options?: IGeyserManagerRequestOptions): Promise<void>
```
