import { useState, useEffect } from "react";

export default function DiscountInfo({ tables }) {
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
      a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
    );
    setAffterSort(affter);
  }, [tables]);

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
                <th scope="col">מספר שולחן</th>
                <th scope="col">תאריך</th>
                <th scope="col">הנחה</th>
                <th scope="col">הנחה באחוזים</th>
              </tr>
            </thead>
            <tbody>
              {affterSort
                .filter((tab) => tab.discount > 0)
                .map((table) => (
                  <tr className="text-center" key={table._id}>
                    <td>{table.number}</td>
                    <td>{DateFromat.format(Date.parse(table.createdAt))}</td>
                    <td>{currencyFormat.format(table.discount)}</td>
                    <td>
                      {Math.round((table.discount / table.totalPrice) * 100)} %
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
