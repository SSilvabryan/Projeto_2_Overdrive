// CSS
import './Dashboard.css'

// Utilities
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

// functions
import filter from '../../functions/Filter';
import { menuDashboard } from '../../functions/menuDashboard';

// Hooks
import { useFetch } from '../../hooks/useFetch';

const url = "http://localhost:3000/company"
const urlPeople = "http://localhost:3000/person"

const Company = () => {

  const {data: companies, error} = useFetch(url)
  const {data: people} = useFetch(urlPeople)

  const deleteCompany = (nome) => {
    let ctd = 0
    people.forEach(person => {
      if (person.empresa == nome) {
        ctd++
        return
      }
    });

    if(ctd) {
      Swal.fire(`Essa ação não pode ser concluída. ${nome} possui pessoas vinculadas!`)
    }
    // Empresa não possui funcionários
    else {
      Swal.fire({
      title: `Realmente deseja <strong><u>Deletar</u></strong> a empresa ${nome}?`,
      text: "Você não será capaz de reverter essa ação!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deletada!",
            text: `A empresa ${nome} foi excluída com sucesso.`,
            icon: "success"
          });
        }
      }); 
    }
  }

  const inactivateCompany = (nome) => {
    Swal.fire({
      title: `Realmente deseja <strong><u>Inativar</u></strong> a empresa ${nome}?`,
      text: "Todas as pessoas serão inativadas também e perderão seu vínculo com a empresa.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, inativar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Inativada!",
          text: `A empresa ${nome} foi inativada com sucesso.`,
          icon: "success"
        });
      }
    }); 
  }

  const activateCompany = (nome) => {
    Swal.fire({
      title: `Realmente deseja <strong><u>Ativar</u></strong> a empresa ${nome}?`,
      text: "Com isso, será possível vincular pessoas!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, ativar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Ativada!",
          text: `A empresa ${nome} foi ativada com sucesso.`,
          icon: "success"
        });
      }
    }); 
  }

  const date = (data) => {
    const day = data.substring(8,10)
    const month = data.substring(5,7)
    const year = data.substring(0,4)

    return `${day}/${month}/${year}`
  }

  return (
    <div id="body-dashboard">
      <header id='header'>
        <Link to="/" id='logo'>OVERDRIVE</Link>

        <nav id="nav">
          <Link to="/company/add">Cadastrar Empresa</Link>
          <Link to="/person">Pessoas</Link>
        </nav>

        <div className='bi bi-list' id='menu-icon' onClick={menuDashboard}></div>
      </header>

      <div id="container">
        <div id="table_header">
          <h2>Empresas</h2>

          <div id="search">
            <form>
              <input onInput={filter} type='search' placeholder="Pesquisar"/>
              <button id="btn_search" className="button"><i className="bi bi-search"></i></button>
            </form>
          </div>
        </div>

        <table id="table" className='table-company'>
          <thead>
            <tr>
              <th scope="col">CNPJ</th>
              <th scope="col">Razão Social</th>
              <th scope="col">Nome Fantasia</th>
              <th scope="col">Data de Abertura</th>
              <th scope="col">CNAE</th>
              <th scope="col">Natureza Jurídica</th>
              <th scope="col">CEP</th>
              <th scope="col">Contato</th>
              <th scope="col">Capital</th>
              <th scope="col">Situação</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {error && <p>{error}</p>}

            {companies &&
              companies.map((company) => (
                <tr key={company.id}>
                  <td data-cell="CNPJ">{company.cnpj}</td>
                  <td data-cell="Razão Social">{company.razaoSocial}</td>
                  <td data-cell="Nome Fantasia">{company.nomeFantasia}</td>
                  <td data-cell="Data de Abertura">{date(company.dataAbertura)}</td>
                  <td data-cell="CNAE">{company.cnae}</td>
                  <td data-cell="Natureza Jurídica">{company.naturezaJuridica}</td>
                  <td data-cell="CEP">{company.cep}</td>
                  <td data-cell="Contato">{company.telefone}</td>
                  <td data-cell="Capital">{company.capital}</td>
                  <td data-cell="Situação">
                    {/* Status da Situação */}
                    {company.situacao === "Ativa" ? <p className='status active'>{company.situacao}</p> : 
                    <p className='status inactive'>{company.situacao}</p>}
                  </td>
                  <td data-cell="Ações">
                    {/* Editar Empresa */}
                    <Link to={`/company/edit/${company.id}`}>
                      <button className="btn_actions" aria-label='Editar'><i className="bi bi-pen-fill"></i></button>
                    </Link>

                    {/* Deletar Empresa */}
                    <button className="btn_actions" onClick={() => deleteCompany(company.nomeFantasia)} aria-label='Deletar'><i className="bi bi-x-lg"></i></button>

                    {/* Listar Pessoas Vinculadas */}
                    <Link to={`/users/${company.nomeFantasia}`}>
                      <button className="btn_actions" aria-label='Usuários'><i className="bi bi-people-fill"></i></button>
                    </Link>

                    {/* Modificar o Status de uma Empresa */}
                    {company.situacao === "Ativa" ? 
                      <button className="btn_actions" onClick={() => inactivateCompany(company.nomeFantasia)} aria-label='Inativar'><i className="bi bi-ban"></i></button> : 
                      <button className="btn_actions" onClick={() => activateCompany(company.nomeFantasia)} aria-label='Ativar'><i className="bi bi-check2"></i></button>
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Company