import { useContext } from 'react'
import { authContext } from '../../context/auth';
import { Link } from 'react-router-dom'
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'
import Avatar from '../../assets/avatar.png'
import './header.css'

function Header() {
  const { currentUser } = useContext(authContext);
  const { avatarUrl } = currentUser;
  return(
    <div className='sidebar'> 
      <div>
        <img src={!avatarUrl ? Avatar : avatarUrl} alt='user avatar' />
      </div>

      <Link to='/dashboard'>
        <FiHome color='#fff' size={24}/>Chamados
      </Link>
      <Link to='/customers'>
        <FiUser color='#fff' size={24}/>Clientes
      </Link>

      <Link to='/profiles'>
        <FiSettings color='#fff' size={24}/>Configuracões
      </Link>
    </div>
  )
}


export default Header