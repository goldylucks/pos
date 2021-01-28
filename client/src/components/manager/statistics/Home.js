import {useState} from "react";

export default function Home({tables, orders, prodects}) {
    const [paymantDisplay, setPaymantDisplay] = useState("today");
    const [discountDisplay, setDiscountDisplay] = useState("today");
    const [canselsDisplay, setCanselsDisplay] = useState("today");
    const [tablesDisplay, setTablesDisplay] = useState("today");
    const [peopleDisplay, setPeopleDisplay] = useState("today");




    const currencyFormat = new Intl.NumberFormat('he-HE', { style: 'currency', currency: 'ILS' });

    // Dates
    const date = new Date();

    // Today
    const today = new Date(date);
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);    

    // week
    const currentWeekDay = date.getDay();
    const lessDays = currentWeekDay === 1 ? 1 : currentWeekDay;
    const weekStart = new Date(new Date(date).setDate(date.getDate() - lessDays));
    weekStart.setHours(0);
    weekStart.setMinutes(0);
    weekStart.setSeconds(0);
    const weekEnd = new Date(new Date(weekStart).setDate(weekStart.getDate() + 6));


    // month
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const yearStart = new Date(date.getFullYear(), 0, 1);
    const yearEnd= new Date(date.getFullYear(), 12, 0);

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
    
        if(type === "title"){
          return title;
        }else if(type === "price"){
          return price;
        }
    }

    function reducePay() {
        let totalPayment = 0;

        switch (paymantDisplay){
            case "today":
                tables.filter(tab => Date.parse(tab.updatedAt) >= Date.parse(today)).map(table => {
                    return totalPayment += table.pay;
                });
                break
            case "week":
                tables.filter(tab => Date.parse(tab.updatedAt) > Date.parse(weekStart) && Date.parse(tab.updatedAt) < Date.parse(weekEnd))
                .map(table => {
                    return totalPayment += table.pay;
                });
                break
            case "month":
                tables.filter(tab => Date.parse(tab.updatedAt) > Date.parse(monthStart) && Date.parse(tab.updatedAt) < Date.parse(monthEnd))
                .map(table => {
                    return totalPayment += table.pay;
                });
                break
            case "year":
                tables.filter(tab => Date.parse(tab.updatedAt) > Date.parse(yearStart) && Date.parse(tab.updatedAt) < Date.parse(yearEnd)).map(table => {
                    return totalPayment += table.pay;
                });
                break
            default:
                tables.map(table => {
                    return totalPayment += table.pay;
                });
                break
        }

        return totalPayment;
    }

    function reduceDiscount() {
        let totalDiscount = 0;

        switch (discountDisplay){
            case "today":
                tables.filter(tab => Date.parse(tab.updatedAt) >= Date.parse(today)).map(table => {
                    return totalDiscount += table.discount;
                });
                break
            case "week":
                tables.filter(tab => Date.parse(tab.updatedAt) > Date.parse(weekStart) && Date.parse(tab.updatedAt) < Date.parse(weekEnd))
                .map(table => {
                    return totalDiscount += table.discount;
                });
                break
            case "month":
                tables.filter(tab => Date.parse(tab.updatedAt) > Date.parse(monthStart) && Date.parse(tab.updatedAt) < Date.parse(monthEnd))
                .map(table => {
                    return totalDiscount += table.discount;
                });
                break
            case "year":
                tables.filter(tab => Date.parse(tab.updatedAt) > Date.parse(yearStart) && Date.parse(tab.updatedAt) < Date.parse(yearEnd)).map(table => {
                    return totalDiscount += table.discount;
                });
                break
            default:
                tables.map(table => {
                    return totalDiscount += table.discount;
                });
                break
        }

        return totalDiscount;
    }

    function reduceCansels() {
        let totalCansels = 0;

        switch (canselsDisplay){
            case "today":
                orders.filter(ord => ord.cansel === 1 && Date.parse(ord.updatedAt) >= Date.parse(today)).map(order => {
                    return totalCansels += Number(prodectInfo("price", order.pid));
                });
                break
            case "week":
                orders.filter(ord => ord.cansel === 1 && Date.parse(ord.updatedAt) > Date.parse(weekStart) && Date.parse(ord.updatedAt) < Date.parse(weekEnd))
                .map(order => {
                    return totalCansels += Number(prodectInfo("price", order.pid));
                });
                break
            case "month":
                orders.filter(ord => ord.cansel === 1 && Date.parse(ord.updatedAt) > Date.parse(monthStart) && Date.parse(ord.updatedAt) < Date.parse(monthEnd))
                .map(order => {
                    return totalCansels += Number(prodectInfo("price", order.pid));
                });
                break
            case "year":
                orders.filter(ord => ord.cansel === 1 && Date.parse(ord.updatedAt) > Date.parse(yearStart) && Date.parse(ord.updatedAt) < Date.parse(yearEnd)).map(order => {
                    return totalCansels += Number(prodectInfo("price", order.pid));
                });
                break
            default:
                orders.map(order => {
                    return totalCansels += Number(prodectInfo("price", order.pid));
                });
                break
        }

        return totalCansels;
    }

    function reduceTables() {
        let totalTables = 0;

        switch (tablesDisplay){
            case "today":
                tables.filter(tab => Date.parse(tab.updatedAt) >= Date.parse(today)).map(table => {
                    return totalTables += 1;
                });
                break
            case "week":
                tables.filter(tab => Date.parse(tab.updatedAt) > Date.parse(weekStart) && Date.parse(tab.updatedAt) < Date.parse(weekEnd))
                .map(table => {
                    return totalTables += 1;
                });
                break
            case "month":
                tables.filter(tab => Date.parse(tab.updatedAt) > Date.parse(monthStart) && Date.parse(tab.updatedAt) < Date.parse(monthEnd))
                .map(table => {
                    return totalTables += 1;
                });
                break
            case "year":
                tables.filter(tab => Date.parse(tab.updatedAt) > Date.parse(yearStart) && Date.parse(tab.updatedAt) < Date.parse(yearEnd)).map(table => {
                    return totalTables += 1;
                });
                break
            default:
                tables.map(table => {
                    return totalTables += 1;
                });
                break
        }

        return totalTables;
    }

    function reducePeople() {
        let totalPeople = 0;

        switch (peopleDisplay){
            case "today":
                tables.filter(tab => Date.parse(tab.updatedAt) >= Date.parse(today)).map(table => {
                    return totalPeople += table.people;
                });
                break
            case "week":
                tables.filter(tab => Date.parse(tab.updatedAt) > Date.parse(weekStart) && Date.parse(tab.updatedAt) < Date.parse(weekEnd))
                .map(table => {
                    return totalPeople += table.people;
                });
                break
            case "month":
                tables.filter(tab => Date.parse(tab.updatedAt) > Date.parse(monthStart) && Date.parse(tab.updatedAt) < Date.parse(monthEnd))
                .map(table => {
                    return totalPeople += table.people;
                });
                break
            case "year":
                tables.filter(tab => Date.parse(tab.updatedAt) > Date.parse(yearStart) && Date.parse(tab.updatedAt) < Date.parse(yearEnd)).map(table => {
                    return totalPeople += table.people;
                });
                break
            default:
                tables.map(table => {
                    return totalPeople += table.people;
                });
                break
        }

        return totalPeople;
    }


    return (
        <div className="card">
        <div className="card-body">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <div className="btn-group btn-group-sm">
                                <button 
                                    className={`btn btn-primary ${paymantDisplay ===  "today" ? "active" : null}`} 
                                    onClick={() => setPaymantDisplay("today")}
                                >
                                    יומי
                                </button>
                                <button 
                                    className={`btn btn-primary ${paymantDisplay ===  "week" ? "active" : null}`} 
                                    onClick={() => setPaymantDisplay("week")}
                                >
                                    שבועי
                                </button>
                                <button 
                                    className={`btn btn-primary ${paymantDisplay ===  "month" ? "active" : null}`} 
                                    onClick={() => setPaymantDisplay("month")}
                                >
                                    חודשי
                                </button>
                                <button 
                                    className={`btn btn-primary ${paymantDisplay ===  "year" ? "active" : null}`} 
                                    onClick={() => setPaymantDisplay("year")}
                                >
                                    שנתי
                                </button>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h5>קופה:</h5>
                            <h2>{currencyFormat.format(reducePay())}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <div className="btn-group btn-group-sm">
                                <button 
                                    className={`btn btn-primary ${discountDisplay ===  "today" ? "active" : null}`} 
                                    onClick={() => setDiscountDisplay("today")}
                                >
                                    יומי
                                </button>
                                <button 
                                    className={`btn btn-primary ${discountDisplay ===  "week" ? "active" : null}`} 
                                    onClick={() => setDiscountDisplay("week")}
                                >
                                    שבועי
                                </button>
                                <button 
                                    className={`btn btn-primary ${discountDisplay ===  "month" ? "active" : null}`} 
                                    onClick={() => setDiscountDisplay("month")}
                                >
                                    חודשי
                                </button>
                                <button 
                                    className={`btn btn-primary ${discountDisplay ===  "year" ? "active" : null}`} 
                                    onClick={() => setDiscountDisplay("year")}
                                >
                                    שנתי
                                </button>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h5>הנחות:</h5>
                            <h2>{currencyFormat.format(reduceDiscount())}</h2>
                        </div>
                    </div>
                </div>
                
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <div className="btn-group btn-group-sm">
                                <button 
                                    className={`btn btn-primary ${canselsDisplay ===  "today" ? "active" : null}`} 
                                    onClick={() => setCanselsDisplay("today")}
                                >
                                    יומי
                                </button>
                                <button 
                                    className={`btn btn-primary ${canselsDisplay ===  "week" ? "active" : null}`} 
                                    onClick={() => setCanselsDisplay("week")}
                                >
                                    שבועי
                                </button>
                                <button 
                                    className={`btn btn-primary ${canselsDisplay ===  "month" ? "active" : null}`} 
                                    onClick={() => setCanselsDisplay("month")}
                                >
                                    חודשי
                                </button>
                                <button 
                                    className={`btn btn-primary ${canselsDisplay ===  "year" ? "active" : null}`} 
                                    onClick={() => setCanselsDisplay("year")}
                                >
                                    שנתי
                                </button>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h5>ביטולים:</h5>
                            <h2>{currencyFormat.format(reduceCansels())}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-2">

            <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <div className="btn-group btn-group-sm">
                                <button 
                                    className={`btn btn-primary ${tablesDisplay ===  "today" ? "active" : null}`} 
                                    onClick={() => setTablesDisplay("today")}
                                >
                                    יומי
                                </button>
                                <button 
                                    className={`btn btn-primary ${tablesDisplay ===  "week" ? "active" : null}`} 
                                    onClick={() => setTablesDisplay("week")}
                                >
                                    שבועי
                                </button>
                                <button 
                                    className={`btn btn-primary ${tablesDisplay ===  "month" ? "active" : null}`} 
                                    onClick={() => setTablesDisplay("month")}
                                >
                                    חודשי
                                </button>
                                <button 
                                    className={`btn btn-primary ${tablesDisplay ===  "year" ? "active" : null}`} 
                                    onClick={() => setTablesDisplay("year")}
                                >
                                    שנתי
                                </button>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h5>שולחנות:</h5>
                            <h2>{reduceTables()}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <div className="btn-group btn-group-sm">
                                <button 
                                    className={`btn btn-primary ${peopleDisplay ===  "today" ? "active" : null}`} 
                                    onClick={() => setPeopleDisplay("today")}
                                >
                                    יומי
                                </button>
                                <button 
                                    className={`btn btn-primary ${peopleDisplay ===  "week" ? "active" : null}`} 
                                    onClick={() => setPeopleDisplay("week")}
                                >
                                    שבועי
                                </button>
                                <button 
                                    className={`btn btn-primary ${peopleDisplay ===  "month" ? "active" : null}`} 
                                    onClick={() => setPeopleDisplay("month")}
                                >
                                    חודשי
                                </button>
                                <button 
                                    className={`btn btn-primary ${peopleDisplay ===  "year" ? "active" : null}`} 
                                    onClick={() => setPeopleDisplay("year")}
                                >
                                    שנתי
                                </button>
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h5>אורחים:</h5>
                            <h2>{reducePeople()}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}