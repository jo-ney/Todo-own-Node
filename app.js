const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())

app.use(cors())

const db = require('./db')
db.connectToDatabase()
const ObjectId = db.ObjectId

// //read
// app.get('/todoOwn', async(req,res)=>{
//     try{
//         let database = await db.getDatabase()
//         let collection = await database.collection("list")
//         let cursor = collection.find({})
//         let list = await cursor.toArray()
//         res.json(list)
//     } catch(error){
//         console.log(error)
//         res.status(500).json({message: error.message})
//     }
// })


// ✅ Wrap everything inside async startServer
async function startServer() {
    try {
      await db.connectToDatabase(); // Wait for DB to connect
  
      // ✅ Routes go here only AFTER DB connection
      // Read
      app.get('/todoOwn', async (req, res) => {
        try {
          let database = db.getDatabase();
          let collection = database.collection('list');
          let list = await collection.find({}).toArray();
          res.json(list);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: error.message });
        }
      });
    } catch(err){
        console.error('kiiih')
    }
}



//create
app.post('/addTodo', async(req, res)=>{
    try{
        let database = await db.getDatabase()
        let collection = await database.collection("list")
        let todo = {title: req.body.title, description: req.body.description}
        await collection.insertOne(todo)
        res.status(201).json({message: 'Todo List Added!!'})
    } catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }

})
//delete
app.delete('/deleteTodo/:id', async(req,res)=>{
    try{
        const id = req.params.id
        let database = await db.getDatabase()
        let collection = await database.collection("list")
        await collection.deleteOne({_id: new ObjectId(id)})
        res.status(200).json({message: 'List Deleted!'})
    } catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
})
//update
app.put('/updateTodo/:id', async(req,res)=>{
    const id = req.params.id
    try{
        let database = await db.getDatabase()
        let collection = await database.collection("list")
        let todo = {title: req.body.editTitle, description: req.body.editDescription}
        let updatedTodo = await collection.updateOne({_id: new ObjectId(id)},{$set: todo})
        res.status(200).json({message: 'List Updated'})
    } catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
    
})
startServer();
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})