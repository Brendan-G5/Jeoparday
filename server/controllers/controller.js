const Model = require('../models/model');


async function getQs (req, res) {
  try {
    const history = await Model.find();
    res.status(200);
    res.json(history);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.sendStatus(500);
  }
}

async function addQs (req, res) {
  try {
    const newQ = await Model.create({
      title: req.body.title,
      clues: req.body.clues,
      date: req.body.date,
    });
    res.status(200);
    res.json(newQ);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.sendStatus(400);
  }
}

module.exports = {
  getQs,
  addQs
};