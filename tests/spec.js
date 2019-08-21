// spec.js

describe('angularjs homepage todo list', function() {
  var browser_width = 1024;
  var browser_height = 768;

  var value1 = 5;
  var value2 = 15;

  beforeEach(function() {
      browser.get('http://juliemr.github.io/protractor-demo/');
      browser.driver.manage().window().setSize(browser_width, browser_height);
  });

  it('Verify calculator page title', function() {
      expect(browser.getTitle()).toEqual('Super Calculator');
  });

  it ('Addition operation as default', function() {
      expect(element(by.model('operator')).$('option:checked').getText()).toEqual('+');
  });

  it('Verify addition function works', function() {
    executeAndValidateOperation(value1, value2, '+', value1 + value2);
  });

  it('Verify substraction function works', function() {
    executeAndValidateOperation(value1, value2, '-', value1 - value2);
  });

  it('Verify multiplication function works', function() {
    executeAndValidateOperation(value1, value2, '*', value1 * value2);
  });

  it('Verify division function works', function() {
    executeAndValidateOperation(value1, value2, '/', value1 / value2);
  });

  it('Validate result in history', function() {
    let operator = '+';
    let result = value1 + value2;

    executeAndValidateOperation(value1, value2, '+', result);

    expect(element(by.binding('result.first')).getText()).toEqual(value1.toString());
    expect(element(by.binding('result.operator')).getText()).toEqual(operator.toString());
    expect(element(by.binding('result.second')).getText()).toEqual(value2.toString());
    expect(element(by.binding('result.value')).getText()).toEqual(result.toString());
  });

  it('Rows per operations', function() {
    executeAndValidateOperation(value1, value2, '+', value1 + value2);
    executeAndValidateOperation(value1, value2, '-', value1 - value2);

    let historyRows = element.all(by.css('tr.ng-scope'));
    expect(historyRows.count()).toBe(2);
  });


  /*
    Function that runs the steps to make an operation and
    verifies its results according to given parameters
  */
  function executeAndValidateOperation(v1, v2, op, expected) {
    element(by.model('first')).sendKeys(v1);
    element(by.model('second')).sendKeys(v2);
    element(by.model('operator')).sendKeys(op);
    element(by.id('gobutton')).click();

    expect(element(by.binding('latest')).getText()).toEqual((expected).toString());
  }

});