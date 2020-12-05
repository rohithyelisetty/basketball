var toggleSwitch = 1;
var sessionShots = 0;
var sessionMakes = 0;
var sessionPercent = 0;
var totalShots = 0;
var makes = 0;
var shotPercent = 0;
var sessions = 0;
var hoopX = 200;
var hoopY = 30;
var sessionLayupMakes = 0;
var sessionLayupShots = 0;
var layupDistMax = 62;
var layupMakes = 0;
var layupShots = 0;
var layupPercent = 0;
var sessionMidMakes = 0;
var sessionMidShots = 0;
var midDistMax = 160;
var midDistMin = 63;
var midMakes = 0;
var midShots = 0;
var midPercent = 0;
var sessionDeepMakes = 0;
var sessionDeepShots = 0;
var deepDistMin = 161;
var deepMakes = 0;
var deepShots = 0;
var deepPercent = 0;
var storage = window.localStorage;
var pastSessions = document.getElementById("session");
if (storage.getItem("pastSessions") !== null) {
    pastSessions.innerHTML = storage.getItem("pastSessions");
}
if (storage.getItem("sessions") !== null) {
    sessions = storage.getItem("sessions");
}

function mouseOnClick(event) {
    var x = event.clientX - 2;
    var y = event.clientY - 16;
    console.log(x + ", " + y);
    if (toggleSwitch === 0) {
        addShot("x", "miss", x, y);
        checkDist(x, y, false);
    } else {
        addShot("o", "make", x, y);
        makes++;
        sessionMakes++;
        checkDist(x, y, true);
    }
    totalShots++;
    sessionShots++;
    shotPercent = ((makes / totalShots) * 100).toFixed(0);
    sessionPercent = ((sessionMakes / sessionShots) * 100).toFixed(0);
    document.getElementById("FG").innerHTML = "FG: " + makes + "/" +
        totalShots + " - " + shotPercent + "%";
    document.getElementById("OverallFG").innerHTML = "FG: " + sessionMakes + "/" +
        sessionShots + " - " + sessionPercent + "%";
}

function toggle() {
    if (toggleSwitch === 1) {
        toggleSwitch = 0;
    } else {
        toggleSwitch = 1;
    }
}

function session() {
    document.getElementById("sessions").style.height = (window.innerHeight * 0.35).toString() + "px";
    sessions++;
    var sessionName = document.createElement("H2");
    sessionName.innerHTML = "Session " + sessions;
    var sessionPercent = document.createElement("P");
    sessionPercent.innerHTML = "FG: " + makes + "/" +
        totalShots + " - " + shotPercent + "%" + "<br>" + "Layup: " + layupMakes + "/" +
        layupShots + " - " + layupPercent + "%" + "<br>" +
        "Midrange: " + midMakes + "/" + midShots + " - " +
        midPercent + "%" + "<br>" + "Deep: " + deepMakes + "/" +
        deepShots + " - " + deepPercent + "%";
    document.getElementById("sessions").prepend(sessionPercent);
    document.getElementById("sessions").prepend(sessionName);
    totalShots = 0;
    makes = 0;
    shotPercent = 0;
    layupMakes = 0;
    layupShots = 0;
    layupPercent = 0;
    midMakes = 0;
    midShots = 0;
    midPercent = 0;
    deepMakes = 0;
    deepShots = 0;
    deepPercent = 0;
    document.getElementById("FG").innerHTML = "FG: 0/0 - 0%";
    document.getElementById("Layup").innerHTML = "Layup: 0/0 - 0%";
    document.getElementById("Midrange").innerHTML = "Midrange: 0/0 - 0%";
    document.getElementById("Deep").innerHTML = "Deep: 0/0 - 0%";
    document.getElementById("ShotChart").innerHTML =
        '<button><img src="ShotChart.png" class="ShotChart"></button>';
    storage.setItem("pastSessions", pastSessions.innerHTML);
    storage.setItem("sessions", sessions);
}

function shot() {
    document.getElementById("shotChart").style.display = "block";
    document.getElementById("session").style.display = "none";
}

function sessionChange() {
    document.getElementById("shotChart").style.display = "none";
    document.getElementById("session").style.display = "block";
}

