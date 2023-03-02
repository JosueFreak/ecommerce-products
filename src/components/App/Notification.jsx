import React from 'react'
import { useSelector } from 'react-redux'
import "./Styles/Notification.css"

const Notification = () => {

    const {error} = useSelector(store => store.cart)

    return (
        <article className={`notification ${error ? "active" : "" }`}> 
            <div className='notification_text'>Product already added to cart</div>
        </article>
    )
}

export default Notification
