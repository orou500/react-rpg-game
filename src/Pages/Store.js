import React, { useState, useEffect, useRef } from 'react';
import axios from '../api/axios';
import '../App.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Potions from '../components/Store/Potions';
import { useAuth } from '../hooks/useAuth';
import '../Style/Form.css';

function Store() {
  const [links, setLinks] = useState(["Profile", "About", "Logout"]);
  const [category, setCategory] = useState('');
  const [isChekOut, setIsChekOut] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [numberOfCartItems, setNumberOfCartItems] = useState(-1);
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();
  const user = useAuth()
  
  const [yourGold, setYourGold] = useState(user.auth.character.gold);

  useEffect(() => {
    setNumberOfCartItems(numberOfCartItems + 1)
  }, [cartItems])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(totalPrice > 0 ){
      if(user.auth.character.gold >= totalPrice){
        try{
          const response = await axios.post("/Store", 
            JSON.stringify({character: user.auth.character, items: cartItems}),
            {
              headers: {
                  'Authorization': user.auth.accessToken,
                  'Content-Type': 'application/json'
                },
            }
          )
          if(response.data.charcter){
            let charcter = response.data.charcter
            user.auth.character = charcter
            user.auth.accessToken = response.data.newToken
          }
          setYourGold(user.auth.character.gold)
          setErrMsg('thanks for buying!')
  
        } catch (err) {
          if(!err.response) {
            setErrMsg('thanks for buying!')
          } else {
            setErrMsg('Cant Find Server')
          }
          errRef.current.focus()
        }
      } else {
        setErrMsg('You need more gold!')
        setTimeout(function(){
          setErrMsg('')
        }, 3000);
        errRef.current.focus()
      }
    } else {
      setErrMsg('You dont have items in the cart')
      errRef.current.focus()
    }
  }

  return (
    <div>
      <Header navLink={links} />
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <h2>Store:</h2>
        <h5>You have gold: {yourGold} Gold</h5>
        {
          numberOfCartItems <= 0 ? (
          <p>Cart: Empty</p>
          ) : (
            <>
              <p>Cart: {numberOfCartItems} items</p>
              <div className='d-inline-flex'>
                <button className='m-2' onClick={() => {setIsChekOut(true)}}>CHECKOUT</button>
                <button className='m-2' onClick={() => {setNumberOfCartItems(-1); setCartItems([]); setTotalPrice(0)}}>Clear Cart</button>
              </div>
            </>
          )
        }
        {
          isChekOut ?
          (
            <div className='container d-flex flex-column align-items-center justify-content-center mt-3'>
              <div className='items container d-flex flex-md-row flex-wrap align-items-center justify-content-center'>
                {
                  cartItems.map((item) => {
                    return (
                      <div className='item m-4'>
                        <h5>{item.name}</h5>
                        <p>Amount: {item.amount}</p>
                        <p>Price: {item.price} Gold</p>
                      </div>
                    )
                  })
                }
              </div>
              <div>
                <h5>Total Price: {totalPrice} Gold</h5>
              </div>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
              {
                totalPrice > 0 ? (<button onClick={handleSubmit}>Buy</button>) : <button onClick={handleSubmit} disabled>Buy</button>
              }
              <br />
              <button onClick={() => {setIsChekOut(false)}}>Continue Shoping</button>
            </div>
          ) : (
            <div className='container d-flex flex-column align-items-center justify-content-center'>
              <label htmlFor="category" className='mt-3'>Choose Category:</label>
              <select name="category" id="categorys" onChange = {value => setCategory(value.target.value)}>
                  <option disabled selected>Select Category:</option>
                  <option value="Potions">Potions</option>
                  {
                    user.auth.character.className === 'Warrior' 
                    ? <option value="Swords">Swords</option> 
                    : user.auth.character.className === 'Archer' 
                    ? <option value="Bows">Bows</option>
                    : user.auth.character.className === 'Thief'
                    ? <option value="Daggers">Daggers</option>
                    : user.auth.character.className === 'Wizard'
                    ? <option value="Wands">Wands</option> 
                    : <></>
                  }
              </select>
              {
                category === 'Potions' ?
                <Potions setCartItems={setCartItems} cartItems={cartItems} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/> :
                <></>
              }
            </div>
          )
        }
      </div>
      <Footer />
    </div>
  );
}

export default Store;