function clearSessions() {
    document.getElementById("sessions").innerHTML = "";
    document.getElementById("FG").innerHTML = "FG: 0/0 - 0%";
    document.getElementById("Layup").innerHTML = "Layup: 0/0 - 0%";
    document.getElementById("Midrange").innerHTML = "Midrange: 0/0 - 0%";
    document.getElementById("Deep").innerHTML = "Deep: 0/0 - 0%";
    document.getElementById("ShotChart").innerHTML =
        '<button><img src="ShotChart.png" class="ShotChart"></button>';
    document.getElementById("overall").innerHTML = '<h2>All-time Stats</h2>' +
        '<h4 id="OverallFG">FG: 0/0 - 0%</h4>' +
        '<h4 id="OverallLayup">Layup: 0/0 - 0%</h4>' +
        '<h4 id="OverallMidrange">Midrange: 0/0 - 0%</h4>' +
        '<h4 id="OverallDeep">Deep: 0/0 - 0%</h4>';
    storage.clear();
    sessions = 0;
    sessionShots = 0;
    sessionMakes = 0;
    totalShots = 0;
    makes = 0;
    shotPercent = 0;
    layupMakes = 0;
    layupShots = 0;
    layupPercent = 0;
    sessionLayupMakes = 0;
    sessionLayupShots = 0;
    midMakes = 0;
    midShots = 0;
    midPercent = 0;
    sessionMidMakes = 0;
    sessionMidShots = 0;
    deepMakes = 0;
    deepShots = 0;
    deepPercent = 0;
    sessionDeepMakes = 0;
    sessionDeepShots = 0;
}

function addShot(shotStatus, css, x, y) {
    var shotChart = document.getElementById("ShotChart");
    var shot = document.createElement("P");
    shot.innerHTML = shotStatus;
    shot.classList.add(css);
    shot.style.position = "absolute";
    shot.style.top = y.toString() + "px";
    shot.style.left = x.toString() + "px";
    shotChart.appendChild(shot);
}

function distCalc(x, y) {
    return (Math.sqrt(Math.pow((hoopX - x), 2) + Math.pow((hoopY - y), 2))).toFixed(0);
}

function checkDist(x, y, make) {
    var distance = distCalc(x, y);
    if (distance <= layupDistMax) {
        layupShots++;
        sessionLayupShots++;
        if (make) {
            layupMakes++;
            sessionLayupMakes++;
        }
        layupPercent = ((layupMakes / layupShots) * 100).toFixed(0);
        sessionLayupPercent = ((sessionLayupMakes / sessionLayupShots) * 100).toFixed(0);
        document.getElementById("Layup").innerHTML = "Layup: " + layupMakes + "/" +
            layupShots + " - " + layupPercent + "%";
        document.getElementById("OverallLayup").innerHTML = "Layup: " + sessionLayupMakes + "/" +
            sessionLayupShots + " - " + sessionLayupPercent + "%";
    } else if (midDistMin <= distance && distance <= midDistMax) {
        midShots++;
        sessionMidShots++;
        if (make) {
            midMakes++;
            sessionMidMakes++;
        }
        midPercent = ((midMakes / midShots) * 100).toFixed(0);
        sessionMidPercent = ((sessionMidMakes / sessionMidShots) * 100).toFixed(0);
        document.getElementById("Midrange").innerHTML = "Midrange: " + midMakes + "/" +
            midShots + " - " + midPercent + "%";
        document.getElementById("OverallMidrange").innerHTML = "Midrange: " + sessionMidMakes + "/" +
            sessionMidShots + " - " + sessionMidPercent + "%";
    } else {
        deepShots++;
        sessionDeepShots++;
        if (make) {
            deepMakes++;
            sessionDeepMakes++;
        }
        deepPercent = ((deepMakes / deepShots) * 100).toFixed(0);
        sessionDeepPercent = ((sessionDeepMakes / sessionDeepShots) * 100).toFixed(0);
        document.getElementById("Deep").innerHTML = "Deep: " + deepMakes + "/" +
            deepShots + " - " + deepPercent + "%";
        document.getElementById("OverallDeep").innerHTML = "Deep: " + sessionDeepMakes + "/" +
            sessionDeepShots + " - " + sessionDeepPercent + "%";
    }
}