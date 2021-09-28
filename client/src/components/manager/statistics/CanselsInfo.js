import { useState, useEffect } from "react";

export default function CanselsInfo({ orders, products, tables }) {
  const [affterSort, setAffterSort] = useState([]);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(Date.now() + 30000);

  useEffect(() => {
    const affter = orders.sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
    );
    setAffterSort(affter);
  }, [orders]);

  const currencyFormat = new Intl.NumberFormat("he-HE", {
    style: "currency",
    currency: "ILS",
  });

  const DateFromat = new Intl.DateTimeFormat("he-He", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  function tableNumber(tid) {
    let number;
    if (tid) {
      number = tables.find((table) => table._id === tid);
    }

    if (number) {
      return number.number;
    }
  }

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

    if (type === "title") {
      return title;
    } else if (type === "price") {
      return price;
    }
  }

  function StartDate(date) {
    const fullDate = new Date(date);
    fullDate.setHours(0);
    setStartDate(Date.parse(fullDate));
  }

  function EndDate(date) {
    const fullDate = new Date(date);
    fullDate.setHours(23);
    fullDate.setMinutes(59);
    setEndDate(Date.parse(fullDate));
  }

  useEffect(() => {
    const affter = orders
      .filter(
        (el) =>
          Date.parse(el.createdAt) >= startDate &&
          Date.parse(el.createdAt) <= endDate
      )
      .sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
      );
    setAffterSort(affter);
  }, [startDate, endDate]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body row g-3">
          <div className="col-auto">
            <label className="form-label">מתאריך</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => {
                StartDate(e.target.value);
              }}
            />
          </div>
          <div className="col-auto">
            <label className="form-label">עד תאריך</label>
            <input
              type="date"
              className="form-control"
              onChange={(e) => {
                EndDate(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr className="text-center">
                <th scope="col">שם מוצר:</th>
                <th scope="col">הוזמן בתאריך</th>
                <th scope="col">בוטל בתאריך</th>
                <th scope="col">מספר שולחן</th>
                <th scope="col">מחיר</th>
              </tr>
            </thead>
            <tbody>
              {affterSort
                .filter((ord) => ord.cansel === 1)
                .map((order) => (
                  <tr className="text-center" key={order._id}>
                    <td>{productInfo("title", order.pid)}</td>
                    <td>{DateFromat.format(Date.parse(order.createdAt))}</td>
                    <td>{DateFromat.format(Date.parse(order.updatedAt))}</td>
                    <td>{tableNumber(order.tid)}</td>
                    <td>
                      {currencyFormat.format(productInfo("price", order.pid))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
