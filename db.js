const {MongoClient, ObjectId, ServerApiVersion} = require('mongodb')

// let database

// async function getDatabase(){
//     const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
//     database = await client.db('TodoOwn')

//     if(!database)
//         console.log('Database not connected!')

//     return database
// }

// module.exports = {
//     getDatabase, ObjectId
// }

const url = 'mongodb+srv://joney:1245@cluster0.5cxgcfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function getDatabase() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      const db = await client.db("TodoOwn").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      return db
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

module.exports = {
    getDatabase, ObjectId
}