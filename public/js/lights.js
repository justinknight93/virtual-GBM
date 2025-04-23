let currentDMX = null;

const fixtures = {
  par1: {
    id: "par1",
    grab: false,
    x: 0,
    y: 0,
    size: 300,
    red: 0,
    blue: 0,
    green: 0,
    uv: 0,
    rbgMod: 0,
    strobeSpeed: 0,
  },
  par2: {
    id: "par2",
    grab: false,
    x: 0,
    y: 0,
    size: 300,
    red: 0,
    blue: 0,
    green: 0,
    uv: 0,
    rbgMod: 0,
    strobeSpeed: 0,
  },
  head1: {
    id: "head1",
    childId: "headLight1",
    grab: false,
    x: 0,
    y: 0,
    size: 300,
    color: 0,
    colors: [
      "#ffffff",
      "#59adf6",
      "#ffb480",
      "#ff6961",
      "#08cad1",
      "#f8f38d",
      "#42d6a4",
      "#c780e8",
    ],
    pan: 0,
    tilt: 0,
    dimmer: 0,
    strobeSpeed: 0,
    gobo: 0,
    gobos: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      "7.png",
      "8.png",
    ],
  },
  head2: {
    id: "head2",
    childId: "headLight2",
    grab: false,
    x: 0,
    y: 0,
    size: 300,
    color: 0,
    colors: [
      "#ffffff",
      "#59adf6",
      "#ffb480",
      "#ff6961",
      "#08cad1",
      "#f8f38d",
      "#42d6a4",
      "#c780e8",
    ],
    pan: 0,
    tilt: 0,
    dimmer: 0,
    strobeSpeed: 0,
    gobo: 0,
    gobos: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      "7.png",
      "8.png",
    ],
  },
  derby1: {
    id: "derby1",
    redChildId: "derbyLight1Red",
    greenChildId: "derbyLight1Green",
    blueChildId: "derbyLight1Blue",
    grab: false,
    x: 0,
    y: 0,
    size: 300,
    redLightOn: true,
    greenLightOn: true,
    blueLightOn: true,
    rotation: 0,
    strobeSpeed: 0,
  },
  derby2: {
    id: "derby2",
    redChildId: "derbyLight2Red",
    greenChildId: "derbyLight2Green",
    blueChildId: "derbyLight2Blue",
    grab: false,
    x: 0,
    y: 0,
    size: 300,
    redLightOn: true,
    greenLightOn: true,
    blueLightOn: true,
    rotation: 0,
    strobeSpeed: 0,
  },
  neon: {
    id: "neon",
    text: "ZombiePixel",
    grab: false,
    x: 0,
    y: 0,
    size: 64,
    red: 0,
    blue: 0,
    green: 0,
    uv: 0,
    rbgMod: 0,
  },
};

const screenHeight = screen.height;
const screenWidth = screen.width;
const middleH = screenHeight / 2;
const middleW = screenWidth / 2;

const moveToFirstPositions = () => {
  fixtures.par1.x = middleW - 200;
  fixtures.par1.y = middleH;
  updatePlacement(
    document.querySelector(`#${fixtures.par1.id}`),
    fixtures.par1
  );
  fixtures.par2.x = middleW + 200;
  fixtures.par2.y = middleH;
  updatePlacement(
    document.querySelector(`#${fixtures.par2.id}`),
    fixtures.par2
  );
  fixtures.neon.x = middleW;
  fixtures.neon.y = middleH;
  updatePlacement(
    document.querySelector(`#${fixtures.neon.id}`),
    fixtures.neon
  );
  fixtures.head1.x = middleW - 400;
  fixtures.head1.y = middleH;
  updatePlacement(
    document.querySelector(`#${fixtures.head1.id}`),
    fixtures.head1
  );
  fixtures.head2.x = middleW + 400;
  fixtures.head2.y = middleH;
  updatePlacement(
    document.querySelector(`#${fixtures.head2.id}`),
    fixtures.head2
  );
  fixtures.derby1.x = middleW - 600;
  fixtures.derby1.y = middleH;
  updatePlacement(
    document.querySelector(`#${fixtures.derby1.id}`),
    fixtures.derby1
  );
  fixtures.derby2.x = middleW + 600;
  fixtures.derby2.y = middleH;
  updatePlacement(
    document.querySelector(`#${fixtures.derby2.id}`),
    fixtures.derby2
  );
};

const movableMouseDown = (e) => {
  if (!Object.keys(fixtures).some((k) => fixtures[k].grab)) {
    fixtures[e.target.id].grab = true;
    e.target.style.zIndex = 10;
  }
};

