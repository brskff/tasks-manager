const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const schema = require('./schema/schema')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

const gqlServer = new ApolloServer({
    schema,
    graphiql: true
})

app.use(express.json({extended: true}))

const PORT = config.get('port') || 5000

async function start() {
    try {
        // await mongoose.connect(config.get('mongoUri'), {
        //     useNewUrlParser: true,
        //     useUnifiedTopology:true,
        //     useCreateIndex: true
        // })
        await gqlServer.start()
        gqlServer.applyMiddleware({app})
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()