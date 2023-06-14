const PACKAGEMODEL = require("../models/package.model");

class PackageCtrl {
  static createEvent(req, res) {
    const event = req.body;
    if (req.files) {
      event.images = req.files.map((file) => `events/${file.filename}`); // give path to store images
    }
    new PACKAGEMODEL(event)
      .save()
      .then((result) => {
        res
          .status(200)
          .send({ message: "evetn Package is created ", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "event Package is not created", error: err });
      });
  
  } // create event
  static updateEvent(req, res) {
    const event = req.body;
    const { id } = req.params;
    if (req.files) {
      event.images = req.files.map((file) => `events/${file.filename}`); // give path to store images
    }

    PACKAGEMODEL.findOneAndUpdate({ _id: id }, event, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({ message: "event  Package is updated ", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "event Package is not updated", error: err });
      });
  } // update event

  static deleteEvent(req, res) {
    const { id } = req.params;
    PACKAGEMODEL.findOneAndDelete({ _id: id }, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({ message: "evetn Package is deleted ", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "event Package is not deleted", error: err });
      });
  } // delete event

  static getSingleEvent(req, res) {
    const { id } = req.params;
    PACKAGEMODEL.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "evetn details", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "event details not availabel", error: err });
      });
  } // fetch single event

  static getAllEvent(req, res) {
    const filter = { $or: [{ status: 0 }, { status: 1 }] };
    const { type, size, ac } = req.query;

    if (type) {
      const typeArr = type.split("_");
      // if we get value ac_nonac s plit that value into seprate
      // if lenght equal to then add into filter object
      // if you have two then it will not added only one is added
      if (typeArr.length == 1) filter.type = typeArr[0];
    }
    if (size) filter.size = size;

    PACKAGEMODEL.find(filter)
      .then((result) => {
        res.status(200).send({ message: "event details", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "event details not availabel", error: err });
      });
  } // fetch all event
}

module.exports = PackageCtrl;
