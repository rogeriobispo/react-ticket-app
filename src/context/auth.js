import {useState, createContext, useEffect } from 'react'
import { toast } from 'react-toastify';
import firebase from '../service/firebaseConnection'

const authContext = createContext()


function AuthProvider({children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingAuth, setLoadingAuth] = useState(false)

  function loadStorage() {
    const storageUser = localStorage.getItem('SistemAuser')

    if(storageUser) {
      setCurrentUser(JSON.parse(storageUser))
      setLoading(false)
    }

    setLoading(false)
  }
  useEffect(() => {
    loadStorage()
  }, [])

  async function signIn(email, password) {
    try {
      setLoadingAuth(true)
      const response = await firebase.auth().signInWithEmailAndPassword(email, password)
      const { uid } = response.user
      const user = await firebase.firestore().collection('users').doc(uid).get()
      const data = {
        uid,
        name: user.data().name,
        email: email,
        avatar: user.data().avatarUrl
      }

      setCurrentUser(data)
      storageUser(data)
      setLoadingAuth(false)
      toast.success('Login realizado com sucesso!')
    } catch (error) {
      toast.error('Ususario ou senha incorretos!')
      setLoadingAuth(false)
    }
  }
  function storageUser(data){
    localStorage.setItem('SistemAuser', JSON.stringify(data))
  }
  async function signUp(email, password, name) {
    try {
      setLoadingAuth(true)
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = response.user
      const { uid } = user

      await firebase.firestore().collection('users').doc(uid).set({
        name,
        avatarUrl: null
      })
      const userData = {
        uid,
        name: name,
        email: email,
        avatarUrl: null
      }

      localStorage.setItem('SistemAuser', JSON.stringify(userData))
      setCurrentUser(userData)
      setLoadingAuth(false)
      toast.success('Login realizado com sucesso!');
    }
    catch(error) {
      setLoadingAuth(false)
      toast.error('Falha ao realizar o cadastro!')
      }
  }

  async function signOut() {
    await firebase.auth().signOut()
    localStorage.removeItem('SistemAuser')
    setCurrentUser(null)
    toast.success('Logout realizado com sucesso!')
  }
  return(
    <authContext.Provider value={ 
      {
         currentUser, 
         loadingAuth, 
         signed: !!currentUser, 
         loading, 
         signUp,
         signOut,
         signIn,
         setCurrentUser,
         storageUser
      } 
      }>
      {children}
    </authContext.Provider>
  )
}

export { authContext }

export default AuthProvider