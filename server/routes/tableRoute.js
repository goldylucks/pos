// TODO
// separate controller from routes
// create global error handler

const handleError = (err) => {
  // In production, log error
  console.error(err)
}

const router = require("express").Router();
const Tables = require("../models/tableModel");

router.get("/", tableController.getAll);

// ----------- Find By Id --------------
router.get("/byID", (req, res) => {
  const { id } = req.query;
  Tables.findOne({ _id: id })
    .then((tables) => res.json(tables))
    .catch((err) => {
      handleError(err)
      res.json(err)
    });
});

// ------------ New Table -----------
router.post("/newTable", (req, res) => {
  const { number, people } = req.body;

  const newTable = new Tables({
    number: number,
    people: people,
    totalPrice: 0,
  });

  newTable
    .save()
    .then((tableData) => res.json({ tableData }))
    .catch((err) => res.json(err));
});

// ------------ Total price ----------------
router.post("/totalPrice", (req, res) => {
  const { id, total } = req.body;

  Tables.findOneAndUpdate({ _id: id }, { totalPrice: total })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

// ------------- Set Discount ----------------
router.post("/edit", (req, res) => {
  const { id, number, people } = req.body;

  Tables.findOneAndUpdate({ _id: id }, { number: number, people: people })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

// ------------- Set Discount ----------------
router.post("/discount", (req, res) => {
  const { id, discount } = req.body;

  Tables.findOneAndUpdate({ _id: id }, { discount: discount })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

// ------------ Set Paymant -----------------
router.post("/pay", (req, res) => {
  const { id, pay } = req.body;

  Tables.findOneAndUpdate({ _id: id }, { pay: pay })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

// ------------ Set Close -----------------
router.post("/close", (req, res) => {
  const { id } = req.body;

  Tables.findOneAndUpdate({ _id: id }, { close: 1 })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

module.exports = router;
