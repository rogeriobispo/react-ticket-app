import { useState, useContext, useEffect } from 'react'
import { FiPlus } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { authContext } from '../../context/auth';
import firebase from '../../service/firebaseConnection';
import Header  from '../../components/Header';
import Title from '../../components/Title';
import './ticketNew.css';

function TicketNew(){
  const { currentUser } = useContext(authContext);

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState(0);
  const [assunto, setAssunto] = useState('Suporte');
  const [status, setStatus] = useState('Aberto');
  const [complemento, setComplemento] = useState('');

  useEffect(async () => {
    const customerList = await firebase.firestore().collection('customers').get()
    const customerArray = []
    customerList.forEach(customer => {
      customerArray.push({
        id: customer.id,
        name: customer.data().name,
      })
    });
    
    if(customerArray.length === 0){
      customerArray.push({ id: 0, name: 'Nenhum cliente cadastrado' });
    }

    setCustomers(customerArray);
    
  }, [setCustomers])

  async function handleSubmit(e){
    e.preventDefault();

    const ticket = {
      customerId: customers[customerId].id,
      customerName: customers[customerId].name,
      assunto,
      status,
      complemento,
      userId: currentUser.uid,
      createdAt: new Date(),  
    }
    try{
      await firebase.firestore().collection('tickets').add(ticket)
      toast.success('Chamado cadastrado com sucesso ')
      setComplemento('');
      setCustomerId(0);
      setAssunto('Suporte');
      setStatus('Aberto');
    } catch(error) {
      toast.error('Erro ao cadastrar chamado')
    }
  }
  return(
    <>
      <Header />
      <div className='content'>
        <Title name="Novo Chamado">
          <FiPlus size={25}/>
        </Title>

        <div className='container'>
          <form className='form-profile' onSubmit={handleSubmit}>
            <label> Cliente:</label> 
            <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
              {
                customers.map((customer, index) => (
                  <option value={index} key={customer.id}>
                    {customer.name}
                  </option>
                ))
              }
              
            </select>
              
            <label >Assunto:</label>
            <select value={assunto} onChange={(e) => setAssunto(e.target.value)}>
              <option value="Suporte">Suporte</option>
              <option value="Visita tecnica">Visita tecnica</option>
              <option value="financeiro">Financeiro</option>
            </select>
  
            <label >Status:</label>
            <div className='status'>
              <input type="radio" checked={status ===  'Aberto'} name="status" value="Aberto" onChange={(e) => setStatus(e.target.value)} />
              <span>Em aberto</span>
              
              <input type="radio" checked={status ===  'progresso'} name="status" value="progresso" onChange={(e) => setStatus(e.target.value)} />
              <span>Em progresso</span>

              <input type="radio" checked={status ===  'atendido'} name="status" value="atendido" onChange={(e) => setStatus(e.target.value)} />
              <span>Atendido</span>

            </div>

            <label >Complemento:</label>
            <textarea 
              type='text'
              placeholder='Descrição do chamado'
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />

            <button type='submit'>Salvar</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default TicketNew