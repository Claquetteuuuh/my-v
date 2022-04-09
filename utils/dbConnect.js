import mongoose from 'mongoose'

const connection = {}

async function dbConnect(){
    if (connection.isConnected){
        return
    }

    const db = await mongoose.connect(process.env.mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then('connecté a la base')

    connection.isConnected = db.connections[0].readyState
    console.log(connection.isConnected);

}

export default dbConnect
