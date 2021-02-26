import { FunctionComponent } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import styles from 'styles/LoadingPage.module.scss';

const LoadingPage: FunctionComponent = () => {
    return (
        <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
        </Dimmer>
    );
};

export default LoadingPage;
