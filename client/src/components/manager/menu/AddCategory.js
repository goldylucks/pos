import React, { useState, useContext } from "react";
import Axios from "axios";

import { MessageContext } from "../../../utility/MessageContext";

export default function AddCatagory({ getCategorys }) {
  const { newMessage } = useContext(MessageContext);
  const [title, setTitle] = useState(null);
  const [icon, setIcon] = useState(null);

  function addCategory(e) {
    if (title != null && icon != null) {
      Axios.post("/category/add/", { title: title, icon: icon })
        .then(() => {
          newMessage("הקטגוריה נוספה בהצלחה", "success");
          getCategorys();

          document.getElementById("addCategoryModel").classList.remove("show");
          document
            .getElementsByTagName("body")[0]
            .classList.remove("modal-open");
          document.getElementsByTagName("body")[0].classList.add("modal-close");
          document
            .getElementsByClassName("modal-backdrop")
            .classList.remove("show");
        })
        .catch((err) => console.log(err));
    } else {
      e.preventDefault();
      newMessage("אנא מלא את כל פרטי הקטגוריה", "error");
    }
  }

  return (
    <div
      className="modal fade"
      id="addCategoryModel"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">קטגוריה חדשה</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">שם הקטגוריה:</label>
              <input
                type="text"
                className="form-control form-control-lg right"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">סמל הקטגוריה:</label>
              <select
                className="form-select form-select-lg Iconselect"
                onChange={(e) => setIcon(e.target.value)}
              >
                <option>בחר סמל</option>
                <option value="fa-hamburger">&#xf805;</option>
                <option value="fa-pizza-slice">&#xf818;</option>
                <option value="fa-pepper-hot">&#xf816;</option>
                <option value="fa-ice-cream">&#xf810;</option>
                <option value="fa-fish">&#xf578;</option>
                <option value="fa-cocktail">&#xf561;</option>
                <option value="fa-wine-glass">&#xf4e3;</option>
                <option value="fa-beer">&#xf0fc;</option>
                <option value="fa-coffee">&#xf0f4;</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => addCategory(e)}
              data-bs-dismiss="modal"
            >
              הוסף קטגוריה
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
