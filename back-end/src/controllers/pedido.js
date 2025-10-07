import { includeRelations } from '../lib/utils.js'
import prisma from '../database/client.js'


const controller = {}   // Objeto vazio

// CREATE
controller.create = async function(req, res) {
  try {
    await prisma.pedido.create({ data: req.body })
    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

// RETRIEVE ALL
controller.retrieveAll = async function(req, res) {
  try {

    const include = includeRelations(req.query)

    // Manda buscar todas os pedidos cadastradas no BD
    const result = await prisma.pedido.findMany({
      include,
      orderBy: [ { num_pedido: 'asc' }]  // Ordem ASCendente
    })

    // Retorna os dados obtidos ao cliente com o status
    // HTTP 200: OK (implícito)
    res.send(result)
  }
  catch(error) {
    // Algo deu errado: exibe o erro no terminal
    console.error(error)

    // Envia o erro ao front-end, com código de erro
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}


// RETRIEVE ONE
controller.retrieveOne = async function(req, res) {
  try {

    const include = includeRelations(req.query)

    // Manda recuperar o documento no servidor de BD
    // usando como critério um id informado no parâmetro
    // da requisição
    const result = await prisma.pedido.findUnique({
      include,
      where: { id: req.params.id }
    })

    // Encontrou o docuemento ~> retorna HTTP 200: OK (implícito)
    if(result) res.send(result)
    // Não encontrou o documento ~> retorna HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    // Algo deu errado: exibe o erro no terminal
    console.error(error)

    // Envia o erro ao front-end, com código de erro
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}


// UPDATE
controller.update = async function(req, res) {
  try {
    await prisma.pedido.update({
      where: { id: req.params.id },
      data: req.body
    })
    // HTTP 204: No Content
    res.status(204).end()
  }
  catch(error) {
    console.error(error)
    // P2025: Objeto não encontrado no Prisma
    if(error?.code === 'P2025') {
      res.status(404).end()
    }
    else {
      res.status(500).send(error)
    }
  }
}

// DELETE
controller.delete = async function(req, res) {
  try {
    await prisma.pedido.delete({
      where: { id: req.params.id }
    })
    // HTTP 204: No Content
    res.status(204).end()
  }
  catch(error) {
    console.error(error)
    // P2025: Objeto não encontrado no Prisma
    if(error?.code === 'P2025') {
      res.status(404).end()
    }
    else {
      res.status(500).send(error)
    }
  }
}

export default controller