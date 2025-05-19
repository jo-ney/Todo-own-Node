const {MongoClient, ObjectId, ServerApiVersion} = require('mongodb')

let database

const uri = "mongodb+srv://joney:1254@cluster0.59zlyxl.mongodb.net/TodoOwn?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function getDatabase(){
    // const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
    await client.connect()
    database = await client.db()

    if(!database)
        console.log('Database not connected!')

    return database
}

module.exports = {
    getDatabase, ObjectId
}
