import { useState, useEffect } from 'react'
import firebase from '../../service/firebaseConnection'
import Title from '../../components/Title'
import { FiMessageCircle } from 'react-icons/fi'
import { FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'


import './dashboard.css';

import Header from '../../components/Header'

const listRef = firebase.firestore().collection('tickets').orderBy('createdAt', 'desc')

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(async () => {
    const tickets = await loadChamados()
    console.log(tickets)
  },[])

  async function loadChamados() {
    try{

    } catch(error) {
      console.log(error)
      setLoadingMore(false)
    }
    return listRef.limit(5).get();
  }
  return (
    <>
      <Header/>
      <div className='content'>
      <Title name="Atendimentos">
          <FiMessageCircle size={25}/>
      </Title>
        {tickets.length === 0 ? (
          <div className='container dashboard'>
            <span>Nenhum chamado Registrado..</span>
            <Link to='/new-ticket' className='new'>
            <FiPlus size={25} color='#fff'/> Novo chamado 
            </Link>
          </div>
        ) : (
          <>
            <Link to='/new-ticket' className='new'>
              <FiPlus size={25} color='#fff'/> Novo chamado 
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope='col'>Cliente</th>
                  <th scope='col'>Assunto</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>6dastrado em</th>
                  <th scope='col'>#</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label='cliente'>Sujeito</td>
                  <td data-label='assunto'>suporte</td>
                  <td data-label='status'>
                    <span className='badge' style={{ backgroundColor: '#5cb85c'}}>Aberto</span>
                  </td>
                  <td data-label='cadastrado'>20/10/2020</td>
                  <td data-label='#'>
                    <button className='action' style={{ backgroundColor: '#3583f6'}}>
                      <FiSearch size={17} color='#fff'/>
                    </button>
                    <button className='action' style={{ backgroundColor: '#f6a935'}}>
                      <FiEdit2 size={17} color='#fff'/>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
