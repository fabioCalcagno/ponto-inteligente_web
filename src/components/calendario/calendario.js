import  { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import BackupSharpIcon from '@material-ui/icons/BackupSharp';
import { Button,  TextField } from '@material-ui/core';

import api from '../../services/api';
import { getAuthTokenAuthorization } from '../../utils/authUtils';
import './calendario.css'



const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'descricao', headerName: 'Descrição', width:200 },
    { field: 'tipo', headerName: 'Tipo lançamento', width:200 },
    { field: 'localizacao', headerName: 'Localização', width:200 },
    { field: 'data', headerName: 'Data', width:200 },
  ];


export default function EnhancedTable(props) {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [pageableObject, setPageableObject] = useState({
    number:0,
    numberOfElements:0,
    totalElements:0,
    totalPages:0,
  })

  function getList(funcionarioId, page){
    setLoading(true)
    api.get(`/api/lancamentos/funcionario/${funcionarioId}?pag=${page}`,{
        headers: { 'Content-Type': 'application/json','Authorization': getAuthTokenAuthorization() }
    }).then((response)=>{
        setRowData(response.data.data.content)
        let array =[];

        Object.keys(response.data.data).map((dataField, index) =>(
            Object.keys(pageableObject).map((field) =>(
              dataField === field ? array[field] = response.data.data[dataField] : null
            ))
        ))
        setPageableObject(array)
       setLoading(false)
    }, (onRejected => console.log(onRejected)));
  }

  useEffect(()=>{
    if(rowData.length === 0){
      getList(props?.funcionarioId, page)
    }
  });

  function handleRowSelected(cellData){
      setSelectedRow({...cellData.row})
  }

  const handlePageChange = (params) => {
    setPage(params.page - 1);
    let pagi = params.page - 1;
    getList(props?.funcionarioId, pagi)
    console.log(params)
  };

  function handleFormClose(event){
    event.preventDefault()
    setSelectedRow(false);
  }

  return (
  <>
    {
      selectedRow &&
         <div className='calendario-update--form-container' onClick={e => handleFormClose(e)} > 
          <form  className='calendario-update--form' noValidate autoComplete="off" >
            {
              Object.keys(selectedRow).map((keyName, index)=>(
                keyName==='funcionarioId' || keyName==='id' ?
                  <TextField className='disabled' disabled  size='small' key={index} label={keyName} value={selectedRow[keyName]} />
                  :
                  <TextField  key={index} label={keyName} value={selectedRow[keyName]} />
                ))
            }
            <Button
                variant="contained"
                color="primary"
                startIcon={<BackupSharpIcon color='secondary' />}
              >
                Atualizar
            </Button>
          </form> 
      </div>   
    }

    <div className='calendario-wrapper'>
      <DataGrid rows={rowData} columns={columns} 
                
                disableMultipleSelection
                //disableExtendRowFullWidth='true'
                rowsPerPageOptions={[25]}
                paginationMode="server"
                rowCount={pageableObject.totalElements} 
                pageSize={25}
                count={pageableObject.totalElements}
                loading={loading}
                onCellClick={(onCellClick)=> handleRowSelected(onCellClick)}
                onPageChange={PageChangeParams=>{handlePageChange(PageChangeParams)}}
                />
    </div>
  </>
  );


}
