import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Form from '../../components/form/form';
import Header from '../../components/header/header';
import Input from '../../components/input/input';
import api from '../../services/api'
import {setToken} from '../../utils/authUtils';
import './login.css';

function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    

    async function handleSubmit(event){

        setLoading(true);
        event.preventDefault()
        let data = JSON.stringify({
            email,
            senha
        })
        
        api.post('/auth',data, {
            headers: {'Content-Type': 'application/json'}
        }).then(response=>{
            setLoading(false)

            if(response.status === 200){
                console.log(response)
                setToken(response.data.data.token);
                return history.push('/area-usuario');
            }     
            setLoading(false)
            
        });
    }    

    return (
    <div className='column-container' >
        <Header />
        <div className='container' >
            <div className='login-content' ></div>
            <div className='login-content' >
                <div className='card-container'>
                    <h3>Entre com seu usuário</h3>
                    <Form onSubmit={event=>{handleSubmit(event)}}
                        buttonLabel='Entrar'>

                        <Input label='Usuário:' 
                        onChange={event=>{setEmail(event.target.value)}}
                        value={email}
                        type='email'
                        placeholder="exemplo@exemplo.com"
                        />
                        <Input label='Senha:' 
                        onChange={event=>{setSenha(event.target.value)}}
                        value={senha}
                        type='password'
                        />
                    </Form>
                    
                </div>
            </div>
            {
                loading && 
               <div className='backdrop-wrapper' >
                    <Backdrop open={loading} >
                        <CircularProgress size={68}  />
                    </Backdrop>
                </div> 
            }
        </div>
    </div>
    
    );
}

export default Login;