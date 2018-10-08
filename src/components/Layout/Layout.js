import React from 'react';
import AUX from '../../hoc/Aux';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const Layout = (props) =>(
    <AUX>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </AUX>
);

export default Layout;