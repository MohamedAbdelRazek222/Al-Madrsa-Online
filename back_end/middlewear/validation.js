
const dataMethod=['body','query','params','file','headers']

const validation=(schema)=>{



return async(req,res,next)=>{


const validationErr=[]
dataMethod.forEach(function(key){


    if(schema[key]){
    
    
    const validateRes=schema[key].validate(req[key],{abortEarly:false})
    
    if(validateRes.error){
    
        validationErr.push(validateRes.error.details)
 
    }
    }
    })
    
    if(validationErr.length){



        res.json({message:"error",validationErr})
        
        
        }else{
        
        
        next()
        
        
        
        }
        




}


}

module.exports = {validation}