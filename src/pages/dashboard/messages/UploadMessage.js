import React, { useEffect, useRef, useState } from 'react'
import '../upload/upload.css'
import { useValue } from '../../../context/ContextProvider';
import Notification from '../../../components/Notification';
import Loading from '../../../components/Loading';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as Excel from 'xlsx';
import { sendBulkSMSApi } from '../../../actions/messages';
import SenderIdMenu from './SenderIdMenu';
import { UPDATE_ALERT, countGsmSegments, updateAlertFunction } from '../../../actions/utils/commonConstant';
import { getBalance } from '../../../actions/balance';

const UploadMessage = ({ setSelectedLink, link }) => {
 
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [fileName, setFileName] =useState(null);
    const { state: { currentUser, senderName, balance },  dispatch } = useValue();
    const [excelDisplay, setExcelDisplay] = useState([]);
    const [sendBtnStatus, setSendBtnStatus] = useState(true);
    

    const user = { user: currentUser };
    useEffect(() => {
      setSelectedLink(link);
  
      getBalance( user, dispatch)
  
    });

    const [inputs, setInput] = useState({ message : ''  });
    const tagRef = useRef();
    
    const handleInputChange = (event) => {
        event.preventDefault();
          setInput(() => ( {
              [event.target.name] : event.target.value,
          }
       ));
      };

    const columns = [
        { field: "id", headerName: "ID", width: 20, flex: 1 },
        { field: "number", headerName: "PhoneNumber", width: 120, flex: 1 },
      ];

    const addExcelItems = (inputItem) => {
        setExcelDisplay(prevItems => {
          return [...prevItems, inputItem];
        });
      }


    const handleFile=(e)=>{
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&fileTypes.includes(selectedFile.type)){
                setFileName(selectedFile.name);
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload=(e)=>{
                  setExcelFile(e.target.result);
                }
              }
              else{
                setTypeError('Please select only excel file types');
                setExcelFile(null);
              }
            }
            else{
              console.log('Please select your file');
              alert('Please select your file');
            }
          }
      
         //call the api now 
    const sendBulkSMS = async (e) => {
        e.preventDefault();
                
        const { message } = inputs;
        const tag = tagRef.current.value;

         try {
            const numbers_excel =  excelDisplay.map((value) =>  {
            const phoneNum = value.number
            const number_object =  phoneNum.toString();
          
            return number_object
                });
            
            
            const message_object = { phoneNumbers: numbers_excel, sid: senderName,  message: message, user: currentUser, tag: tag }
     
            const messages_count = numbers_excel.length;
            const messages_cost = countGsmSegments(inputs.message) * 25 * messages_count;
            const balanceInt = parseInt(balance.balance);
    
            if(  balanceInt > messages_cost ) { 
              sendBulkSMSApi(message_object, dispatch);
            } else if (messages_cost > balanceInt) {
              updateAlertFunction(dispatch, 'error' , UPDATE_ALERT , 'You do not have enough balance to send Airtime');  
     
            } else {
              updateAlertFunction(dispatch, 'error', UPDATE_ALERT, 'Wrong amount input, please correct the amount')
            }
         } catch (err) {
            updateAlertFunction( dispatch, 'error' , UPDATE_ALERT, err.message);
         }
        
        
               
        setSendBtnStatus(true);
        setExcelDisplay([]);
        setInput({ message : '' , tag: ''});
              } 

            // submit event
    const handleFileSubmit=(e)=>{
  
    
        if(excelFile!==null){
                  
            const workbook = Excel.read(excelFile,{type: 'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = Excel.utils.sheet_to_json(worksheet);
            
            data.forEach((value, keyin) => {
                
            const entryz = Object.entries(value)
            const id = keyin+1;
            // console.log('The number entries is now : ' + entryz[0][1]);
            
            addExcelItems( {id: id, number: entryz[0][1]} )
            
                })
            setSendBtnStatus(false);
                }
              }

  return (
    <div>
      <Notification />
      <Loading />  
    <div className='uploadAirtime'>
      <div className="userTitleContainer">
      <h2 className="userTitle">Upload Contacts and View Excel Sheets</h2>
  
        <Button variant='outlined'
          disabled = { sendBtnStatus && senderName } sx={{ marginBottom: 4 }}
          onClick={ sendBulkSMS }  >Send Messages</Button>
  
</div>

<div className="userShow">
      <div className="userShowTop">
      
      </div>
        <div className="wrapper">

        <Box p={3} border= "1px dashed #ccc" borderRadius={8} textAlign= "center">

          <input  
            type='file'
            accept='.xlsx, .xls'
            required 
            onChange={handleFile}
            style={ { display : 'none' } }
            id='excel-file-input'
          />
          <label htmlFor='excel-file-input'>
                <Button variant='outlined' component='span'>
                  Select Excel File
                </Button> </label>

          {  excelFile && ( <div> 
            <Typography variant='subtitle1' mt={2}>
              Selected File : {fileName}
            </Typography>
            <Button 
              variant='contained'
              color='primary'
              onClick={ handleFileSubmit }> Retrieve file</Button>
          </div>  
          )}

          {  typeError && ( <Typography variant='body2' color='secondary' mt={2}>
            {typeError}
          </Typography> )  }
           
        </Box>

        <div>
<Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        ml: 0, mt: 5, 
        alignItems: 'center',
        justifyContent: 'center'
      }}
      noValidate
      autoComplete="off"
    >
       <TextField
          sx={{ mr: 5 }}
          onChange={ handleInputChange }
          name='message'
          value={inputs.message}
          id="outlined-multiline-flexible"
          label="Enter the message here"
          variant='outlined'
          type='text'
          multiline
          rows={4}
          style={{ width: 400}}
        />
        <Typography style={{ alignSelf: 'center' }}
                    sx={{ mr: 5 }}> SMS count : {  countGsmSegments(inputs.message)  } </Typography>

        <SenderIdMenu />

        <TextField
          margin="normal"
          variant='outlined'
          id='tag'
          label='Enter Tag'
          type='text'
          inputRef={ tagRef }
          sx={{ ml: 8 }}
          name='tag'
          style={{ width: 230 }}
        />
    </Box> 
</div>
        <div className='uploadExcel'>
         
              {
                excelDisplay.length > 0 && (
                  <DataGrid
                    rows={ excelDisplay }
                    disableSelectionOnClick
                    columns={columns}
                    initialState={{
                      pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                    }}
                    pageSizeOptions={[10, 20]}
                    checkboxSelection />
                  
                  )
              }
            </div>

        </div>
        
    </div>
</div>


</div>
  )
}

export default UploadMessage;