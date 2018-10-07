import React, {Component} from 'react';
import AUX from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component{
    // can use constructor
    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
    // }

    state = {
        ingredients:{
            salad: 1,
            nacon: 1,
            cheese: 2,
            meat: 2
        }
    }

    render(){
        return(
            <AUX>
                <Burger ingredients = {this.state.ingredients}/>
                <div>Build control</div>
            </AUX>
        )
    }
}

export default BurgerBuilder;