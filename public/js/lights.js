
let currentDMX = null;
const fixtures = {
    par1: { id: "par1", grab: false, x: 0, y: 0, size: 300, red: 0, blue: 0, green: 0, uv: 0, rbgMod: 0, strobeSpeed: 0, strobe: true, strobeTimer: 0 },
    par2: { id: "par2", grab: false, x: 0, y: 0, size: 300, red: 0, blue: 0, green: 0, uv: 0, rbgMod: 0, strobeSpeed: 0, strobe: true, strobeTimer: 0 },
    head1: { id: "head1", childId: "headLight1", grab: false, x: 0, y: 0, size: 100, color: 0, colors: ["#ffffff", "#59adf6", "#ffb480", "#ff6961", "#08cad1", "#f8f38d", "#42d6a4", "#c780e8"], pan: 0, tilt: 0, dimmer: 0, gobo:0, gobos: ['1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif']},
    head2: { id: "head2", childId: "headLight2", grab: false, x: 0, y: 0, size: 100, color: 0, colors: ["#ffffff", "#59adf6", "#ffb480", "#ff6961", "#08cad1", "#f8f38d", "#42d6a4", "#c780e8"], pan: 0, tilt: 0, dimmer: 0, gobo:0, gobos: ['1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif']}
}
const screenHeight = screen.height;
    const screenWidth = screen.width;
    const middleH = screenHeight / 2;
    const middleW = screenWidth / 2;
const moveToFirstPositions = () => {
    fixtures.par1.x = middleW - 200;
    fixtures.par1.y = middleH;
    updatePlacement(document.querySelector(`#${fixtures.par1.id}`), fixtures.par1);
    fixtures.par2.x = middleW + 200;
    fixtures.par2.y = middleH;
    updatePlacement(document.querySelector(`#${fixtures.par2.id}`), fixtures.par2);
    fixtures.head1.x = middleW - 400;
    fixtures.head1.y = middleH;
    updatePlacement(document.querySelector(`#${fixtures.head1.id}`), fixtures.head1);
    fixtures.head2.x = middleW + 400;
    fixtures.head2.y = middleH;
    updatePlacement(document.querySelector(`#${fixtures.head2.id}`), fixtures.head2);
}

const movableMouseDown = (e) => {
    if (!Object.keys(fixtures).some(k => fixtures[k].grab)) {
        fixtures[e.target.id].grab = true;
        e.target.style.zIndex = 10;
    }
};

const movableMouseUp = (e) => {
    fixtures[e.target.id].grab = false;
    e.target.style.zIndex = 0;
};

const movableMouseMove = (e) => {
    if (fixtures[e.target.id].grab == true) {
        fixtures[e.target.id].x = e.clientX;
        fixtures[e.target.id].y = e.clientY;

        updatePlacement(e.target, fixtures[e.target.id]);
    }
};

