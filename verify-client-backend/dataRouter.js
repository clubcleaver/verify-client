const express = require("express");
const router = express.Router();
const { Client, User, sequelize } = require("./db.js");
const nanoid = require("nanoid");
const { authCheck } = require("./authMiddleware");

// get Client
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.get("/", async (req, res) => {
  // const name = req.query.name;
  const clientId = req.query.clientId;
  if (clientId) {
    const foundUser = await Client.findOne({
      where: { clientId: clientId.trim() },
    });
    if (foundUser) {
      res.send({
        success: true,
        user: foundUser,
      });
    } else {
      res.send({
        success: false,
        message: "Client not found",
      });
    }
  } else {
    res.send({ status: false, message: "No Query Provided" });
  }
});

// Create Client
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.post("/", authCheck, async (req, res) => {
  if (req.userAuth) {
    const { firstName, lastName, dob, status, document } = req.body;
    if (firstName && lastName && dob && status && document) {
      const createdUser = await Client.create({
        clientId: "IAC-" + nanoid(6),
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        status: status,
        download: document,
      }).catch((e) => {
        res.send({
          success: false,
          message: "Could Not save Client in DB ... Contact Admin.",
        });
      });
      if (createdUser) {
        res.send({ success: true, user: createdUser });
      } else {
        res.send({
          success: false,
          message: "DB Error, Contact Admin ...",
        });
      }
    } else {
      res.send({
        status: false,
        message:
          "Invalid User Schema ..., Check Client details or Contact Admin",
      });
    }
  } else {
    res.send({ success: false, message: "User Not Authorized" });
  }
});

// Edit Client
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.patch("/", (req, res) => {
  res.send("Update entry");
});

// Delete Client
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
router.delete("/", authCheck, async (req, res) => {
  if (req.userAuth) {
    const { clientId } = req.body;
    if (clientId) {
      const deletedUser = await Client.findOne({
        where: {
          clientId: clientId.trim(),
        },
      }).catch((e) => {
        res.send({
          success: false,
          message: "Database Error, Could Not Delete Client",
          error: e,
        });
      });
      if (deletedUser) {
        await Client.destroy({ where: { clientId: clientId.trim() } }).catch(
          (e) => {
            console.log(e);
            res.send({ success: false, message: "Unable to delete client" });
          }
        );
        res.send({
          success: true,
          message: "succesfully deleted Client",
          Client: deletedUser,
        });
      } else {
        res.send({success: false, message: "Client Not found, No Data deleted"})
      }
    } else {
      send.send({ success: false, message: "Invalid Client ID" });
    }
  } else {
    res.send({ success: false, message: "User Not Authorized" });
  }
});

module.exports = router;
