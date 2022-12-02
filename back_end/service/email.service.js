
const nodeoutlook=require('nodejs-nodemailer-outlook')


function sendEmail (dest,message,attachment){
try{
    if(!attachment){

        attachment=[]
    }
nodeoutlook.sendEmail({
 auth: {
 user: process.env.SENDEREMAIL,
 pass: process.env.SENDERPASSWORD,
 },
 from: process.env.SENDEREMAIL,
 to: dest, //  paramter يعني هتروح للايميل الي جايلك في ال 
 subject: 'Hey you, awesome!',
 html: message, // يعني اعرض الرساله الي انا عايزه يشوفهاوالي انا بعتهاله
 text: 'This is text version!',
 attachments:attachment,
 onError: (e) => console.log(e),
 onSuccess: (i) => console.log(i)
    }
    
    
    );
    
}catch (e) {

    console.log(`catch error ${e}`);
}

}

module.exports = sendEmail




// const sendmail = require('sendmail')();
 
// function sendEmails (dest,message/*,attachment*/){
//     // if(!attachment){

//     //     attachment=[]
//     // }
// sendmail({
//  from: process.env.SENDEREMAIL,
//  to: dest, //  paramter يعني هتروح للايميل الي جايلك في ال 
//     subject: 'test sendmail',
//     html: message,
//     // attachments:attachment,
//   }, function(err, reply) {
//     console.log(err && err.stack);
//     console.dir(reply);
// });
// }
// module.exports = sendEmails
