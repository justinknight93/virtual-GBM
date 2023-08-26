let settings = {
    headXOffset: 0,
    headYOffset: 0,
    invertHead1: false,
    invertHead2: false,
    blur: 20
}

const save = () => {
    localStorage.setItem("settings", JSON.stringify(settings))
}

const load = () => {
    const storedSettings = localStorage.getItem("settings")
    if (storedSettings) {
        settings = JSON.parse(storedSettings)
        document.querySelector("#headXOffset").value = settings.headXOffset;
        document.querySelector("#headYOffset").value = settings.headYOffset;
        document.querySelector("#head1Invert").checked = settings.invertHead1;
        document.querySelector("#head2Invert").checked = settings.invertHead2;
        document.querySelector("#blurAmount").value = settings.blur;
        const container = document.querySelector(".container");
        container.style.filter = `blur(${settings.blur}px)`;
    }
}

const handleHeadXOffsetChange = (e) => {
    settings.headXOffset = parseInt(e.target.value);
    save();
}

const handleHeadYOffsetChange = (e) => {
    settings.headYOffset = parseInt(e.target.value);
    save();
}

const handleHead1Invert = (e) => {
    settings.invertHead1 = e.target.checked;
    save();
}

const handleHead2Invert = (e) => {
    settings.invertHead2 = e.target.checked;
    save();
}

const handleBlurChange = (e) => {
    settings.blur =  parseInt(e.target.value);
    const container = document.querySelector(".container");
    container.style.filter = `blur(${settings.blur}px)`;
    save();
}


document.addEventListener("DOMContentLoaded", function(event) {
    load();
});