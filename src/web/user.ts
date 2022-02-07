import { Router } from 'express'
import { requireAuth } from './middlewares'

const router = Router()

router.use(requireAuth)

router.get('/', (req, res) => {
  res.json(req.user)
})

export default router
