import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";

import { MessageContext } from "../../../utility/MessageContext";

export default function EditCategory({ categorys, product, getproducts }) {
  const { newMessage } = useContext(MessageContext);
  const [title, setTitle] = useState("");
  const [cid, setCid] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    setTitle(product.title);
    setCid(product.cid);
    setPrice(product.price);
  }, [product]);

  function editProdcet() {
    if (title !== null && cid !== null && price !== null) {
      Axios.post("/product/edit/", {
        id: product._id,
        title: title,
        cid: cid,
        price: price,
      })
        .then(() => {
          newMessage("מוצר נשמרה בהצלחה");
          getproducts();
        })
        .catch((err) => console.log(err));
    } else {
      newMessage("אנא מלא את כל פרטיי המוצר");
    }
  }

  return (
    <div
      className="modal fade"
      id="editproductModel"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">ערוך מוצר</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">שם המוצר:</label>
              <input
                type="text"
                className="form-control form-control-lg right"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">קטגוריה:</label>
              <select
                className="form-select form-select-lg"
                onChange={(e) => setCid(e.target.value)}
                value={cid}
              >
                <option>בחר קטגוריה</option>
                {categorys.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">מחיר:</label>
              <input
                type="number"
                className="form-control form-control-lg right"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={editProdcet}
            >
              שמור
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              סגור
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
