import { collection, collectionGroup, doc, DocumentSnapshot, getDoc, getDocs, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { database } from "../services/firebase";

type ParamsProps = {
  id: string
}


  export default function useGrid () {
  const [roomImage, setRoomImage] = useState([]);
  const params = useParams<ParamsProps>();
  const roomId = params.id




async function fetchData(){
    
    const q = query(collection(database, `rooms/${roomId}/images`));

    const unsub = onSnapshot(q, (querySnapshot) =>{
      const list:any = [];
      querySnapshot.docs.forEach((doc)=>{
        list.push({
          id: doc.id, ...doc.data() 
        })
      });
      setRoomImage(list);   
    })

        
};

useEffect(()=>{
  fetchData();
},[])



  return {roomImage}

  }




 


