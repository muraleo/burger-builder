import React from 'react';
import AUX from '../../hoc/Aux';
import classes from './Layout.module.css'

const Layout = (props) =>(
    <AUX>
        <div></div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </AUX>
);

export default Layout;