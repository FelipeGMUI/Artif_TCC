import '../styles/room-code.scss'
import {BiCopy} from 'react-icons/bi'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

type RoomCodeProps = {
  code: string;

}

export default function RoomCode(props: RoomCodeProps){

  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code)
  }

  
  return(
    <button className="room-code" onClick={copyRoomCodeToClipboard}  id='copy'>
      <span>Sala {props.code}</span>
    <label className='copy-icon' htmlFor='copy'>
      <BiCopy/>
    </label>
    </button>
  )
}
