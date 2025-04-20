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

var mod = function (n, m) {
  var remain = n % m;
  return Math.floor(remain >= 0 ? remain : remain + m);
};

const updateLights = (dmx) => {
  currentDMX = dmx;

  // Get and parse par1
  fixtures.par1.red = currentDMX[0];
  fixtures.par1.green = currentDMX[1];
  fixtures.par1.blue = currentDMX[2];
  let parChan5 = currentDMX[4];
  switch (true) {
    case parChan5 < 128:
      fixtures.par1.rbgMod = (currentDMX[4] / 127) * 100 + 25;
      break;
    case parChan5 > 127 && parChan5 < 240:
      // Strobe logic
      break;
    default:
      break;
  }

  if (settings.par1Show) {
    document.querySelector("#par1").style.visibility = "visible";
  } else {
    document.querySelector("#par1").style.visibility = "hidden";
  }

  document.querySelector(
    "#par1"
  ).style.backgroundColor = `rgb(${fixtures.par1.red}, ${fixtures.par1.green}, ${fixtures.par1.blue})`;
  document.querySelector("#par1").style.opacity = `${fixtures.par1.rbgMod}%`;

  // Get and parse par2
  fixtures.par2.red = currentDMX[0];
  fixtures.par2.green = currentDMX[1];
  fixtures.par2.blue = currentDMX[2];
  parChan5 = currentDMX[4];
  switch (true) {
    case parChan5 < 128:
      fixtures.par2.rbgMod = (parChan5 / 127) * 100 + 25;
      break;
    case parChan5 > 127 && parChan5 < 240:
      // Strobe logic
      break;
    default:
      break;
  }

  if (settings.par2Show) {
    document.querySelector("#par2").style.visibility = "visible";
  } else {
    document.querySelector("#par2").style.visibility = "hidden";
  }

  document.querySelector(
    "#par2"
  ).style.backgroundColor = `rgb(${fixtures.par2.red}, ${fixtures.par2.green}, ${fixtures.par2.blue})`;
  document.querySelector("#par2").style.opacity = `${fixtures.par2.rbgMod}%`;

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

  // Get and parse head1
  fixtures.head1.pan = (currentDMX[23] / 255) * 100;
  fixtures.head1.tilt = (currentDMX[24] / 255) * 100;
  fixtures.head1.dimmer = (currentDMX[25] / 255) * 100;
  fixtures.head1.strobeSpeed = (currentDMX[26] / 255) * 100;
  switch (true) {
    case currentDMX[27] > 223:
      fixtures.head1.color = 7;
      break;
    case currentDMX[27] > 191:
      fixtures.head1.color = 6;
      break;
    case currentDMX[27] > 159:
      fixtures.head1.color = 5;
      break;
    case currentDMX[27] > 127:
      fixtures.head1.color = 4;
      break;
    case currentDMX[27] > 95:
      fixtures.head1.color = 3;
      break;
    case currentDMX[27] > 63:
      fixtures.head1.color = 2;
      break;
    case currentDMX[27] > 31:
      fixtures.head1.color = 1;
      break;
    default:
      fixtures.head1.color = 0;
      break;
  }
  switch (true) {
    case currentDMX[28] > 223:
      fixtures.head1.gobo = 7;
      break;
    case currentDMX[28] > 191:
      fixtures.head1.gobo = 6;
      break;
    case currentDMX[28] > 159:
      fixtures.head1.gobo = 5;
      break;
    case currentDMX[28] > 127:
      fixtures.head1.gobo = 4;
      break;
    case currentDMX[28] > 95:
      fixtures.head1.gobo = 3;
      break;
    case currentDMX[28] > 63:
      fixtures.head1.gobo = 2;
      break;
    case currentDMX[28] > 31:
      fixtures.head1.gobo = 1;
      break;
    default:
      fixtures.head1.gobo = 0;
      break;
  }

  const mappedHead1X =
    (((fixtures.head1.pan / 100) * 2 - 1) * middleW + settings.headXOffset) *
    settings.headMoveScale;
  const mappedHead1Y =
    (((fixtures.head1.tilt / 100) * 2 - 1) * middleH + settings.headYOffset) *
    settings.headMoveScale;

  document.querySelector("#headLight1").style.bottom = `${mappedHead1Y}px`;
  if (settings.invertHead1) {
    document.querySelector("#headLight1").style.left = "unset";
    document.querySelector("#headLight1").style.right = `${mappedHead1X}px`;
  } else {
    document.querySelector("#headLight1").style.right = "unset";
    document.querySelector("#headLight1").style.left = `${mappedHead1X}px`;
  }

  if (settings.head1Show) {
    document.querySelector("#head1").style.visibility = "visible";
    document.querySelector("#headLight1").style.visibility = "visible";
  } else {
    document.querySelector("#head1").style.visibility = "hidden";
    document.querySelector("#headLight1").style.visibility = "hidden";
  }

  document.querySelector(
    "#headLight1"
  ).style.opacity = `${fixtures.head1.dimmer}%`;
  document.querySelector("#headLight1").style.backgroundImage = `url('gobos/${
    fixtures.head1.gobos[fixtures.head1.gobo]
  }')`;
  document.querySelector("#headLight1").style.backgroundColor =
    fixtures.head1.colors[fixtures.head1.color];
  if (fixtures.head1.strobeSpeed > 0) {
    document.querySelector("#headLight1").style.animation = `strobe ${
      1 / (fixtures.head1.strobeSpeed / 10)
    }s infinite`;
  } else {
    document.querySelector("#headLight1").style.animation = "unset";
  }

  // Get and parse head2
  fixtures.head2.pan = (currentDMX[29] / 255) * 100;
  fixtures.head2.tilt = (currentDMX[30] / 255) * 100;
  fixtures.head2.dimmer = (currentDMX[31] / 255) * 100;
  fixtures.head2.strobeSpeed = (currentDMX[32] / 255) * 100;

  switch (true) {
    case currentDMX[33] > 223:
      fixtures.head2.color = 7;
      break;
    case currentDMX[33] > 191:
      fixtures.head2.color = 6;
      break;
    case currentDMX[33] > 159:
      fixtures.head2.color = 5;
      break;
    case currentDMX[33] > 127:
      fixtures.head2.color = 4;
      break;
    case currentDMX[33] > 95:
      fixtures.head2.color = 3;
      break;
    case currentDMX[33] > 63:
      fixtures.head2.color = 2;
      break;
    case currentDMX[33] > 31:
      fixtures.head2.color = 1;
      break;
    default:
      fixtures.head2.color = 0;
      break;
  }

  switch (true) {
    case currentDMX[34] > 223:
      fixtures.head2.gobo = 7;
      break;
    case currentDMX[34] > 191:
      fixtures.head2.gobo = 6;
      break;
    case currentDMX[34] > 159:
      fixtures.head2.gobo = 5;
      break;
    case currentDMX[34] > 127:
      fixtures.head2.gobo = 4;
      break;
    case currentDMX[34] > 95:
      fixtures.head2.gobo = 3;
      break;
    case currentDMX[34] > 63:
      fixtures.head2.gobo = 2;
      break;
    case currentDMX[34] > 31:
      fixtures.head2.gobo = 1;
      break;
    default:
      fixtures.head2.gobo = 0;
      break;
  }

  const mappedHead2X =
    (((fixtures.head2.pan / 100) * 2 - 1) * middleW + settings.headXOffset) *
    settings.headMoveScale;
  const mappedHead2Y =
    (((fixtures.head2.tilt / 100) * 2 - 1) * middleH + settings.headYOffset) *
    settings.headMoveScale;

  document.querySelector("#headLight2").style.bottom = `${mappedHead2Y}px`;
  if (settings.invertHead2) {
    document.querySelector("#headLight2").style.left = "unset";
    document.querySelector("#headLight2").style.right = `${mappedHead2X}px`;
  } else {
    document.querySelector("#headLight2").style.right = "unset";
    document.querySelector("#headLight2").style.left = `${mappedHead2X}px`;
  }

  if (settings.head2Show) {
    document.querySelector("#head2").style.visibility = "visible";
    document.querySelector("#headLight2").style.visibility = "visible";
  } else {
    document.querySelector("#head2").style.visibility = "hidden";
    document.querySelector("#headLight2").style.visibility = "hidden";
  }

  document.querySelector(
    "#headLight2"
  ).style.opacity = `${fixtures.head2.dimmer}%`;
  document.querySelector("#headLight2").style.backgroundImage = `url('gobos/${
    fixtures.head2.gobos[fixtures.head2.gobo]
  }')`;
  document.querySelector("#headLight2").style.backgroundColor =
    fixtures.head2.colors[fixtures.head2.color];
  if (fixtures.head2.strobeSpeed > 0) {
    document.querySelector("#headLight2").style.animation = `strobe ${
      1 / (fixtures.head2.strobeSpeed / 10)
    }s infinite`;
  } else {
    document.querySelector("#headLight2").style.animation = "unset";
  }

  // Get and parse derby1
  const derby1ControlCode = currentDMX[10];
  fixtures.derby1.strobeSpeed = (currentDMX[11] / 255) * 100;
  const derby1RotationCode = currentDMX[12];

  switch (true) {
    case derby1ControlCode > 199:
      // Automatic, not sure what this should do yet.
      break;
    case derby1ControlCode > 174:
      // Red + green + blue
      fixtures.derby1.redLightOn = true;
      fixtures.derby1.greenLightOn = true;
      fixtures.derby1.blueLightOn = true;
      break;
    case derby1ControlCode > 149:
      // Green + blue
      fixtures.derby1.redLightOn = false;
      fixtures.derby1.greenLightOn = true;
      fixtures.derby1.blueLightOn = true;
      break;
    case derby1ControlCode > 124:
      // Red + blue
      fixtures.derby1.redLightOn = true;
      fixtures.derby1.greenLightOn = false;
      fixtures.derby1.blueLightOn = true;
      break;
    case derby1ControlCode > 99:
      // Red + green
      fixtures.derby1.redLightOn = true;
      fixtures.derby1.greenLightOn = true;
      fixtures.derby1.blueLightOn = false;
      break;
    case derby1ControlCode > 74:
      // Blue
      fixtures.derby1.redLightOn = false;
      fixtures.derby1.greenLightOn = false;
      fixtures.derby1.blueLightOn = true;
      break;
    case derby1ControlCode > 49:
      // Green
      fixtures.derby1.redLightOn = false;
      fixtures.derby1.greenLightOn = true;
      fixtures.derby1.blueLightOn = false;
      break;
    case derby1ControlCode > 24:
      // Red
      fixtures.derby1.redLightOn = true;
      fixtures.derby1.greenLightOn = false;
      fixtures.derby1.blueLightOn = false;
      break;
    default:
      // Blackout
      fixtures.derby1.redLightOn = false;
      fixtures.derby1.greenLightOn = false;
      fixtures.derby1.blueLightOn = false;
      break;
  }
  document.querySelector("#derbyLight1Red").style.visibility = fixtures.derby1
    .redLightOn
    ? "visible"
    : "hidden";
  document.querySelector("#derbyLight1Green").style.visibility = fixtures.derby1
    .greenLightOn
    ? "visible"
    : "hidden";
  document.querySelector("#derbyLight1Blue").style.visibility = fixtures.derby1
    .blueLightOn
    ? "visible"
    : "hidden";

  let rotationAmount1 = 0;
  switch (true) {
    case derby1RotationCode > 133:
      // 134 - 255 Rotate counter-clockwise, slow to fast
      const rotaionNorm1 = (derby1RotationCode - 134) / (255 - 134); // normalize to 0–1
      rotationAmount1 = -1 - rotaionNorm1 * 5; // goes from -1 to -5
      break;
    case derby1RotationCode > 127:
      rotationAmount1 = 0;
      // Unused
      break;
    case derby1RotationCode > 4:
      // 5–127 → +1 to +10
      const rotaionNorm2 = (derby1RotationCode - 5) / (127 - 5); // normalize to 0–1
      rotationAmount1 = 1 + rotaionNorm2 * 5; // goes from 1 to 5
      break;
    default:
      rotationAmount1 = 0;
      // Unused
      break;
  }
  fixtures.derby1.rotation += rotationAmount1;
  document.querySelector(
    "#derbyLight1Red"
  ).style.transform = `rotate(${fixtures.derby1.rotation}deg)`;
  document.querySelector("#derbyLight1Green").style.transform = `rotate(${
    fixtures.derby1.rotation + 45
  }deg)`;
  document.querySelector("#derbyLight1Blue").style.transform = `rotate(${
    fixtures.derby1.rotation + 90
  }deg)`;

  if (fixtures.derby1.strobeSpeed > 3.5) {
    // derby strobe starts at +9 for some reason
    document.querySelector("#derby1").style.animation = `strobe ${
      1 / (fixtures.derby1.strobeSpeed / 10)
    }s infinite`;
  } else {
    document.querySelector("#derby1").style.animation = "unset";
  }

  if (settings.derby1Show) {
    document.querySelector("#derby1").style.display = "unset";
  } else {
    document.querySelector("#derby1").style.display = "none";
  }

  // Get and parse derby2
  const derby2ControlCode = currentDMX[13];
  fixtures.derby2.strobeSpeed = (currentDMX[14] / 255) * 100;
  const derby2RotationCode = currentDMX[15];

  switch (true) {
    case derby2ControlCode > 199:
      // Automatic, not sure what this should do yet.
      break;
    case derby2ControlCode > 174:
      // Red + green + blue
      fixtures.derby2.redLightOn = true;
      fixtures.derby2.greenLightOn = true;
      fixtures.derby2.blueLightOn = true;
      break;
    case derby2ControlCode > 149:
      // Green + blue
      fixtures.derby2.redLightOn = false;
      fixtures.derby2.greenLightOn = true;
      fixtures.derby2.blueLightOn = true;
      break;
    case derby2ControlCode > 124:
      // Red + blue
      fixtures.derby2.redLightOn = true;
      fixtures.derby2.greenLightOn = false;
      fixtures.derby2.blueLightOn = true;
      break;
    case derby2ControlCode > 99:
      // Red + green
      fixtures.derby2.redLightOn = true;
      fixtures.derby2.greenLightOn = true;
      fixtures.derby2.blueLightOn = false;
      break;
    case derby2ControlCode > 74:
      // Blue
      fixtures.derby2.redLightOn = false;
      fixtures.derby2.greenLightOn = false;
      fixtures.derby2.blueLightOn = true;
      break;
    case derby2ControlCode > 49:
      // Green
      fixtures.derby2.redLightOn = false;
      fixtures.derby2.greenLightOn = true;
      fixtures.derby2.blueLightOn = false;
      break;
    case derby2ControlCode > 24:
      // Red
      fixtures.derby2.redLightOn = true;
      fixtures.derby2.greenLightOn = false;
      fixtures.derby2.blueLightOn = false;
      break;
    default:
      // Blackout
      fixtures.derby2.redLightOn = false;
      fixtures.derby2.greenLightOn = false;
      fixtures.derby2.blueLightOn = false;
      break;
  }
  document.querySelector("#derbyLight2Red").style.visibility = fixtures.derby2
    .redLightOn
    ? "visible"
    : "hidden";
  document.querySelector("#derbyLight2Green").style.visibility = fixtures.derby2
    .greenLightOn
    ? "visible"
    : "hidden";
  document.querySelector("#derbyLight2Blue").style.visibility = fixtures.derby2
    .blueLightOn
    ? "visible"
    : "hidden";

  let rotationAmount2 = 0;
  switch (true) {
    case derby2RotationCode > 133:
      // 134 - 255 Rotate counter-clockwise, slow to fast
      const rotaionNorm1 = (derby2RotationCode - 134) / (255 - 134); // normalize to 0–1
      rotationAmount2 = -1 - rotaionNorm1 * 5; // goes from -1 to -5
      break;
    case derby2RotationCode > 127:
      rotationAmount2 = 0;
      // Unused
      break;
    case derby2RotationCode > 4:
      // 5–127 → +1 to +10
      const rotaionNorm2 = (derby2RotationCode - 5) / (127 - 5); // normalize to 0–1
      rotationAmount2 = 1 + rotaionNorm2 * 5; // goes from 1 to 5
      break;
    default:
      rotationAmount2 = 0;
      // Unused
      break;
  }
  fixtures.derby2.rotation += rotationAmount2;
  document.querySelector(
    "#derbyLight2Red"
  ).style.transform = `rotate(${fixtures.derby2.rotation}deg)`;
  document.querySelector("#derbyLight2Green").style.transform = `rotate(${
    fixtures.derby2.rotation + 45
  }deg)`;
  document.querySelector("#derbyLight2Blue").style.transform = `rotate(${
    fixtures.derby2.rotation + 90
  }deg)`;

  if (fixtures.derby2.strobeSpeed > 3.5) {
    // derby strobe starts at +9 for some reason
    document.querySelector("#derby2").style.animation = `strobe ${
      1 / (fixtures.derby2.strobeSpeed / 10)
    }s infinite`;
  } else {
    document.querySelector("#derby2").style.animation = "unset";
  }

  if (settings.derby2Show) {
    document.querySelector("#derby2").style.display = "unset";
  } else {
    document.querySelector("#derby2").style.display = "none";
  }

  // apply blurs
  document.querySelector(
    "#headLight1"
  ).style.filter = `blur(${settings.blurHeads}px)`;
  document.querySelector(
    "#headLight2"
  ).style.filter = `blur(${settings.blurHeads}px)`;
  document.querySelector("#par1").style.filter = `blur(${settings.blurPars}px)`;
  document.querySelector("#par2").style.filter = `blur(${settings.blurPars}px)`;
  document.querySelector(
    "#derby1"
  ).style.filter = `blur(${settings.blurDerbys}px)`;
  document.querySelector(
    "#derby2"
  ).style.filter = `blur(${settings.blurDerbys}px)`;
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
