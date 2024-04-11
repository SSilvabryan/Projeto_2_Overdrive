// CSS
import '../Actions.css'

// Hooks
import { useState, useRef} from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch'

// Utilities
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

// Mask for inputs
import { IMaskInput } from 'react-imask'
import InputMask from 'react-input-mask'

// Validations
import cpfValidation from '../../../Validations/CpfValidation'
import { handlePhone } from '../../../Validations/TelephoneValidation'
import { cpfLength, telefoneLength } from '../../../Validations/Lengths'

const EditPerson = () => {

  let { id } = useParams()

  const url = `http://localhost:3000/person/${id}`

  const {data: person} = useFetch(url)

  const urlCompanies = "http://localhost:3000/company"

  const {data: companies} = useFetch(urlCompanies)

  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [telefone, setTelefone] = useState("")
  const [user, setUser] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    Swal.fire({
      title: "Concluído!",
      text: "Edição realizada com sucesso!",
      icon: "success",
      timer: 3000,
      confirmButtonAriaLabel: "OK"
    });
    
    setTimeout(() => {
      window.location.href = '/person'
    }, 3500)
  }

  const validateLength = () => {
    if(!cpfLength(cpf)) {
      setCpf("")
    }
  }

  const validateLengthTelefone = () => {
    if (!telefoneLength(telefone)) {
      setTelefone("")
    }
  }

  return (
    <div id="body">
      <div id="fade" className='hide'>
        <div id="loader" className='spinner-border hide' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>

        <div id="message" className='hide'>
          <div className="alert alert-light" role='alert'>
            <h4>Mensagem</h4>
            <p></p>
            <button id="close_message" className="button" onClick={cpfValidation}>Fechar</button>
          </div>
        </div>
      </div>

      <div id="form">
        <div id="arrow_left">
          <Link to="/person"><i className="bi bi-arrow-left"></i></Link>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div id="form_header">
            <h1>Editar {person && person.usuario}</h1>
            <p>Verifique e modifique os campos necessários</p>
          </div>

          <div className="input-person">
            <input type="text" id='name' name='name' required minLength={3} maxLength={255} onChange={(e) => setName(e.target.value)} defaultValue={person && person.nome} />
            <label htmlFor="name">Nome completo</label>
          </div> 

          <div className="input-person">
            <IMaskInput id='cpf' name='cpf' mask="000.000.000-00" required minLength={14} maxLength={14} onChange={(e) => setCpf(e.target.value)} onKeyUp={cpfValidation} onBlur={validateLength} defaultValue={person && person.cpf} />
            <label htmlFor="cpf">CPF</label>
          </div>

          <div className="input-person">
            <InputMask id='telefone' name='telefone' minLength={14} maxLength={15} required onChange={(e) => setTelefone(e.target.value)} onBlur={validateLengthTelefone} onKeyUp={handlePhone} defaultValue={person && person.telefone}/>
            <label htmlFor="telefone">Telefone</label>
          </div>

          <div className="input-person">
            <input type="text" id='user' name='user' required minLength={3} maxLength={255} defaultValue={person ? person.usuario : ""} />
            <label htmlFor="user">Usuário</label>
          </div>

          <div className="select">
            <select name="status" id="status" required onChange={(e) => setStatus(e.target.value)}>
              {person && person.status === "Ativo" ? <option value="1" selected>Ativo</option> : <option value="1">Ativo</option>}
              {person && person.status === "Inativo" ? <option value="2" selected>Inativo</option> : <option value="2">Inativo</option>}
              {person && person.status === "Pendente" ? <option value="3" selected>Pendente</option> : <option value="3">Pendente</option>}              
            </select>
            <label htmlFor="status">Status</label>
          </div>

          {(person && person.status === "Ativo" || status == 1) && (
            <div className="select">
              <select name="company" id="company" required onChange={(e) => setCompany(e.target.value)}>
                {companies && companies.map((company) => (
                  company.situacao === "Ativa" && 
                  (person.empresa === company.nomeFantasia ? <option value={company.id} key={company.id} selected>{company.nomeFantasia}</option> : <option value={company.id} key={company.id}>{company.nomeFantasia}</option>)
                ))}
              </select>
              <label htmlFor="company">Empresa</label>
            </div>
          )}

          <div id="btn">
            <button className="button">Editar</button>
          </div> 
        </form>
      </div> 
    </div>
  )
}

export default EditPerson