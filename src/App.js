import './App.css';
import {useState} from 'react';
import validator from 'validator';

function App() {
  
  const [signupInput, setSignUpInput] = useState(
    {
      email:"",
      password:"",
      confirmPassword:""
    }
  );

  const handlechange = (e) => {
    setSignUpInput({...signupInput,[e.target.name]:e.target.value,});
  };

  const [error, setError] = useState("");

  const handleClick = (e) => {
     e.preventDefault();
     if(!validator.isEmail(signupInput.email)){return setError("the email you entered is invalid");}
     else if(signupInput.password.length<5){return setError("password less than 5 chars");}
     else if(signupInput.password!= signupInput.confirmPassword){return setError("password does not match");}
  };

  return (
    <div className="container my-5">
      <form>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>Email address</label>
          <input type='email' id='email' name='email' className='form-control' value={signupInput.email} onChange={handlechange}/>
        </div>
        <div className= 'mb-3'>
          <label className='form-label' htmlFor='password'>Password</label>
          <input className='form-control' type='password' id='password' name='password' value={signupInput.password} onChange={handlechange}/>
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor='confirmPassword'>Confirm Password</label>
          <input className='form-control' type='password' id='confirmPassword' name='confirmPassword' value={signupInput.confirmPassword} onChange={handlechange}/>
        </div>
        {error && <p>{error}</p>}
        <button type="submit" onClick={handleClick}>Submit</button>
      </form>

    </div>
  );
}

export default App;
