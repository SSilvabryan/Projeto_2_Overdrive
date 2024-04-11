// CSS
import '../Actions.css'

// Hooks
import { useState } from 'react'
import {useParams} from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch'

// Utilities
import  { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

// Mask for inputs
import { IMaskInput } from 'react-imask'
import InputMask from 'react-input-mask'

// Validations
import cepValidation from '../../../Validations/CepValidation'
import mascaraMoeda from '../../../Validations/Currency'
import cnpjValidation from '../../../Validations/CnpjValidation'
import { handlePhone } from '../../../Validations/TelephoneValidation'
import { cepLength, cnaeLength, cnpjLength, telefoneLength } from '../../../Validations/Lengths'

const EditCompany = () => {

  let {id} = useParams()

  const url = `http://localhost:3000/company/${id}`

  const {data: company} = useFetch(url)

  const [cnpj, setCnpj] = useState("")
  const [cnae, setCnae] = useState("")
  const [telefone, setTelefone] = useState("")
  const [cep, setCep] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    Swal.fire({
      title: "Concluído!",
      text: "Edição realizada com sucesso!",
      icon: "success",
      timer: 3000
    });

    setTimeout(() => {
      window.location.href = '/company'
    }, 3500)
  }

  const validateLength = () => {
    if(!cnpjLength(cnpj)) {
      setCnpj("")
    }
  }

  const validateLengthCnae = () => {
    if(!cnaeLength(cnae)) {
      setCnae("")
    }
  }

  const validateLengthCep = () => {
    if(!cepLength(cep)) {
      setCep("")
    }
  }

  const validateLengthTelefone = () => {
    if(!telefoneLength(telefone)) {
      setTelefone("")
    }
  }

  return (
    <div id="body_company">
      <div id="fade" className='hide'>
        <div id="loader" className='spinner-border hide' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>

        <div id="message" className='hide'>
          <div className="alert alert-light" role='alert'>
            <h4>Mensagem</h4>
            <p></p>
            <button id="close_message" className="button" onClick={cepValidation}>Fechar</button>
          </div>
        </div>
      </div>

      <div id="form_company">
        <div id="arrow_left">
          <Link to="/company"><i className="bi bi-arrow-left"></i></Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div id="form_header">
            <h1>Editar {company && company.nomeFantasia}</h1>
            <p>Verifique e modifique os campos necessários</p>
          </div>

          <div className='row mb-3'>
            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <input type="text" id='razao' name='razao' required minLength={3} maxLength={255} defaultValue={company && company.razaoSocial} />
              <label htmlFor="razao" className="label_left">Razão Social</label>
            </div>

            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <input type="text" id='nomeFantasia' name='nomeFantasia' required minLength={3} maxLength={255} defaultValue={company && company.nomeFantasia}/>
              <label htmlFor="nomeFantasia" className="label_right">Nome Fantasia</label>
            </div>
          </div>

          <div className='row mb-3'>
            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <IMaskInput id='cnpj' name='cnpj' mask="00.000.000/0000-00" required minLength={18} maxLength={18} onKeyUp={cnpjValidation} onChange={(e) => setCnpj(e.target.value)} onBlur={validateLength} defaultValue={company && company.cnpj}/>
              <label htmlFor="cnpj" className="label_left">CNPJ</label>
            </div>

            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <input type="date" id='abertura' name='abertura' required defaultValue={company && company.dataAbertura}/>
              <label htmlFor="abertura" className="label_right data">Data de Abertura</label>
            </div>
          </div>
          
          <div className='row mb-3'>
            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <input type="text" id='natureza' name='natureza' required minLength={3} maxLength={255} defaultValue={company && company.naturezaJuridica}/>
              <label htmlFor="natureza" className="label_left">Natureza Jurídica</label>
            </div>

            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <IMaskInput id='cnae' name='cnae' mask="0000-0/00" required minLength={9} maxLength={9} onChange={(e) => setCnae(e.target.value)} onBlur={validateLengthCnae} defaultValue={company && company.cnae} />
              <label htmlFor="cnae" className="label_right">CNAE</label>
            </div>
          </div>

          <div className='row mb-3'>
            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <input type="text" id='capital' name='capital' required onChange={(e) => mascaraMoeda(e)} maxLength={20} defaultValue={company && company.capital}/>
              <label htmlFor="capital" className="label_left">Capital</label>
            </div>

            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <select name="situação" id="situação" required>
                {company && company.situacao === "Ativa" ? <option value="1" selected>Ativa</option> : <option value="1">Ativa</option>}
                {company && company.situacao === "Inativa" ? <option value="2" selected>Inativa</option> : <option value="2">Inativa</option>}
              </select>
              <label htmlFor="situação" className="label_right">Situação</label>
            </div>
          </div>

          <div className='row mb-5'>
            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <InputMask id='telefone' name='telefone' minLength={14} maxLength={15} required onChange={(e) => setTelefone(e.target.value)} onBlur={validateLengthTelefone} onKeyUp={handlePhone} defaultValue={company && company.telefone} />
              <label htmlFor="telefone" className="label_left">Telefone</label>
            </div>

            {/* Endereço */}
            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <IMaskInput id='cep' name='cep' mask="00.000-000" required minLength={10} maxLength={10} onChange={(e) => setCep(e.target.value)}  onKeyUp={cepValidation} onBlur={validateLengthCep} defaultValue={company && company.cep}/>
              <label htmlFor="cep" className="label_right">CEP</label>
            </div>
          </div> 

          <div className='row mb-3'>
            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <input type="text" id='rua' name='rua' placeholder='Rua' disabled required minLength={3} maxLength={255} data-input />
            </div>

            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <input type="text" id='number' name='number' placeholder='Número' disabled required min={1} max={1000000} data-input />
            </div>
          </div>

          <div className='row mb-3'>
            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <input type="text" id='complement' name='complement' placeholder='Complemento (Opcional)' disabled minLength={3} maxLength={255} data-input />
            </div>

            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <input type="text" id='bairro' name='bairro' placeholder='Bairro' disabled required minLength={3} maxLength={255} data-input />
            </div>
          </div>

          <div className='row mb-3'>
            <div className="col-12 col-sm-6 mb-3 mb-sm-0">
              <input type="text" id='city' name='city' placeholder='Cidade' disabled required minLength={3} maxLength={255} data-input />
            </div>

            <div className="col-12 col-sm-6">
              <select
                className="form-select"
                id="region"
                disabled
                required
                data-input
              >
                <option defaultValue>Estado</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>
          </div>

          <div id="btn">
            <button className="button">Editar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCompany