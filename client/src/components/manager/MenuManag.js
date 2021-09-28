import React, { useState, useEffect } from "react";
import Axios from "axios";

// Component
import CategoryList from "./menu/CategoryList";
import productList from "./menu/productList";
import AddCatagory from "./menu/AddCategory";
import AddPordect from "./menu/Addproduct";

export default function MenuManag(newMessage) {
  const [categorys, setCategorys] = useState([]);
  const [products, setproducts] = useState([]);

  // get categorys
  const getCategorys = async () => {
    let data = await Axios.get("/category/")
      .then((data) => data)
      .catch((err) => console.log(err));

    setCategorys(data.data.category);
  };

  // get products
  const getproducts = async () => {
    let data = await Axios.get("/product/")
      .then((data) => data)
      .catch((err) => console.log(err));

    setproducts(data.data.product);
  };

  useEffect(() => {
    getCategorys();
    getproducts();
  }, []);

  return (
    <div className="row">
      <div className="col-3">
        <div className="card">
          <div className="card-body">
            <button
              className="btn btn-primary m-1"
              data-bs-toggle="modal"
              data-bs-target="#addCategoryModel"
            >
              <span className="material-icons align-middle">add</span>
              הוסף קטגוריה
            </button>
            <button
              className="btn btn-primary m-1"
              data-bs-toggle="modal"
              data-bs-target="#addproductModel"
            >
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
                  id="list-tab-product-tab"
                  data-bs-toggle="pill"
                  href="#list-tab-product"
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
                <CategoryList
                  categorys={categorys}
                  getCategorys={getCategorys}
                />
              </div>
              <div
                className="tab-pane fade"
                id="list-tab-product"
                role="tabpanel"
                aria-labelledby="list-tab-product-tab"
              >
                <productList
                  categorys={categorys}
                  products={products}
                  getproducts={getproducts}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddCatagory getCategorys={getCategorys} newMessage={newMessage} />
      <AddPordect categorys={categorys} getproducts={getproducts} />
    </div>
  );
}
