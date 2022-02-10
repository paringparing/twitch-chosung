import { Router } from 'express'
import passport from 'passport'
import { requireAuth } from './middlewares'

const router = Router()

router.get(
  '/login',
  passport.authenticate('twitch', {
    successRedirect: '/',
  })
)

router.get('/logout', requireAuth, (req, res) => {
  req.logout()
  res.send('ok')
})

export default router
