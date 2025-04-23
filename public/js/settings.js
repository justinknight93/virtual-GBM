let settings = {
  par1Show: true,
  par2Show: true,
  blurPars: 5,
  neonShow: true,
  neonText: "ZombiePixel",
  head1Show: true,
  head2Show: true,
  headXOffset: 0,
  headYOffset: 0,
  headMoveScale: 1,
  invertHead1: false,
  invertHead2: false,
  blurHeads: 5,
  derby1Show: true,
  derby2Show: true,
  blurDerbys: 5,
};

const save = () => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

const load = () => {
  const storedSettings = localStorage.getItem("settings");
  if (storedSettings) {
    const newSettings = JSON.parse(storedSettings);
    // If the stored settings are up to date
    if (
      Object.keys(newSettings).every((key) => {
        return Object.keys(settings).includes(key);
      })
    ) {
      console.log("loaded settings");
      settings = { ...newSettings };
    } else {
      console.log("settings mismatch");
      save();
    }
    document.querySelector("#par1Show").checked = settings.par1Show;
    document.querySelector("#par2Show").checked = settings.par2Show;
    document.querySelector("#blurPars").value = settings.blurPars;
    document.querySelector("#neonShow").checked = settings.neonShow;
    document.querySelector("#neonText").value = settings.neonText;
    document.querySelector("#head1Show").checked = settings.head1Show;
    document.querySelector("#head2Show").checked = settings.head2Show;
    document.querySelector("#headXOffset").value = settings.headXOffset;
    document.querySelector("#headYOffset").value = settings.headYOffset;
    document.querySelector("#headMoveScale").value = settings.headMoveScale;
    document.querySelector("#head1Invert").checked = settings.invertHead1;
    document.querySelector("#head2Invert").checked = settings.invertHead2;
    document.querySelector("#blurHeads").value = settings.blurHeads;
    document.querySelector("#derby1Show").checked = settings.derby1Show;
    document.querySelector("#derby1Show").checked = settings.derby2Show;
    document.querySelector("#blurDerbys").value = settings.blurDerbys;
  }
};

const handlePar1Show = (e) => {
  settings.par1Show = e.target.checked;
  save();
};

const handlePar2Show = (e) => {
  settings.par2Show = e.target.checked;
  save();
};

const handleNeonShow = (e) => {
  settings.neonShow = e.target.checked;
  save();
};

const handleNeonText = (e) => {
  settings.neonText = e.target.value;
  save();
};

const handleHead1Show = (e) => {
  settings.head1Show = e.target.checked;
  save();
};

const handleHead2Show = (e) => {
  settings.head2Show = e.target.checked;
  save();
};

const handleHeadXOffsetChange = (e) => {
  settings.headXOffset = parseInt(e.target.value);
  save();
};

const handleHeadYOffsetChange = (e) => {
  settings.headYOffset = parseInt(e.target.value);
  save();
};

const handleHeadMoveScaleChange = (e) => {
  settings.headMoveScale = parseFloat(e.target.value);
  save();
};

const handleHead1Invert = (e) => {
  settings.invertHead1 = e.target.checked;
  save();
};

const handleHead2Invert = (e) => {
  settings.invertHead2 = e.target.checked;
  save();
};

const handleBlurParsChange = (e) => {
  settings.blurPars = parseInt(e.target.value);
  save();
};

const handleBlurHeadsChange = (e) => {
  settings.blurHeads = parseInt(e.target.value);
  save();
};

const handleDerby1Show = (e) => {
  settings.derby1Show = e.target.checked;
  save();
};

const handleDerby2Show = (e) => {
  settings.derby2Show = e.target.checked;
  save();
};

const handleBlurDerbysChange = (e) => {
  settings.blurDerbys = parseInt(e.target.value);
  save();
};

document.addEventListener("DOMContentLoaded", function (event) {
  load();
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    const settingsDialog = document.querySelector("#settings");
    settingsDialog.open = true;
  }
});

document.addEventListener("mousedown", () => {
  if (document.fullscreenElement) {
    handleFullscreen();
  }
});

let wakeLock = null;

const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request("screen");
    wakeLock.addEventListener("release", () => {
      console.log("Wake Lock was released");
    });
    console.log("Wake Lock is active");
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};

const releaseWakeLock = async () => {
  if (!wakeLock) {
    return;
  }
  try {
    await wakeLock.release();
    wakeLock = null;
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};

const handleFullscreen = () => {
  const elem = document.documentElement;

  if (!document.fullscreenElement) {
    // Enter fullscreen
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    requestWakeLock();
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    releaseWakeLock();
  }
};
