import { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { authContext } from '../../context/auth'
import logo from '../../assets/logo.png';



function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { signUp, loadingAuth } = useContext(authContext);

  function handleSubmit(e) {
    e.preventDefault();
    if(name && email && password) {
      signUp(email, password, name);
    }
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
            placeholder='Enter your name' 
            value={name}
            onChange={e => setName(e.target.value)}
          />
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
            { loadingAuth ? 'Carregando...' : 'Cadastrar' }
          </button>
        </form>

        <Link to='/'>Login</Link>
      </div>
    </div>
  );
}

export default Signup;
