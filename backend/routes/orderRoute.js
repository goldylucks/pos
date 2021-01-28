const router = require("express").Router();
const Order = require("../models/orderModel");

// ----------- Find all --------------
router.get("/", (req, res) => {
    Order.find()
    .then(order => res.json({order}))
    .catch(err => res.json(err));
  });

// ----------- Find By Table --------------
router.post("/byTable", (req, res) => {
  const {tid} = req.query;
  Order.find({tid: tid})
  .then(order => res.json({order}))
  .catch(err => res.json(err));
});

// ------------ Add Order -----------
router.post("/add", (req, res) => {
    const {tid, pid} = req.body;

    const newOrder= new Order({
        tid: tid,
        pid: pid
    });

    const saveOrder = newOrder.save()
    .then(orderData => res.json({orderData}))
    .catch(err => res.json(err));
});

// ------------- Cansel order ------------
router.post("/cansel", (req, res) => {
  const {id} = req.body;

  Order.findOneAndUpdate({_id: id}, {cansel: "1"})
  .then(Res => res.json(Res))
  .catch(err => res.json(err));
});




module.exports = router;
