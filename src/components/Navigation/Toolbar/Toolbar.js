import React from 'react';
import Logo from '../../Logo/Logo'
import Items from '../Items/Items'
import classes from './Toolbar.module.css'

const toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <Items />
        </nav>
    </header>
);

export default toolbar;