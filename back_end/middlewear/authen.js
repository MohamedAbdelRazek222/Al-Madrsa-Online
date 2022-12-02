const jwt = require('jsonwebtoken')
const adminModel = require('../models/admin')
const studentModel = require('../models/student')
const teacherModel = require('../models/teacher')
const {
    get,
    getById
} = require('../utils/crud')
const roles = {

    Admin: 'admin',
    Teacher: 'teacher',
    Student: 'student'

}

const authen = (accessRoles) => {
    return async (req, res, next) => {
        const headerToken = req.headers['authorization']
        
        // if(!headerToken || headerToken == null || headerToken == undefined || !headerToken.startsWith(`${process.env.TOKEN} `)){
        if (!headerToken.startsWith(`Bearer `)) {
            res.status(400).json({
                message: "invalid header token"
            })
        } else {
            const token = headerToken.split(' ')[1]
            //  jwt.sign({userId:user._id},prpcess.env.LOGINTOKEN)
            try {
                const decoded = jwt.verify(token, process.env.LOGINTOKEN) // token  فكلي ال 
                if (!decoded) {
                    res.status(400).json({
                        message: "invalid  token"
                    })
                }
                const userId = decoded.id;
                const findUser = await getById(userId, teacherModel, []);
                const findUser2 = await getById(userId, studentModel, []);
                const findUser3 = await getById(userId, adminModel, []);
                const foundUser = [findUser2, findUser, findUser3]
                .find(user => user)
                
                if (!foundUser) { 
                    res.status(404).json({
                        message: "user not found"
                    })
                } else {
                  
                    if (!accessRoles.includes(foundUser.role)) {
                        res.status(401).json({
                            message: 'not auth account'
                        })
                    } else {
                        req.user = foundUser
                        next()
                    }
                }

            } catch (e) {
                console.log(e) //
                res.status(400).json({
                    message: "invalid  token 2"
                })
            }
        }
    }
}


module.exports = {
    authen,
    roles
}




/*

                const foundUser = [findUser2, findUser, findUser3]

const sa = foundUser.filter((s)=>{
    if (s !== null){

        console.log(s)
        return s
    }
    
})
console.log(sa[0])

                if (sa[0] == null || sa[0]=='undefined' ) { 
                    res.status(404).json({
                        message: "user not found"
                    })
                } else {
                  
                    if (!accessRoles.includes(sa[0].role)) {
                        res.json({ message:'not auth account'})
                    } else {
                        console.log("assasasaxasxaxax")
                        req.user = sa[0]
                       console.log("assasasaxasxaxax")

                        next()
                        console.log("assasasaxasxaxax")

                    }




*/