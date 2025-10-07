import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)

/******************** ROTAS ********************/

import categoriasRouter from './routes/categorias.js'
app.use('/categorias', categoriasRouter)

import clientesRouter from './routes/clientes.js'
app.use('/clientes', clientesRouter)

import fornecedorRouter from './routes/fornecedor.js'  
app.use('/fornecedores', fornecedorRouter)  // Rota plural (mais comum)

import pedidosRouter from './routes/pedido.js'
app.use('/pedidos', pedidosRouter)

export default app
