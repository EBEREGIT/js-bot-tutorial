const puppeteer = require("puppeteer");

// set variables
// handles the new tab or page where the website is/will be loaded
let page = null;
// handles the browser
let browser = null;

// Launch a browser and turn the headless off so that you can see what is going on
browser = puppeteer
  .launch({ headless: false })
  .then(async (browser) => {
    // open a new tab in the browser
    page = await browser.newPage();
    // set device size to stick to only desktop view
    page.setViewport({
      width: 1280,
      height: 800,
      isMobile: false,
    });
    // open a URL
    page.goto("https://eberegit.github.io/Geo-Search/index.html", {
      waitUntil: "networkidle2",
    });

    // wait for the search input to have finished loading on the page
    await page.waitFor('input[name="search-field"]');
    // Delay 2seconds before typing
    await page.waitFor(2000);
    // target the search input and type into the field with a little delay so you can see whats going on
    await page.type('input[name="search-field"]', "Obudu Cattle Ranch, Obudu, Nigeria", {
        delay: 5,
      });
    // target and click the search button
    await page.click('input[name="submit-button"]');
    // wait 5 seconds
    await page.waitFor(5000);
    // close the browser
    await browser.close();
  })
  .catch((error) => {
    console.log(error);
  });
