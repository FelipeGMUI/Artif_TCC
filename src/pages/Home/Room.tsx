import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageGrid from '../../components/ImageGrid';
import ProgressBar from '../../components/ProgressBar';
import RoomCode  from '../../components/RoomCode';
import RoomName from '../../components/roomName'
import Modal from '../../components/Modal';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/room.scss';
import  { FaPlus } from "react-icons/fa";
import { doc, getDoc } from 'firebase/firestore';
import {database} from '../../services/firebase';
import UserMenu from '../../components/userMenu';

type RoomParams = {
  id: string;

}


export function Room() {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [roomTitle, setRoomTitle] = useState('');
  const params = useParams<RoomParams>();
  const roomId:any = params.id;
  const { user } = useAuth();

  const types = ['image/png', 'image/jpeg']

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement> & { target: HTMLInputElement & { files: Array<string> } }) {
    let file = e.target.files[0];


    if (file && types.includes(file.type)) {
      setImage(file)

      setError('')
    } else {
      setImage(null);
      setError('Por favor adicione uma imagem com um formato (png ou jpeg)')

    }

  }
  useEffect(() => {
    async function fetchRoomTitle() {
      const docRef = doc(database, 'rooms', roomId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRoomTitle(data.tittle);
      }
    }

    fetchRoomTitle();
  }, [roomId]);
  

  return (

    <div id="page-post">
      <header>
        <div className="content">

        </div>
        <UserMenu/>
      </header>
      <main>
        <div className="content-file">
          <RoomCode code = {params.id!} />
         
        <RoomName tittle = {roomTitle}/>
          <form className="form-post">
            <div className='file-upload'>
              <span>Adicione uma imagem com um formato (png ou jpeg)</span>
              <input type="file" onChange={handleUpload} accept="image/*" id="icon-button-file" style={{display:'none'}} />
              <label htmlFor='icon-button-file'>
                <FaPlus/>
              </label>
            </div>

            <div className="output">
              {error && <div className="error">{error}</div>}
              {image && <ProgressBar image={image} setImage={setImage} />}
            </div>

            <div>
              <ImageGrid setSelectedImage={setSelectedImage} />
              {selectedImage && <Modal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}

            </div>


          </form>
        </div>
      </main>

    </div>
  )
}


