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
GeyserClient#acquire(namespace: string, options?: IGeyserClientRequestOptions): Promise<void>
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

##### getNamespaces

```ts
GeyserManager#Configuration.getNamespaces(
  options?: IGeyserManagerRequestOptions
): Promise<string[]>
```

##### get

```ts
GeyserManager#Configuration.get(
  namespace: string
, options?: IGeyserManagerRequestOptions
): Promise<{
  duration: number | null
  limit: number | null
}>
```

##### setDuration

```ts
GeyserManager#Configuration.setDuration(
  namespace: string
, val: number
, options?: IGeyserManagerRequestOptions
): Promise<void>
```

##### removeDuration

```ts
GeyserManager#Configuration.removeDuration(
  namespace: string
, options?: IGeyserManagerRequestOptions
): Promise<void>
```

##### setLimit

```ts
GeyserManager#Configuration.setLimit(
  namespace: string
, val: number
, options?: IGeyserManagerRequestOptions
): Promise<void>
```

##### removeLimit

```ts
GeyserManager#Configuration.removeLimit(
  namespace: string
, options?: IGeyserManagerRequestOptions
): Promise<void>
```

#### Blacklist

##### getNamespaces

```ts
GeyserManager#Blacklist.getNamespaces(
  options?: IGeyserManagerRequestOptions
): Promise<string[]>
```

##### add

```ts
GeyserManager#Blacklist.add(
  namespace: string
, options?: IGeyserManagerRequestOptions
): Promise<void>
```

##### remove

```ts
GeyserManager#Blacklist.remove(
  namespace: string
, options?: IGeyserManagerRequestOptions
): Promise<void>
```

#### Whitelist

##### getNamespaces

```ts
GeyserManager#Whitelist.getNamespaces(
  options?: IGeyserManagerRequestOptions
): Promise<string[]>
```

##### add

```ts
GeyserManager#Whitelist.add(
  namespace: string
, options?: IGeyserManagerRequestOptions
): Promise<void>
```

##### remove

```ts
GeyserManager#Whitelist.remove(
  namespace: string
, options?: IGeyserManagerRequestOptions
): Promise<void>
```

#### TokenPolicy

##### getNamespaces

```ts
GeyserManager#TokenPolicy.getNamespaces(
  options?: IGeyserManagerRequestOptions
): Promise<string[]>
```

##### get

```ts
GeyserManager#TokenPolicy.get(
  namespace: string
, options?: IGeyserManagerRequestOptions
): Promise<{
  acquireTokenRequired: boolean | null
}>
```

##### setAcquireTokenRequired

```ts
GeyserManager#TokenPolicy.setAcquireTokenRequired(
  namespace: string
, val: boolean
, options?: IGeyserManagerRequestOptions
): Promise<void>
```

##### removeAcquireTokenRequired

```ts
GeyserManager#TokenPolicy.removeAcquireTokenRequired(
  namespace: string
, options?: IGeyserManagerRequestOptions
): Promise<void>
```

#### Token

##### getNamespaces

```ts
GeyserManager#Token.getNamespaces(
  options?: IGeyserManagerRequestOptions
): Promise<string[]>
```

##### getTokens

```ts
GeyserManager#Token.getTokens(
  namespace: string
, options?: IGeyserManagerRequestOptions
): Promise<Array<{
  acquire: boolean
}>>
```

##### addAcquireToken

```ts
GeyserManager#Token.addAcquireToken(
  namespace: string
, token: string
, options?: IGeyserManagerRequestOptions
): Promise<void>
```

##### removeAcquireToken

```ts
GeyserManager#Token.removeAcquireToken(
  namespace: string
, token: string
, options?: IGeyserManagerRequestOptions
): Promise<void>
```
