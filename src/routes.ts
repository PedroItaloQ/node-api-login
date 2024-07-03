import { Router } from 'express'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

routes.use(authMiddleware)

export default routes
