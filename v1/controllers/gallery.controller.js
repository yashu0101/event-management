const GalleryModel = require("../models/gallery.model");

class galleryCtrl {
  static createGallery(req, res) {
    console.log("Creating gallery");
    const gallery = req.body;
    if (req.files) {
      gallery.images = req.files.map((file) => `gallery/${file.filename}`); // give path to store images
    }
    new GalleryModel(gallery)
      .save()
      .then((result) => {
        res.status(201).send({ message: "Images created", data: result });
      })
      .catch((err) => {
        console.log("err", err);
        res.status(500).send({ message: "Images Not created", error: err });
      });
  } //createGallery
  static updateGallery(req, res) {
    const gallery = req.body;
    const { id } = req.params;
    GalleryModel.findOneAndUpdate({ _id: id }, gallery, { new: true })
      .then((result) => {
        res.status(200).send({ message: "images is updated", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "could not updated images", error: err });
      });
  } //createGallery
  static deleteGallery(req, res) {
    const { id } = req.params;
    GalleryModel.findOneAndDelete({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "images is deleted", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "could not deleted images", error: err });
      });
  } //createGallery
  static getOneGallery(req, res) {
    const { id } = req.params;
    // const { category } = req.params;
    GalleryModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "images details", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "could not get details", error: err });
      });
  } //createGallery
  static getAllGallery(req, res) {
    GalleryModel.find()
      .then((result) => {
        res.status(200).send({ message: "images details", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "could not get details", error: err });
      });
  } //createGallery
}

module.exports = galleryCtrl;
