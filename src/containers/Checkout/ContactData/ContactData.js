import React, { Component } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state= {
        orderForm:{
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'Your Name'
                    },
                    value:''
                },
                street:{
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'street'
                    },
                    value:''},
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'ZIP code'
                    },
                    value:''},
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'Country'
                    },
                    value:''},
                
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type:'email',
                        placeholder: 'Your E-mail'
                    },
                    value:''},
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                       options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                       {value: 'fcheapest', displayValue: 'Cheapest'}]
                        
                    },
                    value:''
            }
        },
        loading: false  
}
    
    orderHandler =(event)=>{
        event.preventDefault();
        console.log(this.props.ingredients);
        alert('You continue!');
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
           
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false} );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false} );
            } );
    }

        inputChangeHandler=(event, inputIdentifier)=>{
            console.log(event.target.value);

        }

    render(){
        const formElementArray=[];
        for (let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }
        let form=(
            <form>
               
                    {formElementArray.map(formElement=>(
                        <Input 
                        key= {formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                        />
                    ))}
               
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                    {form}
                
            </div>
        );
    }
}


export default ContactData;