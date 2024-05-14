import mongoose from 'mongoose'

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect("mongodb://christo:christo@ac-c68qhb9-shard-00-00.0vbji6j.mongodb.net:27017,ac-c68qhb9-shard-00-01.0vbji6j.mongodb.net:27017,ac-c68qhb9-shard-00-02.0vbji6j.mongodb.net:27017/kingdom?ssl=true&replicaSet=atlas-ognly7-shard-0&authSource=admin&retryWrites=true&w=majority");
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}

export default connectDB