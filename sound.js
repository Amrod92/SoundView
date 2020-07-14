const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(''); // Put your SoundCloud link here. Example: https://soundcloud.com/YOUR_ARTIST_NAME/sets/YOUR_ARTIST_NAME

  try {
    let time = 0; // This is for the pictures

    // Play button
    const play = await page.evaluateHandle(() =>
      document.querySelector('button')
    );

    await play.click('sc-button-play playButton sc-button m-stretch');

    // Repeat button
    await page.$eval('button[title="Repeat"]', (form) => {
      for (i = 0; i < 2; i++) {
        // Double Click
        form.click();
      }
    });

    // List of each Track
    let track = 'li[class="trackList__item sc-border-light-bottom"]';

    // Goes through the whole track list
    while (!track.length - 1) {
      // await page.screenshot({ path: `example${(time += 1)}.png` });

      await page.waitFor(4000); // Wait for 4 seconds

      let next =
        'button[class="skipControl sc-ir playControls__control playControls__next skipControl__next"]';

      await page.evaluate((song) => document.querySelector(song).click(), next);

      await page.waitFor(4000); // Wait for 4 seconds
      // await page.screenshot({ path: `example${(time += 1)}.png` });
    }
  } catch (err) {
    console.error(err.message);
    await browser.close();
  }

  await browser.close();
})();
