import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { saveContacts } from '../../../actions/contacts';
import { useValue } from '../../../context/ContextProvider';
import { DataGrid } from '@mui/x-data-grid';
import * as Excel from 'xlsx';
import '../upload/upload.css'
import { UPDATE_ALERT, updateAlertFunction } from '../../../actions/utils/commonConstant';
import Notification from '../../../components/Notification'
import Loading from '../../../components/Loading'

export const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));
  

const Contacts = ({ setSelectedLink, link }) => {

    const [ inputs, setInput ] = useState({ phonenumber : '',  names : '', group: '' });
    const [ isAttach, setIsAttach ] = useState(false);

    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [fileName, setFileName] =useState(null);
    const [excelDisplay, setExcelDisplay] = useState([]);

    const { state: { currentUser }, dispatch } = useValue();

    useEffect(() => {
        setSelectedLink(link);
      });

    const handleInputChange = (event) => {
        event.preventDefault();
          setInput((prevState) => ( {
              ...prevState, 
              [event.target.name] : event.target.value,
          }
       ));
      }

    const savingContacts = (e) => {

        e.preventDefault();

        const grouping = inputs.group ? inputs.group : ''
        try {
            if(isAttach) {
                const contacts = excelDisplay.map(convertNumber => {
                    const contactObj = { names: convertNumber?.names, phonenumber: convertNumber.number, 
                                        user: currentUser.email, group: grouping, 
                                        };
    
                    return contactObj;
                })
                saveContacts(contacts, dispatch)
                setIsAttach(false);
            } else {
                const contact = [{names: inputs.names, phonenumber: inputs.phonenumber, user: currentUser.email, 
                                    group: grouping}];
    
                saveContacts(contact, dispatch);
            }
            setInput({ phonenumber: '',  names: '', group: '' } ); 
            setExcelDisplay([]);  
        } catch (error) {
            updateAlertFunction(dispatch, 'error', UPDATE_ALERT, error.message)   
            }    
    }

    const columns = [
        { field: "id", headerName: "ID", width: 40 },
        { field: "number", headerName: "PhoneNumber", width: 120, flex: 1 },
        { field: 'names',  headerName: 'Names', width: 120, flex:1}
      ]


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

                // submit event
    const handleFileSubmit=(e)=>{
        e.preventDefault();
        if(excelFile!==null){
                              
            const workbook = Excel.read(excelFile,{type: 'buffer'});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = Excel.utils.sheet_to_json(worksheet);
                        
            data.forEach(( value, keyin ) => {
                            
            const entryz = Object.entries(value)
            const id = keyin+1;
            // console.log('The number entries is now : ' + entryz[0][1]);
           const checkNumber = entryz[0][1];
           const checkNumberStr = checkNumber.toString();
            if( checkNumberStr.length === 12  && checkNumberStr.startsWith('255')) {
              addExcelItems({  id: id, number: entryz[0][1], names: entryz[1][1]  });
            }   else {
                updateAlertFunction( dispatch, 'error', UPDATE_ALERT, 'Please correct your numbers');
                return
            }        

                });
            setIsAttach(true);
                }
        }


  return (
    <div>
        <div>
            <Notification />
            <Loading />
        </div>

        <form onSubmit={ savingContacts }>
          <Box 
            display= 'flex'
            flexDirection={'column'}
            maxWidth={ 800 } 
            alignItems={"center"} 
            justifyContent={'center'} 
            margin={"auto"}
            marginTop={5}
            padding={5}
            borderRadius={5}
            boxShadow={"5px 5px 10px #ccc"}
            sx={{":hover" : {
                boxShadow : "10px 10px 20px #ccc"
            }
                }}>

            <Typography variant='h3' padding={4} textAlign={'center'}> Save Contacts </Typography>

            <Box
                sx={{
                display: 'flex',
                mt: 4,   
                ml: 0, 
                }}
                noValidate
                autoComplete="off"
                >

                <TextField
                    onChange={ handleInputChange }
                    name='names'
                    value={inputs.names}
                    label = 'Names of person'
                    placeholder='John Kamara'
                    variant='outlined'
                    type='text'
                    required= {!isAttach}
                    helperText = {!inputs.names ? 'The name is required' : ''}
                    style={{ width: 320}}
                    sx={{ alignSelf: 'start', marginRight: 4 }}
                />

                <TextField
                    onChange={handleInputChange}
                    name='phonenumber'
                    value={inputs.phonenumber}
                    label = 'Phone Number'
                    placeholder='255754100100'
                    variant='outlined'
                    type='text'
                    required={!isAttach}
                    helperText = {!inputs.phonenumber ? 'Phonenumber is required' : ''}
                    style={{ width: 230}}
                    
                    inputProps={{ maxLength: 12 }}
                />
            </Box>


        <Root> 
        
        
            <Divider  textAlign='center' sx={{ marginTop: 4 }} > Tag the contact</Divider>
            
            <TextField
                onChange={handleInputChange}
                name='group'
                value={inputs.group}
                label = 'name of group'
                placeholder='kamati'
                variant='standard'
                type='text'
                helperText = {!inputs.group ? 'The name of Group is required' : ''}
                style={{ width: 300 }}
                sx={{ alignSelf: 'start' , marginLeft: 10 }}
            /> 

            <Divider textAlign='center' sx={{ marginTop: 4 }}>Upload contact</Divider>

            <div className="wrapper">

                <Box p={ 3 }  border= "1px dashed #ccc" borderRadius={ 8 } textAlign= "center">

                    <input  
                        type='file'
                        accept='.xlsx, .xls'
                        onChange={ handleFile }
                        style={ { display : 'none' } }
                        id='excel-file-input'
                        />
                    <label htmlFor='excel-file-input'>
                        <Button variant='outlined' component='span'> Select Excel File </Button> </label>

                    {  excelFile && ( <div> 
                    <Typography variant='subtitle1' mt={2}>
                        Selected File : { fileName }
                    </Typography>
                    
                    <Button 
                        variant='outlined'
                        color='primary'
                        onClick={ handleFileSubmit }> Retrieve file</Button>
                        </div>  
                        )}

                    {  typeError && ( <Typography variant='body2' color='secondary' mt={2}>
                        {typeError}
                    </Typography> )  }
   
                </Box> 
            </div> 
        </Root>
        

            <Button variant='contained' type= 'submit' 
            sx={ {  marginTop : 8 , borderRadius : 4 }}   >
                { isAttach ? 'Upload Contact' : 'Save Contact' }
            

            </Button>
          </Box>
        </form>

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
  )
}

export default Contacts;