const Parent = require(`../models/ParentModel`);
const Student = require(`../models/student`);

const bcrypt = require("bcrypt");


//Get All
// const getAllParentData = ("/", async (req, res) => {
//   try {
//     const Parents = await Parent.find({});
//     res.json(Parents);
//   } catch (error) {
//     next({ msg: "DB Error" });
//   }
// });

//Get By Id

const getParent = ("/", async (req, res, next) => {
  try {
    const {id}  = req.params;
    const ParentData = await Parent.findById(id);
    res.json(ParentData);
  } catch (error) {
    next({ msg: "Error getting parent" });
  }
});

const creatParent = ("/", async (req, res, next) => {
  try {
    let password=req.body.Password 
    let hashPassword=await bcrypt.hash(password,10)
    req.body.Password =hashPassword
    let newParent = new Parent(req.body);
    await newParent.save();
    res.json(newParent);
    } catch (error) {
        next({ msg: "Error creating parent" });
      }
    });
    
    const editParent =("/:id", async (req, res, next) => {
      try {
        let password=req.body.Password 
        if (password) {
          let hashPassword=await bcrypt.hash(password,10)
          req.body.Password =hashPassword
        }
        const {id}  = req.params;
        let editedParent = await Parent.findById(id);
        if (editedParent.student_Id.lenght == 0) {
          await Parent.findByIdAndUpdate(id, { $set: req.body });
        }else{
          let studentData = editedParent.student_Id
          await Parent.findByIdAndUpdate(id, { $set: req.body }); 
          await Parent.findByIdAndUpdate(id, { student_Id: studentData }); 
          
        }
        editedParent = await Parent.findById(id);
        res.json(editedParent);
      } catch (error) {
        next(error);
      }
    });
    
    
//     const deleteParent = ("/:id", async (req, res, next) => {
      
//       try {
//         const id = req.query.id;
//         let deletedparent = await parent.findByIdAndRemove(id);

//         res.status(200).json(deletedUser);
//       } catch (error) {
//     next(error);
//   }
// });

const createChild = ("child/:id", async (req, res, next) => {
  try {
    let student=req.body 
    const {id} = req. params
    let newStudent = new Student(student);
    let student_Id = newStudent._id
    await newStudent.save();
    await Parent.findByIdAndUpdate(id, { $push:{student_Id}});
    res.status(200).json(student);
  }
   catch (error) {
    next({ msg: "Error creating child " });
  }
});
const getChild = ("child/:id", async (req, res, next) => {
  try {
    let ChildData=[]
    const {id} = req.params;
    const ParentData = await Parent.findById(id);
    for (const element of ParentData.student_Id) {
      let student =await Student.findById(element._id)
      ChildData.push(student)
    }
    res.status(200).json(ChildData);
  } catch (error) {
    next({ msg: "Error geting child" });
  }
});

module.exports = {
  // getAllParentData,
  getParent,
  creatParent,
  editParent,
  // deleteParent,
  createChild,
  getChild

};
