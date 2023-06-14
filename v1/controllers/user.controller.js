const _ = require("lodash");
const fs = require("fs");
const { encrypt } = require("../../helpers/encrypt");
const UserModel = require("../models/user.model");
const { result } = require("lodash");
class UserCtrl {
  static pickUser(user) {
    return _.pick(user, [
      "_id",
      "name",
      "mobile",
      "email",
      "avatar",
      "status",
      "gender",
      "idDoc",
      "address",
      "createdAt",
      "userId",
      "role",
      "dob",
    ]);
  }
  static createUser(req, res) {
    const user = req.body;
    console.log("files", req.files);
    // console.log("User", user);
    // encrypt the password if availabel
    if (user.password) user.password = encrypt(user.password); // password avaialbel then we call encrypt and give palin password to encrypt  and we assign that encrypted password to gain user .password

    // save the filename and image if available
    // if multiple and choose field
    // if file in req then store image at the given path users-avatar
    if (req.files.avatar) {
      const ava = req?.files.avatar[0];
      // then this ava file add to user.avatar folder
      // save ava file to users-avatar then that user-avatar file save in user.avatar if you wnat to acces that file so use  user.avatar file to acces the that file
      user.avatar = `users-avatar/${ava?.filename}`;
    }

    if (req.files.idDoc) {
      const ava = req?.files.idDoc[0];
      user.idDoc = `users-id/${ava?.filename}`;
    }

    new UserModel(user)
      .save()
      .then((result) => {
        res
          .status(201)
          .send({ message: "User created", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "User not created", error: err });
      });
  } //createuser
  static updateUser(req, res) {
    const { id } = req.params;
    const user = req.body;

    // encrypt the password if availabel
    if (user.password) user.password = encrypt(user.password); // password avaialbel then we call encrypt and give palin password to encrypt  and we assign that encrypted password to gain user .password

    // save the filename if available
    // if multiple and choose field
    // if check if the avatar is availabel then add this file to ava
    if (req.files.avatar) {
      // after add this file to ava then add this ava file to users-avavtar folder
      const ava = req?.files.avatar[0];
      // save ava file to users-avatar then that user-avatar file save in user.avatar if you wnat to acces that file so use  user.avatar file to acces the that file
      user.avatar = `users-avatar/${ava?.filename}`;
    }
    if (req.files.idDoc) {
      const ava = req?.files.idDoc[0];
      user.idDoc = `users-id/${ava?.filename}`;
    }
    UserModel.findOneAndUpdate({ _id: id }, user, { new: true })
      .then((result) => {
        res
          .status(201)
          .send({ message: "User updated", data: UserCtrl.pickUser(result) });
        // res.status(200).send({ message: "User updated", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "User not updated", error: err });
      });
  } //updateuser
  static deleteUser(req, res) {
    const { id } = req.params;

    UserModel.findOneAndUpdate({ _id: id }, { status: 2 })
      .then((result) => {
        res
          .status(201)
          .send({ message: "User deleted", data: UserCtrl.pickUser(result) });
        // res.status(201).send({ message: "User deleted", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "User not deleted", error: err });
      });
  } //deleteUser
  static fetchOneUser(req, res) {
    const { id } = req.params;
    UserModel.findOne({ _id: id })
      .then((result) => {
        res
          .status(200)
          .send({ message: "User document", data: UserCtrl.pickUser(result) });
        // res.status(200).send({ message: "User details", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "User not availabel", error: err });
      });
  } //fetchone user
  static fetchAllUser(req, res) {
    // to filter customer and admin role
    const { role } = req.query;
    const filter = { $or: [{ status: 0 }, { status: 1 }] };
    if (role) filter.role = role;

    UserModel.find(filter)
      .then((result) => {
        res.status(200).send({
          message: "user list",
          data: _.map(result, (user) => UserCtrl.pickUser(user)),
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "User not availabel", error: err });
      });
  }

  // to perform update and delete  image operation
  static updateDeleteImages(req, res) {
    // acces images from req.body
    const { existingAvatar, existingIdDoc } = req.body; // for delete we gave name
    const { id } = req.params; // id route parameter to find which user details
    const user = {}; // empty user
    // if avatar file is availabel then add to avatar folder
    if (req.files.avatar) {
      // then add that file to ava
      const ava = req?.files.avatar[0];
      // then this ava file add to user.avatar folder
      // save ava file to users-avatar then that user-avatar file save in user.avatar if you wnat to acces that file so use  user.avatar file to acces the that file
      user.avatar = `users-avatar/${ava?.filename}`;
      // if you add avatar file
      // 1 case you add and or replace  new file and delete the file which is exsist before replace
      //remove existing files
      // using unlink is used to delete image from uploads folder
      fs.unlink(`uploads/${existingAvatar}`, () => {
        console.log("updated delete" + existingAvatar);
      });
    } else if (existingAvatar) {
      //2 case
      // if you not add avatar
      // if you not upload but you delete file which is currently exsist or currently avaliabel in database
      fs.unlink(`uploads/${existingAvatar}`, () => {
        console.log("deleted" + existingAvatar);
      });
      user.avatar = ""; // after deleting image put avatar file in database empty so for that we use that
    }

    if (req.files.idDoc) {
      const ava = req?.files.idDoc[0];
      user.idDoc = `users-id/${ava?.filename}`;
      // remove existing file
      fs.unlink(`uploads/${existingIdDoc}`, () => {
        console.log(" updated delete" + existingIdDoc);
      });
    } else if (existingIdDoc) {
      //2 case
      // if you not add idDoc adn want remove exsisting idDoc file
      fs.unlink(`uploads/${existingIdDoc}`, () => {
        console.log("deleted" + existingIdDoc);
      });
      user.idDoc = "";
    }
    // after that above operation we get updated data or  deleted data this data passed to  below operation
    // after that operation update the lates data of user using this following method
    UserModel.findOneAndUpdate({ _id: id }, user, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({ message: "Image changed", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send({
          message: "Image not changed",
          data: UserCtrl.pickUser(result),
        });
      });
  } //updatedeleteImages

  static async userStatistic(req, res) {
    const { role = "customer" } = req.query;
    const inactive = await UserModel.countDocuments({ status: 0, role });
    const active = await UserModel.countDocuments({ status: 1, role });
    const deleted = await UserModel.countDocuments({ status: 2, role });

    res.status(200).send({
      message: `${role} details`,
      data: { active, inactive, deleted },
    });
  }
}

module.exports = UserCtrl;
