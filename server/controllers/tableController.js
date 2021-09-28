const tableController = {
  getAll,
}

function getAll (req, res) {
  Tables.find()
    .then((tables) => res.json({ tables }))
    .catch((err) => res.json(err));
}

module.exports = tableController
