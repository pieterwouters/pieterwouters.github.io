const testkader = document.getElementById("testkader");
let currentNootNaam = "";

const noteNamesNL = {

    28: "mi", 29: "fa", 31: "sol", 33: "la", 35: "si",
    36: "do", 38: "re", 40: "mi", 41: "fa", 43: "sol",
    45: "la", 47: "si", 48: "do", 50: "re", 52: "mi",
    53: "fa", 55: "sol", 57: "la", 59: "si", 60: "do"
};

const availableImages = [
    28, 29, 31, 33, 35,
    36, 38, 40, 41, 43, 45, 47,
    48, 50, 52, 53, 55, 57, 59,
    60
];

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startTest() {
    testkader.innerHTML = "";
	testkader.style.backgroundColor = "white";
	
    shuffle(availableImages);
    const nootNummer = availableImages[0];
    currentNootNaam = noteNamesNL[nootNummer];

    const randomNoot = document.createElement("img");
    randomNoot.className = "random-noot-single";
    randomNoot.src = "noten/fa/" + nootNummer + ".png";

    testkader.appendChild(randomNoot);
}

document.querySelectorAll(".wit, .zwart").forEach(key => {

    key.addEventListener("pointerdown", function () {

        const clickedNaam = this.getAttribute("data-noot");
        if (clickedNaam === currentNootNaam) {
            this.style.backgroundColor = "green";
			    setTimeout(() => {
					startTest();
				}, 500);
        } else {
            this.style.backgroundColor = "red";
        }
    });

    key.addEventListener("pointerup", function () {
        if (this.classList.contains("wit")) {
            this.style.backgroundColor = "white";
        } else {
            this.style.backgroundColor = "black";
        }
    });

});