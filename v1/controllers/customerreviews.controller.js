const CustomerModel = require("../models/customerreview");

class CutomerCtrl {
  static createReviews(req, res) {
    const review = req.body;
    if (req.files) {
      review.images = req.files.map((file) => `reviews/${file.filename}`); // give path to store images
    }
    new CustomerModel(review)
      .save()
      .then((result) => {
        res.status(201).send({ message: "Review is created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "Review is not created", error: err });
        console.log(err);
      });
  } // create review

  static updateReviews(req, res) {
    const review = req.body;
    const { id } = req.params;
    if (req.files) {
      review.images = req.files.map((file) => `reviews/${file.filename}`); // give path to store images
    }
    CustomerModel.findOneAndUpdate({ _id: id }, review, { new: true })
      .then((result) => {
        res.status(200).send({ message: "Review is updated ", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "Review is not updated", error: err });
      });
  } // update Reviews
  static deleteReview(req, res) {
    const { id } = req.params;
    CustomerModel.findOneAndDelete({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "review is deleted", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "review not deleted", error: err });
      });
  } //deleteReview
  static fetchOneReview(req, res) {
    const { id } = req.params;
    CustomerModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Review details", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "could not get details", error: err });
      });
  } //fetchOneReview
  static fetchAllReview(req, res) {
    CustomerModel.find()
      .then((result) => {
        res.status(200).send({ message: "Review details", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: " Review could not get details", error: err });
      });
  } //fetchAllReview
}

module.exports = CutomerCtrl;
