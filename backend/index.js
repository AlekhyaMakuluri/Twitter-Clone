const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://alekhyamakuluri2864:vF9VN1lebCrd5t9f@cluster0.7qyqg9w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err=>{
    const collection = client.db("test").collection("devices");
    console.log('connected');
    client.close();
})

app.get('/', (req, res) => {
  res.send('Hello World from!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})