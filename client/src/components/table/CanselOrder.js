import Axios from "axios";
import React, {useContext} from "react";

import {MessageContext} from "../../utility/MessageContext";

export default function CanselOrder({prodects, order, getOrders, totalBill}) {
  const {newMessage} = useContext(MessageContext);

  function canselOrder() {
    Axios.post("/order/cansel/", {id: order._id})
    .then(() => {
      newMessage("מוצר נמחק בהצלחה");
      getOrders();      
    })
    .catch(err => console.log(err));
  }

  return (
    <div
      className="modal fade"
      id="canselOrderModel"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              בטל הזמנה
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            האם אתה בטוח שברצונך לבטל את 
            "
            {
              order ?
              prodects.find(
                (prodect) => prodect._id === order.pid
              ).title
              : null
            }
            "
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-danger" 
              data-bs-dismiss="modal"
              onClick={canselOrder}
              >
              הסר
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              בטל
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
