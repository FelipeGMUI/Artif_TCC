
import googleIconImg from '../../assets/images/google-icon.svg';
import artifIconImg from '../../assets/images/artif-icon.svg'
import { FormEvent, useState } from 'react';
import '../../styles/auth.scss';
import { Button } from '../../components/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import UserMenu from '../../components/userMenu';
import { getAuth } from 'firebase/auth';

export function Home() {

  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {

    if (!user) {
      await signInWithGoogle(); 
    }
    navigate("/room/new");
    

    

  }
  async function handleJoinRoom(event: FormEvent) {

    event.preventDefault();
    if (roomCode.trim() === '') {

      return;

    }

    const roomRef = doc(database, `rooms/${roomCode}`)
    const roomSnap = await getDoc(roomRef)

    if (!roomSnap.exists()) {
      alert("Essa sala nâo existe");
      return;

    } else {

      navigate(`/rooms/${roomCode}`);

    }

  }

  return (

    <div id="page-auth">
      <UserMenu />
      <aside>
        <strong>Crie salas e interaja com trabalhos artísticos de seus colegas</strong>
        <p>Utilize esse espaço para mostrar suas ilustrações</p>
      </aside>
      <main >
        <div className='main-content'>
          <img src={artifIconImg} alt="artif" />
          <button className='create-room' onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="icone" />
            Crie sua sala com o Google
          </button>
          <div className='separator'>
            Ou entre em uma sala
          </div>
          <form className='form-container' >
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit" onClick={handleJoinRoom}>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}