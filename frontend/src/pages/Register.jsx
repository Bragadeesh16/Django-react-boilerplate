import { useState } from 'react';
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [password2,setpassword2] = useState()
  const navigate = useNavigate();

  const handleSubmit =  async (e) => {
    e.preventDefault();
    console.log('email:', email);
    console.log('Password:', password);
    console.log('Password2:', password2);
    try{
      const res = await api.post('register/',{email,password,password2})
      localStorage.setItem(ACCESS_TOKEN,res.data.access)
      localStorage.setItem(REFRESH_TOKEN,res.data.refresh)
      navigate('/')
    }
    catch(error){
      console.log(error)
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Enter your email"
            className="form-input"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password2">Confirm Password</label>
          <input
            id="password2"
            type="password2"
            placeholder="Enter your password"
            className="form-input"
            value={password2}
            onChange={(e) => setpassword2(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
