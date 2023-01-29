import { ConfigurationManager } from './configuration-manager.js'
import { CycleManager } from './cycle-manager.js'
import { BlacklistManager } from './blacklist-manager.js'
import { WhitelistManager } from './whitelist-manager.js'
import { TokenPolicyManager } from './token-policy-manager.js'
import { TokenManager } from './token-manager.js'

export interface IGeyserManagerOptions {
  server: string
  adminPassword: string
  keepalive?: boolean
  timeout?: number
}

export class GeyserManager {
  constructor(private options: IGeyserManagerOptions) {}

  Configuration = new ConfigurationManager(this.options)
  Cycle = new CycleManager(this.options)
  Blacklist = new BlacklistManager(this.options)
  Whitelist = new WhitelistManager(this.options)
  TokenPolicy = new TokenPolicyManager(this.options)
  Token = new TokenManager(this.options)
}
