const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

// Set up your email transport configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'justin.tqdm@gmail.com',    // Replace with your email
        pass: 'opavgreboldayxkx'      // Replace with your Google app password 
    }
});

// Function to send an email with error details
async function sendErrorEmail(error) {
    const mailOptions = {
        from: 'justin.tqdm@gmail.com',    // Replace with your email
        to: 'justin.tqdm@gmail.com',  // Replace with the recipient's email
        subject: 'Punch Failed!',
        text: `An error occurred:\n\n${error.stack}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Error email sent successfully.');
    } catch (sendError) {
        console.error('Error sending email:', sendError);
    }
}
async function randomDelay() {
    const minutes = Math.floor(Math.random() * 2) + 1; // Generate a random number between 1 and 5
    const milliseconds = minutes * 60 * 1000; // Convert minutes to milliseconds
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


const main = async () => {
  try {
    const username = 'tinnt'
    const password = '@1111'
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
	headless: 'new',
	args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-gpu']
    });
    const page = await browser.newPage();

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // Navigate the page to a URL
    await page.goto('https://blueprint.cyberlogitec.com.vn/');
	console.log('Accessing the page...');
	  
    await randomDelay();
    // Type into search box
    await page.type('#username', username);
    await page.type('#password', password);

    // Wait and click on first result
    const searchResultSelector = '#submit-btn';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    await page.goto('https://blueprint.cyberlogitec.com.vn/UI_TAT_028');

    await randomDelay();
    // Type into the text input with id "username" using XPath
    const punchBtn = '//*[@id="checkInOutBody"]/div/div/div[1]/div[2]/div[1]/div/button';
    await page.waitForXPath(punchBtn);
    const button = await page.$x(punchBtn);
    await button[0].click(punchBtn);

        console.log('Punch...');
    await browser.close();
  } catch (error) {
      // Handle the error
      console.error('Error:', error);

      // Send an email with error details
      await sendErrorEmail(error);
  }
};
// Wait for a moment (optional)
main()
