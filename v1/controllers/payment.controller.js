const PaymentModel = require("../models/payment.model");

class PaymentCtrl {
  static createPayment(req, res) {
    const payment = req.body;

    new PaymentModel(payment)
      .save()
      .then((result) => {
        res.status(201).send({ message: "payment is created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "payment is not created", error: err });
      });
  } //createPayment
  static updatePayment(req, res) {
    const payment = req.body;
    const { id } = req.params;
    PaymentModel.findOneAndUpdate({ _id: id }, payment, { new: true })
      .then((result) => {
        res.status(200).send({ message: "payment is updated", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "could not updated", error: err });
      });
  } //updatePayment

  static deletePayment(req, res) {
    const { id } = req.params;
    PaymentModel.findOneAndDelete({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "payment is deleted", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "could not deleted", error: err });
      });
  } //deletePayment
  static fetchOnePayment(req, res) {
    const { id } = req.params;
    PaymentModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "payment details", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "could not get details", error: err });
      });
  } //fetchOnePayment
  static fetchAllPayment(req, res) {
    PaymentModel.find()
      .then((result) => {
        res.status(200).send({ message: "payment details", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "could not get details", error: err });
      });
  } //fetchAllPayment
}
module.exports = PaymentCtrl;
