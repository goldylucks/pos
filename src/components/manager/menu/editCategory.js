import React, {useState, useContext, useEffect} from "react";
import Axios from "axios";

import {MessageContext} from "../../../utility/MessageContext";

export default function EditCategory({category, getCategorys}) {
  const {newMessage} = useContext(MessageContext);
  const [title, setTitle] = useState();
  const [icon, setIcon] = useState();

  useEffect(() => {
    setTitle(category.title);
    setIcon(category.icon);
  }, [category]);

  function  editCategory() {
    if(title !== null && icon !== null){
      Axios.post("http://localhost:5000/category/edit/", {id: category._id, title: title, icon: icon})
      .then(() => {
        newMessage("קטגוריה נשמרה בהצלחה");
        getCategorys();
      })
      .catch(err => console.log(err));
    }else{
      newMessage("אנא מלא את כל פרטיי הקטגוריה");
    }
  }

  return (
    <>
    <div
      className="modal fade"
      id="editCategoryModel"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              ערוך קטגוריה
            </h5>
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">סמל הקטגוריה:</label>
                <select 
                  className="form-select form-select-lg Iconselect"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                >
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
              data-bs-dismiss="modal"
              onClick={editCategory}
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

    </>
  );
}
