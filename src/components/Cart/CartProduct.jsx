import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteProductCart, updateProductCart } from '../../store/slices/cart.slice'
import "./styles/CartProduct.css"

const CartProduct = ({product}) => {
    
    const dispatch = useDispatch()

    const handleDeleteCartProduct = () => {
        dispatch(deleteProductCart(product.id))
    }

    const handleClickPlus = () => {
        const newQuantity = product.quantity + 1
        const data = {
            quantity: newQuantity
        }
        dispatch(updateProductCart(product.id, data))
    }
    
    const handleClickLess = () => {
        const newQuantity = product.quantity - 1
        if(newQuantity <= 0) {
            dispatch(deleteProductCart(product.id))
        }else{
            const data = {
                quantity: newQuantity
            }
            dispatch(updateProductCart(product.id, data))
        }
    }

    return (
    <article className='product_content'>
            <div className='product'>
                <img src={product.product.images[0].url} alt="" />
            </div>
            <section className='product_info'>
                <h3 className='product_title'>{product.product.title}</h3>

                <div className='product_select'>
                <button className='product_button-less' onClick={handleClickLess}>-</button>
                <h3 className='product_quantity'>{product.quantity}</h3>
                <button className='product_plus' onClick={handleClickPlus}>+</button>
                </div>
            </section>

            <section className='product_total'>
                <i onClick={handleDeleteCartProduct} className='product_delete bx bx-trash'></i>
                <h3 className='product_total'>Total</h3>
              <h3 className='product_total-price'>$ {product.quantity * product.product.price}</h3>
            </section>
    </article>
    )
}

export default CartProduct
