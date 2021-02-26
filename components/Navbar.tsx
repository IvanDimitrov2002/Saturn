import { FunctionComponent } from 'react';
import { Header, Menu, Dropdown, Icon, Label } from 'semantic-ui-react';
import { useUser } from 'utils/useUser';
import styles from 'styles/Navbar.module.scss';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
import { User } from 'utils/interfaces';
import Link from 'next/link';

const Navbar: FunctionComponent = () => {
    const { user, logout } = useUser();
    const { data: userData } = useDocument<User>(
        user ? `users/${user.id}` : null,
        {
            listen: true,
        }
    );
    const { data: ticketsData } = useCollection('tickets', {
        listen: true,
    });

    return (
        <div className={styles['container']}>
            <Menu secondary inverted className={styles['menu']}>
                {userData?.roles?.includes('admin') && (
                    <Menu.Item icon='settings' onClick={() => ({})} />
                )}
                <Menu.Menu position='right'>
                    {userData?.roles?.includes('mentor') && (
                        <Menu.Item onClick={() => ({})}>
                            <Icon name='inbox' />
                            {(ticketsData?.length as number) > 0 && (
                                <Label
                                    color='red'
                                    attached='top right'
                                    size='mini'
                                >
                                    {ticketsData?.length}
                                </Label>
                            )}
                        </Menu.Item>
                    )}
                    <Dropdown
                        item
                        text={
                            userData && userData.name
                                ? userData.name
                                : 'Profile'
                        }
                        icon='dropdown'
                    >
                        <Dropdown.Menu>
                            <Link href='/profile' passHref>
                                <Dropdown.Item as='a'>Profile</Dropdown.Item>
                            </Link>
                            <Dropdown.Item onClick={logout}>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
            <Header className={styles['header']} as='h1'>
                <Link href='/dashboard'>HELPq</Link>
            </Header>
            <Menu
                className={styles['mobile-menu']}
                icon='labeled'
                fixed='bottom'
                widths={userData?.roles?.includes('mentor') ? 3 : 2}
                size='tiny'
            >
                <Link href='/dashboard' passHref>
                    <Menu.Item onClick={() => ({})}>
                        <Icon name='home' />
                        <span>Home</span>
                    </Menu.Item>
                </Link>
                {userData?.roles?.includes('mentor') && (
                    <Link href='/dashboard' passHref>
                        <Menu.Item onClick={() => ({})}>
                            <Icon name='inbox' />
                            <span>Mentor</span>
                        </Menu.Item>
                    </Link>
                )}
                <Link href='/profile' passHref>
                    <Menu.Item onClick={() => ({})}>
                        <Icon name='child' />
                        <span>Profile</span>
                    </Menu.Item>
                </Link>
            </Menu>
        </div>
    );
};

export default Navbar;
