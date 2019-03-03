const Apify = require("apify");

Apify.main(async () => {
    // Launch web browser.
    const browser = await Apify.launchPuppeteer();

    // Load http://goldengatebridge75.org/news/webcam.html and get an IFRAME with the webcam stream
    console.log("Opening web page...");
    const page = await browser.newPage();
    await page.goto("http://goldengatebridge75.org/news/webcam.html");
    const iframe = (await page.frames()).pop();

    // Get webcam image element handle.
    const imageElementHandle = await iframe.$(".VideoColm img");

    // Give the webcam image some time to load.
    console.log("Waiting for page to load...");
    await Apify.utils.sleep(3000);

    // Get a screenshot of that image.
    const imageBuffer = await imageElementHandle.screenshot();
    console.log("Screenshot captured.");

    // Save the screenshot as the actor's output. By convention, similarly to "INPUT",
    // the actor's output is stored in the default key-value store under the "OUTPUT" key.
    await Apify.setValue("OUTPUT", imageBuffer, { contentType: "image/jpeg" });
    console.log("Actor finished.");
});
