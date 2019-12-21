import assert from 'assert';

describe('Client', function () { //define suite title by passing a string

    it('Get title', function () { //define test title by passing a string
      browser.url('/'); //open baseUrl + string passed in .url() function
      let title = browser.getTitle(); //get page title and assign it to the "title" variable
      browser.pause(2000); //just pause to visually see that something is happening on the page
      assert.equal(title, 'Intellectual Games Club'); //compare {title} (actual) and "Bug Tracker" (expected)
    })

});