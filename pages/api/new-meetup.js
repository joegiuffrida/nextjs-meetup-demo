import { MongoClient } from 'mongodb';

// /api/new-meetup

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const data = req.body;

      const user = process.env.DB_USER;
      const password = process.env.DB_PASS;

      const client = await MongoClient.connect(
        `mongodb+srv://${user}:${password}@cluster0.pkwqi.mongodb.net/meetups?retryWrites=true&w=majority`
      );
      const db = client.db();

      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.insertOne(data);

      client.close();

      res.status(201).json({ message: 'Meetup inserted!' });
    }
  } catch (error) {
    console.error(error);
  }
};

export default handler;
