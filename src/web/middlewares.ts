import { RequestHandler } from 'express'

export const requireAuth: RequestHandler = (req, res, next) => {
  if (req.user) {
    next()
    return
  }
  res.status(401).json({ message: 'Unauthorized' })
}
