import './App.css';
/* 1 No Work */
import initializeaAuthentication from './Firebase/Firebase.inistialize';
/* 2 No Work */
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { useState } from 'react';

/* 1 No Work */
initializeaAuthentication();
/* 2 No Work */
const googleProvider = new GoogleAuthProvider();

function App() {
  /* State Declare For Get Mail &  Pssword */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setLogin] = useState(false);

  /* 2 No Work */
  const auth = getAuth()
  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user)
      })
  }




  /* Set User name after doing condistional Rendaring */
  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then((result) => { })
  }
  /* Email Varifaction */
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then((result) => {
        console.log(result);
      })
  }
  /* Handler for check box. Work No : 06 */
  const toggleLogIn = (e) => {
    setLogin(e.target.checked)
  }
  /* Form Handler Work No (03)*/
  const handleRegistration = (e) => {
    /* Page load hoye info cole na jaowar jonno  */
    e.preventDefault();
    console.log(email, password);
    /* REgister Forn Validation */
    if (password.length < 6) {
      /* Sent A Error text if password would be less then 6 degit. Start */
      setError('Password at lest 6 characters.')
      /* Sent A Error text if password would be less then 6 degit. End */
      /* More Validatio Using JS reglure expression strength */
      return;
    }
    /* More Validatio Using JS reglure expression strength */
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError('Input at lest 2 characters Upercase')
      return;
    }
    if (isLogin) {
      processLogin(email, password);
    } else {
      createNewUser(email, password);
    }
  }

  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError('');
        setUserName();
      })
      .catch(error => {
        setError(error.message);
      })
  }

  const createNewUser = (email, password) => {
    /* Work No :05 > Firebase Authentication */
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        /* When you are success than do fast "setError is empty." */
        setError('');
        /* Call Email Verification Function */
        verifyEmail();
      })
      /* Catch Error */
      .catch(error => {
        setError(error.message)
      })
  }





  /* Handler part */

  /* Reset Password for email  */
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        console.log(result.user)
      })
  }
  /* Update User Name & Other Information Work */
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  /* Email Change Handler Work */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  /* Password Change Handler Work */
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  }






  return (
    <div className="mx-5 mt-5">
      <form onSubmit={handleRegistration}>
        <h3 className="text-primary text-center mb-2">Please {isLogin ? 'Login' : 'Register'} </h3>
        {/* Get User Information By using Condistional Rendaring Start */}
        {!isLogin && <div className="row mb-3">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">Name : </label>
          <div className="col-sm-10">
            <input onBlur={handleNameChange} type="name" className="form-control" id="inputName" placeholder="Your Name" />
          </div>
        </div>}

        {/* Get User Information End */}
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleLogIn} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Register ?
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3 text-center">
          <p className="text-danger ">{error}</p>
        </div>
        <button type="submit" className="btn btn-primary text-center">{isLogin ? 'Login' : 'Register'} </button>
        {/* Reset Button */}
        <button onClick={handleResetPassword} className="btn btn-primary ms-5" type="button">Reset Password</button>
      </form>















      <br /><br /><br />
      <hr />
      {/* Part of visite to google */}
      <div className="text-center">
        <button onClick={handleGoogleSingIn} className="text-center bg-black text-white text-bold" >Sing In With Google.</button>
      </div>
    </div>

  );
}

export default App;
