import React from 'react';
import { Link } from 'react-router-dom';
//import '/Signup.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

function Login() {
    //const navigate = useNavigate();
  return (
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Logo</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</MDBBtn>
            <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>
            <Link to='/signup'>
             <p className='ms-5'>Don't have an account? <a class="link-info">Register here</a></p>
            </Link>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://s3-alpha-sig.figma.com/img/0173/5aba/187195837f502fa1ae8682268b43c9c1?Expires=1691366400&Signature=mwYqk~0C-6sedfYh2YB~dOa7bPYn7xxA2l9DWlTSNtYlKZ6t4hiSlDMI3sBTf~YAaCBS7hv~QoKt3uvZjKZVR7hQ2VgqpewQTHSz6lu3Tz3XPDi7wxUPcGW73JnTMdwn9~gFg8qE1i0RaYg5Dv9eKMz8GEoVkUyhhU7HyjOMEx47ic1AmiXTU1dyUpr7t0J9-EOlApo8krxDityl7pLBqg6iAu5h74gYmWVVzd3rt7GoGZqOKSJETqcBGJzqX6uq~ZfI8LiRMlFH~rlzugIHhiQovV4cZD-~l6VhthWpZ9BoIFpDKMQ8yuZyf8BQy2~jIicrQ~6oXUs9sMhpb~HG8A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt="Login image" className="w-100" style={{objectPosition: 'left', height: '100vh'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;