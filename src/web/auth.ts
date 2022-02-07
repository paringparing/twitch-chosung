import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get(
  '/login',
  passport.authenticate('twitch', {
    successRedirect: '/',
  })
)

export default router
