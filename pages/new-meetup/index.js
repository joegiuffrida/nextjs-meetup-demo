// our-domain.com/new-meetup
import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();

  const onAddMeetup = async (enteredMeetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);

    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add A New Meetup</title>
        <meta name="description" content="Add your own community meetups!" />
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetup} />
    </>
  );
};

export default NewMeetupPage;
