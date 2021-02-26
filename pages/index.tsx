import { useState, useEffect, FormEvent, FunctionComponent } from 'react';
import { Button, Header, Form, Message } from 'semantic-ui-react';
import { useUser } from 'utils/useUser';
import { fuego } from '@nandorojo/swr-firestore';
import styles from 'styles/Index.module.scss';
import { useRouter } from 'next/router';
import LoadingPage from 'components/LoadingPage';

const Index: FunctionComponent = () => {
    const router = useRouter();

    const { status } = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (status === 'loggedin') {
            router.push('/dashboard');
        }
    }, [status]);

    const login = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await fuego.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            setError(error.message);
            setTimeout(() => setError(''), 6000);
        }
    };

    if (status === 'wait') {
        return <LoadingPage />;
    }

    return (
        <div className={styles['container']}>
            <Header className={styles['header']} as='h1'>
                HELPq
                <Header.Subheader className={styles['sub-header']}>
                    Have a question? Get matched with a mentor for help.
                </Header.Subheader>
            </Header>
            <Form className={styles['form']} onSubmit={login}>
                <Form.Input
                    icon='user'
                    iconPosition='left'
                    label='Email'
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    fluid
                    className={`${styles['submit']} ${styles['primary']}`}
                    type='submit'
                >
                    LOGIN
                </Button>
                <Message negative hidden={Boolean(!error)}>
                    {error}
                </Message>
            </Form>
        </div>
    );
};

export default Index;
