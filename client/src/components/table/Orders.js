import Axios from "axios";
import { useState } from "react";

// Compenet
import Menu from "./Menu";
import CanselOrder from "./CanselOrder";

export default function Orders({
  table,
  orders,
  getOrders,
  products,
  totalBill,
}) {
  const [currntOrder, setCurrntOrder] = useState("");
  const [searchproduct, setSearchproduct] = useState("");

  const DateFromat = new Intl.DateTimeFormat("he-He", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  function productInfo(type, oid) {
    let title;
    let price;
    if (oid) {
      const Res = products.find((prod) => prod._id === oid);

      if (Res) {
        title = Res.title;
        price = Res.price;
      }
    }

    if (type == "title") {
      return title;
    } else if (type == "price") {
      return price;
    }
  }

  return (
    <div className="row">
      <div className="col-5">
        <Menu
          tid={table._id}
          products={products}
          getOrders={getOrders}
          totalBill={totalBill}
        />
      </div>

      <div className="col-7">
        <div className="card">
          <div className="card-body">
            <ul className="list-group p-0 m-0">
              {orders
                .filter((order) => order.cansel !== 1)
                .map((order) => (
                  <li className="list-group-item" key={order._id}>
                    <div className="row">
                      <div className="col-3 text-right fw-bold">
                        {productInfo("title", order.pid)}
                      </div>
                      <div className="col-4 text-center">
                        {DateFromat.format(Date.parse(order.createdAt))}
                      </div>
                      <div className="col-2 text-center">
                        {new Intl.NumberFormat("he-HE", {
                          style: "currency",
                          currency: "ILS",
                        }).format(productInfo("price", order.pid))}
                      </div>
                      <div className="col-3 d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn pb-0 m-o"
                          onClick={(e) => setCurrntOrder(order)}
                          data-bs-toggle="modal"
                          data-bs-target="#canselOrderModel"
                        >
                          <span className="material-icons fs-6">delete</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <CanselOrder
        products={products}
        order={currntOrder}
        getOrders={getOrders}
        totalBill={totalBill}
      />
    </div>
  );
}
