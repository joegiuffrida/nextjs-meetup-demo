import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>NextJS Meetups</title>
        <meta
          name="description"
          content="Browse a list of user submitted React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  // fetch data from an API
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;

  const client = await MongoClient.connect(
    `mongodb+srv://${user}:${password}@cluster0.pkwqi.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
};

export default HomePage;
