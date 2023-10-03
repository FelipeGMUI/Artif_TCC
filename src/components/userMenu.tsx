import  { useState} from 'react';
import '../styles/userMenu.scss'; 
import { useAuth } from '../hooks/useAuth';
import menuIconImg from '../assets/images/menu-icon.svg';
import { Link } from 'react-router-dom';
import Logout from './logout';

function UserMenu() {
  const { user, isLoggedIn, signInWithGoogle, logout } = useAuth(); 

  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible); 
  };
  return (
    <div className="user-menu">
      <button className="user-menu-toggle" onClick={toggleMenu}>
        <i className="menu-user"><img src={menuIconImg} /></i>
      </button>
      <div className='user-container'>
        {isLoggedIn ? (
          <div className="user-name-container">
            <img src={user?.avatar}/>
            <span>{user?.name}</span>
          </div>
        ) : (
          <span>Você ainda não está logado!</span>
        )}
      </div>
      {menuVisible && (
        <div className="user-menu-options">
          <ul>
            <li>
              <Link to='/'>Menu Principal</Link>
            </li>
            {isLoggedIn ? (
              <li>
               <Logout/>
                  
              </li>
            ) : (
              <li>
                <a onClick={signInWithGoogle}>Clique para fazer login com Google</a>
              </li>
            )}
          </ul>
        </div>
      )}
     
    </div>
  );
}

export default UserMenu;
