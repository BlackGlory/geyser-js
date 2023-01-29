import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badToken } from './utils.js'

export const server = setupServer(
  rest.get('/geyser/:namespace', (req, res, ctx) => {
    if (badToken(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
