import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { badAuth } from '@test/utils'

export const server = setupServer(
  rest.get('/admin/geyser-with-tokens', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(200), ctx.json(['namespace']))
  })

, rest.get('/admin/geyser/:namespace/tokens', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(
      ctx.status(200)
    , ctx.json([
        {
          token: 'token'
        , acquire: true
        }
      ])
    )
  })

, rest.put('/admin/geyser/:namespace/tokens/:token/acquire', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })

, rest.delete('/admin/geyser/:namespace/tokens/:token/acquire', (req, res, ctx) => {
    if (badAuth(req)) return res(ctx.status(401))

    return res(ctx.status(204))
  })
)
