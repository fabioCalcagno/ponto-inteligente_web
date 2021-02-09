import { useEffect, useState } from 'react';
import { TreeItem, TreeView } from "@material-ui/lab";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useJwt } from 'react-jwt';
import { getToken } from '../../utils/authUtils';
import './styles.css'
import LancarHora from '../../components/LancarHora/lancarHora';
import EnhancedTable from '../../components/calendario/calendario';
import AlarmAddSharpIcon from '@material-ui/icons/AlarmAddSharp';


function AreaUsuario(){

    const [roleAdmin, setRoleAdmin] = useState(false);
    const [selectedOption, setSelectedOption ] = useState()
    const { decodedToken, isExpired } = useJwt(getToken());

    console.log(decodedToken, isExpired);

    useEffect(()=>{
        if(decodedToken?.role === 'ROLE_ADMIN'){
            setRoleAdmin(true)
        }
    },[decodedToken,isExpired])



    return(
        <div className='userarea-column-container'>
                <div className='tree-wrapper' >
                    <TreeView className='personal-tree'
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    >
                        <TreeItem className='tree-item' nodeId="1" label="Lançamento de horas" >
                            <TreeItem end className='tree-item' nodeId="2" label="Calendário" onClick={e =>  setSelectedOption(<EnhancedTable funcionarioId={decodedToken?.id} />) }  />
                            <TreeItem className='tree-item' nodeId="3" label="Lançar hora" onClick={e=> setSelectedOption(<LancarHora  id={decodedToken?.id} />)} />
                            <TreeItem className='tree-item' nodeId="4" label="Editar lançamentos" />
                        </TreeItem>

                        <TreeItem className='tree-item' nodeId="5" label="Perfil">
                            <TreeItem className='tree-item' nodeId="10" label="Dados Pessoais" />
                            <TreeItem className='tree-item' nodeId="6" label="Dados da empresa" />
                        </TreeItem>

                        {
                            roleAdmin &&
                            <TreeItem className='tree-item' nodeId="7" label="Área do administrador">
                                <TreeItem className='tree-item' nodeId="8" label="Opções de edição" />
                                <TreeItem className='tree-item' nodeId="9" label="Adicionar Funcionário" />
                            </TreeItem>
                        }
                        
                    </TreeView>
                </div>

                <main>
                        {selectedOption ||
                        <div className='user-area_initial-background' >
                            <span>Trabalhe onde quiser, <br></br>registre suas horas em tempo real!</span>
                        </div>
                        }
                        {
                            !selectedOption &&
                            <div className='grettings-span unselected-field' >
                                <span>Olá {decodedToken?.sub} </span>
                            </div>
                        }
                </main>
            </div>
        
    
    );
}
export default AreaUsuario;