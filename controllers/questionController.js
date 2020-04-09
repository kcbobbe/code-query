// const moment = require("moment");
const express = require("express");
const router = express.Router();
const db = require("../models");
const moment = require("moment");

db.Question.sync();

router.get("/", (req, res) => {
  const query = {};
  if (req.query.UserId) {
    query.UserId = req.query.UserId;
  }
  db.Question.findAll({
    where: query,
    include: [db.User, db.Answer]
  }).then(data => {
    const newData = data.map(d => {
      const newDT = moment(d.updatedAt).format("MM/DD/YYYY hh:mm:ssA");

      // const newUser = d.User.map(u => {
      //   return {
      //     email: u.email
      //   };
      // });

      const newAnswers = d.Answers.map(a => {
        const newAnswerDT = moment(a.updatedAt).format("MM/DD/YYYY hh:mm:ssA");

        return {
          id: a.id,
          answerText: a.answerText,
          answerTag: a.answerTag,
          dateTime: newAnswerDT,
          username: d.User.username
        };
      });

      return {
        id: d.id,
        questionText: d.questionText,
        questionTag: d.questionTag,
        dateTime: newDT,
        User: d.User,
        username: d.User.username,
        Answers: newAnswers
      };
    });
    // console.log(`user email is ${newData[0].Answers[0].answerText}`);
    res.render("index", { questions: newData });
  });
});

router.get("/api/questions", (req, res) => {
  const query = {};
  if (req.query.UserId) {
    query.UserId = req.query.UserId;
  }
  db.Question.findAll({
    where: query,
    include: [db.User, db.Answer]
  }).then(data => {
    const newData = data.map(d => {
      const newDT = moment(d.updatedAt).format("MM/DD/YYYY hh:mm:ssA");

      const newAnswers = d.Answers.map(a => {
        const newAnswerDT = moment(a.updatedAt).format("MM/DD/YYYY hh:mm:ssA");

        return {
          id: a.id,
          answerText: a.answerText,
          answerTag: a.answerTag,
          dateTime: newAnswerDT
        };
      });

      return {
        id: d.id,
        questionText: d.questionText,
        questionTag: d.questionTag,
        dateTime: newDT,
        User: d.User,
        Answers: newAnswers
      };
    });
    res.json(newData);
  });
});

router.get("/api/questions/:id?", (req, res) => {
  if (req.params.id) {
    db.Question.findOne({
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
    db.Question.findAll({ raw: true }).then(data => {
      res.json(data);
    });
  }
});

router.post("/api/questions", (req, res) => {
  const newQ = {
    questionText: req.body.questionText,
    questionTag: req.body.questionTag,
    UserId: req.body.UserId,
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
    questionText: req.body.questionText,
    questionTag: req.body.questionTag,
    userId: req.body.userId,
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

//----questionTag route (question without s here)--------

router.get("/api/question/:questionTag?", (req, res) => {
  if (req.params.questionTag) {
    db.Question.findAll({
      where: { questionTag: req.params.questionTag },
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
    db.Question.findAll({ raw: true }).then(data => {
      res.json(data);
    });
  }
});

router.get("/question/:questionTag?", (req, res) => {
  if (req.params.questionTag) {
    db.Question.findAll({
      where: { questionTag: req.params.questionTag },
      raw: true
    })
      .then(data => {
        res.render("index", { questions: data });
      })
      .catch(err => {
        console.log(err);
        status(500).end();
      });
  } else {
    db.Question.findAll({ raw: true }).then(data => {
      res.json(data);
    });
  }
});

module.exports = router;
