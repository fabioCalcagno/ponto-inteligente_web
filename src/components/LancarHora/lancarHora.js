import React, { useEffect, useState } from 'react';
import { Switch, TextField, makeStyles, FormControl, InputLabel, Select, MenuItem, Button, Backdrop, CircularProgress, IconButton, FormControlLabel } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import UpdateIcon from '@material-ui/icons/Update';

import './lancarHora.css';
import api from '../../services/api';

import { getAuthTokenAuthorization } from '../../utils/authUtils';
import { Alert } from '@material-ui/lab';
 


function LancarHora(props){
    
    const [funcionarioId, setFuncionarioId]= useState();
    const [descricao, setDescricao] = React.useState('');
    const [tipo, setTipo] = React.useState('');
    const [data, setData] = useState(Date);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
       show: false,
       alertType: '',
       alertMessage: ''
    });

    useEffect(()=>{
        if(props?.id){
            setFuncionarioId(props.id);
        }        
    }, [props])
    

  function onSubmit(e){
    e.preventDefault();
      setLoading(true);
      
    const today = new Date();
    setData(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds())
    const dados = JSON.stringify({
        descricao,
        tipo,
        data,
        funcionarioId
    });
    
    
     api.post('/api/lancamentos', dados, {
        headers: {'Content-Type': 'application/json',
                  'Authorization': getAuthTokenAuthorization()  },
               
    }).then(response=>{
        setLoading(false);
        response.status === 200 ? 
            setAlert({show: true, alertType: 'success', alertMessage: 'Lançamento realizado com sucesso!'})
            :
            setAlert({show:true , alertMessage: 'Ocorreu algum erro ao enviar o lançamento, tente novamente', alertType: 'error'});
    },((error) => { 
        setLoading(false);
        console.log(error);
    })); 
}    

    return(
        <div className='lancar-hora--column-container' >
        {
        loading &&
               <div className='teste'>
                    <Backdrop open={loading} >
                        <CircularProgress size={68}  />
                    </Backdrop>
               </div>
            }            
            <form  onSubmit={e=> onSubmit(e)} >
                
                    <h2 className='unselected-field' >
                        <UpdateIcon color="primary"/>
                        Lançamento de horas 
                    </h2>
                
                <TextField fullWidth 
                    value={descricao} 
                    label='Descrição' 
                    onChange={e=> setDescricao(e.target.value)}
                />               
                
                <FormControl className='form-control'>
                        <InputLabel id="demo-simple-select-label">lançamento</InputLabel>
                        <Select
                            value={tipo}
                            onChange={event => setTipo(event.target.value)}
                        >
                        <MenuItem value={'INICIO_TRABALHO'}>Início do trabalho</MenuItem>
                        <MenuItem value={'INICIO_ALMOCO'}>Início do  almoço</MenuItem>
                        <MenuItem value={'TERMINO_ALMOCO'}>Término do almoço</MenuItem>
                        <MenuItem value={'INICIO_PAUSA'}>Início da pausa</MenuItem>
                        <MenuItem value={'TERMINO_PAUSA'}>Término da pausa</MenuItem>
                        <MenuItem value={'TERMINO_TRABALHO'}>Término do trabalho</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel 
                            control={
                            <Switch
                                checked={location.checkedB}
                                onChange={handleLocationChange}
                                name="locationCheck"
                                color="primary"
                            />
                            
                            }
                            labelPlacement="end"
                            label="Usar Localização atual?"
                            
                        />
                
                    
                    <Button type='submit' startIcon={<SaveIcon />} variant="contained" color="primary" >Enviar</Button>
              
            </form>
            
       
        {
            alert.show &&
            <Alert  severity={alert.alertType}
                action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setAlert({show:false});
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                }
            >
                {alert.alertMessage}
            </Alert>
        }
       </div>

    );
}

export default LancarHora;