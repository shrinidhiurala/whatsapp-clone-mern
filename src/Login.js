import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase';
import './login.css'
import { actionTypes } from './reducer';
import { useStateValues } from './StateProvider';

function Login() {
    const [{}, dispatch] = useStateValues();

    const signin = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            console.log(result)
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        })
        .catch(error => alert(error.message))
    };

    return (
        <div className="login">
            <div className="login__container" >
                <img src="https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png" alt="" />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button type="submit" onClick={signin}>
                    Sign In with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
