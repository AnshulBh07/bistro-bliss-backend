// we will create the html template to be sent here, (basically how your mail should look)
// an email template that can be used with Nodemailer to send emails

const HTML_TEMPLATE = (text: string) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>NodeMailer Email Template</title>
    <style>
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
  
      /* Add your fonts here */
  
      .container__main {
        min-height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0rem;
        background-color: #ad343e;
        padding: 2rem 10rem;
      }
  
      .section__mail-body {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 20px #707070;
      }
  
      .top-bar {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
      }
  
      .top-bar > img {
        height: 5rem;
      }
  
      .top-bar > .logo {
        height: 4rem;
      }
  
      .container__thanks {
        width: 50%;
        padding: 2rem;
        background-color: #fff385;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        border-radius: 10px;
        color: #470000;
      }
  
      .container__thanks > h1 {
        font-family: "playfair display", sans-serif;
        font-size: 2.5rem;
        text-transform: capitalize;
        text-align: center;
        width: 60%;
        font-weight: 600;
        color: #470000;
      }
  
      .container__thanks > p {
        font-family: "dm sans", sans-serif;
        font-size: 1.1rem;
        font-weight: 600;
      }
  
      .container__mail-body {
        width: 100%;
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
  
      .container__mail-body > h1 {
        font-family: "playfair display", sans-serif;
        font-size: 1.5rem;
        text-transform: capitalize;
        font-weight: 600;
        font-style: italic;
        color: #470000;
        align-self: flex-start;
      }
  
      .container__mail-body > p {
        font-family: "dm sans", sans-serif;
        font-size: 1rem;
        color: #470000;
        align-self: flex-start;
      }
  
      .regards {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        text-transform: capitalize;
      }
  
      .btn_order {
        width: 9rem;
        padding: 1rem;
        font-family: "DM sans", sans-serif;
        font-weight: 600;
        text-transform: capitalize;
        font-size: 1.1rem;
        border: none;
        background-color: #ad343e;
        color: #fff;
        border-radius: 30px;
        cursor: pointer;
        transition: all 0.5s ease;
      }
  
      .btn_order:hover {
        background-color: #910000;
        box-shadow: 0 0 20px #d1d1d1;
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0f0f0;">
  
    <!-- Outer Table -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 100%; max-width: 600px; margin: auto;">
      <tr>
        <td style="padding: 20px; background-color: #ffffff;">
  
          <!-- Inner Table for Content -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 100%;">
            <tr>
              <td>
                <!-- Your content goes here -->
                <div class="container__main">
                  <section class="section__mail-body">
                    <!-- Top bar -->
                    <div class="top-bar">
                      <img src="https://logowik.com/content/uploads/images/free-food-delivery8485.logowik.com.webp" alt="food truck" />
                      <img src="https://i.pinimg.com/736x/7f/7e/f9/7f7ef93e691abaedb2607d24f79f846a.jpg" alt="logo" class="logo">
                    </div>
  
                    <!-- Thank you div -->
                    <div class="container__thanks">
                      <h1>thank you for choosing us</h1>
                      <p>for your food delivery needs.</p>
                    </div>
  
                    <!-- Mail body -->
                    <div class="container__mail-body">
                      <h1>dear anshul bhardwaj,</h1>
                      <p>We just wanted to take a moment to thank you for choosing us for your food needs. We hope that you enjoyed the food and the service, and that we met your expectations</p>
                      <p>If there's anything that we can do to make your experience even better, please don't hesitate to let us know. We appreciate your feedback and are always looking for ways to improve</p>
                      <p>Thank you again for your business. We look forward to serving you again soon!</p>
                      <p class="regards">Best regards,<span>Bistro Bliss</span></p>
                      <button onclick="orderMore()" class="btn_order">order food</button>
                    </div>
                  </section>
                </div>
              </td>
            </tr>
          </table>
  
        </td>
      </tr>
    </table>
  
    <script>
      const orderLink = "https://anshuls-bistro-bliss-app.netlify.app";
  
      function orderMore() {
        window.open(orderLink, "_blank")
      }
    </script>
  </body>
  </html>`;
};

export default HTML_TEMPLATE;
