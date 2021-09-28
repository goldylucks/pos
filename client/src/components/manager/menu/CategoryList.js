import React, { useState } from "react";

import EditCategory from "./editCategory";
import DeleteCategory from "./DeleteCategory";

export default function CategoryList({ categorys, getCategorys }) {
  const [currntCategory, setCurrntCategory] = useState("");

  return (
    <div className="list-group">
      {categorys.map((category) => (
        <div className="list-group-item" key={category._id}>
          <div className="row">
            <div className="col-2 text-center">
              <span className={`align-middle fas ${category.icon}`}></span>
            </div>
            <div className="col-3 text-center">
              <span className="fw-bold align-middle">{category.title}</span>
            </div>
            <div className="col-7 d-flex justify-content-end">
              <button
                className="btn p-0 m-0"
                data-bs-toggle="modal"
                data-bs-target="#editCategoryModel"
                onClick={(e) => setCurrntCategory(category)}
              >
                <span className="material-icons align-middle">edit</span>
              </button>
              <button
                className="btn p-0 m-0"
                data-bs-toggle="modal"
                data-bs-target="#deleteCategoryModel"
                onClick={(e) => setCurrntCategory(category)}
              >
                <span className="material-icons align-middle">delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      <EditCategory category={currntCategory} getCategorys={getCategorys} />
      <DeleteCategory category={currntCategory} getCategorys={getCategorys} />
    </div>
  );
}
