var blackScreenElement = document.getElementById('black-screen');
var mobileBlackScreenElement = document.getElementById('mobile-black-screen');
var tammyStick1 = document.getElementById('tammystick_1');
var fiveBags = document.getElementById('five-bags');
var fourBags = document.getElementById('four-bags');
var threebags = document.getElementById('three-bags');
var text1 = document.getElementById('text-msg-1');
var text2 = document.getElementById('text-msg-2');
var text3 = document.getElementById('text-msg-3');
var text4 = document.getElementById('text-msg-4');

/* Phase keeps track of # of (=) button clicks */
var phase = 0;
var doesBlackScreenHaveText = true;
var salaryTextPresent = false;

var zipCode;
var salary;
var married = false;
var amountTaxed;

function equalClicked(){
  var enteredText = blackScreenElement.innerHTML;
  // Verify the enteredText somehow.
  if(phase === 0){
    zipCode = enteredText;
    if( verifyZipIsOkay(zipCode) ){
      blackScreenElement.innerHTML = "Enter Your Salary";
    }else{
      blackScreenElement.innerHTML = "Enter a Valid Zipcode";
      doesBlackScreenHaveText = true;
      return;
    }
  }else if(phase === 1){
    salary = enteredText;
    blackScreenElement.innerHTML = 'Click the (=) button to proceed';
  }else if(phase === 2){
    clearBlackScreen;
    transitionToMarriageScreen();
  }
  animationRaise();
  doesBlackScreenHaveText = true;
  salaryTextPresent = true;
  console.log("Phase is currently", phase);
}

function mobileEqualClicked(){
  var enteredText = blackScreenElement.innerHTML;
  // Verify the enteredText somehow.
  if(phase === 0){
    zipCode = enteredText;
    if( verifyZipIsOkay(zipCode) ){
      mobileBlackScreenElement.innerHTML = "Enter Your Salary";
    }else{
      mobileBlackScreenElement.innerHTML = "Enter a Valid Zipcode";
      doesBlackScreenHaveText = true;
      return;
    }
  }else if(phase === 1){
    salary = enteredText;
    mobileBlackScreenElement.innerHTML = 'Click the (=) button to proceed';
  }else if(phase === 2){
    clearBlackScreen;
    transitionToMobileMarriageScreen();
  }
  phase++;
  doesBlackScreenHaveText = true;
  salaryTextPresent = true;
}

function clearTextOffScreen(){
  if (doesBlackScreenHaveText){
    blackScreenElement.innerHTML = "";
    mobileBlackScreenElement.innerHTML = "";
    doesBlackScreenHaveText = false;
  }
}
function buttonPress(num){
  clearTextOffScreen();
  blackScreenElement.innerHTML += num;
  mobileBlackScreenElement.innerHTML += num;
  console.log("Button Pressed");
}
function clearBlackScreen(){
  blackScreenElement.innerHTML = "";
  mobileBlackScreenElement.innerHTML = "";
}

