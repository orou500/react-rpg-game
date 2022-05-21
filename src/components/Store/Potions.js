import React, { useState, useEffect }  from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

function Potions(props) {
    const poions = {
        healingPotion: {
            name: "Healing Potion",
            itemwType: 'Potion',
            price: 10,
        }
    }

    const [healingAmount, setHealingAmount] = useState(1);
    const [cart, setCart] = useState([]);

    const handleHealingAmount = (e) => {
        if(e.target.value <= 0 || e.target.value >= 100 || e.target.value % 1 !== 0){
            e.target.value = e.target.placeholder
        }

        setHealingAmount(e.target.value)
    }

    const handleAddToCart = () => {

        const check = props.cartItems.find(e => e.name === poions.healingPotion.name)
        if(!check){
            props.setTotalPrice(props.totalPrice + (poions.healingPotion.price * healingAmount))
            props.setCartItems([...props.cartItems, {
                name: poions.healingPotion.name,
                price: poions.healingPotion.price * healingAmount,
                amount: parseInt(healingAmount)
            }])
        }
    }

  return (
    <div className='container d-flex flex-column align-items-center justify-content-center mt-3'>
            <h4>Potions!</h4>
        <div className='items container d-flex flex-md-row flex-wrap align-items-center justify-content-center'>
            <div className='item m-4'>
                <h5>{poions.healingPotion.name}</h5>
                <p>Price: {poions.healingPotion.price * healingAmount} gold</p>
                <input type="number"  min="0" step="1" placeholder='Amount' onChange={handleHealingAmount}/><br />
                {
                    <button className='mt-3' onClick={handleAddToCart}>Add To Cart</button>
                }
            </div>
        </div>
    </div>
  );
}

export default Potions;
