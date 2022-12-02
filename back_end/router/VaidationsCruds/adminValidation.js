

const Joi=require('joi');

const signUpValidation={

    body:Joi.object().required().keys({
    name:Joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required(),
    cpassword:Joi.string().valid(Joi.ref('password')).required()
    


})

}
const signinValidation={

    body:Joi.object().required().keys({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).required(),





})

}
const getAdminValidation={

    params:Joi.object().required().keys({
    id:Joi.string().min(24).max(24).required(),




})

}
const EditByAdminValidation={

    params:Joi.object().required().keys({
    id:Joi.string().min(24).max(24).required(),




})

}
const DeleteByAdminValidation={

    params:Joi.object().required().keys({
    id:Joi.string().min(24).max(24).required(),




})

}



module.exports={
    
signUpValidation,
signinValidation,
getAdminValidation,
EditByAdminValidation,
DeleteByAdminValidation

}