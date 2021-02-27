import { FunctionComponent } from 'react';
import { Header, Menu, Icon } from 'semantic-ui-react';
import styles from 'styles/Navbar.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar: FunctionComponent = () => {
    return (
        <div className={styles['container']}>
            <Menu secondary className={styles['menu']}>
                <Menu.Item icon='user' onClick={() => ({})} />
                <Menu.Item position='right'>
                    <Header
                        whileTap={{ scale: 0.95 }}
                        as={motion.h1}
                        className={styles['header']}
                    >
                        <Link href='/home'>Saturn</Link>
                    </Header>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Link href='/cart' passHref>
                        <Menu.Item as='a' onClick={() => ({})}>
                            <Icon name='shopping cart' />
                        </Menu.Item>
                    </Link>
                </Menu.Menu>
            </Menu>
        </div>
    );
};

export default Navbar;
