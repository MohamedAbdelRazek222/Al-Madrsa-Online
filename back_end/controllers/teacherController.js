const { teacherModel } = require("../models/teacher");
const bcrypt=require("bcrypt");
const sendEmail = require("../service/email.service");


const signupTeacher =async(req,res)=>{

try{

const {name,email,password,phone,teacher_subject}=req.body


const hashPassword=await bcrypt.hash(password,process.env.SALTROUNDS)

const newTeacher=new teacherModel({name,email,password:hashPassword,DOB,gender,phone,teacher_subject})

const savedTeacher=newTeacher.save()

const token=jwt.sign({id:savedTeacher._id},process.env.EMAILTOKEN ,{expiresIn:'1h'})
const link=`${req.protocol}://${req.headers.host}/teacher/confirmEmail/${token}`
const link2=`${req.protocol}://${req.headers.host}/teacher/${savedTeacher._id}`
message =`<a href=${link}>please click to confirm Email<a/> <br>
           <a href='${link2}'>re-send conFirm Email</a>
`
sendEmail(savedUser.email,message)
res.status(201).json({message:"done",savedUser})



}catch(err){

    if(err.keyValue ?.email ){ // undefined or key--value
        res.status(409).json({message:"this email is already exists"})

    }else{


        console.log('error signup');
        res.status(500).json({message:"catch error signup ",e})
    }


}







}
// REFRESH EMAIL------------------------------------------------
const refreshEmail=async (req,res)=>{
    try{
    const {id}=req.params
    
    const teacher=await teacherModel.findById(id).select('confirmEmail email')
    
    if(!teacher){
    res.status(404).json({message:'invalid account'})
    
    }else{
    
        if(teacher.confirmEmail){
            res.status(400).json({message:'Email is Already Confirmed'})
    
    
        }else{
            const token=jwt.sign({id:teacher._id},process.env.EMAILTOKEN ,{expiresIn:'1h'})
            const link=`${req.protocol}://${req.headers.host}/teacher/confirmEmail/${token}`
            const link2=`${req.protocol}://${req.headers.host}/teacher/refreshEmail/${teacher._id}`
            message =`<a href=${link}>please click to confirm Email<a/> <br>
                       <a href='${link2}'>re-send conFirm Email</a>
            `
    
    sendEmail(teacher.email,message)
    res.status(209).json({message:'plaese check your Email'})
        }
    
    
    }
    }catch(e) {
        res.status(500).json({message:'Error',e})
    }
    
    }
    
    
    // CONFIRM EMAIL------------------------------------------------
    
    const confirmEmail=async(req,res) => {
    try{
    
    
        const {token}=req.params
    const decoded=jwt.verify(token,process.env.EMAILTOKEN)
    if(!decoded){
    
    res.status(400).json({message:"in-valid token"})
    }else{
    
    const teacher=await teacherModel.findById(decoded.id).select('confirmEmail') //{} or null
    
    if(!teacher){
    
    res.status(400).json({message:"in-valid token id"})
    
    }else{
    
    if(teacher.confirmEmail){
    
    res.status(400).json({message:'u are already confirmed please proceed to login pages'})
    
    }else{
    
    await teacherModel.findByIdAndUpdate(teacher._id,{confirmEmail:true},{new:true})
    
    res.status(200).json({message:"please login "})
    
    }
    
    }
    }
    }catch(e){
    
      res.status(500).json({message:'catch err confirm email',e}) 
        
    
    }
    }

// SEND CODE----------------------------------------------

const sencode=async(req, res)=>{

    const {email}=req.body
    
    const teacher=await teacherModel.findOne({email})
    if(!teacher){
    
    res.status(404).json({message:'invalid email '})
    
    }else{
    
      const code=Math.floor(Math.random()*(9999-1000+1)+1000)  
      console.log(code); 
    message=`<p>use this code to reset your password ${code} </p>`
    await teacherModel.findByIdAndUpdate(teacher._id,{code})
    //   sendEmail(email,message)
    res.status(200).json({message:'Done'})
    
    }
    
    
    
    }


//LOGIN------------------------------------------------

const signinTeacher = async (req, res) => {

    try {
        const {
            email,
            password
        } = req.body

        const teacher = await teacherModel.findOne({
            email
        })
        if (!teacher) {

            res.status(404).json({
                message: "sorry the email not founded"
            })

        } else {

            if (!teacher.confirmEmail) {

                res.status(400).json({
                    message: "please confirm Your Email"
                })

            } else {

                const match = await bcrypt.compare(password, teacher.password)
                console.log(match);

                if (!match) {

                    res.status(400).json({
                        message: "invalid pass"
                    })
                } else {


                    const token = jwt.sign({
                        id: teacher._id,
                        loggedIn: true
                    }, process.env.LOGINTOKEN, {
                        expiresIn: '1h'
                    })
                    await teacherModel.findByIdAndUpdate(teacher._id, {
                        online: true
                    })
                    res.status(200).json({
                        message: "login success",
                        token
                    })


                }
            }

        }

    } catch (e) {

        res.status(500).json({
            message: 'catch err login'
        })

    }
}

// getStudentWithTeacherById------------------------------------------------
const getStudentWithTeacherById=async (req, res) => {

    try{
        const {id}=req.params
        const findAdmin=await adminModel.findById({_id:id})
        
        if(!findAdmin.confirmEmail) res.json({message: 'plz confirm u email'})
        
        
        if(!findAdmin) {
            res.json({message:'not fonunded'})
        }
        
        res.json({message:'done findAdmin',findAdmin})
        
    }catch (e) {
        
res.json({message:'error in findAdmins '})

    }

}

 
//addClass  -----------------------------------------------------------------------------

const addClassByTeacher=async (req, res) => {
    try{
const classData=req.body

const newClass = new classModel(classData)
const saveClass =await newClass.save()
res.json({message:"saved",saveClass})

    }catch(e){
        if(e.keyValue?.title){

            res.status(409).json({message:"title exists"})
    
        }else{
            res.status(500).json({message:"Error",e})
        }
    
    }
}

//editClass  -----------------------------------------------------------------------------


const editClassByTeacher=async (req, res) => {
    try{
        const {id}=req.params
        console.log({id});
        const editTheClass=req.body
        
        const findClass=await classModel.findById({_id:id})
        
        if(!findClass) return res.json({message:"Class not found"})
        
        const updateClass= await classModel.findByIdAndUpdate({_id:id},editTheClass)
     
        
        res.status(200).json({message:"Teacher updated",updateClass})
    }catch(err){
    
        res.json({message:"Catch editStudent Error"})
        
        }
        }
// deleteClassByTeacher-----------------------------------------

        const deleteClassByTeacher=async (req, res) => {

            const {id}=req.params

            const findClass=await classModel.findById(id)
            
            
            if(!findClass) res.json({message: 'Sorry cant find your choice'})
            
            
            await classModel.findByIdAndDelete(id)
            
            res.json({message: 'deleted Success'})



        }

module.exports = {
signupTeacher,
confirmEmail,
refreshEmail,
sencode,
signinTeacher,
getStudentWithTeacherById,
addClassByTeacher,
editClassByTeacher,
deleteClassByTeacher

}
