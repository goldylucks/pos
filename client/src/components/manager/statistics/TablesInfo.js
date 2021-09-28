import { useState, useEffect } from "react";

export default function TablesInfo({ tables }) {
  const [sortBy, setSortBy] = useState("createdAt");
  const [affterSort, setAffterSort] = useState([]);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(Date.now() + 30000);

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

  useEffect(() => {
    const affter = tables.sort((a, b) =>
      a[sortBy] < b[sortBy] ? 1 : b[sortBy] < a[sortBy] ? -1 : 0
    );
    setAffterSort(affter);
  }, [tables, sortBy]);

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
    const affter = tables
      .filter(
        (el) =>
          Date.parse(el.createdAt) >= startDate &&
          Date.parse(el.createdAt) <= endDate
      )
      .sort((a, b) =>
        a[sortBy] < b[sortBy] ? 1 : b[sortBy] < a[sortBy] ? -1 : 0
      );
    setAffterSort(affter);
  }, [startDate, endDate, sortBy, tables]);

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
                <th scope="col">
                  מספר שולחן
                  <i
                    className={`fas fa-sort ms-1 aling-middle ${
                      sortBy === "number" ? "text-primary" : null
                    }`}
                    onClick={() => setSortBy("number")}
                  ></i>
                </th>
                <th scope="col">
                  נפתח בתאריך
                  <i
                    className={`fas fa-sort ms-1 aling-middle ${
                      sortBy === "createdAt" ? "text-primary" : null
                    }`}
                    onClick={() => setSortBy("createdAt")}
                  ></i>
                </th>
                <th scope="col">
                  נסגר בתאריך
                  <i
                    className={`fas fa-sort ms-1 aling-middle ${
                      sortBy === "updatedAt" ? "text-primary" : null
                    }`}
                    onClick={() => setSortBy("updatedAt")}
                  ></i>
                </th>
                <th scope="col">
                  חשבון
                  <i
                    className={`fas fa-sort ms-1 aling-middle ${
                      sortBy === "totalPrice" ? "text-primary" : null
                    }`}
                    onClick={() => setSortBy("totalPrice")}
                  ></i>{" "}
                </th>
                <th scope="col">
                  הנחה
                  <i
                    className={`fas fa-sort ms-1 aling-middle ${
                      sortBy === "discount" ? "text-primary" : null
                    }`}
                    onClick={() => setSortBy("discount")}
                  ></i>
                </th>
                <th scope="col">
                  שולם
                  <i
                    className={`fas fa-sort ms-1 aling-middle ${
                      sortBy === "pay" ? "text-primary" : null
                    }`}
                    onClick={() => setSortBy("pay")}
                  ></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {affterSort.map((table) => (
                <tr className="text-center" key={table._id}>
                  <td>{table.number}</td>
                  <td>{DateFromat.format(Date.parse(table.createdAt))}</td>
                  <td>{DateFromat.format(Date.parse(table.updatedAt))}</td>
                  <td>{currencyFormat.format(table.totalPrice)}</td>
                  <td>{currencyFormat.format(table.discount)}</td>
                  <td>{currencyFormat.format(table.pay)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
