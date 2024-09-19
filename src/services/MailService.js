const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const renderContent = (list, totalPrice) => {
  return `
  <span>Thông tin hóa đơn</span>
  <table style="font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;">
  <tr>
    <th style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;">Tên sản phẩm</th>
    <th style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;">Giá tiền</th>
    <th style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;">Tổng tiền</th>
  </tr>
  ${list.map(
    (item) => `<tr>
        <td style="border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;">${item.name}</td>
        <td style="border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;">${item.price}</td>
        <td style="border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;">${item.price * item.amount}</td>
      </tr>`
  )}
   <tr>
    <th style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;"></th>
    <th style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;"> </th>
    <th style="border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;">${totalPrice}</th>
  </tr>
</table>
<span>Thank you and see you next time. </span>
`;
};
const sendEmailCreateOrder = async (email, orderItems, totalPrice) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  // console.log(renderContent());
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.MAIL_ACCOUNT, // sender address
      to: process.env.MAIL_ACCOUNT, // list of receivers
      subject: "Bạn đã đặt hàng tại shop Ecomerce MERN", // Subject line
      text: "Hello world?", // plain text body
      html: renderContent(orderItems, totalPrice), // html body
    });
    // clpj xhrj sikj bsuu
    // console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};

module.exports = { sendEmailCreateOrder };
