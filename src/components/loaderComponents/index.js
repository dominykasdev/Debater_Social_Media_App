import React from 'react';
import {Dimmer, Loader, Image, Segment} from 'semantic-ui-react';

const LoadingComponent = () => (
            <Dimmer active>
                <Loader>Loading...</Loader>
            </Dimmer>
);

export default LoadingComponent;