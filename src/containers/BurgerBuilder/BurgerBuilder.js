import React, {Component} from 'react';
import AUX from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

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
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type)=>{
        const newCount = this.state.ingredients[type] + 1;
        const newIngredientCount = {...this.state.ingredients};
        newIngredientCount[type] = newCount;

        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newTotalPrice, ingredients: newIngredientCount});
    }

    removeIngredientHandler = (type) =>{
        if(this.state.ingredients[type] > 0){
            const newCount = this.state.ingredients[type] - 1;
            const newIngredientCount = {...this.state.ingredients};
            newIngredientCount[type] = newCount;

            const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({totalPrice: newTotalPrice, ingredients: newIngredientCount});
        }
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <AUX>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabledInfo = {disabledInfo}
                    />
            </AUX>
        )
    }
}

export default BurgerBuilder;