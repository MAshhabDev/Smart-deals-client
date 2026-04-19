import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)

    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const createUser = (email, pass) => {
        setLoading(true);

        return createUserWithEmailAndPassword(auth, email, pass);
    }

    const logIn = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {


                const loggedUser = { email: currentUser.email }
                fetch('http://localhost:5000/getToken', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("After Getting Token",data.token)
                        localStorage.setItem('token', data.token)
                    })
            }
            else{
                localStorage.removeItem('token')
            }
            setLoading(false)

        })

        return () => {
            unsubscribe();
        }
    }, [])




    const authInfo = {
        createUser,
        user, setUser, loading, setLoading, logIn, signInWithGoogle, signOutUser

    }

    return (


        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;