const movableMouseUp = (e) => {
  fixtures[e.target.id].grab = false;
  e.target.style.zIndex = 0;
};

const globalMouseUp = () => {
  Object.keys(fixtures).forEach((fixtureID) => {
    fixtures[fixtureID].grab = false;
  });
};

const movableMouseMove = (e) => {
  if (fixtures[e.target.id].grab == true) {
    fixtures[e.target.id].x = e.clientX;
    fixtures[e.target.id].y = e.clientY;

    updatePlacement(e.target, fixtures[e.target.id]);
  }
};

const movableMouseScroll = (e) => {
  let newSize = fixtures[e.target.id].size - e.deltaY / 10;

  if (newSize > 50) {
    fixtures[e.target.id].size = newSize;
  }

  updatePlacement(e.target, fixtures[e.target.id]);
};

const mod = (n, m) => {
  var remain = n % m;
  return Math.floor(remain >= 0 ? remain : remain + m);
};

const updatePar = (fixtureName, startChannel, showSetting) => {
  // Get and parse par1
  fixtures[fixtureName].red = currentDMX[startChannel];
  fixtures[fixtureName].green = currentDMX[startChannel + 1];
  fixtures[fixtureName].blue = currentDMX[startChannel + 2];
  let rbgmodChannel = currentDMX[startChannel + 4];
  switch (true) {
    case rbgmodChannel < 128:
      fixtures[fixtureName].rbgMod =
        (currentDMX[startChannel + 4] / 127) * 100 + 25;
      break;
    case rbgmodChannel > 127 && rbgmodChannel < 240:
      // Strobe logic
      break;
    default:
      break;
  }

  const parElement = document.querySelector(`#${fixtures[fixtureName].id}`);

  if (settings[showSetting]) {
    parElement.style.visibility = "visible";
  } else {
    parElement.style.visibility = "hidden";
  }

  parElement.style.backgroundColor = `rgb(${fixtures[fixtureName].red}, ${fixtures[fixtureName].green}, ${fixtures[fixtureName].blue})`;
  parElement.style.opacity = `${fixtures[fixtureName].rbgMod}%`;
  parElement.style.filter = `blur(${settings.blurPars}px)`;
};

const updateNeon = () => {
  // Use par data to update neon
  fixtures.neon.red = currentDMX[0];
  fixtures.neon.green = currentDMX[1];
  fixtures.neon.blue = currentDMX[2];

  parChan5 = currentDMX[4];
  switch (true) {
    case parChan5 < 128:
      fixtures.neon.rbgMod = (currentDMX[4] / 127) * 100 + 25;
      break;

    default:
      break;
  }

  if (settings.neonShow) {
    document.querySelector("#neon").style.visibility = "visible";
  } else {
    document.querySelector("#neon").style.visibility = "hidden";
  }

  document.querySelector(
    "#neon"
  ).style.color = `color-mix(in srgb, rgb(${fixtures.neon.red}, ${fixtures.neon.green}, ${fixtures.neon.blue}), #fff 50%)`;
  document.querySelector("#neon").style.opacity = `${
    fixtures.neon.rbgMod * 2
  }%`;
  document.querySelector("#neon").style.textShadow = `rgb(${
    fixtures.neon.red
  }, ${fixtures.neon.green}, ${fixtures.neon.blue}) 0 0 ${
    fixtures.neon.size / 3
  }px`;
  document.querySelector("#neon").innerText = settings.neonText;
};

