import { ConfigurationManager } from './configuration-manager'
import { CycleManager } from './cycle-manager'
import { BlacklistManager } from './blacklist-manager'
import { WhitelistManager } from './whitelist-manager'
import { TokenPolicyManager } from './token-policy-manager'
import { TokenManager } from './token-manager'

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
