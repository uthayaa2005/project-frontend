import React, { useState } from 'react';
import { BiHeart, BiHome, BiSolidCameraMovie, BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';



const SigninPage = () => {

  const backendUrl = process.env.REACT_BACKEND_URL;

  const [formData, setFormData] = useState({
    email: '',
    password: ''
    });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
     
    const { name, value } = e.target;
    console.log(`email: ${name}, value: ${value}`);
    
    setFormData({
    ...formData,
    [name]: value
  });
};
    
  const handlePasswordInputChange = (e) => {
   const { name, value } = e.target;
   console.log(`password: ${name}, value: ${value}`);
  
   setFormData({
    ...formData,
    [name]: value
  });
};
    
   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in both email and password fields.");
      return;
     }
     
     try {
       
      const response = await fetch(`${backendUrl}/api/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
       
      if (!response.ok) {
        throw new Error('Invalid email or password');
      }
      
      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token in local storage
      navigate('/home'); // Redirect to home page
    } catch (error) {
      console.error(error);
      alert('Failed to sign in. Please check your credentials.');
    }
  };
  const handleSignup = () => {
    navigate('/signup')
  }



  return (
    <>
      
      {/* Header */}
       <div className='bg-warning p-3 d-flex justify-content-between align-items-center'>
            <h1 className="d-flex align-items-center">
                <BiSolidCameraMovie size={60} className='me-2' /> CineSearch
            </h1>
      </div>
      

    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src="https://i.pinimg.com/736x/22/1f/53/221f530242648b865105694277382974.jpg"
              className="img-fluid" alt="Phone image" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <h3 className='mb-2'>Sign In</h3>
              {/* Email input */}
              <div data-mdb-input-init className="form-outline mb-4">
                <input type="email" id="email"  onChange={handleInputChange} name="email" className="form-control form-control-lg" />
                <label className="form-label" htmlFor="form1Example13">Email address</label>
              </div>

              {/* Password input */}
              <div data-mdb-input-init className="form-outline mb-4">
                  <input type="password" id="password" name="password" onChange={handlePasswordInputChange} className="form-control form-control-lg" />
                <label className="form-label" htmlFor="form1Example23">Password</label>
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                {/* Checkbox */}
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="form1Example3"  />
                  <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                </div>
                <a href="#!">Forgot password?</a>
              </div>

              {/* Submit button */}
              <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-warning btn-lg btn-block">Sign in</button>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>
                <div>
                  <p>Dont't have an account ? <a href='/signup'>Sign Up</a></p>
                </div>
            </form>
          </div>
        </div>
      </div>
      </section>
      
       </>
  );
};

export default SigninPage;
