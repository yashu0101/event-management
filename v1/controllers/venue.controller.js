const VenueModel = require("../models/venue.model");

class VenueCtrl {
  static createVenue(req, res) {
    const venue = req.body;

    new VenueModel(venue)
      .save()
      .then((result) => {
        res.status(201).send({ message: "venue is created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "venue is not created", error: err });
      });
  } //createVenue
  static updateVenue(req, res) {
    const venue = req.body;
    const { id } = req.params;
    VenueModel.findOneAndUpdate({ _id: id }, venue, { new: true })
      .then((result) => {
        res.status(200).send({ message: "venue is updated", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "could not updated", error: err });
      });
  } //updateVenue

  static deleteVenue(req, res) {
    const { id } = req.params;
    VenueModel.findOneAndDelete({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "venue is deleted", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "could not deleted", error: err });
      });
  } //deleteVenue
  static fetchOneVenue(req, res) {
    const { id } = req.params;
    VenueModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "venue details", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "could not get details", error: err });
      });
  } //fetchOneVenue
  static fetchAllVenue(req, res) {
    const { type, size, ac } = req.query;
    VenueModel.find()
      .then((result) => {
        res.status(200).send({ message: "venue details", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "could not get details", error: err });
      });
  } //fetchAllVenue
}
module.exports = VenueCtrl;
