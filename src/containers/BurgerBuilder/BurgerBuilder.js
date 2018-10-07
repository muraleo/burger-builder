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
            salad: 0,
            nacon: 0,
            cheese: 0,
            meat: 0
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