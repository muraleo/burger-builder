import React from 'react';
import AUX from '../../hoc/Aux';

const Layout = (props) =>(
    <AUX>
        <div></div>
        <main>{props.children}</main>
    </AUX>
);

export default Layout;