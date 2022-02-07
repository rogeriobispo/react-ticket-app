import './modal.css'
import { FiX } from 'react-icons/fi'
function Modal({content, close}) {
  return(
    <div className='modal'>
      <div className='container'>
        <button className='close' onClick={close}>
          <FiX size={23} color='#fff'/>
          Fechar
        </button>
        <div>
          <h2>Detalhes do chamado</h2>
          <div className='row'>
              <span>
                Cliente: <a>{content.customerName}</a>
              </span>
              <span>
                Cadastrado em: <a>{content.createdAtFormated}</a>
              </span>
          </div>

          <div className='row'>
              <span>
                Assunto: <a>{content.assunto}</a>
              </span>
          </div>

          <div className='row'>
              <span>
                Status: <a style={{ backgroundColor: '#5cb85c'}}>{content.status}</a>
              </span>
          </div>

          {content.description !== '' && (
            <>
              <h3>Complemento</h3>
              <p>
                {content.complemento}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modal