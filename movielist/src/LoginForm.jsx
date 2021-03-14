import React,{useState} from 'react';



const LoginForm = (props) =>  {

 
  const[formValues,setFormValues] = useState({email:'',password:''});
  
const handleChange = (event) => {
  const {name,value} = event.target;
  const newFormValues = {
    ...formValues,
    [name]:value,
  };
  setFormValues(newFormValues);
}

const handleSumbit=(event)=>{
  event.preventDefault();
  console.log('aktuelle Daten',formValues);
}

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSumbit}>
          <input name="email" value={formValues.email} onChange={handleChange} />
          <input type="password" name="password" value={formValues.password}  onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );




  }


export default LoginForm;
