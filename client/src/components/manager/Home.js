import { useEffect, useState } from "react";
import Axios from "axios";

export default function Home() {
  const [tables, setTables] = useState();
  const [orders, setOrders] = useState();

  // Get Table
  const getTables = () => {
    Axios.get("/tables")
      .then((Res) => setTables(Res.data.tables))
      .catch((err) => console.log(err));
  };

  // Get Orders
  const getOrders = () => {
    Axios.get("/order/")
      .then((Res) => setOrders(Res.data.order))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTables();
    getOrders();
  }, []);

  return (
    <div className="row">
      <div className="col-4">
        <div className="card">
          <div className="card-header text-center">
            <strong>קופה יומי</strong>
          </div>
          <div className="card-body"></div>
        </div>
      </div>
      <div className="col-4">
        <div className="card">
          <div className="card-header text-center">
            <strong>אורחים</strong>
          </div>
          <div className="card-body"></div>
        </div>
      </div>
      <div className="col-4">
        <div className="card">
          <div className="card-header text-center">
            <strong>קופה חודשי</strong>
          </div>
          <div className="card-body"></div>
        </div>
      </div>
    </div>
  );
}
