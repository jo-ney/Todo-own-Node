const {MongoClient, ObjectId, ServerApiVersion} = require('mongodb')

let database
const url = 'mongodb+srv://joney:1245@cluster0.5cxgcfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
async function getDatabase(){
    // const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
    // const client = await MongoClient.connect('mongodb+srv://joney:1245@cluster0.5cxgcfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    const client0 = new MongoClient(url, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      })
    
      const client = await client0.connect()
    database = await client.db('TodoOwn')

    if(!database)
        console.log('Database not connected!')

    return database
}

module.exports = {
    getDatabase, ObjectId
}