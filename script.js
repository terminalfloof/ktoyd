/*
Personalize your experience!
*/
// Change the number to change the length of the serial code.
var lengthOfSerialCode = 10;
// Change the number to change the amount of strikes before bomb explodes.
var maxStrikes = 3;
// Change the number to change the time alloted
var time = 100;

// Don't mess with anything else after this.
var strikes = 0;
var consonants = 'BCDFGHJKLMNPQRSTVWXYZ'.split("");
var vowels = "AEIOU".split("")
var serialCode = []
var hasAVowel = false;
var lastNumberOdd = false;
var strikesDisplay = document.createElement("h1")
strikesDisplay.id = "strikesDisplay";
document.body.appendChild(strikesDisplay)
var timeDisplay = document.createElement("h2")
timeDisplay.id = "timer"
timeDisplay.innerText = time;
document.body.appendChild(timeDisplay)



for (var i = 0; i < lengthOfSerialCode; i++) {
  if (Math.round(Math.random()) === 1) {
    if (Math.round(Math.random()) === 1) {
      var toAdd = Math.round(Math.random() * vowels.length - 1)
      if (toAdd < 0) {
        toAdd = 0;
        console.log("negative changed to 0 on below letter generation")
      }
      console.log("vowel")
      console.log(toAdd)
      console.log(vowels[toAdd])
      serialCode.push(vowels[toAdd])
      hasAVowel = true;
    }
    else {
      var toAdd = Math.round(Math.random() * consonants.length - 1)
      if (toAdd < 0) {
        toAdd = 0;
        console.log("negative changed to 0 on below letter generation")
      }
      console.log("consonant")
      console.log(toAdd)
      console.log(consonants[toAdd])
      serialCode.push(consonants[toAdd])
    }
  }
  else {
    serialCode.push(Math.round(Math.random() * 9))
  }
}

if (isNaN(serialCode[lengthOfSerialCode - 1])) {
  lastNumberOdd = false;
} else if (serialCode[lengthOfSerialCode - 1] % 2 === 0) {
  lastNumberOdd = false;
} else {
  lastNumberOdd = true;
}
console.log("lastNumberOdd: " + lastNumberOdd)
console.log("hasAVowel: " + hasAVowel)
console.log(serialCode.join(""))

var wires = [];
var numberOfWires = Math.round(Math.random() * 3) + 3
console.log(numberOfWires)

var serialCodeDisplay = document.createElement("h3");
serialCodeDisplay.innerText = serialCode.join("");
serialCodeDisplay.id = "serialCode";
document.body.appendChild(serialCodeDisplay);


for (var i = 0; i < numberOfWires; i++) {
  var wireColor = Math.round(Math.random() * 4);
  switch (wireColor) {
    case 0:
      wireColor = "black";
      break;
    case 1:
      wireColor = "red";
      break;
    case 2:
      wireColor = "yellow";
      break;
    case 3:
      wireColor = "blue";
      break;
    case 4:
      wireColor = "white";
      break;
  }
  console.log("wire " + (i + 1))
  console.log(wireColor)
  var wire = document.createElement("button");
  wire.classList.add("wire");
  wire.classList.add(wireColor);
  wire.wireNumber = i + 1;
  wire.id = i + 1;
  wire.onclick = function () {
    if (this.wireNumber === defuse()) {
      console.log("Wires correct.")
      for (var j = 0; j<wires.length; j++) {
        wires[j].parentNode.removeChild(wires[j])
      }
      console.log("3-   ")
    }
    else {
      console.log("Wires incorrect.")
      strikes++;
      strikesDisplay.innerText = "X ".repeat(strikes);
      if (strikes > maxStrikes - 1) {
        fail();
      }
    }
  }
  wires.push(wire);
  wire.color = wireColor;
  document.body.appendChild(wire);
}

var numberOfBlackWires = 0;
var numberOfRedWires = 0;
var numberOfYellowWires = 0;
var numberOfBlueWires = 0;
var numberOfWhiteWires = 0;

