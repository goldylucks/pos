import React, { useState } from "react";

import Editproduct from "./Editproduct";
import Deleteproduct from "./Deleteproduct";

export default function productList({ categorys, products, getproducts }) {
  const [currntproduct, setCurrntproduct] = useState("");

  const currencyFormat = new Intl.NumberFormat("he-HE", {
    style: "currency",
    currency: "ILS",
  });

  function categoryInfo(cid) {
    let Res;

    if (cid) {
      Res = categorys.find((cate) => cate._id === cid);
    }

    if (Res) {
      return Res.title;
    }
  }

  return (
    <div className="list-group">
      {products.map((product) => (
        <div className="list-group-item" key={product._id}>
          <div className="row">
            <div className="col-3 text-center">
              <span className="fw-bold align-middle">{product.title}</span>
            </div>
            <div className="col-3 text-center">
              <span className="align-middle">{categoryInfo(product.cid)}</span>
            </div>
            <div className="col-3 text-center">
              <span className="align-middle">
                {currencyFormat.format(product.price)}
              </span>
            </div>
            <div className="col-3 d-flex justify-content-end">
              <button
                className="btn p-0 m-0"
                data-bs-toggle="modal"
                data-bs-target="#editproductModel"
                onClick={(e) => setCurrntproduct(product)}
              >
                <span className="material-icons align-middle">edit</span>
              </button>
              <button
                className="btn p-0 m-0"
                data-bs-toggle="modal"
                data-bs-target="#deleteproductModel"
                onClick={(e) => setCurrntproduct(product)}
              >
                <span className="material-icons align-middle">delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      <Deleteproduct product={currntproduct} getproducts={getproducts} />
      <Editproduct
        categorys={categorys}
        product={currntproduct}
        getproducts={getproducts}
      />
    </div>
  );
}
