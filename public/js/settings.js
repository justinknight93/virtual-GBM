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
  invertHead1: false,
  invertHead2: false,
  blurHeads: 5,
};

const save = () => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

const load = () => {
  const storedSettings = localStorage.getItem("settings");
  if (storedSettings) {
    settings = JSON.parse(storedSettings);
    document.querySelector("#par1Show").value = settings.par1Show;
    document.querySelector("#par2Show").value = settings.par2Show;
    document.querySelector("#blurPars").value = settings.blurPars;
    document.querySelector("#neonShow").value = settings.neonShow;
    document.querySelector("#neonText").value = settings.neonText;
    document.querySelector("#head1Show").value = settings.head1Show;
    document.querySelector("#head2Show").value = settings.head2Show;
    document.querySelector("#headXOffset").value = settings.headXOffset;
    document.querySelector("#headYOffset").value = settings.headYOffset;
    document.querySelector("#head1Invert").checked = settings.invertHead1;
    document.querySelector("#head2Invert").checked = settings.invertHead2;
    document.querySelector("#blurHeads").value = settings.blurHeads;
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

document.addEventListener("DOMContentLoaded", function (event) {
  load();
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    const settingsDialog = document.querySelector("#settings");
    settingsDialog.open = true;
  }
});
