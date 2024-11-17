var express = require("express");
var router = express.Router();
const modelDistributor = require("../models/distributor");

/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource distributor test");
});

// Add data
router.post("/add", async (req, res) => {
  try {
    const model = new modelDistributor(req.body);
    const result = await model.save(); // Them du lieu vao database
    if (result) {
      res.json({
        status: 200,
        message: "Add successful !",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "Add default !",
        data: result,
      });
    }
    // res.send(result);
  } catch (error) {
    console.log(error);
  }
});
router.get("/list", async (req, res) => {
  const result = await modelDistributor.find({});
  try {
    res.send(result);
  } catch (error) {
    console.log(error);
  }
  5 - [];
});

router.get("/getbyid/:id", async (req, res) => {
  const result = await modelDistributor.findById(req.params.id);
  try {
    if (result) {
      res.send(result);
    } else {
      res.json({
        status: 400,
        message: "No find ID !",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Invalid ID format");
    } else {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

router.patch("/edit/:id", async (req, res) => {
  const result = await modelDistributor.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  try {
    if (result) {
      const rs = await result.save();
      res.send(rs);
    } else {
      res.json({
        status: 400,
        message: "No find ID !",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Invalid ID format");
    } else {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

router.delete("/delete/:id", async (req, res) => {
  const result = await modelDistributor.findByIdAndDelete(req.params.id);
  try {
    if (result) {
      res.json({
        status: 200,
        message: "Delete successful !",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "Xoa that bai !",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Invalid ID format");
    } else {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

module.exports = router;
