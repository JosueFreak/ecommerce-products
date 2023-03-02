import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProductCart } from '../store/slices/cart.slice'
import "./styles/ProductCard.css"

const ProductCard = ({product}) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleClickProduct = () => {
        navigate(`/products/${product.id}`)
    }

    const handleClickAddProduct = (e) => {
        e.stopPropagation();
        const data = {
            quantity: 1,
            productId: product.id
        }
        dispatch(addProductCart(data))
    }

    return (
    <article className='productCard' onClick={handleClickProduct}>
        <header className='productCard_header'>
            <div className='productCard_img'>
                <img src={product.images[0].url} alt="" />
                <img src={product.images[1].url} alt="" />
            </div>
        </header>
        <section className='productCard_info'>
        <h4 className='productCard_brand'>{product.brand}</h4>
        <h3 className='productCard_title'>{product.title}</h3>

        <h4 className='productCard_price_Title'>Price</h4>
        <h3 className='productCard_price'>$ {product.price}</h3>
        <button className='productCard_btn' onClick={handleClickAddProduct}>
            <i className='bx bx-cart'></i>
        </button>
        </section>
    </article>
    )
}

export default ProductCard
