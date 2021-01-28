import Axios from "axios";
import React, {useContext} from "react";

import {MessageContext} from "../../../utility/MessageContext";

export default function DeleteProdect({prodect, getProdects}) {
  const {newMessage} = useContext(MessageContext);

  function removeProdect() {
    Axios.post("http://localhost:5000/prodect/remove/", {id: prodect._id})
    .then(() => {
      newMessage("מוצר נמחק בהצלחה");
      getProdects();
    })
    .catch(err => console.log(err));
  }

  return (
    <div
      className="modal fade"
      id="deleteProdectModel"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              הסר מוצר
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            האם אתה בטוח שברצונך להסיר את המוצר 
            "{prodect.title}"?
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-danger" 
              data-bs-dismiss="modal"
              onClick={removeProdect}
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
