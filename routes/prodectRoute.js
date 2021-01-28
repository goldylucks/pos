const router = require("express").Router();
const Prodect = require("../models/prodectModel");

// ----------- Find all --------------
router.get("/", (req, res) => {
    Prodect.find()
    .then(prodect => res.json({prodect}))
    .catch(err => res.json(err));
  });

// ------------ Add Prodect -----------
router.post("/add", (req, res) => {
    const {title, cid, price} = req.body;

    const newProdect= new Prodect({
        title: title,
        cid: cid,
        price: price
    });

    const saveProdect = newProdect.save()
    .then(ProdectData => res.json({ProdectData}))
    .catch(err => res.json(err));
});

// ------------- Edit Prodect ------------
router.post("/edit", (req, res) => {
  const {id, title, cid, price} = req.body;

  Prodect.findOneAndUpdate({_id: id}, {title: title, cid: cid, price: price})
  .then(Res => res.json(Res))
  .catch(err => res.json(err));
});


// ---------- Remove Prodect -----------------
router.post("/remove", (req, res) => {
  const {id} = req.body;

  Prodect.remove({_id: id})
  .then(Res => res.json(Res))
  .catch(err => res.json(err));
})


module.exports = router;
