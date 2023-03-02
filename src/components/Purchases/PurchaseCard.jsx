import React from "react";
import { formatDateDDMMYYYY } from "../../utils/date";
import "./styles/PurchaseCard.css"

const PurchaseCard = ({purchase}) => {

    return (

<article>
        <div className="purchaseCard-content">
            <img className="purchaseCard-img" src={purchase.product.images[0].url} alt="" />
            <h4 className="purchaseCard-productTitle">{purchase.product.title}</h4>
        </div>
        <div className="purchaseCard-Info">
            <h4 className="purchaseCard-date">{formatDateDDMMYYYY(purchase.createdAt)}</h4>
            <div className="purchaseCard-data">
            <h4 className="purchaseCard-Quantity">{purchase.quantity}</h4>
            </div>
            <h4 className="purchaseCard-price">$ {purchase.product.price}</h4>
        </div>
        </article>

);
};

export default PurchaseCard;
