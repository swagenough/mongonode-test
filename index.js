import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()

const client = new MongoClient(process.env.URI, {
    serverSelectionTimeoutMS: 10000
})

const dbname = "test"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

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
        account_id: "MDB011235214",
        account_holder: "Swag Fery2",
        account_type: "checking",
        balance: 60218,
        last_updated: new Date(),
    },
    {
        account_id: "MDB829726122",
        account_holder: "Lol man2",
        account_type: "savings",
        balance: 267914296,
        last_updated: new Date(),
    },
];

const pipeline = [
    { $match: { balance: { $gt: 70000 } } },
    {
        $group: {
            _id: "$account_type",
            total_balance: { $sum: "$balance" },
            avg_balance: { $avg: "$balance" }
        },
    },
]

const main = async () => {
try {
    await connectToDatabase();
    //let result = await accountsCollection.insertMany(sampleAccounts)
    //console.log(`Inserted ${result.insertedCount} documents`);
    //console.log(result)

    let aggregateResult = accountsCollection.aggregate(pipeline)

    for await (const doc of aggregateResult) {
        console.log(doc)
    }
} catch (err) {
    console.error(`Error inserting documents: ${err}`);
} finally {
    await client.close();
}
};

main()