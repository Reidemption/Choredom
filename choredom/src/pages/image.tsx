import { useEffect, useState } from 'react';
import { Image } from '@chakra-ui/react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { CustomToast } from '../components/toast'

const ShowImage = () => {
  const [imageURL, setImageURL] = useState('');
  const storage = getStorage()
  const { addToast } = CustomToast()

  return (
    <button onClick={() => { addToast({ message: 'Sign in Successful', type: 'success' }) }}>hello</button>
  );
};

export default ShowImage;


