const router = require("express").Router();
const product = require("../models/productModel");

// ----------- Find all --------------
router.get("/", (req, res) => {
  product.find()
    .then((product) => res.json({ product }))
    .catch((err) => res.json(err));
});

// ------------ Add product -----------
router.post("/add", (req, res) => {
  const { title, cid, price } = req.body;

  const newproduct = new product({
    title: title,
    cid: cid,
    price: price,
  });

  const saveproduct = newproduct
    .save()
    .then((productData) => res.json({ productData }))
    .catch((err) => res.json(err));
});

// ------------- Edit product ------------
router.post("/edit", (req, res) => {
  const { id, title, cid, price } = req.body;

  product.findOneAndUpdate(
    { _id: id },
    { title: title, cid: cid, price: price }
  )
    .then((Res) => res.json(Res))
    .catch((err) => res.json(err));
});

// ---------- Remove product -----------------
router.post("/remove", (req, res) => {
  const { id } = req.body;

  product.remove({ _id: id })
    .then((Res) => res.json(Res))
    .catch((err) => res.json(err));
});

module.exports = router;
