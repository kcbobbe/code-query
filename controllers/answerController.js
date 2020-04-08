const express = require("express");
const router = express.Router();
const db = require("../models");

db.Answer.sync();

// router.get("/", (req, res) => {
//   db.Answer.findAll().then(data => {
//     console.log(data);
//     res.render("index", { answers: data });
//   });
// });

router.get("/api/answers", (req, res) => {
  const query = {};
  if (req.query.QuestionId) {
    query.QuestionId = req.query.QuestionId;
  }
  db.Answer.findAll({
    where: query,
    include: [db.Question]
  }).then(data => {
    res.json(data);
  });
});

router.get("/api/answers/:id?", (req, res) => {
  if (req.params.id) {
    db.Answer.findOne({
      where: { id: req.params.id },
      raw: true
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        status(500).end();
      });
  } else {
    db.Answer.findAll({ raw: true }).then(data => {
      res.json(data);
    });
  }
});

router.post("/api/answers", (req, res) => {
  const newAnswer = {
    answerText: req.body.answerText,
    // answerTag: req.body.answerTag,
    QuestionId: req.body.QuestionId,
    UserId: req.body.QuestionId
    // date: req.body.date
  };

  db.Answer.create(newAnswer)
    .then(data => {
      res.status(200).end();
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
});

router.put("/api/answers/:id", (req, res) => {
  const updAnswer = {
    answerText: req.body.answerText,
    // answerTag: req.body.answerTag,
    date: req.body.date
  };
  db.Answer.update(updAnswer, {
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

router.delete("/api/answers/:id", (req, res) => {
  db.Answer.destroy({
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
