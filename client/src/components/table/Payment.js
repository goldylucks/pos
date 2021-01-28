import {useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import Axios from "axios";

import {MessageContext} from "../../utility/MessageContext";

export default function Payment({table, getTables}){
    const {newMessage} = useContext(MessageContext);
    const [discountPors, SetDiscountPors] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [pay, setPay] = useState(0);
    const [change, setChange] = useState(0);

    let history = useHistory();
    const currencyFormat = new Intl.NumberFormat('he-HE', { style: 'currency', currency: 'ILS' });

    function setDiscount(input) {
        SetDiscountPors(input);

        const pros = input / 100;
        const total = Math.round(table.totalPrice * pros);
        setTotalDiscount(total);
    }

    function discountSave() {
        Axios.post("/tables/discount", {id: table._id, discount: totalDiscount})
        .then(() => {
            getTables();
        })
        .catch(err => console.log(err));
    }

    function changeChack(pay) {
        if(pay > (table.totalPrice - table.pay - table.discount)){
            const thisChange = pay - (table.totalPrice - table.pay - table.discount);
            setChange(thisChange);
        }else{
            setChange(0);
        }

        setPay(pay);
    }

    function paymant() {
        if((Number(pay) + Number(table.pay) + Number(table.discount)) >= Number(table.totalPrice)){
            Axios.post("/tables/pay", {id: table._id, pay: Number(table.pay) + (Number(pay)-Number(change))})
            .catch(err => console.log(err));
            Axios.post("/tables/close", {id: table._id, close: 1})
            .catch(err => console.log(err));
            
            newMessage(`שולחן שולם. עודף: ${currencyFormat.format(change)}`);
            history.push("/");
        }else{
            if(pay > 0){
                Axios.post("/tables/pay", {id: table._id, pay: Number(table.pay) + Number(pay)})
                .then(() => getTables())
                .catch(err => console.log(err));
                
            }
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header"><h5>הנחה</h5></div>
                        <div className="card-body">
                            <label className="form-label" htmlFor="DiscountPros">הנחה ב%</label>
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">%</span>
                                <input 
                                    type="number" 
                                    className="form-control right" 
                                    name="DiscountPros" 
                                    value={discountPors}
                                    onChange={(e) => setDiscount(e.target.value)}
                                />
                            </div>
                            <label className="form-label" htmlFor="Discount">סה"כ הנחה</label>
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">₪</span>
                                <input 
                                    type="number" 
                                    className="form-control right" 
                                    name="Discount" 
                                    value={totalDiscount} 
                                    onChange={(e) => setTotalDiscount(e.target.value)}
                                />
                            </div>
                            <button 
                                className="btn btn-primary float-end mt-3"
                                onClick={discountSave}    
                            >
                                    בצע
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-header"><h5>סוכם כולל</h5></div>
                        <div className="card-body">
                            <strong>סכום:</strong>
                            <span className="float-end">{currencyFormat.format(table.totalPrice)}</span><br />
                            <strong>הנחה:</strong>
                            <span className="float-end">{currencyFormat.format(table.discount)}</span><br />
                            <strong>שולם:</strong>
                            <span className="float-end">{currencyFormat.format(table.pay)}</span><br />
                            <strong>סכום לתשלום:</strong>
                            <span className="float-end">{currencyFormat.format(table.totalPrice - table.pay - table.discount)}</span><br />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header"><h3>תשלום במזומן</h3></div>
                        <div className="card-body">
                            <label className="form-label" htmlFor="cash">שולם במזומן:</label>
                            <input 
                                type="number" 
                                className="form-control right" 
                                name="cash" 
                                placeholder="0" 
                                onChange={(e) => changeChack(e.target.value)}    
                            />
                            <label className="form-label" htmlFor="cahgne">עודף</label>
                            <input type="number" className="form-control right" name="cahgne" value={change} readOnly />
                            <button 
                                className="btn btn-primary float-end mt-3" 
                                onClick={(e) => paymant()}
                            >
                                שלם
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}