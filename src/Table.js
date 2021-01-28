import {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

import Orders from "./components/table/Orders";
import Bill from "./components/table/Bill";
import Payment from "./components/table/Payment";
import EditTable from "./components/restaurant/EditTable";

export default function Table() {
    let { id } = useParams();
    const [table, setTable] = useState({});
    const [orders, setOrders] = useState([]);
    const [prodects, setProdects] = useState([]);

    const currencyFormat = new Intl.NumberFormat('he-HE', { style: 'currency', currency: 'ILS' });

    function prodectInfo(type ,oid) {
      let title;
      let price;
      if(oid){
        const Res = prodects.find(prod => prod._id === oid);
  
        if(Res){
          title = Res.title;
          price = Res.price;
        }
      }
  
      if(type == "title"){
        return title;
      }else if(type == "price"){
        return price;
      }
    }

    // Get Table 
    const getTables = () => {
      Axios.get(`http://localhost:5000/tables/byID/?id=${id}`)
      .then(Res => setTable(Res.data))
      .catch(err => console.log(err));
    }


    // Get Orders
    const getOrders = () => {
      Axios.post(`http://localhost:5000/order/byTable/?tid=${id}`)
      .then(Res => setOrders(Res.data.order))
      .catch(err => console.log(err));
    }


    // get prodects
    const getProdects = () => {
      Axios.get("http://localhost:5000/prodect/")
      .then(Res => setProdects(Res.data.prodect))
      .catch(err => console.log(err));
    }

    function totalBill(){
      let total = 0;
      
      orders.filter(ord => ord.cansel !== 1).map(order => {
        const thisPrice = prodectInfo("price", order.pid);
        total += Number(thisPrice);
      });
        
      Axios.post("http://localhost:5000/tables/totalPrice", {id: table._id, total: total})
      .then(() => {
        getTables();
      });
  
    }

    useEffect(() => {
      getTables();
      getOrders();
      getProdects();
  }, []);

  useEffect(() => {
     totalBill();
  }, [orders]);
  
    return (
      <main className="container">
        <div className="card min-vh-100">
          <div className="card-header">
            <ul
              className="nav nav-pills card-header-pills flex-column flex-sm-row" 
              id="header-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="header-tab-1-tab"
                  data-bs-toggle="pill"
                  href="#header-tab-1"
                  role="tab"
                  aria-controls="header-tab-1"
                  aria-selected="true"
                >
                  <span className="material-icons align-middle">restaurant</span>
                  הזמנות
                </a>
              </li>
  
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="header-tab-2-tab"
                  data-bs-toggle="pill"
                  href="#header-tab-2"
                  role="tab"
                  aria-controls="header-tab-2"
                  aria-selected="true"
                >
                  <span className="material-icons align-middle">
                    receipt_long
                  </span>
                  חשבון
                </a>
              </li>
  
              <li className="nav-item">
                <a
                    className="nav-link"
                    id="header-tab-3-tab"
                    data-bs-toggle="pill"
                    href="#header-tab-3"
                    role="tab"
                    aria-controls="header-tab-3"
                    aria-selected="true"
                  >                
                    <span className="material-icons align-middle">credit_card</span>
                    תשלום
                </a>
              </li>

              
              <li className="nav-item flex-sm-fill text-sm-end">
                <a className="nav-link">
                  <Link to="/">
                    <span className="material-icons align-middle">arrow_forward</span>
                    חזור למסך ראשי 
                  </Link>
                </a>
              </li>

            </ul>
          </div>
          <div className="card-body">
            <div className="card mb-2 bg-light">
              <div className="card-body">
              <div className="row">
              <div className="col-3 text-center">
                <strong>מספר שולחן:</strong>
                <span className="ms-2">{table.number}</span>
              </div>
              <div className="col-3 text-center">
                <strong>מספר סועדים:</strong>
                <span className="ms-2">{table.people}</span>
              </div>
              <div className="col-4 text-center">
                <strong>סה"כ:</strong>
                <span className="ms-2 text-primary">{currencyFormat.format(table.totalPrice)}</span>
              </div>
              <div className="col-2 d-flex justify-content-end">
              <button className="btn m-0 p-0" data-bs-toggle="modal" data-bs-target="#editTableModel">
                  <span className="material-icons">edit</span>
                </button>
              </div>
            </div>
              </div>
            </div>

          <div className="tab-content" id="header-tab-tabContent">
            <div
              className="tab-pane fade show active"
              id="header-tab-1"
              role="tabpanel"
              aria-labelledby="header-tab-1-tab"
            >
              <Orders  
                prodects={prodects} 
                table={table} 
                orders={orders} 
                getOrders={getOrders}
                totalBill={totalBill}
                />
  
            </div>
  
            <div
              className="tab-pane fade"
              id="header-tab-2"
              role="tabpanel"
              aria-labelledby="header-tab-2-tab"
            >
              <Bill table={table} prodects={prodects} orders={orders}  />
            </div>
  
            <div
              className="tab-pane fade"
              id="header-tab-3"
              role="tabpanel"
              aria-labelledby="header-tab-3-tab"
            >
              <Payment table={table} getTables={getTables}/>
            </div>
  
          </div>
        </div>
        </div>
        <EditTable table={table} getTables={getTables} />
      </main>
    );
  }