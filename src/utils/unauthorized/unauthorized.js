

import { Button, Box, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import unauthorized from './svg/unauthorized.svg';

import './unauthorized.css';

function Unauthorized(){

    const history = useHistory();

    function goHome(e){
        e.preventDefault()
        history.push('/')
    }

    function login(e){
        e.preventDefault()
        history.push('/login')
    }

    return (
    <div className='container personal-container' >
        
        <img className='unauthorized-image' src={unauthorized} alt='unauthorized'  />
    </div>
    );
}

export default Unauthorized;