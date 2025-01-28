import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const client = new MongoClient(process.env.uri, {
    serverSelectionTimeoutMS: 10000
})
const dbname = "feryNodejs"

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbname} database`)
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`)
    }
}

const main = async () => {
    try {
        await connectToDatabase()
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`)
    } finally {
        await client.close()
    }
}

console.log("Hello guys")
main()
