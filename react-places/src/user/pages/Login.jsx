import React, { useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './Auth.css';


const Login = (props) => {
  const  auth = useContext(AuthContext);
  const {isLoading, error, sendRequest,clearError} = useHttpClient();
  const[formState,inputHandler] = useForm(
    {
      email:{
        value:'',
        isValid:false
      },
      password: {
        value:'',
        isValid:false
      },},
      false
  );
 
  const loginSubmitHandler = async(event) => {
    event.preventDefault();

    try{
      const url = process.env.REACT_APP_BACKEND_URL + '/users/login';
      const login = {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      }
      const responseData = await sendRequest(url,'Post',login,{'Content-Type':'application/json'});
      auth.login(responseData.userId, responseData.token);
    } catch(error){
      console.log(error);
    }
    
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError}/>
      <Card className="authentication">
      {isLoading && <LoadingSpinner asOverlay/>}
      <h2>Login required</h2>
      <form onSubmit={loginSubmitHandler}>
          <Input element="input" id="email" type="email" label="E-Mail"  validators={[VALIDATOR_EMAIL()]} errorText="Please enter a valid email adress" onInput={inputHandler}></Input>
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters"
            onInput={inputHandler}
          />
        <Button type="submit" disabled={!formState.isValid}>
          LOGIN
        </Button>
      </form>
      <Button inverse to="/signUp"> 
        SWITCH TO SIGN UP
      </Button>
      </Card>

    </>

  );
};

export default Login;
