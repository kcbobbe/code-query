// const moment = require("moment");
const express = requirer("express");
const router = express.Router();
const db = require("../models");

db.Question.sync();

router.get("/", (req, res) => {
  db.Question.findAll({ raw: true }).then(data => {
    res.render("index", { questions: data });
  });
});

router.get("/api/questions/:id?", (req, res) => {
  if (req.params.id) {
    db.Router.findAll({ raw: true }).then(data => {
      res.json(data);
    });
  }
});

router.post("/api/questions", (req, res) => {
  const newQ = {
    questionText: req.body.question_text,
    questionTag: req.body.question_tag,
    userId: req.body.user_id,
    date: req.body.date
  };

  db.Question.create(newQ)
    .then(data => {
      res.status(200).end();
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.put("/api/questions/:id", (req, res) => {
  const updQ = {
    questionText: req.body.question_text,
    questionTag: req.body.question_tag,
    userId: req.body.user_id,
    date: req.body.date
  };
  db.Question.update(updQ, {
    where: { id: req.params.id }
  })
    .then(function(data) {
      res.status(200).end();
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
      console.log(data);
    });
});

router.delete("/api/questions/:id", (req, res) => {
  db.Question.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function(data) {
      res.status(200).end();
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

module.exports = router;
