import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Menu({ tid, products, getOrders, totalBill }) {
  const [categorys, setCategorys] = useState([]);
  const [search, setSearch] = useState();

  // Get category
  useEffect(() => {
    Axios.get("/category/")
      .then((Res) => setCategorys(Res.data.category))
      .catch((err) => console.log(err));
  }, []);

  const addOrder = (pid) => {
    Axios.post("/order/add", { tid: tid, pid: pid })
      .then(() => {
        getOrders();
      })
      .catch((err) => console.log(err));
  };

  function searchHandel(key) {
    setSearch(key);

    document.querySelector("#category-tab-search").classList.add("active");
    document.querySelector("#category-tab-search").classList.add("show");

    categorys.forEach((cate) => {
      document
        .querySelector(`#category-tab-${cate._id}`)
        .classList.remove("active");
      document
        .querySelector(`#category-tab-${cate._id}`)
        .classList.remove("show");
    });
  }

  function hideSearch(params) {
    document
      .querySelector("#category-tab-search")
      .classList.remove("active", "show");
    document.querySelector("#category-tab-search").classList.remove("show");
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-2">
          <div className="col-12">
            <input
              type="text"
              className="form-control w-100"
              placeholder="חפש מוצר..."
              name="search"
              onChange={(e) => searchHandel(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <div
              className="nav flex-column nav-pills"
              id="category-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              {categorys.map((category) => (
                <a
                  className="nav-link text-center"
                  id={`category-tab-${category._id}-tab`}
                  data-bs-toggle="pill"
                  href={`#category-tab-${category._id}`}
                  role="tab"
                  aria-controls={`category-tab-${category._id}`}
                  aria-selected="true"
                  key={category._id}
                  onClick={hideSearch}
                >
                  <span className={`fas ${category.icon}`}></span>
                  <br />
                  <span className="align-middle">{category.title}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="col-9">
            <div className="tab-content" id="category-tab-tabContent">
              <div
                className="tab-pane fade"
                id="category-tab-search"
                role="tabpanel"
                aria-labelledby={`category-tab-search-tab`}
              >
                <strong>תוצאות חיפוש:</strong>
                <br />
                {!search
                  ? null
                  : products
                      .filter((product) => product.title.indexOf(search) > -1)
                      .map((product) => (
                        <button
                          type="button"
                          className="btn btn-lg btn-outline-primary me-1 mb-1"
                          key={product._id}
                          onClick={(e) => addOrder(product._id)}
                        >
                          {product.title}
                          <small className="text-muted fs-6 me-1">
                            {product.price}
                          </small>
                        </button>
                      ))}
              </div>
              {categorys.map((category) => (
                <div
                  className="tab-pane fade"
                  id={`category-tab-${category._id}`}
                  role="tabpanel"
                  aria-labelledby={`category-tab-${category._id}-tab`}
                  key={category._id}
                >
                  <div className="d-grid gap-2 d-md-block">
                    {products
                      .filter((product) => product.cid === category._id)
                      .map((product) => (
                        <button
                          type="button"
                          className="btn btn-lg btn-outline-primary me-1 mb-1"
                          key={product._id}
                          onClick={(e) => addOrder(product._id)}
                        >
                          {product.title}
                          <small className="text-muted fs-6 me-1">
                            {product.price}
                          </small>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
