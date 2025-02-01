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
const sampleAccounts = [
    {
        account_id: "MDB011235813",
        account_holder: "Ada Lovelace",
        account_type: "checking",
        balance: 60218,
        last_updated: new Date(),
    },
    {
        account_id: "MDB829000001",
        account_holder: "Muhammad ibn Musa al-Khwarizmi",
        account_type: "savings",
        balance: 267914296,
        last_updated: new Date(),
    },
    ];

    const main = async () => {
    try {
        await connectToDatabase();
        let result = await accountsCollection.insertOne(sampleAccounts)
        console.log(`Inserted ${result.insertedCount} documents`);
        console.log(result);
    } catch (err) {
        console.error(`Error inserting documents: ${err}`);
    } finally {
        await client.close();
    }
    };
    
    main()