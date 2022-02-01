import { ConfigurationClient } from './configuration-client'
import { CycleClient } from './cycle-client'
import { BlacklistClient } from './blacklist-client'
import { WhitelistClient } from './whitelist-client'
import { TokenPolicyClient } from './token-policy-client'
import { TokenClient } from './token-client'

export interface IGeyserManagerOptions {
  server: string
  adminPassword: string
  keepalive?: boolean
  timeout?: number
}

export class GeyserManager {
  constructor(private options: IGeyserManagerOptions) {}

  Configuration = new ConfigurationClient(this.options)
  Cycle = new CycleClient(this.options)
  Blacklist = new BlacklistClient(this.options)
  Whitelist = new WhitelistClient(this.options)
  TokenPolicy = new TokenPolicyClient(this.options)
  Token = new TokenClient(this.options)
}
