import React, { ReactElement } from 'react';
import { auth, provider } from '~/config/firebase';
import { signInWithPopup } from 'firebase/auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface AuthProps {
    setIsAuth: (isLogged: boolean) => void;
}

export default function Auth({ setIsAuth }: AuthProps): ReactElement {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set('auth-token', result.user.refreshToken);
            setIsAuth(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="auth">
            <p> Sign In With Goole To Continue</p>
            <button onClick={signInWithGoogle} className="auth-button">
                {' '}
                Sign In With Google
            </button>
        </div>
    );
}
