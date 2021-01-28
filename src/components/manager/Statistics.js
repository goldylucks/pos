import {useState, useEffect} from "react";
import Axios from "axios";

import TablesInfo from "./statistics/TablesInfo";
import OrdersInfo from "./statistics/OrdersInfo";
import ProdectsInfo from "./statistics/ProdectsInfo";
import CanselsInfo from "./statistics/CanselsInfo";
import DiscountInfo from "./statistics/DiscountInfo";
import Home from "./statistics/Home";

export default function Statistics() {
    const [tables, setTables] = useState([]);
    const [orders, setOrders] = useState([]);
    const [prodects, setProdects] = useState([]);

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

    // Get Pordects
    const getProdects = () => {
      Axios.get("http://localhost:5000/prodect/")
      .then(Res => setProdects(Res.data.prodect))
      .catch(err => console.log(err));
    }

    useEffect(() => {
        getTables();
        getOrders();
        getProdects();

    }, [])


      
    
    return (
        <div className="row">
            <div className="col-3">
                <div className="card">
                    <div className="card-body">
                        <div className="nav nav-pills d-flex flex-column" id="staistics-menu" role="tablist">
                        <button 
                            className="nav-link btn btn-lg btn-outline-primary me-1 mb-1 active"
                            data-bs-toggle="pill"
                            role="tab"
                            id="tab-info-button"
                            aria-controls="tab-info"
                            href="#tab-info"
                        >
                            מידע כללי
                        </button>
                        <button 
                            className="nav-link btn btn-lg btn-outline-primary me-1 mb-1"
                            data-bs-toggle="pill"
                            role="tab"
                            id="tab-tablesInfo-button"
                            aria-controls="tab-tablesInfo"
                            href="#tab-tablesInfo"
                        >
                            שולחנות
                        </button>
                        <button 
                            className="nav-link btn btn-lg btn-outline-primary me-1 mb-1"
                            data-bs-toggle="pill"
                            role="tab"
                            id="tab-ordersInfo-button"
                            aria-controls="tab-ordersInfo"
                            href="#tab-ordersInfo"
                        >
                            מכירות
                        </button>
                        <button 
                            className="nav-link btn btn-lg btn-outline-primary me-1 mb-1"
                            data-bs-toggle="pill"
                            role="tab"
                            id="tab-prodectsInfo-button"
                            aria-controls="tab-prodectsInfo"
                            href="#tab-prodectsInfo"
                        >
                            מכירות לפי מוצר
                        </button>
                        <button 
                            className="nav-link btn btn-lg btn-outline-primary me-1 mb-1"
                            data-bs-toggle="pill"
                            role="tab"
                            id="tab-canselsInfo-button"
                            aria-controls="tab-canselsInfo"
                            href="#tab-canselsInfo"
                        >
                            ביטולים
                        </button>
                        <button 
                            className="nav-link btn btn-lg btn-outline-primary me-1 mb-1"
                            data-bs-toggle="pill"
                            role="tab"
                            id="tab-discountInfo-button"
                            aria-controls="tab-discountInfo"
                            href="#tab-discountInfo"
                        >
                            הנחות
                        </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-9">
                <div className="tab-content" id="staistics-menu-tabContent">

                    <div className="tab-pane fade show active" id="tab-info" role="tabpanel" aria-labelledby="tab-info-button" >
                        <Home tables={tables} orders={orders} prodects={prodects} />
                    </div>

                    <div className="tab-pane fade" id="tab-tablesInfo" role="tabpanel" aria-labelledby="tab-tablesInfo-button" >
                        <TablesInfo tables={tables} />
                    </div>

                    <div className="tab-pane fade" id="tab-ordersInfo" role="tabpanel" aria-labelledby="tab-ordersInfo-button" >
                        <OrdersInfo tables={tables} orders={orders} prodects={prodects} />
                    </div>

                    <div className="tab-pane fade" id="tab-prodectsInfo" role="tabpanel" aria-labelledby="tab-prodectsInfo-button" >
                        <ProdectsInfo orders={orders} prodects={prodects} />
                    </div>

                    <div className="tab-pane fade" id="tab-canselsInfo" role="tabpanel" aria-labelledby="tab-canselsInfo-button" >
                        <CanselsInfo orders={orders} prodects={prodects} tables={tables} />
                    </div>

                    <div className="tab-pane fade" id="tab-discountInfo" role="tabpanel" aria-labelledby="tab-discountInfo-button" >
                        <DiscountInfo tables={tables} />
                    </div>
                </div>
            </div>
        </div>
    )
}