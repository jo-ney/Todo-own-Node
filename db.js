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

const uri = 'mongodb+srv://joney:1245@cluster0.5cxgcfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
let database
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
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
      database = await client.db("TodoOwn")
      console.log('✅ Connected to MongoDB Atlas')
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      return database
    }  catch (err) {
        console.error('❌ MongoDB connection failed:', err);
      }
  }

module.exports = {
    getDatabase, ObjectId
}