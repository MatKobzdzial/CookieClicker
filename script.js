const cookie = document.querySelector(".btn");
const currentCookies = document.querySelector(".current-cookies");
const cps = document.querySelector(".cookie-counter-text");
const mainMsgText = document.querySelector(".main-msg-text");
const body = document.querySelector("body");
const upgrades = document.querySelector(".upgrades");

const cursor = {
  element: document.querySelector(".building-cursor"),
  counter: document.querySelector(".counter-cursor"),
  priceTag: document.querySelector(".price-tag-cursor"),
  counterVal: 0,
  price: 15,
  cookiesPM: 0.2,
};

const grandma = {
  element: document.querySelector(".building-grandma"),
  counter: document.querySelector(".counter-grandma"),
  priceTag: document.querySelector(".price-tag-grandma"),
  counterVal: 0,
  price: 100,
  cookiesPM: 1,
};

const factory = {
  element: document.querySelector(".building-factory"),
  counter: document.querySelector(".counter-factory"),
  priceTag: document.querySelector(".price-tag-factory"),
  counterVal: 0,
  price: 500,
  cookiesPM: 8,
};

const mine = {
  element: document.querySelector(".building-mine"),
  counter: document.querySelector(".counter-mine"),
  priceTag: document.querySelector(".price-tag-mine"),
  counterVal: 0,
  price: 2000,
  cookiesPM: 15,
};

const grannyUpgrades = [
  document.querySelector(".granny-1"),
  document.querySelector(".granny-2"),
  document.querySelector(".granny-3"),
  document.querySelector(".granny-4"),
];

const grannyCosts = [
  document.querySelector(".granny-1-cost"),
  document.querySelector(".granny-2-cost"),
  document.querySelector(".granny-3-cost"),
  document.querySelector(".granny-4-cost"),
];

const tooltips = [
  document.querySelector(".tooltip-1"),
  document.querySelector(".tooltip-2"),
  document.querySelector(".tooltip-3"),
  document.querySelector(".tooltip-4"),
];

const msgArr = [
  "Your cookies are not popular",
  "Your cookies are liked by your dog",
  "Your cookies are popular in your neighbourhood",
  "Your cookied are popular in your city",
  "Your cookies are popular in the country",
  "Everyone likes your cookies!",
];

let buildingsArr = [cursor, grandma, factory, mine];

let cpsValue = 0.0;
for (el of buildingsArr) {
  cpsValue += el.counterVal * el.cookiesPM;
}

let cookieCounter = 0;
let grandmapocalypse = false;

const upgradesEffects = [
  grandma.counterVal,
  0.2 * cpsValue,
  grandma.counterVal,
  cpsValue,
];

initialState = () => {
  buildingsArr.forEach((building) => {
    building.priceTag.textContent = building.price;
  });
};

initialState();

function refresh() {
  cps.textContent = `/second ${cpsValue.toFixed(1)}`;
  currentCookies.textContent = Math.floor(cookieCounter);

  for (building of buildingsArr) {
    if (cookieCounter < building.price) {
      building.element.classList.add("no-money");
    } else {
      building.element.classList.remove("no-money");
    }
  }

  for (grannyCost of grannyCosts) {
    if (cookieCounter < +grannyCost.textContent) {
      tooltips[grannyCosts.indexOf(grannyCost)].style.backgroundColor =
        "#d78989";
    } else {
      tooltips[grannyCosts.indexOf(grannyCost)].style.backgroundColor = "#eee";
    }
  }
}

const interval = setInterval(cookieCounterIncrement, 1000);

function cookieCounterIncrement() {
  cookieCounter += cpsValue;
  currentCookies.textContent = Math.floor(cookieCounter);

  if (cookieCounter >= 100_000) {
    mainMsgText.textContent = msgArr[5];
  } else if (cookieCounter >= 10_000) {
    mainMsgText.textContent = msgArr[4];
  } else if (cookieCounter >= 1_000) {
    mainMsgText.textContent = msgArr[3];
  } else if (cookieCounter >= 100) {
    mainMsgText.textContent = msgArr[2];
  } else if (cookieCounter >= 10) {
    mainMsgText.textContent = msgArr[1];
  }
  if (cookieCounter >= 10_000) {
    grandmapocalypse = true;
  }

  if (grandmapocalypse) {
    body.style.backgroundImage = `url("imgs/grandma-wallpaper.jpeg"`;
    upgrades.style.visibility = "visible";
  }

  refresh();
}

bigCookieClick = () => {
  cookieCounter++;
  currentCookies.textContent = Math.round(cookieCounter);

  refresh();
};

buildingEvent = (building) => {
  building.element.addEventListener("click", function () {
    if (cookieCounter - building.price >= 0) {
      cookieCounter -= building.price;
      cpsValue += building.cookiesPM;

      building.counterVal++;
      building.counter.textContent = building.counterVal;

      building.price *= 1.1;
      building.priceTag.textContent = Math.round(building.price);

      refresh();
    }
  });
};

grannyEvent = (grannyUpgrade) => {
  grannyUpgrade.addEventListener("click", function () {
    console.log(grannyUpgrades.indexOf(grannyUpgrade));
    cpsValue += upgradesEffects[grannyUpgrades.indexOf(grannyUpgrade)];
    grannyUpgrade.style.visibility = "hidden";
    refresh();
  });
};

grannyUpgrades.forEach((grannyUpgrade) => {
  grannyEvent(grannyUpgrade);
});

cookie.addEventListener("click", bigCookieClick);

buildingsArr.forEach((building) => {
  buildingEvent(building);
});

//TO DO
/*
-> ulepszenia starych bab
-> zmiana buttonu starych bab
*/