for (var i = 0; i < wires.length; i++) {
  switch (wires[i].color) {
    case "black":
      numberOfBlackWires++;
      break;
    case "red":
      numberOfRedWires++;
      break;
    case "yellow":
      numberOfYellowWires++;
      break;
    case "blue":
      numberOfBlueWires++;
      break;
    case "white":
      numberOfWhiteWires++;
      break;
  }
}

function checkForWires(color, instance, logConsole) {
  var instanceNum = 0;
  var checkFor;
  var lastWireMatch = "";
  var instanceType = typeof instance;
  var logToConsole = logConsole || false;
  if (logToConsole) {
    console.log(instanceType);
  }
  for (var i = 0; i < wires.length; i++) {
    if (instanceType === "number") {
      if (logToConsole) {
        console.log(`Looking for ${color}. Checking against ${wires[i].color}`)
      }
      if (wires[i].color === color) {
        instanceNum++;
        if (instance === instanceNum) {
          if (logToConsole) {
            console.log(`Match found.`)
            return i;
          }
        }
      }
    }
    else if (instanceType === "string") {
      if (instance === "last") {
        if (logToConsole) {
          console.log(`Looking for ${color}. Checking against ${wires[i].color}`)
        }
        if (wires[i].color === color) {
          lastWireMatch = i;
          if (logToConsole) {
            console.log("Match found.")
          }
        }
      }
    }
    else {
      if (logToConsole) {
        console.log(`Looking for ${color}. Checking against ${wires[i].color}`)
      }
      if (wires[i].color === color) {
        if (logToConsole) {
          console.log("Match found.");
        }
        return i;
      }
    }
  }
  if (instanceType === "string" && instance === "last") {
    if (!instanceType) {
      console.log("No matches found.")
      return;
    }
    else {
      return lastWireMatch;
    }
  }
  if (logToConsole) {
    console.log("End.")
  }
}

function defuse() {
  var wireToCut = 0;
  switch (wires.length) {
    case 3:
      if (numberOfRedWires === 0) {
        wireToCut = 2;
      }
      else if (wires[2].color === "white") {
        wireToCut = 3;
      }
      else if (numberOfBlueWires > 1) {
        wireToCut = checkForWires("blue", "last")
      }
      else {
        wireToCut = 3;
      }
      return wireToCut;
      break;
    case 4:
      if (numberOfRedWires > 1 && lastNumberOdd) {
        wireToCut = checkForWires("red", "last")
      }
      else if (wires[3].color === "yellow" && numberOfRedWires === 0) {
        wireToCut = 1;
      }
      else if (numberOfBlueWires === 1) {
        wireToCut = 1;
      }
      else if (numberOfYellowWires > 1) {
        wireToCut = 4;
      }
      else {
        wireToCut = 2;
      }
      return wireToCut;
      break;
    case 5:
      if (wires[4].color = "black" && lastNumberOdd) {
        wireToCut = 4;
      }
      else if (numberOfRedWires === 1 && numberOfYellowWires > 1) {
        wireToCut = 1;
      }
      else if (numberOfBlackWires === 0) {
        wireToCut = 2;
      }
      else {
        wireToCut = 1;
      }
      return wireToCut;
      break;
    case 6:
      if (numberOfYellowWires === 0 && lastNumberOdd) {
        wireToCut = 3;
      }
      else if (numberOfYellowWires === 1 && numberOfWhiteWires > 1) {
        wireToCut = 4;
      }
      else if (numberOfRedWires === 0) {
        wireToCut = 6;
      }
      else {
        wireToCut = 4;
      }
      return wireToCut;
      break;
  }
}

setInterval(function() {
  time--;
  timeDisplay.innerText = time;
  if (timeDisplay === 0) {
    fail();
  }
}, 1000)

function fail() {
  console.log("Failed")
}