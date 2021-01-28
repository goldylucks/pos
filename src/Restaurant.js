import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

// Compenet
import NewTable from "./components/restaurant/NewTable";


export default function Restaurant() {
  const [tables, setTables] = useState([]);

  const currencyFormat = new Intl.NumberFormat('he-HE', { style: 'currency', currency: 'ILS' });

  const DateFromat = new Intl.DateTimeFormat('he-He', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  useEffect(() => {
    Axios.get("http://localhost:5000/tables/")
    .then(Res => (setTables(Res.data.tables)))
    .catch(err => console.log(err));
  }, []);

  return (
    <main className="container">
      <div className="card bg-white mb-2">
        <div className="card-header">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NewTableModel">
            שולחן חדש
          </button>
        </div>
        
        <div className="card-body">
          <ul className="list-group list-group-flush p-0">
          {tables.filter(tab => tab.close === 0).map(table => (
          <Link style={{ textDecoration: 'none' }} to={`/table/${table._id}`} key={table._id}>
        
            <li className="list-group-item list-group-item-action">
              <div className="row align-items-center">
                <div className="col-1">
                  <span className="material-icons fs-2 text-middle">
                    event_seat
                  </span>
                </div>
                <div className="col-3">
                  <span className="fs-5 fw-bold">{table.number}</span>
                  <br />
                  <small>{DateFromat.format(Date.parse(table.createdAt))}</small>
                </div>
                <div className="col-4 text-center">
                  <span className="fs-5 fw-bold">{table.people}</span>
                  <br />
                  <small>אנשים</small>
                </div>
                <div className="col-4 text-center">
                  <span className="fs-5 fw-bold">
                    {currencyFormat.format(table.totalPrice)}
                  </span>
                </div>
              </div>
            </li>
            </Link>
            ))}
         
          </ul>
        </div>
      </div>

      <NewTable tables={tables} />

    </main>
  );
}
