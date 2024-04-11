// CSS
import '../Actions.css'

// Hooks
import { useState} from 'react'
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

const AddPerson = () => {

  const urlCompanies = "http://localhost:3000/company"

  const {data: companies} = useFetch(urlCompanies)

  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [telefone, setTelefone] = useState("")
  const [user, setUser] = useState("")
  const [status, setStatus] = useState(1)
  const [company, setCompany] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()

    Swal.fire({
      title: "Concluído!",
      text: "Cadastro realizado com sucesso!",
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
            <h1>Cadastrar Pessoa</h1>
            <p>Preencha todos os campos para o cadastro de  uma pessoa</p>
          </div>

          <div className="input-person">
            <input type="text" id='name' name='name' required minLength={3} maxLength={255} autoFocus onChange={(e) => setName(e.target.value)} value={name}/>
            <label htmlFor="name">Nome completo</label>
          </div> 

          <div className="input-person">
            <IMaskInput id='cpf' name='cpf' mask="000.000.000-00" required minLength={14} maxLength={14} onChange={(e) => setCpf(e.target.value)} onKeyUp={cpfValidation} onBlur={validateLength} value={cpf} />
            <label htmlFor="cpf">CPF</label>
          </div>

          <div className="input-person">
            <InputMask id='telefone' name='telefone' required minLength={14} maxLength={15} onChange={(e) => setTelefone(e.target.value)} onBlur={validateLengthTelefone} onKeyUp={handlePhone} value={telefone} />
            <label htmlFor="telefone">Telefone</label>
          </div>

          <div className="input-person">
            <input type="text" id='user' name='user' required minLength={3} maxLength={255} onChange={(e) => setUser(e.target.value)} value={user}/>
            <label htmlFor="user">Usuário</label>
          </div>

          <div className="select">
            <select name="status" id="status" required onChange={(e) => setStatus(e.target.value)} value={status}>
              <option value="1">Ativo</option>
              <option value="2">Inativo</option>
              <option value="3">Pendente</option>
            </select>
            <label htmlFor="status">Status</label>
          </div>

          {status == 1 && (
            <div className="select">
              <select name="company" id="company" required onChange={(e) => setCompany(e.target.value)}>
                {companies && companies.map((company) => (
                  company.situacao === "Ativa" && <option value={company.id} key={company.id}>{company.nomeFantasia}</option>
                ))}
              </select>
              <label htmlFor="company">Empresa</label>
            </div>
          )}

          <div id="btn">
            <button className="button">Cadastrar</button>
          </div>  
        </form>
      </div> 
    </div>
  )
}

export default AddPerson