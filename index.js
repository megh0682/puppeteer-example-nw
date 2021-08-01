const puppeteer = require('puppeteer');
const expect = require('expect')
let requestURLMap = new Map();
let i =1;
 

async function main() {

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({width: 1400, height: 720});
  await page.goto('https://ebc2.cybersource.com/ebc2', { waitUntil: 'networkidle2' }); // wait until page load
  await page.type('#orgId', 'cybsbanktestoms');
  await page.type('#username', 'miyer');
  await page.type('#password', 'Dec12345!');
  // click and wait for navigation
  await Promise.all([
  page.waitForNavigation(),
  page.click('#submit')
  ]);
  await page.waitForSelector("#ebcHome");
  await page.goto('https://ebc2.cybersource.com/ebc2/app/TransactionManagement/Transactions');
  await page.setRequestInterception(true);
  page.on('request', (request) => {
// expect(request.url()).toContain('/search');//   expect(request.headers()['user-agent']).toBeTruthy();
//   expect(request.method()).toBe('GET');
//   expect(request.postData()).toBe(undefined);
//   expect(request.isNavigationRequest()).toBe(true);
//   expect(request.resourceType()).toBe('document');
//   expect(request.frame() === page.mainFrame()).toBe(true);
//   expect(request.frame().url()).toBe('about:blank');
if(request.url()===("https://ebc2.cybersource.com/ebc2/search/search")){
    console.log(request.method(), request.url()); // Basically, do your work here
    expect(request.method()).toBe('POST');
    console.log("-----------post payload--------");
    console.log(decodeURIComponent(request.postData()));
    let nlevelQuery =decodeURIComponent(request.postData());
    expect(nlevelQuery.toBe('query=transactionDate:[NOW/DAY-7DAYS+TO+NOW/DAY+1DAY}&pageNumber=0&pageSize=50&timeZoneId=America/Los_Angeles&saved=falsere'));
}
return Promise.resolve().then(() => request.continue()).catch(e => {});
});
}
main();