import React from 'react'
import { Send } from '@mui/icons-material';
import { useValue } from '../../context/ContextProvider';
import { useEffect, useRef, useState } from 'react';
import PasswordField from './PasswordField';
import {
  Box,
    Button,
  
    TextField,
    Typography,

} from '@mui/material';
import { register, loginUser } from '../../actions/users';
import { UPDATE_ALERT, updateAlertFunction } from '../../actions/utils/commonConstant';


const Login = () => {

    const { state: { registered }, dispatch,  } = useValue();
    const [title, setTitle] = useState('Login');
    const [isRegister, setIsRegister] = useState(false);
    const nameRef = useRef();
    const secondRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

      if (!isRegister) return loginUser({ email, password }, dispatch);

        
        const confirmPassword = confirmPasswordRef.current.value;
        
            if (password !== confirmPassword) {
        updateAlertFunction(dispatch, 'error', UPDATE_ALERT, 'Passwords do not match');
        return
    }
    const name = nameRef.current.value;
    const secondName = secondRef.current.value;
    register({ name: name, lastname: secondName, email: email, password: password }, dispatch);
    
    if(registered) {
        setIsRegister(!isRegister);
        dispatch({ type: 'CLOSE_REGISTER'  });
        };

    }

    useEffect(() => {
       
        isRegister ? setTitle('Register') : setTitle('Login');
      }, [isRegister]);
    return (
      <form onSubmit={ handleSubmit }>
          <Box  display= "flex" flexDirection={"column"} 
            maxWidth={400} 
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
                { isRegister && (<TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="name"
                    label="First Name"
                    type="text"
                    fullWidth
                    inputRef={nameRef}
                    inputProps={{ minLength: 2 }}
                    required
                                />
                )}

                { isRegister && (<TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="second"
                    label="Second Name"
                    type="text"
                    fullWidth
                    inputRef={secondRef}
                    inputProps={{ minLength: 2 }}
                    required
                                />
                )}

                <TextField
                    autoFocus={!isRegister}
                    margin="normal"
                    variant="standard"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    inputRef={ emailRef }
                    required
                />

                <PasswordField {...{ passwordRef }} />

                {isRegister && (
                    <PasswordField
                        passwordRef={ confirmPasswordRef }
                        id="confirmPassword"
                        label="Confirm Password"
                />
                )}

                <Button type="submit" variant='contained' endIcon = {<Send />}
                 sx={ { marginTop : 3, marginBottom : 5, borderRadius : 4 }} > 
                 { title } </Button>

                 <div>
                 { isRegister
                    ? <Typography variant='body2'>Do you have an account? Sign in now</Typography> 
                    :  <Typography variant='body2'>Don't you have an account? Create one now</Typography>  }
                        <Button onClick={() => setIsRegister(!isRegister)}>
                            {isRegister ? 'Login' : 'Register'} </Button>
                 </div>
          </Box>
      </form>
  )
}

export default Login