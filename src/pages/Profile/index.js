import { useState, useContext } from 'react'
import firebase from '../../service/firebaseConnection';
import Title from '../../components/Title'
import Header from '../../components/Header';
import { FiSettings, FiUpload } from 'react-icons/fi'
import Avatar from '../../assets/avatar.png'
import { authContext } from '../../context/auth'
import './profile.css';

function Profile(){
  const { currentUser, signOut, setCurrentUser, storageUser } = useContext(authContext);
  const [avatar, setAvatar] = useState(currentUser && currentUser.avatarUrl);
  const [name, setName] = useState(currentUser && currentUser.name);
  const [email] = useState(currentUser && currentUser.email);
  const [imageAvatar, setImageAvatar] = useState(null);

  async function handleSave(e){
    e.preventDefault();
    if(!!name){
      await firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .update({
        name,
      })

      const user = {
        ...currentUser,
        name,
      }
      setCurrentUser(user);
      storageUser(user);
    }
    if(!!imageAvatar){
      handleImageUpdate()
    }
  }

  async function handleImageUpdate(){
    await firebase.storage().ref(`images/${currentUser.uid}/${imageAvatar.name}`).put(imageAvatar);
    const avatarUrl = await firebase.storage().ref(`images/${currentUser.uid}/${imageAvatar.name}`).getDownloadURL();
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .update({
        avatarUrl,
        name
      })

      const user = {
        ...currentUser,
        name,
        avatarUrl
      }
      setCurrentUser(user);
      storageUser(user);
  }

  function handleFile(e){
    const file = e.target.files[0];
    if(file && (file.type === 'image/jpeg' || file.type === 'image/png')){
      setImageAvatar(file);
      setAvatar(URL.createObjectURL(file));
    }
  }

  return(
    <>
      <Header />
      <div className='content'>
        <Title name="Meu Perfil">
          <FiSettings size={25}/>
        </Title>

        <div className='container'>
          <form className='form-profile' onSubmit={handleSave}>
            <label className='label-avatar'>
              <span><FiUpload color='#fff' size={25}  /></span>

              <input type='file' accept='image/*' onChange={handleFile} />
              <img src={!avatar ? (Avatar) : avatar} width={250} height={250} alt='avatar' />
            </label>

            <label> Nome:</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            
            <label >Email:</label>
            <input type='email' value={email} disabled  />
            
            <button type='submit'>Salvar</button>
          </form>
        </div>

        <div className='container'>
          <button className='logout-btn' onClick={signOut}>Sair</button>
        </div>
      </div>
    </>
  )
}

export default Profile;