const updateMovingHead = (
  fixtureName,
  startChannel,
  showSetting,
  invertSetting
) => {
  // Get and parse head1
  fixtures[fixtureName].pan = (currentDMX[startChannel] / 255) * 100;
  fixtures[fixtureName].tilt = (currentDMX[startChannel + 1] / 255) * 100;
  fixtures[fixtureName].dimmer = (currentDMX[startChannel + 2] / 255) * 100;
  fixtures[fixtureName].strobeSpeed =
    (currentDMX[startChannel + 3] / 255) * 100;
  switch (true) {
    case currentDMX[startChannel + 4] > 223:
      fixtures[fixtureName].color = 7;
      break;
    case currentDMX[startChannel + 4] > 191:
      fixtures[fixtureName].color = 6;
      break;
    case currentDMX[startChannel + 4] > 159:
      fixtures[fixtureName].color = 5;
      break;
    case currentDMX[startChannel + 4] > 127:
      fixtures[fixtureName].color = 4;
      break;
    case currentDMX[startChannel + 4] > 95:
      fixtures[fixtureName].color = 3;
      break;
    case currentDMX[startChannel + 4] > 63:
      fixtures[fixtureName].color = 2;
      break;
    case currentDMX[startChannel + 4] > 31:
      fixtures[fixtureName].color = 1;
      break;
    default:
      fixtures[fixtureName].color = 0;
      break;
  }
  switch (true) {
    case currentDMX[startChannel + 5] > 223:
      fixtures[fixtureName].gobo = 7;
      break;
    case currentDMX[startChannel + 5] > 191:
      fixtures[fixtureName].gobo = 6;
      break;
    case currentDMX[startChannel + 5] > 159:
      fixtures[fixtureName].gobo = 5;
      break;
    case currentDMX[startChannel + 5] > 127:
      fixtures[fixtureName].gobo = 4;
      break;
    case currentDMX[startChannel + 5] > 95:
      fixtures[fixtureName].gobo = 3;
      break;
    case currentDMX[startChannel + 5] > 63:
      fixtures[fixtureName].gobo = 2;
      break;
    case currentDMX[startChannel + 5] > 31:
      fixtures[fixtureName].gobo = 1;
      break;
    default:
      fixtures[fixtureName].gobo = 0;
      break;
  }

  const mappedHeadX =
    (((fixtures[fixtureName].pan / 100) * 2 - 1) * middleW +
      settings.headXOffset) *
    settings.headMoveScale;
  const mappedHeadY =
    (((fixtures[fixtureName].tilt / 100) * 2 - 1) * middleH +
      settings.headYOffset) *
    settings.headMoveScale;

  const headElement = document.querySelector(`#${fixtures[fixtureName].id}`);
  const headLightElement = document.querySelector(
    `#${fixtures[fixtureName].childId}`
  );

  headLightElement.style.bottom = `${mappedHeadY}px`;
  if (settings[invertSetting]) {
    headLightElement.style.left = "unset";
    headLightElement.style.right = `${mappedHeadX}px`;
  } else {
    headLightElement.style.right = "unset";
    headLightElement.style.left = `${mappedHeadX}px`;
  }

  if (settings[showSetting]) {
    headElement.style.visibility = "visible";
    headLightElement.style.visibility = "visible";
  } else {
    headElement.style.visibility = "hidden";
    headLightElement.style.visibility = "hidden";
  }

  headLightElement.style.opacity = `${fixtures[fixtureName].dimmer}%`;
  headLightElement.style.backgroundImage = `url('gobos/${
    fixtures[fixtureName].gobos[fixtures[fixtureName].gobo]
  }')`;
  headLightElement.style.backgroundColor =
    fixtures[fixtureName].colors[fixtures[fixtureName].color];
  if (fixtures[fixtureName].strobeSpeed > 0) {
    headLightElement.style.animation = `strobe ${
      1 / (fixtures[fixtureName].strobeSpeed / 10)
    }s infinite`;
  } else {
    headLightElement.style.animation = "unset";
  }

  headLightElement.style.filter = `blur(${settings.blurHeads}px)`;
};

