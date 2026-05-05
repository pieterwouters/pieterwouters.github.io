const testkader = document.getElementById("testkader");
let currentNootNaam = "";
const imagesToShow = 10;
let notesShown = 0;
const startButton = document.getElementById("start");
let previousNote = 0;

const availableImages = [
	28, 29, 31, 33, 35,
    36, 38, 40, 41, 43, 45, 47,
    48, 50, 52, 53, 55, 57, 59,
    60, 62, 64, 65, 67, 69, 71,
    72, 74, 76, 77, 79, 81, 83,
    84, 86, 88, 89, 91, 93, 95,
    96, 98, 100, 101, 103, 105, 
	107, 108
    ];
	
const noteNamesNL = {
    28: "mi", 29: "fa", 31: "sol", 33: "la", 35: "si", 36: "do", 38: "re", 
	40: "mi", 41: "fa", 43: "sol", 45: "la", 47: "si",
    48: "do", 50: "re", 52: "mi", 53: "fa", 55: "sol", 57: "la", 59: "si",
    60: "do", 62: "re", 64: "mi", 65: "fa", 67: "sol", 69: "la", 71: "si",
    72: "do", 74: "re", 76: "mi", 77: "fa", 79: "sol", 81: "la", 83: "si",
    84: "do", 86: "re", 88: "mi", 89: "fa", 91: "sol", 93: "la", 95: "si",
    96: "do", 98: "re", 100: "mi", 101: "fa", 103: "sol", 105: "la", 107: "si",
    108: "do"
};

const selects = [
	document.getElementById("van"),
    document.getElementById("tot")
	]

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startTest() {
	notesShown = 0;
    startTimer();
    nextNote();
}

function nextNote() {
	
    testkader.innerHTML = "";
	testkader.style.backgroundColor = "white";
	
	if (notesShown < imagesToShow) {
	
	const clef = document.querySelector('input[name="sleutel"]:checked').value;
	const balk = document.createElement("img");
	balk.className = "staff-edge-single";
	if (clef === "sol-sleutel") {
		balk.src = "balk-L-test.png";
	} else {
		balk.src = "balk-L-test-fa.png";
	}
	
	testkader.appendChild(balk);
	
	const start = parseInt(document.getElementById("van").value);
	const end = parseInt(document.getElementById("tot").value);

	// filter notes based on range
	let filtered = availableImages.filter(n => n >= start && n <= end);

	// safety check (prevents crashes)
	if (filtered.length === 0) return;

	let nootNummer = filtered[Math.floor(Math.random() * filtered.length)];
	if (nootNummer === previousNote) {
	
	const index = filtered.indexOf(nootNummer);
	if (index > -1) { // only splice array when item is found
	filtered.splice(index, 1); // 2nd parameter means remove one item only
	}	
	nootNummer = filtered[Math.floor(Math.random() * filtered.length)];
	} else {
	}
	previousNote = nootNummer;

    currentNootNaam = noteNamesNL[nootNummer];

    const randomNoot = document.createElement("img");
    randomNoot.className = "random-noot-single";
	
	if (clef === "sol-sleutel") {
		randomNoot.src = "noten/sol/" + nootNummer +".png";
	} else {
		randomNoot.src = "noten/fa/" + nootNummer + ".png";
	}

    testkader.appendChild(randomNoot);
	notesShown++;
	} else {
		testkader.innerHTML = "";
		testkader.style.backgroundColor = "transparent";
		currentNootNaam = "";
		notesShown = 0;
		const button = document.createElement("button");
		button.id = "start";
		button.setAttribute("onclick", "startTest()");
		button.className = "start-test";
		testkader.appendChild(button);
		button.innerHTML = "Start";
		stopTimer();
		return;
	}
}

document.querySelectorAll(".wit, .zwart").forEach(key => {

    key.addEventListener("pointerdown", function () {

        const clickedNaam = this.getAttribute("data-noot");
        if (clickedNaam === currentNootNaam) {
            this.style.backgroundColor = "green";
			    setTimeout(() => {
					nextNote();
				}, 300);
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

function updateClefRange() {

	const clef = document.querySelector('input[name="sleutel"]:checked').value;

	// Set default ranges per clef
	if (clef === "sol-sleutel") {
		van.value = "60"; // C4
		tot.value = "76"; // E5
	}

	if (clef === "fa-sleutel") {
		van.value = "45"; // A2
		tot.value = "60"; // C4
	}

	selects.forEach(select => {

		Array.from(select.options).forEach(option => {
			const note = parseInt(option.value);
			let visible = true;

			// Treble clef
			if (clef === "sol-sleutel") {
				visible = note >= 48 && note <= 93;
			}

			// Bass clef
			if (clef === "fa-sleutel") {
				visible = note >= 28 && note <= 72;
			}

			option.hidden = !visible;
			option.disabled = !visible;
		});

		if (select.selectedOptions[0].hidden) {

			for (let option of select.options) {

				if (!option.hidden) {

					select.value = option.value;
					break;
				}
			}
		}
	});
}

updateClefRange();
