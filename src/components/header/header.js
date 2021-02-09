import { Link, useHistory } from 'react-router-dom';

import './styles.css';


function Header(){

    return(
            <header className='header-container' >
                <Link to='/' className='header-link' >
                    <span>Home</span>
                </Link>
                <Link to='/cadastro-pj' className='header-link' >
                    <span>Cadastre sua empresa</span>
                </Link>
                <Link to='/login' className='header-link'>
                    <span>Entrar</span>
                </Link>
            </header>
        );
}

export default Header;

    
