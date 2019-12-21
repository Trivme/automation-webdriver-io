# WebDriver I/O v.5 from scratch
## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Creating project](#creating-project)
3. [Modules installation and configuration](#modules)
4. [Updating WebDriver I/O configuration](#wdio-configuration)
5. [Modifying test script](#test-scripts)
6. [Creating the first test](#first-test)
7. [Installation of `Babel` to use JavaScript ES6 syntax](#babel)
8. [Running the first test](#first-test-run)
9. [Adding more tests](#more-tests)
10. [Configuring Allure reporter](#allure)
11. [Installation of `chai` module](#chai)
12. [Adding Smoke suite](#smoke)
13. [Working with Git](#git)

===

<a name="prerequisites"></a>
## 1. Prerequisites
#### 1.1. Node.js:
Install the latest Node.js **Recommended For Most Users** from
https://nodejs.org/en/
#### 1.2. Install Git:
https://git-scm.com/
#### 1.3. Install Java SE Development Kit:
https://www.oracle.com/technetwork/java/javase/downloads/jdk12-downloads-5295953.html

===

### Additional MacOS prerequisites:
#### 1.4. Install Xcode:
https://developer.apple.com/xcode/

===

### Additional Windows prerequisites:
#### 1.5. Install Python 2.7.
https://www.python.org/downloads/release/python-2716/

<a name="creating-project"></a>
## 2. Creating project
#### 2.1. Create `project` folder:
Open terminal and navigate to desired folder where you're going to store all of your projects. For example `projects` folder:
````
cd projects
````
Create a folder for automation project. For example, `automation-webdriverio`:
````
mkdir test-automation-webdriverio
````
And navigate to the created folder:
````
cd test-automation-webdriverio
````
#### 2.2. Initialize your project:
````
npm init -y
````
This action creates `package.json` file.

<a name="modules"></a>
## 3. Modules installation and configuration
#### 3.1. Install webDriver I/O:
````
npm i webdriverio
````
#### 3.2. Install CLI:
````
npm i @wdio/cli
````
#### 3.3. Create WebDriver I/O configuration by running:
````
./node_modules/.bin/wdio config
````
This script runs WDIO Configuration Helper which will help you to create configuration file.
````
Where should your tests be launched
> local
**click Enter**
````
````
Shall I install the runner plugin for you?
> type Y
**click Enter**
````
````
Where is your automation backend located?
> On my local machine
**click Enter**
````
````
Which framework do you want to use?
> mocha
**click Enter**
````
````
Shall I install the framework adapter for you?
> type Y
**click Enter**
````
````
Do you want to run WebdriverIO commands synchronous or asynchronous?
> sync
**click Enter**
````
````
Where are your test specs located?
> type ./test/*.js
**click Enter**
````
````
Which reporter do you want to use?
> dot (select by pressing Space)
> spec (select by pressing Space)
> allure (select by pressing Space)
**click Enter**
````
````
Shall I install the reporter library for you?
> type Y
**click Enter**
````
````
Do you want to add a service to your test setup?
> selenium-standalone (select by pressing Space)
**click Enter**
````
````
Shall I install the services for you?
> type Y
**click Enter**
````
````
Level of logging verbosity
> silent
**click Enter**
````
````
What is the base url?
> type https://reactbugtracker.com
**click Enter**
````
Wait till the end of the installation process.

<a name="wdio-configuration"></a>
## 4. Update WebDriver I/O configuration:
Open configuration file:
````
open wdio.conf.js
````
#### 4.1. Configure browser:
````
maxInstances: 1,
browserName: 'chrome'
````
<a name="test-scripts"></a>
## 5. Modify test script:
Open `package.json`:
````
open package.json
````
and modify `test` script to get the following:
````
"test": "wdio wdio.conf.js"
````
<a name="first-test"></a>
## 6. Creating the first test
#### 6.1. Create `test` folder and open it:
````
mkdir test
cd test
````

#### 6.2. Create `test.js` file and open it:
````
touch test.js
open test.js
cd ..
````
#### 6.3. Add the first test:
````
import assert from 'assert';

describe('Client', function () { //define suite title by passing a string

  describe('Page Level', function () { //define sub-suite title by passing a string

    it('Get title', function () { //define test title by passing a string
      browser.url('/'); //open baseUrl + string passed in .url() function
      let title = browser.getTitle(); //get page title and assign it to the "title" variable
      browser.pause(2000); //just pause to visually see that something is happening on the page
      assert.equal(title, 'Bug Tracker'); //compare {title} (actual) and "Bug Tracker" (expected)
    })

  });

});
````

<a name="babel"></a>
## 7. Instal `Babel` to use JavaScript ES6 syntax
#### 7.1. Go back to the root folder and install necessary modules:
````
npm install @babel/core @babel/cli @babel/preset-env @babel/register
````
#### 7.2. Create and open Babel Configuration file:
````
touch babel.config.js
open babel.config.js
````
#### 7.3. Paste the following code:
````
module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: 8
            }
        }]
    ]
}
````
#### 7.5 Update WebDriver I/O configuration adding Babel configuration:
Open configuration file:
````
open wdio.conf.js
````
And add the following line to the `mochaOpts` objest:
````
compilers: ['js:@babel/register']
````
It should look like this at the end:
````
mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        compilers: ['js:@babel/register']
    },
````

<a name="first-test-run"></a>
## 8. Running the first test
#### 8.1. Run the first test:
````
npm test
````
Wait until test is finished. 
You should see the message with one suite, one sub-suite, and one test passed:
````
[chrome #0-0] Client
[chrome #0-0]     Page Level
[chrome #0-0]        ✓ Get title
[chrome #0-0]
[chrome #0-0] 1 passing (3.4s)
````

<a name="more-tests"></a>
## 9. Adding more tests:
#### 9.1. Rename `test.js` to make it more clear:
````
cd test
mv test.js client.js
open client.js
````
Replace the old code by the following one in `client.js`:
````
import assert from 'assert';

describe('Client', function () {

  describe('Page Level', function () {

    it('Get title', function () {
      browser.url('/');
      let title = browser.getTitle();
      assert.equal(title, 'Bug Tracker');
    })

    it('Favicon', function () {
      browser.url('/favicon.ico');
      let icon = $('img');
      let width = icon.getCSSProperty('width').parsed.value;
      let height = icon.getCSSProperty('height').parsed.value;
      let size = `${width}x${height}`;
      assert.equal(size, '256x256');
    })

  });

  describe('Elements exist', function () {

    it('Header', function () {
      browser.url('/');
      let header = $('.custom-header').isDisplayed();
      assert.equal(header, true);
    })

    it('App', function () {
      let header = $('.site-content').isDisplayed();
      assert.equal(header, true);
    })

    it('Footer', function () {
      let header = $('.custom-footer').isDisplayed();
      assert.equal(header, true);
    })

  });

});
````
#### 9.2. Create one more test file `login.js`:
````
touch login.js
open login.js
cd ..
````
#### 9.3. Copy and paste the following code to `login.js`:
````
import assert from 'assert';
let maxLenght = 45;

describe('Login', function () {

  describe('Email', function () {

    it('Max Characters', function () {
      browser.url('/');
      let input = $('#email');
      input.addValue('j'.repeat(maxLenght));
      let actual = input.getValue().length;
      input.clearValue();
      assert.equal(actual, maxLenght);
    })

    it('Max Characters + 1', function () {
      let input = $('#email');
      input.addValue('j'.repeat(maxLenght + 1));
      let actual = input.getValue().length;
      assert.equal(actual, maxLenght);
    })

  });

});
````
#### 9.4. Edit the configuration including `login.js` and updating `client.js`:
Open `wdio.conf.js` and update the `specs` array:
````
    specs: [
        './test/client.js',
        './test/login.js'
    ],
````
Now your code testing Client and Login suites.
More info regarding Webdriver I/O commands you can find here:
https://webdriver.io/docs/api.html

<a name="allure"></a>
## 10. Configuring Allure reporter:
#### 10.1. Configure reporter in `wdio.conf.js`:
Add the following code under `reporters: ['dot','spec','allure'],`:
````
    reporterOptions: {
        allure: {
            outputDir: 'allure-results'
        }
    },
````
#### 10.2. Install Allure Commandline globally:
````
npm i allure-commandline -g
````
#### 10.3. Create a script to generate and open a report:
Add the following script to `package.json`:
````
"report": "allure generate --clean && allure open"
````
#### 10.4. Create a script to clean `allure-results` folder before running a test:
Add the following script to `package.json`:
````
"clean": "rm -rf allure-results"
````
#### 10.5. Modify test script to include `clean` and `report` scripts:
Replace the test script in `package.json` by the following code:
````
"test": "npm run clean && wdio wdio.conf.js && npm run report"
````
Now your scripts should look like this:
````
"test": "npm run clean && wdio wdio.conf.js && npm run report",
"report": "allure generate --clean && allure open",
"clean": "rm -rf allure-results"
````
#### 10.6. Run `npm test` to try.
`allure-results` folder shoul be removed automatically before the test starts. Allure Report should appear once the testing finished. To kill the precess press `Ctrl+C`.

<a name="chai"></a>
## 11. Adding `chai` assertion library:
#### 11.1. Install `chai` module:
````
npm i chai
````
#### 11.2. Import new module into your files:
Replace the old assert import:
````
import assert from 'assert';
````
by new assert from chai:
````
import { assert } from 'chai';
````
Please make sure you replaced it in all the test files. Now you can use all the methods described here:
https://www.npmjs.com/package/chai


<a name="smoke"></a>
## 12. Adding Smoke suite:
#### 12.1. Go to `test` folder, create `smoke` folder, and open it:
````
cd test
mkdir smoke
cd smoke
````
#### 12.2. Create `smoke.js` file and open it:
````
touch smoke.js
open smoke.js
````
#### 12.3. Copy and paste the following code to the file:
````
import { assert } from 'chai';

describe('Login', function () {

  it('Works', function () {
    browser.url('/');
    $('#email').setValue('testreacttest@gmail.com');
    $('#pass').setValue('testTest');
    $('#login').click();
    let newBug = $('#new_bug');
    newBug.waitForDisplayed(5000);
    assert.isTrue(newBug.isDisplayed());
  })

});
````
#### 12.4. Create folder for regression testing:
Get back to `test` folder, create `reg` folder there, and move existing test files to it:
````
cd ..
mkdir reg
mv client.js reg/client.js
mv login.js reg/login.js
cd ..
````
#### 12.5. Update the configuration:
Open `wdio.conf.js` file and update the test specs including the new folder path:
````
specs: [
        './test/reg/client.js',
        './test/reg/login.js'
    ],
````
#### 12.6. Create smoke test configuration:
Copy and rename the existing Regression configuration (`wdio.conf.js`) to create a new configuration file (`smoke.conf.js`):
````
cp wdio.conf.js smoke.conf.js
````
#### 12.7. Update the configuration:
Open the new configuration file `smoke.conf.js` and provide a path to the smoke test:
````
specs: [
        './test/smoke/smoke.js'
    ],
````
#### 12.8. Create and run `smoke` script:
Open `package.json` and add `smoke` script:
````
"smoke": "npm run clean && wdio smoke.conf.js && npm run report"
````
Once done, run the test:
````
npm run smoke
````


<a name="git"></a>
## 13. Working with Git
#### 13.1. Create GitHub account:
https://github.com/join
#### 13.2. Once logged in create new repository:
https://github.com/new
Provide `Repository name` and click `Create repository`.
On the next page you have the instruction how to connect your local repo with the remote one.
#### 13.3. Initialize local git repo:
Get back to Terminal and type:
````
git init
````
#### 13.4. Create and configure `.gitignore` file:
This file is used to list all folders and files which should be ignored by Git.
````
touch .gitignore
open .gitignore
````
Add the following lines to the file:
````
node_modules
allure-results
allure-report
.git
.idea
````
#### 13.5. Add all files to Git and create first commit:
````
git add .
git commit -m "first commit"
````
#### 13.6. Add all files to Git and create first commit:
````
git add .
git commit -m "first commit"
````
#### 13.7. Connect your local git with remote GitHub repo:
Get the link from the page you get on GitHub:
````
git remote add origin {link}
````
#### 13.8. Push your local code to the remote repo:
````
git push -u origin master
````
#### 13.9. Some git commands to use:
1) List of branches:
````
git branch
````
2) Create branch:
````
git branch {name}
````
3) Delete branch:
````
git branch -D {name}
````
4) Switch to another branch:
````
git checkout {name}
````
5) Commiting changes:
````
git commit -m "commit message"
````
6) Pushing changes:
````
git push
````