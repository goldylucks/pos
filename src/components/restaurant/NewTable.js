import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import {MessageContext} from "../../utility/MessageContext";

export default function NewTable({tables}) {
  let history = useHistory();
  const {newMessage} = useContext(MessageContext);

  const [tableNumber, setTableNumber] = useState();
  const [tablePeople, setTablePeople] = useState();

  function newTable() {
    if(tableNumber != null && tablePeople != null){

      const exTable = tables.filter(tab => tab.close == 0 && tab.number == tableNumber);

      if(exTable.length < 1){
        Axios.post("http://localhost:5000/tables/newTable", {number: tableNumber, people: tablePeople})
        .then(Res => {
          history.push(`/table/${Res.data.tableData._id}`);
          newMessage("שולחן נפתח בהצלחה");
        })
        .catch(err => console.log(err));
      }else{
        newMessage("קיים שולחן פתוח עם מספר זה");
      }
    }else{
      newMessage("אנא מלא את פרטי השולחן");
    }
  }

  return (
    <div
      className="modal fade"
      id="NewTableModel"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              שולחן חדש
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
                <label htmlFor="tableNumber" className="form-label">מספר שולחן</label>
                <input 
                type="number" 
                className="form-control form-control-lg right" 
                id="tableNumber"
                onChange={(e) => setTableNumber(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="tablePeople" className="form-label">מספר סועדים</label>
                <input 
                type="number" 
                className="form-control form-control-lg right" 
                id="tablePeople"
                onChange={(e) => setTablePeople(e.target.value)}
                />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={newTable}>
              פתח שולחן
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
