import React, {useState} from "react";

import EditProdect from "./EditProdect";
import DeleteProdect from "./DeleteProdect";

export default function ProdectList({categorys, prodects, getProdects}) {
    const [currntProdect, setCurrntProdect] = useState("");

    const currencyFormat = new Intl.NumberFormat('he-HE', { style: 'currency', currency: 'ILS' });

    function categoryInfo(cid) {
        let Res;
        
        if(cid){
            Res = categorys.find(cate => cate._id === cid);
        }

        if(Res){
            return Res.title;
        }
    }

    return (
        <div className="list-group">
            {prodects.map(prodect => (
            <div className="list-group-item" key={prodect._id}>
                <div className="row">
                    <div className="col-3 text-center">
                        <span className="fw-bold align-middle">{prodect.title}</span>
                    </div>
                    <div className="col-3 text-center">
                        <span className="align-middle">{categoryInfo(prodect.cid)}</span>
                    </div>
                    <div className="col-3 text-center">
                    <span className="align-middle">{currencyFormat.format(prodect.price)}</span>
                    </div>
                    <div className="col-3 d-flex justify-content-end">
                        <button 
                            className="btn p-0 m-0"  
                            data-bs-toggle="modal" 
                            data-bs-target="#editProdectModel" 
                            onClick={(e) => setCurrntProdect(prodect)}
                        >
                            <span className="material-icons align-middle">edit</span>
                        </button>
                        <button 
                            className="btn p-0 m-0"  
                            data-bs-toggle="modal" 
                            data-bs-target="#deleteProdectModel"
                            onClick={(e) => setCurrntProdect(prodect)}
                        >
                            <span className="material-icons align-middle">delete</span>
                        </button>
                    </div>
                </div>
            </div>
            ))}

            <DeleteProdect prodect={currntProdect} getProdects={getProdects} />
            <EditProdect categorys={categorys} prodect={currntProdect} getProdects={getProdects} />
        </div>
    );
}