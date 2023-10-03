import React, { ReactNode, useEffect } from 'react';
import { useStorage } from '../hooks/useStorage';
import '../styles/progressBar.scss'

type ProgressBarProps = {
  image: string
  setImage: (image: string) => void;
}
export default function ProgressBar(props: ProgressBarProps) {
  const { image, setImage } = props;
  const { url, progress } = useStorage(image);


  useEffect(() => {
    if (url) {
      setImage('');
    }
  }, [url, setImage])



  return (
      <div className='progress-container'>
          <div className="progress-bar" style={{ width: progress + '%' }}>
        </div>
      </div>
  

  )
}

