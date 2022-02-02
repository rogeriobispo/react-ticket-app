import { useState } from 'react'
import firebase from '../../service/firebaseConnection';
import Title from '../../components/Title'
import Header from '../../components/Header';
import { FiUser } from 'react-icons/fi'
import './customer.css';
import { toast } from 'react-toastify';

function Profile(){
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [address, setAddress] = useState('');
  async function handleSave(e){
    e.preventDefault();

    if(!!name && !!document && !!address){
      await firebase.firestore().collection('customers').add({
        name,
        document,
        address
      })
      toast.info('Cliente cadastrado com sucesso!')
      setName('')
      setDocument('')
      setAddress('')
    } else {
      toast.error('Preencha todos os campos!')
    }
  }

  return(
    <>
      <Header />
      <div className='content'>
        <Title name="Novo Cliente">
          <FiUser size={25}/>
        </Title>

        <div className='container'>
        <form className='form-profile customers' onSubmit={handleSave}>

            <label> Nome:</label>
            <input type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
            
            <label >documento:</label>
            <input type='text' placeholder='Documento' value={document} onChange={(e) => setDocument(e.target.value)} />
            
            <label >Endereco:</label>
            <input type='text' placeholder='Endereco' value={address} onChange={(e) => setAddress(e.target.value)} />
            
            <button type='submit'>Salvar</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Profile;