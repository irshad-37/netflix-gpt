import React, { useRef } from 'react'
import Header from './Header'
import { useState } from 'react';
import { checkValidData } from '../utils/validate';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
const Login = () => {
  const navigate= useNavigate();
  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);
  const [isSignInForm, setIsSignInForm]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
  }
  const handleButtonClick=()=>{
    //validate form data
    console.log(email.current.value);
    console.log(password.current.value);
    const message=checkValidData(email.current.value,password.current.value)
    console.log(message);
    setErrorMessage(message);
    if(message===null){
      //create user 
      if(!isSignInForm){
        createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
        displayName: name.current.value
        }).then(() => {
          navigate("/browse")
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
        console.log(user);
        navigate("/browse");
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode+"-"+errorMessage);
      });

      }
      else{
        //sign in 
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/browse");
     })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage);
    });

      }
    }
  }
  return (
    <div>
      <Header/>
      <div className="absolute">
        <img alt="img" src='https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg'></img>
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
          <h1 className='font-bold text-3xl py-4'>
            {isSignInForm?"Sign In":"Sign Up"}
          </h1>
          {!isSignInForm &&(
            <input ref={name} className="p-4 my-4 w-full bg-gray-700" 
            type="text" 
            placeholder='Name'
            />
          )} 
          <input ref={email} className="p-4 my-4 w-full bg-gray-700 border-2 border-rose-500 " type="text" placeholder='Email Address' />
          <input ref={password} className="p-4 my-4 w-full bg-gray-700 border-rose-500" type="password" placeholder='Password' />
          <p className="text-red-500">{errorMessage}</p>
          <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm?"Sign In":"Sign Up"}
          </button>
          <p className="p-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm?"New to Netflix? Sign Up Now":"Already registered? Sign In Now"}
          </p>
        </form>
    </div>
  )
}

export default Login