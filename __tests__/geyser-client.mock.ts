import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const server = setupServer(
  rest.get('/rate-limiters', (req, res, ctx) => {
    return res(
      ctx.status(204)
    , ctx.json([])
    )
  })

, rest.get('/rate-limiters/:id', (req, res, ctx) => {
    switch (req.params.id) {
      case 'found': {
        return res(
          ctx.status(200)
        , ctx.json({
            duration: null
          , limit: null
          })
        )
      }
      default: {
        return res(
          ctx.status(404)
        )
      }
    }
  })

, rest.put('/rate-limiters/:id', async (req, res, ctx) => {
    expect(await req.json()).toStrictEqual({
      duration: null
    , limit: null
    })

    return res(ctx.status(204))
  })

, rest.delete('/rate-limiters/:id', (req, res, ctx) => {
    return res(ctx.status(204))
  })

, rest.post('/rate-limiters/:id/reset', (req, res, ctx) => {
    switch (req.params.id) {
      case 'found': return res(ctx.status(204))
      default: return res(ctx.status(404))
    }
  })

, rest.post('/rate-limiters/:id/acquire', (req, res, ctx) => {
    switch (req.params.id) {
      case 'found': return res(ctx.status(204))
      default: return res(ctx.status(404))
    }
  })
)
