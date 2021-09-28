const router = require("express").Router();
const Category = require("../models/categoryModel");

// ----------- Find all --------------
router.get("/", (req, res) => {
  Category.find()
    .then((category) => res.json({ category }))
    .catch((err) => res.json(err));
});

// ------------ Add Category -----------
router.post("/add", (req, res) => {
  const { title, icon } = req.body;

  const newCategory = new Category({
    title: title,
    icon: icon,
  });

  const saveCategory = newCategory
    .save()
    .then((categoryData) => res.json({ categoryData }))
    .catch((err) => res.json(err));
});

// ------------- Edit Category ------------
router.post("/edit", (req, res) => {
  const { id, title, icon } = req.body;

  Category.findOneAndUpdate({ _id: id }, { title: title, icon: icon })
    .then((Res) => res.json(Res))
    .catch((err) => res.json(err));
});

// ---------- Remove Category -----------------
router.post("/remove", (req, res) => {
  const { id } = req.body;

  Category.remove({ _id: id })
    .then((Res) => res.json(Res))
    .catch((err) => res.json(err));
});

module.exports = router;
