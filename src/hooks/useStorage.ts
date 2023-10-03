import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, getMetadata, ref, uploadBytesResumable } from "firebase/storage";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import  {database, storage}  from '../services/firebase';
import { useAuth } from "./useAuth";

type RoomParams = {

  id:string;

}

export function useStorage(images: any) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const {user} = useAuth();

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const {image, setImage} = images;


 if (!user) {
  throw new Error('You must be logged in');
  
}
  
  useEffect(() => {
     
     
    const refStorage = ref(storage, images.name)
    const uploadTask = uploadBytesResumable(refStorage, images);

   
    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

     setProgress(prog);
    }, (err) => {
      setError(err as any)
    }, async () => {
      const url = await getDownloadURL(refStorage);

      await setDoc(doc(collection(database, "rooms",roomId as any,"images")),
  
      {  
        authorId: user?.id,
        authorName: user?.name,
        createdAt: serverTimestamp(),
        url: url
       
      })
      setUrl(url as any)
    });   
  },[images]);




  

  return { progress, url , error };

  
  
}

