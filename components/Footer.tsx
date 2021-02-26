import { FunctionComponent } from 'react';
import { Icon } from 'semantic-ui-react';
import styles from 'styles/Footer.module.scss';

const Footer: FunctionComponent = () => (
    <div className={styles['container']}>
        <span>
            Built with <Icon name='heart' color='red' /> by&nbsp;
        </span>
        <a
            href='https://github.com/IvanDimitrov2002'
            target='_blank'
            rel='noreferrer noopener'
        >
            Ivan Dimitrov
        </a>
    </div>
);

export default Footer;
