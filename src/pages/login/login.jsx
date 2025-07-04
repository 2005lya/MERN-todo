import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PasswordInput from '../../components/input/passwordinput';
import { validatedEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if(!validatedEmail(email)) {
            setError('Invalid email format');
            return;
        }

        if(!password) {
            setError('Password cannot be empty');
            return;
        }   

        setError("");

        try {
            const response = await axiosInstance.post('/login', { email, password });
            if (response.status === 200) {
                // Assuming the response contains a token or user data
                localStorage.setItem('token', response.data.accessToken); // Store token in localStorage
                navigate('/dashboard'); // Redirect to dashboard on successful login
            }
        } catch (err) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }else {
                setError("An error occurred during login. Please try again.");
            }

        }

    }

    return(
       <>
       <div className="flex items-center justify-center h-screen">
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>

            <input 
              type='text' 
              placeholder='Email' 
              className='input-box' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type='submit' className='btn-primary'>
              Login
            </button>

            <p className='text-sm text-center mt-4'>
              Not registered yet?{" "}
              <Link to ="/SignUp" className='font-medium text-primary underline'>
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
    )

}

export default Login