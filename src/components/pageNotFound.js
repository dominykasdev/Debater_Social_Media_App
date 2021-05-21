import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

const pageNotFound = () => {
    return (
            <Grid>
                <Grid.Row verticalAlign="bottom">
                   <Grid.Column textAlign="center">
                    <Icon color="orange" name="bullhorn" size="massive" />
                    <h1>Error 404!</h1>
                    <h2>Page not found!</h2>
                    <a href="/">Click here to go homepage</a>
                </Grid.Column> 
                </Grid.Row>
                
            </Grid>
    );
}

export default pageNotFound;