import { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { authContext } from '../../context/auth'

import './signin.css';
function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(authContext);
  function handleSubmit(e) {
    e.preventDefault();
    signIn(email, password);
  }
  return (
    <div className='container-center'>
      <div className='login'>
        <div className='login-area'>
          <img src={logo} alt='logo do sistema' />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input 
            type='text' 
            placeholder='example@example.com' 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type='password' 
            placeholder='******' 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type='submit'>
            {loadingAuth ? 'Carregando...' : 'Entrar'}
          </button>
        </form>

        <Link to='/register'>Criar um conta</Link>
      </div>
    </div>
  );
}

export default SignIn;