/* This function raises Tammy & her Money Bags */
function animationRaise(){
  if(phase === 0){
    fiveBags.style.visibility = "visible";
    tammyStick1.style.transform = "translateY(-60px) rotate(-20deg)";
    fiveBags.style.transform = "translateY(-90px)";
    setTimeout(function(){
      fourBags.style.visibility = "visible";
      tammyStick1.style.transform = "translateY(-120px) rotate(-20deg)";
      fourBags.style.transform = "translateY(-204px)";
    }, 1000);
    animateTextBubbles();
    phase++;
  }else if(phase === 1){
    threebags.style.visibility = "visible";
    tammyStick1.style.transform = "translateY(-150px) rotate(-20deg)";
    threebags.style.transform = "translateY(-320px)";
    animateTextBubbles();
    phase++;
  }else if (phase === 2) {

    animateTextBubbles();
    phase++;
  }
}
function animateTextBubbles(){
  if(phase === 0){
    /* On 1st click of (=) button this triggers 1st 2 text-msgs */
    text1.style.width = "220px";
    setTimeout(function(){
      text1.style.width = "200px";
      //this one triggers the 2nd text
      setTimeout(function(){
        text2.style.width = "220px";
        setTimeout(function(){
          text2.style.width = "200px";
        }, 400);
      }, 700);
    }, 400);
  }else if (phase === 1) {
    /* On 2nd click of (=) button this triggers 2nd 2 text-msgs*/
    text3.style.width = "220px";
    setTimeout(function(){
      text3.style.width = "200px";
    }, 400);
    setTimeout(function(){
      text4.style.width = "85px";
        setTimeout(function(){
          text4.style.width = "75px";
        }, 400);
    }, 1000);
  }else if (phase === 2) {

  }
}
function transitionToMarriageScreen(){
  var calculatorSection = document.getElementById('calculator-page');
  calculatorSection.style.display = "none";
  var marriageSection = document.getElementById('marriage-page');
  marriageSection.style.display = "block";
}
function transitionToMobileMarriageScreen(){
  var mobileCalculator = document.getElementById('mobile-calculator');
  mobileCalculator.style.display = "none";
  var mobileMarriagePage = document.getElementById('mobile-marriage-page');
  mobileMarriagePage.style.display = "block";
}
function marriageAnswer(answer){
  // background-color: #EC4649 !important;
  // color: white !important;
  if(answer === 'married'){
    married = true;
    document.getElementById('married').classList.add('chosen');
    document.getElementById('single').classList.remove('chosen');

    document.getElementById('married-mobile').classList.add('chosen');
    document.getElementById('single-mobile').classList.remove('chosen');
  }else if(answer === 'single'){
    married = false;
    document.getElementById('single').classList.add('chosen');
    document.getElementById('married').classList.remove('chosen');

    document.getElementById('single-mobile').classList.add('chosen');
    document.getElementById('married-mobile').classList.remove('chosen');
  }
  console.log("marriage clicked");
}
function getResultsSection(){
  var marriageSection = document.getElementById('marriage-page');
  marriageSection.style.display = "none";
  var resultsSection = document.getElementById('results-section');
  resultsSection.style.display = 'block';
  var taxes = calculateAmountTaxed(salary, married);
  document.getElementById('tax-amount').innerHTML = taxes ;
}
function getMobileResultsSection(){
  var mobileMarriagePage = document.getElementById('mobile-marriage-page');
  mobileMarriagePage.style.display = 'none';
  var mobileResultsSection = document.getElementById('mobile-results-section');
  mobileResultsSection.style.display = 'block';
  var taxes = calculateAmountTaxed(salary, married);
  document.getElementById('tax-amount-mobile').innerHTML = taxes;
}
function submitResults(){
  console.log("Get Receipt button was clicked");
}
function verifyZipIsOkay(zipCode){
  var isOkay = zipCode.length === 5;
  console.log("isOkay", isOkay);
  var integerZipCode = Number(zipCode);
  /*
    This if-statement checks if it is a valid WI zipCode
    Will use it later. Let's just log results for now.
   */
  if( integerZipCode >= 53001 && integerZipCode <= 54990){
    console.log("It is a valid WI zip code");
  }else{
    console.log("It is not a valid WI zip code.");
  }
  return isOkay;
}
/*
  Used this site: https://www.bankrate.com/finance/taxes/state-taxes-wisconsin.aspx
  for tax brackets.
*/
function calculateAmountTaxed(enteredSalary, isMarried){
  var tammyTax;
  var intSalary = Number(enteredSalary)
  if(isMarried){
    if(intSalary <= 14980){
      tammyTax = intSalary * .04;
    }else if (intSalary <= 29960) {//over 14980
      var taxableAmount = (intSalary - 14980) * .0584;
      tammyTax = 599.2 + taxableAmount;
    }else if(intSalary < 100000){//over 29960
      var taxableAmount = (intSalary - 29960) * .0627;
      tammyTax = 1474.032 + taxableAmount;
    }else if(intSalary < 329810){ //over $100000
      var taxableAmount = (intSalary - 100000) * .0627;
      tammyTax = 5865.54  + taxableAmount;
    }else{ //over $329810
      var taxableAmount = (intSalary - 247350) * .0765;
      tammyTax = 20274.627  + taxableAmount;
    }
  }else{
    if(intSalary <= 11230){
        tammyTax = intSalary * .04;
    }else if (intSalary <= 22470) {
        var taxableAmount = (intSalary - 11230) * .0584;
        tammyTax = taxableAmount + 449.20;
    }else if(intSalary <= 100000){
        var taxableAmount = (intSalary - 22470 ) * .0627;
        tammyTax = taxableAmount + 1105.616;
    }else if(intSalary <= 247350){
        var taxableAmount = (intSalary - 100000) * .0627;
        tammyTax = taxableAmount + 5966.747;
    }else{
      var taxableAmount = (intSalary - 247350) * .0765;
      tammyTax = taxableAmount + 15205.592;
    }
  }
  return tammyTax.toFixed(2);
}
