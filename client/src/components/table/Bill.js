export default function Bill({table, orders, prodects}) {

  const currencyFormat = new Intl.NumberFormat('he-HE', { style: 'currency', currency: 'ILS' });

  const DateFromat = new Intl.DateTimeFormat('he-He', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    });

  const ordersSum = () => {
    const sum = [];
    let x;
     prodects.map((prodect) => {
       const num = orders.filter((order) => order.pid == prodect._id && order.cansel !== 1);
       if (num.length > 0) {
         x++
         sum.push({
           id: x,
           pid: prodect._id,
           title: prodect.title,
           price: prodect.price,
           numbar: num.length,
           sum: prodect.price * num.length,
         });

       }
    });

    return sum;
  }


  return (
    <div className="card">
      <div className="card-header">
        <button className="btn btn-primary m-2">הדפס</button>
        <button className="btn btn-primary">שלח באימייל</button>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2>חשבון</h2>
            <h5>04854654101</h5>
          </div>
        </div>
        <br />
        <div>
          <table className="table w-50 m-auto">
            <thead>
              <tr>
                <th>
                  <h5>פריט</h5>
                </th>
                <th>
                  <h5>מחיר</h5>
                </th>
                <th>
                  <h5>כמות</h5>
                </th>
                <th>
                  <h5>סה"כ</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersSum().map((order) => (
                <tr key={order.id}>
                  <td className="col-md-5">{order.title}</td>
                  <td className="col-md-2">{currencyFormat.format(order.price)}</td>
                  <td className="col-md-2">{order.numbar}</td>
                  <td className="col-md-3">{currencyFormat.format(order.sum)}</td>
                </tr>
              ))}
              <tr>
                <td className="col-md-3"></td>
                <td className="col-md-3"></td>
                <td className="text-left col-md-3">
                  <p>
                    <strong>סה"כ לתשלום</strong>
                  </p>
                  <p>
                    <strong>סה"כ הנחה:</strong>
                  </p>
                </td>
                <td className="col-md-3">
                  <p>
                    <strong>{currencyFormat.format(table.totalPrice)}</strong>
                  </p>
                  <p>
                    <strong>{currencyFormat.format(0)}</strong>
                  </p>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className="text-left">
                  <h4>
                    <strong>סה"כ:</strong>
                  </h4>
                </td>
                <td className="text-left">
                  <h4>
                    <strong>{currencyFormat.format(table.totalPrice)}</strong>
                  </h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="col-md-6 m-auto mt-2">
            <p>
              <b>תאריך:</b>   {DateFromat.format(Date.now())}
            </p>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
