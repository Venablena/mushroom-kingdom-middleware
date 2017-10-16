const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')

//morgan logs info
app.use(morgan('dev'))

const party = [
  {id: 1, name: "Yoshi" },
  {id: 2, name: "Mario" },
  {id: 3, name: "Luigi" }
]

//respond with all chracters in a party
app.get('/party', (req,res)=>{
  res.json(party)
})

//respond with a specific character
app.get('/party/:id', (req,res)=>{
  const id = Number(req.params.id)
  const result = party.find(partier => partier.id === id)
  //const result = party.filter(partier => partier.id === id)[0]
  //const [result] = party.filter(partier => partier.id === id)
  //res.json(partier[0])
  res.json({result})
})

//this function is a middleware
app.get('/ping', (req, res)=>{
  res.json({message: 'pong!'})
})

app.get('/hello', (req, res)=>{
  res.json({message: 'hello'})
})

app.get('/hello/friend', (req, res)=>{
  res.json({message: `Hi there friend`})
})

app.use((req, res, next)=>{
  console.log("I'm middleware!")
  next()
})

app.get('/hello/:name', (req, res)=>{
  console.log(req.params.name)
  res.json({message: `Hello ${req.params.name}!`})
})

app.use((req,res) => {
  res.status(404).json({error: {message:"Not found!"}})
})

const listener = () => console.log(`Application listening on port ${port}!`)
app.listen(port, listener)
