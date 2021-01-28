import React, {useState, useContext, useEffect} from "react";
import Axios from "axios";

import {MessageContext} from "../../utility/MessageContext";

export default function EditTable({table, getTables}) {
  const {newMessage} = useContext(MessageContext);

  const [tables, setTables] = useState([]);
  const [tableNumber, setTableNumber] = useState();
  const [tablePeople, setTablePeople] = useState();

  useEffect(() => {
    Axios.get("http://localhost:5000/tables/")
    .then(Res => (setTables(Res.data.tables)))
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    setTableNumber(table.number);
    setTablePeople(table.people);
  }, [table]);

  function editTable() {
    if(tableNumber != null && tablePeople != null){

      const exTable = tables.filter(tab => tab.close == 0 && tab.number == tableNumber);

      if(exTable.length < 1){
        Axios.post("http://localhost:5000/tables/edit", {id: table._id, number: tableNumber, people: tablePeople})
        .then(() => {
          newMessage("שולחן נשמר בהצלחה");
          getTables();
        })
        .catch(err => console.log(err));
      }else{
        newMessage("קיים שולחן פתוח עם מספר זה");
      }
    }else{
      newMessage("אנא מלא את כל הפרטים");
    }
  }


  return (
    <div
      className="modal fade"
      id="editTableModel"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              ערוך שולחן
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
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="tablePeople" className="form-label">מספר סועדים</label>
                <input 
                type="number" 
                className="form-control form-control-lg right" 
                id="tablePeople"
                value={tablePeople}
                onChange={(e) => setTablePeople(e.target.value)}
                />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={editTable} >
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
