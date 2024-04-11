import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home/Home'
import Company from './pages/Dashboard/Company'
import AddCompany from './pages/Actions/Add/AddCompany'
import EditCompany from './pages/Actions/Edit/EditCompany'
import Person from './pages/Dashboard/Person'
import AddPerson from './pages/Actions/Add/AddPerson'
import EditPerson from './pages/Actions/Edit/EditPerson'
import Users from './pages/Dashboard/Users'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/company' element={<Company />} />
          <Route path='/company/add' element={<AddCompany />} />
          <Route path='/company/edit/:id' element={<EditCompany />} />
          <Route path='/person' element={<Person />} />
          <Route path='/person/add' element={<AddPerson />} />
          <Route path='/person/edit/:id' element={<EditPerson />} />
          <Route path='/users/:nomeFantasia' element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
