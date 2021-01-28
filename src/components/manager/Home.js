import { useEffect, useState } from "react";
import Axios from "axios";

export default function Home() {
    const [tables, setTables] = useState();
    const [orders, setOrders] = useState();


    // Get Table 
    const getTables = () => {
      Axios.get("http://localhost:5000/tables")
      .then(Res => setTables(Res.data.tables))
      .catch(err => console.log(err));
    }


    // Get Orders
    const getOrders = () => {
      Axios.get("http://localhost:5000/order/")
      .then(Res => setOrders(Res.data.order))
      .catch(err => console.log(err));
    }

    useEffect(() => {
        getTables();
        getOrders();


    }, [])


    // useEffect(() => {
    //     console.log("effect");
        


    //     const totalPayment = tables.reduce(function(arr, vel) {
    //         return {
    //             pay: arr.pay + vel.pay
    //         } 
    //     });
    //     console.log(tables);
    //     console.log(totalPayment);

    // }, [tables])




    return (
        <div className="row">
            <div className="col-4">
                <div className="card">
                    <div className="card-header text-center">
                        <strong>קופה יומי</strong>
                    </div>
                    <div className="card-body">

                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="card">
                    <div className="card-header text-center">
                        <strong>אורחים</strong>
                    </div>
                    <div className="card-body">
                        
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="card">
                    <div className="card-header text-center">
                        <strong>קופה חודשי</strong>
                    </div>
                    <div className="card-body">
                    </div>
                </div>
            </div>
        </div>
    )
}