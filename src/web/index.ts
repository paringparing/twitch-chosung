import express from 'express'
import path from 'path'
import auth from './auth'
import passport from 'passport'
import session from 'express-session'
import {
  Strategy as TwitchStrategy,
  VerifyFunction,
} from 'passport-twitch-latest'
import { prisma } from '../db'
import * as Prisma from '@prisma/client'
import user from './user'

declare global {
  namespace Express {
    interface User extends Prisma.User {}
  }
}

passport.use(
  new TwitchStrategy(
    {
      clientID: process.env.OAUTH2_CLIENT_ID!,
      clientSecret: process.env.OAUTH2_CLIENT_SECRET!,
      callbackURL: process.env.OAUTH2_CLIENT_CALLBACK!,
      scope: ['user:read:email'],
    },
    (async (accessToken, refreshToken, profile, done) => {
      const u = await prisma.user.upsert({
        create: {
          id: profile.id,
          channel: profile.login,
          avatar: profile.profile_image_url,
        },
        where: {
          id: profile.id,
        },
        update: {
          channel: profile.login,
          avatar: profile.profile_image_url,
        },
      })

      done(null, u)
    }) as VerifyFunction
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) return done(new Error('User not found'), null)
    done(null, user)
  } catch (e) {
    done(e, null)
  }
})

const app = express()

const clientDir = path.join(process.cwd(), 'dist/client')

app.use(express.static(clientDir))

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET!,
  })
)

app.use(passport.initialize())

app.use(passport.session())

app.use('/auth', auth)

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next()
  }
  res.sendFile(path.join(clientDir, 'app.html'))
})

app.use('/api/user', user)

export default app
