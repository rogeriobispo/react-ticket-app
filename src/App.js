import Router from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/auth';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
