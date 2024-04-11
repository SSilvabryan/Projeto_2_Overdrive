// CSS
import './Dashboard.css'

import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

// Functions
import filter from '../../functions/Filter';
import { menuDashboard } from '../../functions/menuDashboard';

// Hooks
import { useFetch } from '../../hooks/useFetch';
import {useParams} from 'react-router-dom'
import { useState } from 'react';

const url = "http://localhost:3000/person"

const Users = () => {

  const {data: people, error} = useFetch(url)

  const {nomeFantasia} = useParams()

  const [user, setUser] = useState(false)
  
  const deleteUser = (nome) => {
    Swal.fire({
      title: `Tem certeza que deseja <strong><u>Deletar</u></strong> ${nome}?`,
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
          text: `${nome} foi excluído(a) com sucesso.`,
          icon: "success"
        });
      }
    });  
  }

  const inactivateUser = (nome) => {
    Swal.fire({
      title: `Realmente deseja <strong><u>Inativar</u></strong> ${nome}?`,
      text: "Saiba que seu vínculo com a empresa será quebrado.",
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
          text: `${nome} foi inativado(a) com sucesso.`,
          icon: "success"
        });
      }
    }); 
  }

  const activateUser = (nome) => {
    Swal.fire({
      title: `Realmente deseja <strong><u>Ativar</u></strong> ${nome}?`,
      html: `<p>Escolha uma empresa para o vínculo.</p><br>
        <div className="select">
          <select name="company">
            <option value="1">Overdrive</option>
            <option value="2">Empreendimentos Vaz</option>
            <option value="3">Auto Peças Moura</option>
            <option value="4">Lavanderia Billé</option>
          </select>
          <label htmlFor="company">Empresa</label>
        </div>
      `,
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
          text: `${nome} foi ativado(a) com sucesso e vinculado(a) a empresa escolhida.`,
          icon: "success"
        });
      }
    }); 
  }

  const pendingUser = (nome) => {
    Swal.fire({
      title: `Realmente deseja tornar ${nome} <strong><u>Pendente</u></strong>?`,
      text: "Saiba que seu vínculo com a empresa será quebrado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, tornar Pendente!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Pendente!",
          text: `${nome} tem seu Status como Pendente agora.`,
          icon: "success"
        });
      }
    });   
  }

  return (
    <div id="body-dashboard">
      <header id='header'>
        <Link to="/" id='logo'>OVERDRIVE</Link>

        <nav id="nav">
          <Link to="/person/add">Cadastrar Pessoa</Link>
          <Link to="/company">Empresas</Link>
        </nav>

        <div className='bi bi-list' id='menu-icon' onClick={menuDashboard}></div>
      </header>

      <div id="container">
        <div id="table_header">
          <h2>{nomeFantasia}</h2>

          <div id="search">
            <form>
              <input onInput={filter} type='search' placeholder="Pesquisar"/>
              <button id="btn_search" className="button"><i className="bi bi-search"></i></button>
            </form>
          </div>
        </div>
        
        <table id="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">CPF</th>
              <th scope="col">Telefone</th>
              <th scope="col">Usuário</th>
              <th scope="col">Status</th>
              <th scope="col">Acões</th>
            </tr>
          </thead>
          <tbody>
            {error && <p>{error}</p>}

            {people && 
              people.map((person) => (
                person.empresa == nomeFantasia &&
                <tr key={person.id}>
                  <td data-cell="#">{person.id}</td>
                  <td data-cell="Nome">{person.nome}</td>
                  <td data-cell="CPF">{person.cpf}</td>
                  <td data-cell="Telefone">{person.telefone}</td>
                  <td data-cell="Usuário">{person.usuario}</td>
                  <td data-cell="Status">
                    {/* Status Pendente */}
                    {person.status === "Pendente" && <p className='status pending'>{person.status}</p>}

                    {/* Status Ativo */}
                    {person.status === "Ativo" && <p className='status active'>{person.status}</p>}

                    {/* Status Inativo */}
                    {person.status === "Inativo" && <p className='status inactive'>{person.status}</p>}
                  </td>
                  <td data-cell="Ações">
                    {/* Editar Pessoa */}
                    <Link to={`/person/edit/${person.id}`}>
                      <button className="btn_actions" aria-label='Editar'><i className="bi bi-pen-fill"></i></button>
                    </Link>

                    {/* Deletar Pessoa */}
                    <button className="btn_actions" onClick={() => deleteUser(person.nome)} aria-label='Deletar'><i className="bi bi-x-lg"></i></button>

                    {/* Inativar Pessoa */}
                    {person.status !== "Inativo" &&
                      <button className="btn_actions" onClick={() => inactivateUser(person.nome)} aria-label='Inativar'><i className="bi bi-person-fill-slash"></i></button>
                    }

                    {/* Ativar Pessoa */}
                    {person.status !== "Ativo" &&
                      <button className="btn_actions" onClick={() => activateUser(person.nome)} aria-label='Ativar'><i className="bi bi-person-fill-check"></i></button>
                    }

                    {/* Tornar Pendente */}
                    {person.status !== "Pendente" &&
                      <button className="btn_actions" onClick={() => pendingUser(person.nome)} aria-label='Tornar Pendente'><i className="bi bi-person-fill-dash"></i></button>
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

export default Users