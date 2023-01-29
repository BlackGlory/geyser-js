import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badAuth } from '@test/utils.js'

export const server = setupServer(
  rest.delete('/admin/geyser/:namespace/cycle', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
