import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from './userCookies';
import { mapUserData, User } from './mapUserData';

interface IUseUser {
    user: User | undefined;
    status: string;
    logout: () => void;
}

export const useUser = (): IUseUser => {
    const [user, setUser] = useState<User | undefined>();
    const [status, setStatus] = useState('wait');
    const router = useRouter();

    const logout = async () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                router.push('/');
            })
            .catch((e) => {
                console.error(e);
            });
    };

    useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
            if (user) {
                const userData = mapUserData(user);
                setUserCookie(userData);
                setUser(userData);
                setStatus('loggedin');
            } else {
                removeUserCookie();
                setUser(undefined);
                setStatus('loggedout');
            }
        });

        const userFromCookie = getUserFromCookie();
        if (!userFromCookie) {
            return;
        }
        setUser(userFromCookie);
        setStatus('loggedin');

        return () => {
            cancelAuthListener();
        };
    }, []);

    return { user, status, logout };
};
