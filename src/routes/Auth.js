import { authService } from 'fbase';
import React, { useState } from 'react';
import {
   getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
   GoogleAuthProvider,GithubAuthProvider,signInWithPopup,
  } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    const { target: { name, value } } = e;
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        const auth = getAuth();
        const data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        const auth = getAuth();
        const data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data)
    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (e) => {
    const {
      target: { name }
    } = e;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder='password'
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign In." : "Create Account"}</span>
      <div>
        <button onClick={onSocialClick} name="google">Continue with google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  )
}
export default Auth;