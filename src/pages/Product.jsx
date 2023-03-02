import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { addProductCart } from '../store/slices/cart.slice'
import { axiosEcommerce } from '../utils/configAxios'
import "./styles/Product.css"

const arrayClassesSlider = ["first", "second", "third"]

const Product = () => {
  
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)
  const [similarProducts, setSimilarProducts] = useState([])
  const [indexSlider, setIndexSlider] = useState(0)

  const {id} = useParams()

  const dispatch = useDispatch
  
  const handlePlus = () => setQuantity(quantity + 1);

  const handleLess = () => {
    const newQuantity = quantity - 1
    if(newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleClickAddProduct = () => {
    const data = {
        quantity,
        productId: product.id
    }
    dispatch(addProductCart(data))
}

  const handleClickNext = () => {
    const newIndexSlider = indexSlider + 1
    const lastPosition = arrayClassesSlider.length - 1
    if(newIndexSlider > lastPosition) {
      setIndexSlider(0)
    }else{
      setIndexSlider(newIndexSlider)
    }
  }

  const handleClickPrevius = () => {
    const newIndexSlider = indexSlider - 1
    const lastPosition = arrayClassesSlider.length - 1
    if(newIndexSlider < 0) {
      setIndexSlider(lastPosition)
    }else{
      setIndexSlider(newIndexSlider)
    }
  }

  useEffect(() => {
    axiosEcommerce
      .get(`products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err))
  }, [id])

  useEffect(() => {
    if (product) {
      axiosEcommerce
        .get(`/products?categoryId=${product?.categoryId}`)
        .then((res) => {
          const newSimilarProducts = res.data.filter(
            (productByCategory) => productByCategory.id !== 
            product.id 
            )
          setSimilarProducts(newSimilarProducts)
        })
        .catch((err) => console.log(err))
    }
  }, [product])

  useEffect(() => {
    setQuantity(1)
  }, [id])

  return (
    <main className='product'>
      <section className='product_detail'>
        {/*Parte superior*/}
        <section className='product-slider'>
          <section className={`product_detail-imgContainer ${arrayClassesSlider[indexSlider]}`}>
            <div className='product_detail_img'>
              <img src={product?.images[0].url} alt="" />
            </div>
            <div className='product_detail_img'>
              <img src={product?.images[1].url} alt="" />
            </div>
          <div  className='product_detail_img'>
            <img src={product?.images[2].url} alt="" />
          </div>
          </section>
          <div onClick={handleClickNext} className='product-btn-left'>
            <i className='bx bx-chevron-left' ></i>
          </div>
          <div onClick={handleClickPrevius} className='product-btn-right'>
            <i className='bx bx-chevron-right'></i>
          </div>
        </section>

        {/*Parte inferior*/}
        <section className='product_detail-infoContainer'>
          <h4 className='product_detail_brand'>{product?.brand}</h4>
          <h5 className='product_detai_title'>{product?.title}</h5>

          <div className='product_detail_quantityContainer'>
            <div className='product_detail_price'>
              <h4 className='product_detail_priceTitle'>Price</h4>
              <h3 className='product_detail_price'>$ {product?.price}</h3>
            </div>

            <div className='product_detail_quantity'>
              <h4 className='product_detail_quantityTitle'>Quantity</h4>
              <div className='product_detail_counter'>
                <button onClick={handleLess}>-</button>
                <h4>{quantity}</h4>
                <button onClick={handlePlus}>+</button>
              </div>
            </div>
          </div>

        <button className='product_detail_btn' onClick={handleClickAddProduct}>
          add to cart <i className='bx bx-cart'></i>
        </button>

        <p className='product_detail_text'>{product?.description}</p>
        </section>

      </section>

        <h2 className='porudct_titleSimilar'>Discover similar items</h2>

      <section className='product_similarContainer'>
        {
          similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  )
}

export default Product
