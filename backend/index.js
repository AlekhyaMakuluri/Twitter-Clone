const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
const uri = `mongodb+srv://admin:admin@twitter-clone.nvhzm.mongodb.net/?retryWrites=true&w=majority&appName=twitter-clone`;
const port = 5000;

const app = express()
app.use(express.json())

let corsOptions = {
  origin : "*",
 credentials: true,
 methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}
app.use(cors(corsOptions))

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const postCollection = client.db("twitter").collection("posts");
    const userCollection = client.db("twitter").collection("users");


    // get
    app.get('/user', async (req, res) => {
      const user = await userCollection.find().toArray();
      res.send(user);
    })
    app.get('/loggedInUser', async (req, res) => {
      const email = req.query.email;
      const user = await userCollection.find({ email: email }).toArray();
      res.send(user);
    })
    app.get('/post', async (req, res) => {
      const post = (await postCollection.find().toArray()).reverse();
      res.send(post);
    })
    app.get('/userPost', async (req, res) => {
      const email = req.query.email;
      const post = (await postCollection.find({ email: email }).toArray()).reverse();
      res.send(post);
    })

    // post
    app.post('/register', async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    app.post('/post', async (req, res) => {
      const post = req.body;
      const result = await postCollection.insertOne(post);
      res.send(result);
    })

    // patch
    app.patch('/userUpdates/:email', async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result)
    })


  } catch (error) {
    console.log(error);
  }
} run().catch(console.dir)

app.get('/', (req, res) => {
  res.send("twitter is working")
})

app.listen(port, () => {
  console.log(`Twitter clone is working on ${port}`)
})
