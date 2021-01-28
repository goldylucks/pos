import {useState, useEffect} from "react";

export default function ProdectsInfo({orders, prodects}) {
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(Date.now()+30000);
    
    const currencyFormat = new Intl.NumberFormat('he-HE', { style: 'currency', currency: 'ILS' });

    function Sold(pid) {
        let numberSold;
        if(pid){
            numberSold = orders
            .filter(ord => ord.pid === pid && Date.parse(ord.createdAt) >= startDate && Date.parse(ord.createdAt) <= endDate).length;
        }
        return numberSold;
    }

    function StartDate(date){
        const fullDate = new Date(date);
        fullDate.setHours(0);
        setStartDate(Date.parse(fullDate));
    }

    function EndDate(date){
        const fullDate = new Date(date);
        fullDate.setHours(23);
        fullDate.setMinutes(59);
        setEndDate(Date.parse(fullDate));
    }
      

    return (
        <>
        <div className="card mb-2">
            <div className="card-body row g-3">
                <div className="col-auto">
                    <label className="form-label">מתאריך</label>
                    <input type="date" className="form-control" onChange={(e) => {StartDate(e.target.value)}} />
                </div>
                <div className="col-auto">
                    <label className="form-label">עד תאריך</label>
                    <input type="date" className="form-control" onChange={(e) => {EndDate(e.target.value)}} />
                </div>
            </div>
        </div>

        <div className="card">
            <div className="card-body">
        
        <table className="table table-striped">
            <thead>
            <tr className="text-center">
                <th scope="col">
                    שם מוצר
                </th>
                <th scope="col">
                    מחיר             
                </th>
                <th scope="col">
                    כמות שנמכרו              
                </th>
                <th scope="col">
                    שווי מוערך
                </th>

            </tr>
            </thead>
            <tbody>
                {prodects.map(prodect => (
                <tr className="text-center" key={prodect._id}>
                    <td>{prodect.title}</td>
                    <td>{currencyFormat.format(prodect.price)}</td>
                    <td>{Sold(prodect._id)}</td>
                    <td>{currencyFormat.format(prodect.price * Sold(prodect._id))}</td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
        </>
    )
}