import { useState, useEffect } from 'react'
import firebase from '../../service/firebaseConnection'
import Title from '../../components/Title'
import { FiMessageCircle } from 'react-icons/fi'
import { FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'


import './dashboard.css';

import Header from '../../components/Header'

const listRef = firebase.firestore().collection('tickets').orderBy('createdAt', 'desc')

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(async () => {
    const ticketsLoaded = await loadChamados()
    setTickets(updateState(ticketsLoaded))
    console.log(tickets)
  },[])

  function updateState(ticketsCollections) {
  if(ticketsCollections.length === 0) return
    const listTickets = []

    ticketsCollections.forEach(ticket => {
      listTickets.push({
        id: ticket.id,
        ...ticket.data(),
        createdAtFormated: format(ticket.data().createdAt.toDate(), 'dd/MM/yyyy')
      })
    })

    return listTickets
  }

  async function loadChamados() {
    try{
      return listRef.limit(5).get();
    } catch(error) {
      console.log(error)
      setLoadingMore(false)
    }
    setLoading(false)
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
                  <th scope='col'>Cadastrado em</th>
                  <th scope='col'>#</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(ticket => (
                  
                    <tr key={ticket.id}>
                      {console.log(ticket)}
                      <td data-label='cliente'>{ticket.customerName}</td>
                      <td data-label='assunto'>{ticket.assunto}</td>
                      <td data-label='status'>
                        <span className='badge' style={{ backgroundColor: '#5cb85c'}}>{ticket.status}</span>
                      </td>
                      <td data-label='cadastrado'>{ticket.createdAtFormated}</td>
                      <td data-label='#'>
                        <button className='action' style={{ backgroundColor: '#3583f6'}}>
                          <FiSearch size={17} color='#fff'/>
                        </button>
                        <button className='action' style={{ backgroundColor: '#f6a935'}}>
                          <FiEdit2 size={17} color='#fff'/>
                        </button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
