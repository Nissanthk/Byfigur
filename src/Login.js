import React from 'react';
import {authentication} from './firebase-config';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"; 
import googlePic from "./google_icon.png";

function Login(){
    
    const signInWithGoogle = ()=>{
        const provider = new GoogleAuthProvider(); 
        signInWithPopup(authentication, provider)
        .then((re)=>{
            console.log(re);
            localStorage.setItem('googleUserName', re.user.displayName);
            localStorage.setItem('account', "true"); 
            localStorage.setItem('idToken', re._tokenResponse.idToken); 
            window.location="./logout";
        })
        .catch((err)=>{
            console.log(err); 
        })
    }
    
       return(
        <div className="pageColor">

            <div className="loginPage">
                <h1>Welcome to login page!</h1>
                <h1>Login to register your account</h1>
            </div>
            
            <div>
            <button className="googleButton" onClick={signInWithGoogle}>
                <img src={googlePic} className="googleIcon"></img>
                <h1>Login with Google</h1>
            </button>
            </div>
        </div>
    )
    }

export default Login;