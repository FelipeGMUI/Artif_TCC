import '../../styles/auth.scss';
import { Button } from '../../components/button';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { addDoc, collection } from 'firebase/firestore';
import "firebase/firestore";
import UserMenu from '../../components/userMenu';

export function NewRoom() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent,) {

    event.preventDefault();

    if (newRoom.trim() == '') {
      return;
    }
    const refRoom = await addDoc(collection(database, 'rooms'),
      {
        tittle: newRoom,
        authorId: user?.id
      })
    navigate(`/rooms/${refRoom.id}`);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom} className='form-container'>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Deseja entrar em uma sala existente? <Link to='/' >Clique aqui</Link>
          </p>
          <button onClick={logout}>Sair</button>
        </div>
      </main>

    </div>
  );
}

export const roomCreate = NewRoom;




