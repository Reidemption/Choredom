import { useEffect, useState } from 'react';
import { Image } from '@chakra-ui/react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'


const ShowImage = () => {
  const [imageURL, setImageURL] = useState('');
	const storage = getStorage()


  useEffect(() => {
    const gsReference = ref(
			storage,
			'gs://choredom-fafe4.appspot.com/1681056368562.jpg'
		)

    getDownloadURL(gsReference).then((url) => {
			setImageURL(url)
		})
  }, []);

  if (imageURL === '') {
    return <p>Loading...</p>;
  }

  return (
    <Image src={imageURL} alt='image from the user' />
  );
};

export default ShowImage;


