const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 465,
        secure: true,
        auth: {
        user: 'yangjin1894@163.com', //邮箱的账号
        pass: '123456xx'//邮箱的密码
        }
    });
    // 创建一个SMTP客户端对象
    var transporter = nodemailer.createTransport(config);

    // 发送邮件
    module.exports = function (mail){
        transporter.sendMail(mail, function(error, info){
            if(error) {
                return console.log(error);
            }
            console.log('mail sent:', info.response);
        });
    };
