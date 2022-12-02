const express = require("express");
const { endPoint } = require("../endPoint/endPoint");
const { authen, roles } = require("../middlewear/authen");
const classModel = require("../models/class");
const SlotModel = require("../models/slot");
const teacherModel = require("../models/teacher");
const { get, getById, add, editById, deleteById, getBy, getAllBy } = require("../utils/crud");

const router = express.Router();

router.get("/", authen(endPoint.slot.allroles), (req, res) => {
  const { _id: id , role } = req.user;
  // console.log("user: ", userId, "role", role);
  if (role === roles.Admin) {
    get(SlotModel, [])
    .then((response) => {
      console.log(response)
      return response
    })
    .then((respose) => res.json(respose))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error has occured");
    })
  } else if (role === roles.Teacher) {
    getAllBy({teacher: id}, classModel, ["slots"])
    .then(courses => {
      console.log("courses", courses)
      const teacherSlots = courses
      .map(course => course.slots)
      .reduce((finalSlotsList, slotsToAdd) => (finalSlotsList.push(...slotsToAdd), finalSlotsList), [])
      console.log("slots", teacherSlots)
      res.json(teacherSlots)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error has occured");
    })
    
  } else if (role === roles.Student) {
    getAllBy({students: {_id: id}}, classModel, ["slots"])
    .then(courses => {
      const studentSlots = courses
      .map(course => course.slots)
      .reduce((finalSlotsList, slotsToAdd) => (finalSlotsList.push(...slotsToAdd), finalSlotsList), [])
      
      res.json(studentSlots)
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error has occured");
    })
  }
});

router.get("/:id", authen(endPoint.slot.allroles), (req, res) => {
  const { id } = req.params;
  console.log(id);
  getById(id, SlotModel, [])
    .then((respose) => res.json(respose))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error has occured");
    });
});

router.post("/", authen(endPoint.slot.updateOperations), async (req, res) => {
  const { _id: id , role } = req.user;
  if (role !== roles.Teacher) {
    return res.status(401).end();
  }

  try {
    const slotData = req.body;
    console.log(slotData);
    const classOfSlot = await getBy({ teacher: id }, classModel, []);

    if (!classOfSlot) {
      return res.status(400).end();
    }

    const addedSlot = await add(new SlotModel(slotData), []);
    classOfSlot.slots.push(addedSlot._id);
    await editById(classOfSlot._id, classOfSlot, classModel, []);
    return res.json(addedSlot);
  } catch (err) {
    console.log(err);
    res.status(400).json("Error has occured");
  }
});

router.put("/:id", authen(endPoint.slot.updateOperations), (req, res) => {
  const { id } = req.params;
  const overridingSlotData = req.body;
  editById(id, overridingSlotData, SlotModel, [])
    .then((respose) => res.json(respose))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error has occured");
    });
});

router.delete("/:id", authen(endPoint.slot.updateOperations), (req, res) => {
  const { id } = req.params;
  deleteById(id, SlotModel, [])
    .then((respose) => res.json(respose))
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error has occured");
    });
});

module.exports = router;
