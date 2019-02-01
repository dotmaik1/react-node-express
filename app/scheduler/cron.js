let nodemailer = require('nodemailer')
let fs = require("fs")
let ejs = require("ejs");
let path = require('path');


module.exports = function(cron) {

    
    cron.schedule('0 */1 * * *', function(){
        /*SERVICE
            .CEOReport()
            .then((data) => {
                console.log(data)
                sendEmail(data)
            })
            .catch(function (err) {
                console.error('[scheduler/cron.js][CEOReport] Error cuando obtenemos el reporte del CEO (6am): ', err);
            });*/
    })
};


function sendEmail(data) {
    ejs.renderFile(path.join(__dirname, '..', 'view/pages/email_template.ejs'), { 
                clientsList:  data.clientsList,
                loadsPerClient: data.loadsPerClient,
                sandsPerClient: data.sandsPerClient,
                totalLoads: data.totalLoads,
                totalSandPerClient: data.totalSandPerClient,
                totalVolume: data.totalVolume
     }, function (err, template) {
        if (err) {
            console.log(err);
        } else {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                        user: 'miguel@pidelectronics.com',
                        pass: 'Mangos22'
                    }
            })

            const mailOptions = {
                from: 'alertas@kinnilweb.com', // sender address
                to: 'dotmaik1@gmail.com', // list of receivers
                subject: 'Cedar - Daily Volume Report',
                html: template
            }

            console.log("html data ======================>");
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Message sent: ' + info.response)
                }
            })
        }
        
    })
}