import React, {useContext, memo} from "react";
import Axios from "axios";

import {MessageContext} from "../../../utility/MessageContext";

export default function DeleteCatagory({category, getCategorys}) {
  const {newMessage} = useContext(MessageContext);

  function removeCategory() {
    Axios.post("http://localhost:5000/category/remove/", {id: category._id})
    .then(() => {
      newMessage("קטגורייה נמחקה בהצלחה");
      getCategorys();
    })
    .catch(err => console.log(err));
  }

  return (
    <div
      className="modal fade"
      id="deleteCategoryModel"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              הסר קטגוריה
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            האם אתה בטוח שברצונך להסיר את קטגוריית 
            "{category.title}"?
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-danger" 
              data-bs-dismiss="modal"
              onClick={removeCategory}
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
