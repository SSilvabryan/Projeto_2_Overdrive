// CSS
import './Home.css'

// Icons
import { BsPersonCircle, BsBriefcaseFill } from 'react-icons/bs'
import { FaInstagram, FaYoutube, FaFacebookSquare } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

import { Link } from 'react-router-dom'
import { showMenu } from '../../functions/showMenu';

const Home = () => {
  
  const sr = ScrollReveal ({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
  });

  sr.reveal('#crud-text', {delay: 200, origin: 'top'});
  sr.reveal('#crud-img', {delay: 550, origin: 'top'});

  return (
    <div className='home'>
      <header>
        <Link to="/" id='logo'>Overdrive</Link>

        <nav id="navlist">
          <Link>Home</Link>
          <Link>About</Link>
          <Link>Comidas</Link>
          <Link>Contato</Link>
          <Link>Suporte</Link>
        </nav>

        <div className='bi bi-list' id='menu-icon' onClick={showMenu}></div>
      </header>

      <section id='crud'>
        <div id="crud-text">
          <h5>Bryan Silva &copy;2024</h5>
          <h4>bryan.ssilva165@gmail.com</h4>
          <h1>CRUD</h1>
          <p>Create - Read - Update - Delete</p>
          <Link to="/person"><i><BsPersonCircle /></i> Pessoas</Link>
          <Link to="/company"><i><BsBriefcaseFill /></i> Empresas</Link>
        </div>

        <div id="crud-img">
          <img src="../../../favicon.png" alt="Logo Hacker" />
        </div>
      </section>

      <div id="icons">
        <Link><FaInstagram /></Link>
        <Link><FaFacebookSquare /></Link>
        <Link><FaYoutube /></Link>
      </div>

      <div id="scroll-down">
        <Link><IoMdArrowDropdown /></Link>
      </div>
    </div>
  )
}

export default Home