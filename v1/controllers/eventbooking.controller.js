const EventbookingModel = require("../models/eventbooking.model");
const UserModel = require("../models/user.model");
const PackageModel = require("../models/package.model");

class EventCtrl {
  static createEventBooking(req, res) {
    const book = req.body;
    new EventbookingModel(book)
      .save()
      .then((result) => {
        UserModel.findOneAndUpdate(
          { _id: book.customer },
          { $push: { bookings: result._id } },
          { new: true }
        ).then(console.log);
        PackageModel.findOneAndUpdate(
          { _id: book.event },
          { $push: { bookings: result._id } },
          { new: true }
        ).then(console.log);
        res
          .status(201)
          .send({ message: "EventBoking is Succesful", data: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({ message: "could not booked", error: err });
      });
  } //createEventBooking

  static updateEventBooking(req, res) {
    const book = req.body;
    const { id } = req.params;
    console.log("Book: ", book);
    EventbookingModel.findOneAndUpdate({ _id: id }, book, { new: true })
      .populate("customer event") // populate given in model for customer and event
      .exec() //executesss
      .then((result) => {
        console.log("result", result);
        res
          .status(200)
          .send({ message: "evetn booking is updated ", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "event booking is not updated", error: err });
        console.log(err);
      });
  }

  static deleteEventBooking(req, res) {
    const { id } = req.params;
    EventbookingModel.findOneAndDelete({ _id: id }, { new: true })
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

  static fetchOneEventBooking(req, res) {
    const { id } = req.params;
    EventbookingModel.findOne({ _id: id })
      .populate("customer event") // populate given in model for customer and event
      .exec() //execute
      .then((result) => {
        res.status(201).send({ message: "Booking details ", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: " Booking details could not fetch", error: err });
      });
  } //fetchoneBooking
  static fetchAllEventBooking(req, res) {
    EventbookingModel.find()
      .populate("customer event") // populate given in model for customer and event
      .exec() //execute
      .then((result) => {
        res.status(201).send({ message: "Booking details ", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: " Booking details could not fetch", error: err });
      });
  } //fecthAllBooking
}

module.exports = EventCtrl;