const updateDerby = (fixtureName, startChannel, showSetting, invertSetting) => {
  // Get and parse derby1
  const controlCode = currentDMX[startChannel];
  fixtures[fixtureName].strobeSpeed =
    (currentDMX[startChannel + 1] / 255) * 100;
  const rotationCode = currentDMX[startChannel + 2];

  switch (true) {
    case controlCode > 199:
      // Automatic, not sure what this should do yet.
      break;
    case controlCode > 174:
      // Red + green + blue
      fixtures[fixtureName].redLightOn = true;
      fixtures[fixtureName].greenLightOn = true;
      fixtures[fixtureName].blueLightOn = true;
      break;
    case controlCode > 149:
      // Green + blue
      fixtures[fixtureName].redLightOn = false;
      fixtures[fixtureName].greenLightOn = true;
      fixtures[fixtureName].blueLightOn = true;
      break;
    case controlCode > 124:
      // Red + blue
      fixtures[fixtureName].redLightOn = true;
      fixtures[fixtureName].greenLightOn = false;
      fixtures[fixtureName].blueLightOn = true;
      break;
    case controlCode > 99:
      // Red + green
      fixtures[fixtureName].redLightOn = true;
      fixtures[fixtureName].greenLightOn = true;
      fixtures[fixtureName].blueLightOn = false;
      break;
    case controlCode > 74:
      // Blue
      fixtures[fixtureName].redLightOn = false;
      fixtures[fixtureName].greenLightOn = false;
      fixtures[fixtureName].blueLightOn = true;
      break;
    case controlCode > 49:
      // Green
      fixtures[fixtureName].redLightOn = false;
      fixtures[fixtureName].greenLightOn = true;
      fixtures[fixtureName].blueLightOn = false;
      break;
    case controlCode > 24:
      // Red
      fixtures[fixtureName].redLightOn = true;
      fixtures[fixtureName].greenLightOn = false;
      fixtures[fixtureName].blueLightOn = false;
      break;
    default:
      // Blackout
      fixtures[fixtureName].redLightOn = false;
      fixtures[fixtureName].greenLightOn = false;
      fixtures[fixtureName].blueLightOn = false;
      break;
  }

  const derbyElement = document.querySelector(`#${fixtures[fixtureName].id}`);
  const derbyRedLightElement = document.querySelector(
    `#${fixtures[fixtureName].redChildId}`
  );
  const derbyGreenLightElement = document.querySelector(
    `#${fixtures[fixtureName].greenChildId}`
  );
  const derbyBlueLightElement = document.querySelector(
    `#${fixtures[fixtureName].blueChildId}`
  );

  derbyRedLightElement.style.visibility = fixtures.derby1.redLightOn
    ? "visible"
    : "hidden";
  derbyGreenLightElement.style.visibility = fixtures.derby1.greenLightOn
    ? "visible"
    : "hidden";
  derbyBlueLightElement.style.visibility = fixtures.derby1.blueLightOn
    ? "visible"
    : "hidden";

  let rotationAmount = 0;
  switch (true) {
    case rotationCode > 133:
      // 134 - 255 Rotate counter-clockwise, slow to fast
      const rotaionNorm1 = (rotationCode - 134) / (255 - 134); // normalize to 0–1
      rotationAmount = -1 - rotaionNorm1 * 5; // goes from -1 to -5
      break;
    case rotationCode > 127:
      rotationAmount = 0;
      // Unused
      break;
    case rotationCode > 4:
      // 5–127 → +1 to +10
      const rotaionNorm2 = (rotationCode - 5) / (127 - 5); // normalize to 0–1
      rotationAmount = 1 + rotaionNorm2 * 5; // goes from 1 to 5
      break;
    default:
      rotationAmount = 0;
      // Unused
      break;
  }
  fixtures[fixtureName].rotation += rotationAmount;
  derbyRedLightElement.style.transform = `rotate(${fixtures[fixtureName].rotation}deg)`;
  derbyGreenLightElement.style.transform = `rotate(${
    fixtures[fixtureName].rotation + 45
  }deg)`;
  derbyBlueLightElement.style.transform = `rotate(${
    fixtures[fixtureName].rotation + 90
  }deg)`;

  if (fixtures[fixtureName].strobeSpeed > 3.5) {
    // derby strobe starts at +9 for some reason
    derbyElement.style.animation = `strobe ${
      1 / (fixtures.derby1.strobeSpeed / 10)
    }s infinite`;
  } else {
    derbyElement.style.animation = "unset";
  }

  if (settings[showSetting]) {
    derbyElement.style.display = "unset";
  } else {
    derbyElement.style.display = "none";
  }

  derbyElement.style.filter = `blur(${settings.blurDerbys}px)`;
};

const updateLights = (dmx) => {
  currentDMX = dmx;

  updatePar("par1", 0, "par1Show");
  updatePar("par2", 5, "par2Show");

  updateNeon();

  updateMovingHead("head1", 23, "head1Show", "invertHead1");
  updateMovingHead("head2", 29, "head2Show", "invertHead2");

  updateDerby("derby1", 10, "derby1Show");
  updateDerby("derby2", 13, "derby2Show");
};

updatePlacement = (elm, data) => {
  if (elm.id === "neon") {
    // size and move neon
    elm.style.fontSize = data.size;
  } else {
    // size and move lights
    elm.style.width = data.size;
    elm.style.height = data.size;
    if (elm.children?.length > 0) {
      Array.from(elm.children).forEach((child) => {
        child.style.width = data.size;
        child.style.height = data.size;
      });
    }
  }

  elm.style.top = data.y - elm.offsetHeight / 2;
  elm.style.left = data.x - elm.offsetWidth / 2;
};
document
  .querySelectorAll(".moveable")
  .forEach((elm) => elm.addEventListener("mouseup", movableMouseUp));
document
  .querySelectorAll(".moveable")
  .forEach((elm) => elm.addEventListener("mousemove", movableMouseMove));
document
  .querySelectorAll(".moveable")
  .forEach((elm) => elm.addEventListener("mousedown", movableMouseDown));
document
  .querySelectorAll(".moveable")
  .forEach((elm) => elm.addEventListener("wheel", movableMouseScroll));
document.addEventListener("mouseup", globalMouseUp);
moveToFirstPositions();
