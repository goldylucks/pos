import React, {useState, useEffect} from "react";
import Axios from "axios";

// Component
import CategoryList from "./menu/CategoryList";
import ProdectList from "./menu/ProdectList";
import AddCatagory from "./menu/AddCategory";
import AddPordect from "./menu/AddProdect";



export default function MenuManag(newMessage) {
    const [categorys, setCategorys] = useState([]);
    const [prodects, setProdects] = useState([]);


        // get categorys
        const getCategorys = async () => {
            let data = await Axios.get("/category/")
            .then((data) => data)
            .catch(err => console.log(err));

            setCategorys(data.data.category);
        }

        // get prodects
        const getProdects = async () => {
            let data = await Axios.get("/prodect/")
            .then((data) => data)
            .catch(err => console.log(err));

            setProdects(data.data.prodect);
        }

        useEffect(() => {
            getCategorys();
            getProdects();
        }, []);
 
    
    return (
        <div className="row">
            <div className="col-3">
                <div className="card">
                    <div className="card-body">
                        <button className="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#addCategoryModel">
                            <span className="material-icons align-middle">add</span>
                            הוסף קטגוריה
                        </button>
                        <button className="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#addProdectModel">
                            <span className="material-icons align-middle">add</span>
                            הוסף פריט
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-9">
                <div className="card">
                    <div className="card-header">
                        <ul
                            className="nav nav-pills card-header-pills flex-column flex-sm-row" 
                            id="list-tab"
                            role="tablist"
                        >
                            <li className="nav-item">
                                <a
                                className="nav-link active"
                                id="list-tab-category-tab"
                                data-bs-toggle="pill"
                                href="#list-tab-category"
                                role="tab"
                                aria-selected="true"
                                >
                                    קטגוריות
                                </a>
                            </li>
                            <li className="nav-item ms-1">
                                <a
                                className="nav-link"
                                id="list-tab-prodect-tab"
                                data-bs-toggle="pill"
                                href="#list-tab-prodect"
                                role="tab"
                                aria-selected="true"
                                >
                                    פריטים
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <div className="tab-content" id="list-tab-tabContent">
                            <div
                            className="tab-pane fade show active"
                            id="list-tab-category"
                            role="tabpanel"
                            aria-labelledby="list-tab-category-tab"
                            >
                                <CategoryList categorys={categorys} getCategorys={getCategorys}/>
                            </div>
                            <div
                            className="tab-pane fade"
                            id="list-tab-prodect"
                            role="tabpanel"
                            aria-labelledby="list-tab-prodect-tab"
                            >
                                <ProdectList categorys={categorys} prodects={prodects} getProdects={getProdects} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AddCatagory getCategorys={getCategorys} newMessage={newMessage} />
            <AddPordect categorys={categorys} getProdects={getProdects} />
        </div>
    );
}
