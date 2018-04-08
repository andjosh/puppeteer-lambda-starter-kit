const setup = require('./starter-kit/setup');

exports.handler = async (event, context, callback) => {
  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  const browser = await setup.getBrowser();
  exports.run(browser).then(
    (result) => callback(null, result)
  ).catch(
    (err) => callback(err)
  );
};

exports.run = async (browser) => {
  // implement here
  // this is sample
  const page = await browser.newPage();
  await page.goto('https://zh.wikipedia.org/wiki/%E6%97%A5%E8%AF%AD');
  /*
  console.log((await page.content()).slice(0, 500));

  await page.type('#lst-ib', 'aaaaa');
  // avoid to timeout waitForNavigation() after click()
  await Promise.all([
    // avoid to 
    // 'Cannot find context with specified id undefined' for localStorage
    page.waitForNavigation(),
    page.click('[name=btnK]'),
  ]);
  */

  await screenshot(page, 'aaaaa.png');

  // cookie and localStorage
  await page.setCookie({name: 'name', value: 'cookieValue'});
  console.log(await page.cookies());
  console.log(await page.evaluate(() => {
    localStorage.setItem('name', 'localStorageValue');
    return localStorage.getItem('name');
  }));
  await page.close();
  return 'done';
};

const screenshot = async (page, key) => {
  await page.screenshot({path: '/tmp/screenshot.png'});
  const aws = require('aws-sdk');
  const s3 = new aws.S3({apiVersion: '2006-03-01'});
  const fs = require('fs');
  const screenshot = await new Promise((resolve, reject) => {
    fs.readFile('/tmp/screenshot.png', (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
  await s3.putObject({
    Bucket: 'puppeteer-lambda-aaa',
    Key: key,
    Body: screenshot,
  }).promise();
};
