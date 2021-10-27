const SiteDataSchema = require("../../models/siteData");

module.exports.getSiteDetails = async (req, res) => {
  try {
    const details = await SiteDataSchema.find({});
    res.status(200).json(details);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports.addSiteDetails = async (req, res) => {
  try {
    const check = { instituteName: "dcrust" };
    const details = await SiteDataSchema.findOne(check);
    console.log(details);
    console.log("req.body is", req.body);
    // create details

    await SiteDataSchema.findOneAndUpdate(
      check,
      req.body,
      { upsert: true },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// --------------------------------

// * navlinks apis

module.exports.addNavLink = async (req, res) => {
  try {
    const check = { instituteName: "dcrust" };
    const details = await SiteDataSchema.findOne(check);
    console.log(details);
    console.log("req.body is", req.body);
    // create details

    console.log([...details.navlinks, req.body]);
    await SiteDataSchema.updateOne(
      check,
      { $set: { navlinks: [...details.navlinks, req.body] } },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// remove navlink
module.exports.removeNavLink = async (req, res) => {
  try {
    const check = { instituteName: "dcrust" };
    const { navlinks } = await SiteDataSchema.findOne(check);

    const navlink = req.body;
    for (let i = 0; i < navlinks.length; i++) {
      if (navlinks[i].name === navlink.name) {
        navlinks.splice(i, 1);
        break;
      }
    }

    await SiteDataSchema.updateOne(
      check,
      { $set: { navlinks } },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// ----------------------------------------------------------------

// * subject apis

// add subject
module.exports.addSubject = async (req, res) => {
  try {
    const check = { instituteName: "dcrust" };
    const details = await SiteDataSchema.findOne(check);

    console.log(req.body);

    await SiteDataSchema.updateOne(
      check,
      { $set: { subjects: [...details.subjects, req.body] } },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports.removeSubject = async (req, res) => {
  try {
    const check = { instituteName: "dcrust" };
    const { subjects } = await SiteDataSchema.findOne(check);

    console.log(subjects);
    console.log(req.body);

    for (let i = 0; i < subjects.length; i++) {
      if (subjects[i].name === req.body.name) {
        subjects.splice(i, 1);
        break;
      }
    }

    await SiteDataSchema.updateOne(
      check,
      { $set: { subjects } },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// ----------------------------------------------------------------

// * topic apis

// add topic
module.exports.addSubjectTopic = async (req, res) => {
  try {
    const check = { instituteName: "dcrust" };
    const { subjects } = await SiteDataSchema.findOne(check);

    console.log(req.body);

    for (let i = 0; i < subjects.length; i++) {
      if (subjects[i].name === req.body.subject) {
        subjects[i].topics.push({
          name: req.body.topic,
          subtopics: [],
        });
        break;
      }
    }

    await SiteDataSchema.updateOne(
      check,
      { $set: { subjects } },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// remove topic
module.exports.removeTopic = async (req, res) => {
  try {
    const check = { instituteName: "dcrust" };
    const { subjects } = await SiteDataSchema.findOne(check);

    console.log(subjects);
    console.log(req.body);

    for (let i = 0; i < subjects.length; i++) {
      if (subjects[i].name === req.body.subject) {
        for (let j = 0; j < subjects[i].topics.length; j++) {
          if (subjects[i].topics[j].name == req.body.topic) {
            subjects[i].topics.splice(j, 1);
          }
        }
        break;
      }
    }

    await SiteDataSchema.updateOne(
      check,
      { $set: { subjects } },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// -------------------------------

//* Subtopic apis

module.exports.addSubjectSubtopic = async (req, res) => {
  try {
    const check = { instituteName: "dcrust" };
    const { subjects } = await SiteDataSchema.findOne(check);

    console.log(req.body);

    let updateSubject = subjects.find(
      (subject) => subject.name === req.body.subject
    );
    let updateTopic = updateSubject.topics.find(
      (topicItem) => topicItem.name === req.body.topic
    );
    updateTopic.subtopics.push({
      name: req.body.subtopic,
      link: req.body.subtopiclink,
    });

    await SiteDataSchema.updateOne(
      check,
      { $set: { subjects } },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports.removeSubtopic = async (req, res) => {
  try {
    const check = { instituteName: "dcrust" };
    const { subjects } = await SiteDataSchema.findOne(check);

    console.log(subjects);
    console.log(req.body);

    subjects
      .find((subject) => subject.name === req.body.subject)
      .topics.find((topic) => topic.name === req.body.topic)
      .subtopics.filter((subtopic) => subtopic.name !== req.body.subtopic);

    await SiteDataSchema.updateOne(
      check,
      { $set: { subjects } },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// -------------------------------

// * general

module.exports.updateSiteData = async (req, res) => {
  try {
    const check = { instituteName: "dcrust" };
    const { navlinks, subjects } = await SiteDataSchema.findOne(check);

    console.log(req.body);

    if (req.body.type === "menu") {
      let updateNavlink = navlinks.find(
        (navlink) => navlink.name === req.body.oldDetails.name
        // navlink.link === req.body.oldDetails.link
      );
      updateNavlink.name = req.body.newDetails.name;
      updateNavlink.link = req.body.newDetails.link;
    } else if (req.body.type === "subject") {
      let updateSubjectName = subjects.find(
        (subject) => subject.name === req.body.oldDetails.name
      );
      updateSubjectName.name = req.body.newDetails.name;
    } else if (req.body.type === "topic") {
      let updatedTopicName = subjects
        .find((subject) => subject.name === req.body.subject)
        .topics.find((topic) => topic.name === req.body.oldTopicName);

      console.log(updatedTopicName);
      updatedTopicName.name = req.body.newTopicName;
    } else if (req.body.type === "subtopic") {
      let updatedSubtopic = subjects
        .find((subject) => subject.name === req.body.subject)
        .topics.find((topic) => topic.name === req.body.topic)
        .subtopics.find((subtopic) => subtopic.name === req.body.subtopic.name);

      console.log(updatedSubtopic);
      updatedSubtopic.name = req.body.newSubtopicData.name;
      updatedSubtopic.link = req.body.newSubtopicData.link;
    }

    await SiteDataSchema.updateOne(
      check,
      { $set: { navlinks, subjects } },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