const movableMouseScroll = (e) => {
    let newSize = fixtures[e.target.id].size - e.deltaY
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
        case (parChan5 < 128):
            fixtures.par1.rbgMod = (currentDMX[4] / 127) * 100 + 25;
            break;

        default:
            break;
    }

    document.querySelector('#par1').style.backgroundColor = `rgb(${fixtures.par1.red}, ${fixtures.par1.green}, ${fixtures.par1.blue})`;
    document.querySelector('#par1').style.opacity = `${fixtures.par1.rbgMod}%`;

    // Get and parse par2
    fixtures.par2.red = currentDMX[0];
    fixtures.par2.green = currentDMX[1];
    fixtures.par2.blue = currentDMX[2];
    parChan5 = currentDMX[4];
    switch (true) {
        case (parChan5 < 128):
            fixtures.par2.rbgMod = (parChan5 / 127) * 100 + 25;
            break;
        case (parChan5 > 127 && parChan5 < 240):
            if ((parChan5 - 128) == 0) {
                fixtures.par2.strobeSpeed = 0;
            } else {
                fixtures.par2.strobeSpeed = ((parChan5 - 128) / 111) * 100;
                fixtures.par2.strobeTimer = 100 - strobeSpeed;
            }
            break;

        default:
            break;
    }

    document.querySelector('#par2').style.backgroundColor = `rgb(${fixtures.par2.red}, ${fixtures.par2.green}, ${fixtures.par2.blue})`;
    document.querySelector('#par2').style.opacity = `${fixtures.par2.rbgMod}%`;

    // Get and parse head1
    fixtures.head1.pan = (currentDMX[23] / 255) * 100;
    fixtures.head1.tilt = (currentDMX[24] / 255) * 100;
    fixtures.head1.dimmer = (currentDMX[25] / 255) * 100;
    switch (true) {
        case (currentDMX[27] > 223):
            fixtures.head1.color = 7;
            break;
        case (currentDMX[27] > 191):
            fixtures.head1.color = 6;
            break;
        case (currentDMX[27] > 159):
            fixtures.head1.color = 5;
            break;
        case (currentDMX[27] > 127):
            fixtures.head1.color = 4;
            break;
        case (currentDMX[27] > 95):
            fixtures.head1.color = 3;
            break;
        case (currentDMX[27] > 63):
            fixtures.head1.color = 2;
            break;
        case (currentDMX[27] > 31):
            fixtures.head1.color = 1;
            break;
        default:
            fixtures.head1.color = 0;
            break;
    }
    switch (true) {
        case (currentDMX[28] > 223):
            fixtures.head1.gobo = 7;
            break;
        case (currentDMX[28] > 191):
            fixtures.head1.gobo = 6;
            break;
        case (currentDMX[28] > 159):
            fixtures.head1.gobo = 5;
            break;
        case (currentDMX[28] > 127):
            fixtures.head1.gobo = 4;
            break;
        case (currentDMX[28] > 95):
            fixtures.head1.gobo = 3;
            break;
        case (currentDMX[28] > 63):
            fixtures.head1.gobo = 2;
            break;
        case (currentDMX[28] > 31):
            fixtures.head1.gobo = 1;
            break;
        default:
            fixtures.head1.gobo = 0;
            break;
    }

    document.querySelector('#headLight1').style.top = `${Math.sin(((mod(fixtures.head1.tilt + settings.headYOffset,100) / 100) * (2 * Math.PI))) * middleH}px`;
    if (settings.invertHead1) {
        document.querySelector('#headLight1').style.left = 'unset';
        document.querySelector('#headLight1').style.right = `${Math.sin(((mod(fixtures.head1.pan + settings.headXOffset,100) / 100) * (2 * Math.PI))) * middleW}px`;
    }else{
        document.querySelector('#headLight1').style.right = 'unset';
        document.querySelector('#headLight1').style.left = `${Math.sin(((mod(fixtures.head1.pan + settings.headXOffset,100) / 100) * (2 * Math.PI))) * middleW}px`;
    }
    
    document.querySelector('#headLight1').style.opacity = `${fixtures.head1.dimmer}%`;
    document.querySelector('#headLight1').style.backgroundImage = `url('gobos/${fixtures.head1.gobos[fixtures.head1.gobo]}')`
    document.querySelector('#headLight1').style.backgroundColor = fixtures.head1.colors[fixtures.head1.color];

    // Get and parse head2
    fixtures.head2.pan = (currentDMX[23] / 255) * 100;
    fixtures.head2.tilt = (currentDMX[24] / 255) * 100;
    fixtures.head2.dimmer = (currentDMX[25] / 255) * 100;

    switch (true) {
        case (currentDMX[33] > 223):
            fixtures.head2.color = 7;
            break;
        case (currentDMX[33] > 191):
            fixtures.head2.color = 6;
            break;
        case (currentDMX[33] > 159):
            fixtures.head2.color = 5;
            break;
        case (currentDMX[33] > 127):
            fixtures.head2.color = 4;
            break;
        case (currentDMX[33] > 95):
            fixtures.head2.color = 3;
            break;
        case (currentDMX[33] > 63):
            fixtures.head2.color = 2;
            break;
        case (currentDMX[33] > 31):
            fixtures.head2.color = 1;
            break;
        default:
            fixtures.head2.color = 0;
            break;
    }
    console.log(currentDMX[34])
    switch (true) {
        case (currentDMX[34] > 223):
            fixtures.head2.gobo = 7;
            break;
        case (currentDMX[34] > 191):
            fixtures.head2.gobo = 6;
            break;
        case (currentDMX[34] > 159):
            fixtures.head2.gobo = 5;
            break;
        case (currentDMX[34] > 127):
            fixtures.head2.gobo = 4;
            break;
        case (currentDMX[34] > 95):
            fixtures.head2.gobo = 3;
            break;
        case (currentDMX[34] > 63):
            fixtures.head2.gobo = 2;
            break;
        case (currentDMX[34] > 31):
            fixtures.head2.gobo = 1;
            break;
        default:
            fixtures.head2.gobo = 0;
            break;
    }

    document.querySelector('#headLight2').style.top = `${Math.sin(((mod(fixtures.head2.tilt + settings.headYOffset,100) / 100) * (2 * Math.PI))) * middleH}px`;
    if (settings.invertHead2) {
        document.querySelector('#headLight2').style.left = 'unset';
        document.querySelector('#headLight2').style.right = `${Math.sin(((mod(fixtures.head2.pan + settings.headXOffset,100) / 100) * (2 * Math.PI))) * middleW}px`;
    }else{
        document.querySelector('#headLight2').style.right = 'unset';
        document.querySelector('#headLight2').style.left = `${Math.sin(((mod(fixtures.head2.pan + settings.headXOffset,100) / 100) * (2 * Math.PI))) * middleW}px`;
    }
    
    document.querySelector('#headLight2').style.opacity = `${fixtures.head2.dimmer}%`;
    document.querySelector('#headLight2').style.backgroundImage = `url('gobos/${fixtures.head2.gobos[fixtures.head2.gobo]}')`
    document.querySelector('#headLight2').style.backgroundColor = fixtures.head2.colors[fixtures.head2.color];
}

updatePlacement = (elm, data) => {
    elm.style.width = data.size;
    elm.style.height = data.size;
    if (elm.children?.length) {
        elm.children[0].style.width = data.size;
        elm.children[0].style.height = data.size;
    }
    elm.style.top = data.y - (data.size / 2);
    elm.style.left = data.x - (data.size / 2);
}
document.querySelectorAll(".moveable").forEach(elm => elm.addEventListener("mouseup", movableMouseUp));
document.querySelectorAll(".moveable").forEach(elm => elm.addEventListener("mousemove", movableMouseMove));
document.querySelectorAll(".moveable").forEach(elm => elm.addEventListener("mousedown", movableMouseDown));
document.querySelectorAll(".moveable").forEach(elm => elm.addEventListener("wheel", movableMouseScroll));
moveToFirstPositions();