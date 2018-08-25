import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const Counter = ({ value, onIncrement, onDecrement }) => (
    <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
    </div>
);
  
const reducer = (state = 0, action) => {
   
    switch (action.type) {
        case 'INCREMENT': return state + 1;
        case 'DECREMENT': return state - 1;
        default: return state;
    }
    
};





const store = createStore(reducer)
export default  class Login extends React.Component{
    constructor(obj){
        super(obj)
        this.state = {
            value:0
        }
    }

    del(){
        store.dispatch({ type: 'DECREMENT' })
        this.setState({
            value:store.getState()
        })
    }

    add(){
        store.dispatch({ type: 'INCREMENT' })
        this.setState({
            value:store.getState()
        })
    }
    
  
    render(){

       

        return(
            <Counter
                value={this.state.value}
                onIncrement={() => {this.add()}}
                onDecrement={() => {this.del()}}
            />

        );
    }
}




