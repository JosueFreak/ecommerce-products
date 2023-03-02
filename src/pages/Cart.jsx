import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../components/Cart/CartProduct'
import { getAllCartProducts, purchaseCart } from '../store/slices/cart.slice'
import './styles/Cart.css'

const Cart = () => {

  const {products} = useSelector(store => store.cart)

  const dispatch = useDispatch()

  const totalPriceCart = products.reduce(
    (total, product) => total + product.quantity * product.product.price, 
    0
  );

    const handlePurchaseCart = () => {
      dispatch(purchaseCart())
    }

  useEffect(() => {
    dispatch(getAllCartProducts())
  }, [])

  return (
    <main className='cart'>
      <section className='cart_name'>
        {
          products.map(product => <CartProduct key={product.id} product={product}/>)
        }

      </section>
        <hr className='cart_section' />
      <section className='cart_products'>
        <div className='cart_info'>
          <h3 className='cart_total'>Total</h3>
          <h3 className='cart_total-price'>$ {totalPriceCart}</h3>
        </div>
        <button className='cart_btn' onClick={handlePurchaseCart}>Checkout</button>
      </section>
    </main>
  )
}

export default Cart
