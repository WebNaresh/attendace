import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';

interface Data {
  to: string;
  user_name: string;
  library_name: string;
  user_plan_name: string;
  user_plan_price: string;
  user_plan_features: string[];
  receipt_id: string;
  start_date: string;
  library_email: string;
  library_url: string;
  library_logo: string;
}
@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    // Initialize the email transporter only once
    this.transporter = createTransport({
      host: process.env.HOST, // Replace with your SMTP server
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.Mail_ID, // Replace with your SMTP username
        pass: process.env.PASSWORD, // Replace with your SMTP password
      },
    });
  }

  async sendOtp(to: string, otp: number) {
    const htmlContent = `
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your login</title>
    <!--[if mso
      ]><style type="text/css">
        body,
        table,
        td,
        a {
          font-family: Arial, Helvetica, sans-serif !important;
        }
      </style><!
    [endif]-->
    <style>
      .copy-button {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
        width: max-content;
      }
    </style>
  </head>
  <body
    style="
      font-family: Helvetica, Arial, sans-serif;
      margin: 0px;
      padding: 0px;
      background-color: #ffffff;
    "
  >
    <table
      role="presentation"
      style="
        width: 100%;
        border-collapse: collapse;
        border: 0px;
        border-spacing: 0px;
        font-family: Arial, Helvetica, sans-serif;
        background-color: rgb(239, 239, 239);
      "
    >
      <tbody>
        <tr>
          <td
            align="center"
            style="padding: 1rem 2rem; vertical-align: top; width: 100%"
          >
            <table
              role="presentation"
              style="
                max-width: 600px;
                border-collapse: collapse;
                border: 0px;
                border-spacing: 0px;
                text-align: left;
              "
            >
              <tbody>
                <tr>
                  <td style="padding: 40px 0px 0px">
                    <div style="text-align: left">
                      <div style="padding-bottom: 20px; display: flex">
                        <div
                          style="
                            background-color: #ffffff;
                            padding: 10px;
                            border-radius: 100%;
                            width: 36px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          "
                        >
                          <img
                            src="https://neststudyroom.s3.ap-south-1.amazonaws.com/main_logo.png"
                            alt="Company"
                            style="width: auto; height: 36px; margin: auto"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style="
                        padding: 20px;
                        background-color: rgb(255, 255, 255);
                        border-radius: 10px;
                      "
                    >
                      <div style="color: rgb(0, 0, 0); text-align: left">
                        <h1 style="margin: 1rem 0">Verification code</h1>
                        <p style="padding-bottom: 16px">
                          Please use the verification code below to sign in.
                        </p>
                        <p
                          style="
                            padding-bottom: 16px;
                            font-size: 130%;
                            font-weight: bold;
                            background-color: #f0f0f0;
                            padding: 10px;
                            text-align: center;
                            border-radius: 5px;
                          "
                          id="otp-code"
                        >
                          ${otp}
                        </p>

                        <p style="padding-bottom: 16px">
                          If you didn’t request this, you can ignore this email.
                        </p>
                        <p style="padding-bottom: 16px">
                          Thanks,<br />The NirmanTech team
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    <script>
      async function copyToClipboard() {
        const otpCode = document.getElementById('otp-code').innerText;
        await navigator.clipboard.writeText(otpCode);
      }
    </script>
  </body>
</html>


    `;

    const mailOptions = {
      from: `'NirmanTech' <${process.env.Mail_ID}>`, // Replace with your sender address
      to, // Recipient email address
      subject: 'Your OTP Code', // Subject of the email
      html: htmlContent, // The HTML content using the template
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('OTP email sent: %s', info.messageId);
    return info;
  }

  async send_enrollment_email({
    to,
    user_name,
    library_name,
    user_plan_name,
    user_plan_price,
    user_plan_features,
    receipt_id,
    start_date,
    library_email,
    library_url,
  }: Data) {
    // Reconstructing HTML content using template literals and data properties
    const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to ${library_name}</title>
        <style>
          .copy-button {
            background-color: #4caf50;
            color: white;
            border: none;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 5px;
            width: max-content;
          }
        </style>
      </head>
      <body
        style="
          font-family: Helvetica, Arial, sans-serif;
          margin: 0px;
          padding: 0px;
          background-color: #ffffff;
        "
      >
        <table
          role="presentation"
          style="
            width: 100%;
            border-collapse: collapse;
            border: 0px;
            border-spacing: 0px;
            font-family: Arial, Helvetica, sans-serif;
            background-color: rgb(239, 239, 239);
          "
        >
          <tbody>
            <tr>
              <td
                align="center"
                style="padding: 1rem 2rem; vertical-align: top; width: 100%"
              >
                <table
                  role="presentation"
                  style="
                    max-width: 600px;
                    border-collapse: collapse;
                    border: 0px;
                    border-spacing: 0px;
                    text-align: left;
                  "
                >
                  <tbody>
                    <tr>
                      <td style="padding: 40px 0px 0px">
                        <div style="text-align: left">
                          <div style="padding-bottom: 20px; display: flex">
                            <div
                              style="
                                background-color: #ffffff;
                                padding: 10px;
                                border-radius: 100%;
                                width: 36px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                              "
                            >
                              <img
                                src="https://neststudyroom.s3.ap-south-1.amazonaws.com/main_logo.png"
                                alt="Library Logo"
                                style="width: auto; height: 36px; margin: auto"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          style="
                            padding: 20px;
                            background-color: rgb(255, 255, 255);
                            border-radius: 10px;
                          "
                        >
                          <div style="color: rgb(0, 0, 0); text-align: left">
                            <div class="f-fallback">
                              <h1>Hi ${user_name},</h1>
                              <p>
                                Thank you for enrolling in ${library_name}.
                                We are thrilled to have you join our community!
                              </p>
                              <p>
                                You have successfully purchased the
                                <strong>${user_plan_name}</strong>
                                plan for
                                <strong>${user_plan_price}</strong>.
                              </p>
                              <p>This plan includes the following features:</p>
                              <ul>
                                ${user_plan_features.map((feature) => `<li>${feature}</li>`).join('')}
                              </ul>

                              <!-- Display purchase details -->
                              <table
                                class="purchase"
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                              >
                                <tr>
                                  <td><h3>Receipt ID: ${receipt_id}</h3></td>
                                  <td><h3 class="align-right">${start_date}</h3></td>
                                </tr>
                                <tr>
                                  <td colspan="2">
                                    <table
                                      class="purchase_content"
                                      width="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tr>
                                        <th class="purchase_heading" align="left">
                                          <p class="f-fallback">Description</p>
                                        </th>
                                        <th class="purchase_heading" align="right">
                                          <p class="f-fallback">Amount</p>
                                        </th>
                                      </tr>
                                      <tr>
                                        <td width="80%" class="purchase_item">
                                          <span class="f-fallback">${user_plan_name}</span>
                                        </td>
                                        <td
                                          class="align-right"
                                          width="20%"
                                          class="purchase_item"
                                        >
                                          <span class="f-fallback">${user_plan_price}</span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          width="80%"
                                          class="purchase_footer"
                                          valign="middle"
                                        >
                                          <p
                                            class="f-fallback purchase_total purchase_total--label"
                                          >
                                            Total
                                          </p>
                                        </td>
                                        <td
                                          width="20%"
                                          class="purchase_footer"
                                          valign="middle"
                                        >
                                          <p class="f-fallback purchase_total">
                                            ${user_plan_price}
                                          </p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>

                              <p>
                                If you have any questions or need further
                                assistance, feel free to reply to this email or
                                contact our
                                <a href="mailto:${library_email}">${library_email}</a>.
                              </p>
                              <p>
                                Welcome aboard! We look forward to supporting you on
                                your learning journey.
                              </p>
                              <p>
                                Best Regards,<br />The ${library_name} Team
                              </p>

                              <!-- Call to action for downloading receipt -->
                              <table
                                class="body-action"
                                align="center"
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                              >
                                <tr>
                                  <td align="center">
                                    <table
                                      width="100%"
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      role="presentation"
                                    >
                                    </table>
                                  </td>
                                </tr>
                              </table>

                              <!-- Option to update billing information -->
                              <table class="body-sub" role="presentation">
                                <tr>
                                  <td>
                                    <p class="f-fallback sub">
                                      Need to update your billing information? You
                                      can easily do so here
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

    const mailOptions = {
      from: `'NirmanTech' <${process.env.Mail_ID}>`,
      to,
      subject: `Welcome to ${library_name}`,
      html: htmlContent,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('Welcome email sent: %s', info.messageId);
    return info;
  }

  async send_library_owner_notification({
    ownerEmail,
    user_name,
    library_name,
    user_plan_name,
    user_plan_price,
    start_date,
    library_id,
  }: {
    ownerEmail: string;
    user_name: string;
    library_name: string;
    user_plan_name: string;
    user_plan_price: string;
    start_date: string;
    library_id: string;
  }) {
    // Reconstructing HTML content for the library owner notification
    const htmlContent = `
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Enrollment Notification</title>
    <style>
      .button {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 5px;
      }
    </style>
  </head>
  <body
    style="
      font-family: Helvetica, Arial, sans-serif;
      margin: 0px;
      padding: 0px;
      background-color: #ffffff;
    "
  >
    <table
      role="presentation"
      style="
        width: 100%;
        border-collapse: collapse;
        border: 0px;
        border-spacing: 0px;
        font-family: Arial, Helvetica, sans-serif;
        background-color: rgb(239, 239, 239);
      "
    >
      <tbody>
        <tr>
          <td
            align="center"
            style="padding: 1rem 2rem; vertical-align: top; width: 100%"
          >
            <table
              role="presentation"
              style="
                max-width: 600px;
                border-collapse: collapse;
                border: 0px;
                border-spacing: 0px;
                text-align: left;
              "
            >
              <tbody>
                <tr>
                  <td style="padding: 40px 0px 0px">
                    <div style="text-align: left">
                      <div style="padding-bottom: 20px; display: flex">
                        <div
                          style="
                            background-color: #ffffff;
                            padding: 10px;
                            border-radius: 100%;
                            width: 36px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          "
                        >
                          <img
                            src="https://neststudyroom.s3.ap-south-1.amazonaws.com/main_logo.png"
                            alt="Library Logo"
                            style="width: auto; height: 36px; margin: auto"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style="
                        padding: 20px;
                        background-color: rgb(255, 255, 255);
                        border-radius: 10px;
                      "
                    >
                      <div style="color: rgb(0, 0, 0); text-align: left">
                        <div class="f-fallback">
                          <h1>Dear Library Owner,</h1>
                          <p>
                            We are pleased to inform you that a new user has
                            successfully joined ${library_name}.
                          </p>
                          <p>
                            User Name: <strong>${user_name}</strong><br />
                            Plan: <strong>${user_plan_name}</strong><br />
                            Price: <strong>${user_plan_price}</strong><br />
                            Start Date: <strong>${start_date}</strong>
                          </p>
                          <p>
                            Please review the user's details and provide any
                            necessary support to ensure a smooth onboarding
                            experience.
                          </p>
                          <p>
                            For more details, you can visit the library's
                            dashboard here:
                            <a
                              href="${process.env.FRONTEND_URL}/dashboard/${library_id}"
                              class="button"
                              target="_blank"
                              >Library Dashboard</a
                            >.
                          </p>
                         <p style="padding-bottom: 16px">
                          Thanks,<br />The NirmanTech team
                        </p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>

  `;

    const mailOptions = {
      from: `'NirmanTech' <${process.env.Mail_ID}>`,
      to: ownerEmail,
      subject: `New User Enrollment at ${library_name}`,
      html: htmlContent,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('Library owner notification email sent: %s', info.messageId);
    return info;
  }

  async send_user_pdf({
    ownerEmail,
    user_name,
    library_name,
    pdfBuffer,
    to,
  }: {
    ownerEmail: string;
    user_name: string;
    library_name: string;
    pdfBuffer: Express.Multer.File;
    to: string;
  }) {
    const htmlContent = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to ${library_name}</title>
      <style>
        .copy-button {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 5px;
          width: max-content;
        }
      </style>
    </head>
    <body
      style="
        font-family: Helvetica, Arial, sans-serif;
        margin: 0px;
        padding: 0px;
        background-color: #ffffff;
      "
    >
      <table
        role="presentation"
        style="
          width: 100%;
          border-collapse: collapse;
          border: 0px;
          border-spacing: 0px;
          font-family: Arial, Helvetica, sans-serif;
          background-color: rgb(239, 239, 239);
        "
      >
        <tbody>
          <tr>
            <td
              align="center"
              style="padding: 1rem 2rem; vertical-align: top; width: 100%"
            >
              <table
                role="presentation"
                style="
                  max-width: 600px;
                  border-collapse: collapse;
                  border: 0px;
                  border-spacing: 0px;
                  text-align: left;
                "
              >
                <tbody>
                  <tr>
                    <td style="padding: 40px 0px 0px">
                      <div style="text-align: left">
                        <div style="padding-bottom: 20px; display: flex">
                          <div
                            style="
                              background-color: #ffffff;
                              padding: 10px;
                              border-radius: 100%;
                              width: 36px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                            "
                          >
                            <img
                              src="https://neststudyroom.s3.ap-south-1.amazonaws.com/main_logo.png"
                              alt="Library Logo"
                              style="width: auto; height: 36px; margin: auto"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        style="
                          padding: 20px;
                          background-color: rgb(255, 255, 255);
                          border-radius: 10px;
                        "
                      >
                        <div style="color: rgb(0, 0, 0); text-align: left">
                          <div class="f-fallback">
                            <h1>Hi ${user_name},</h1>
                            <p>
                              Congratulations on joining ${library_name}! We are excited to welcome you to our community.
                            </p>
                            <p>
                              You have successfully enrolled in the <strong>${library_name}</strong>. We hope this plan meets all your expectations and provides great value.
                            </p>
                            <p>
                              A detailed receipt has been attached to this email in PDF format for your records.
                            </p>

                            <p>
                              If you have any questions or require further assistance, please don't hesitate to contact us at 
                              <a href="mailto:${ownerEmail}">${ownerEmail}</a>.
                            </p>
                            <p>
                              We look forward to supporting your learning journey.
                            </p>
                            <p>
                              Best Regards,<br />
                              The ${library_name} Team
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
`;

    const mailOptions = {
      from: `'NirmanTech' <${process.env.Mail_ID}>`,
      to: to,
      subject: `New User Enrollment at ${library_name}`,
      html: htmlContent,
      attachments: [
        {
          filename: 'receipt.pdf', // Specify the name of the PDF file
          content: pdfBuffer.buffer, // Attach the PDF buffer
          contentType: 'application/pdf', // Specify the content type
        },
      ],
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('Library owner notification email sent: %s', info.messageId);
    return info;
  }

  catch(error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}
