const testkader = document.getElementById("testkader");
let currentNootNaam = "";
const imagesToShow = 10;
let notesShown = 0;
const startButton = document.getElementById("start");
let previousNote = 0;
let gemaakteFouten = 0;
let wijzigingsteken = "";
let fout = "";

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
    28:"mi", 29:"fa", 30:"fa-kruis", 31:"sol", 32:"sol-kruis", 33:"la", 34:"la-kruis", 35:"si",
    36:"do", 37:"do-kruis", 38:"re", 39:"re-kruis", 40:"mi", 41:"fa", 42:"fa-kruis", 43:"sol", 44:"sol-kruis", 45:"la", 46:"la-kruis", 47:"si",
    48:"do", 49:"do-kruis", 50:"re", 51:"re-kruis", 52:"mi", 53:"fa", 54:"fa-kruis", 55:"sol", 56:"sol-kruis", 57:"la", 58:"la-kruis", 59:"si",
    60:"do", 61:"do-kruis", 62:"re", 63:"re-kruis", 64:"mi", 65:"fa", 66:"fa-kruis", 67:"sol", 68:"sol-kruis", 69:"la", 70:"la-kruis", 71:"si",
    72:"do", 73:"do-kruis", 74:"re", 75:"re-kruis", 76:"mi", 77:"fa", 78:"fa-kruis", 79:"sol", 80:"sol-kruis", 81:"la", 82:"la-kruis", 83:"si",
    84:"do", 85:"do-kruis", 86:"re", 87:"re-kruis", 88:"mi", 89:"fa", 90:"fa-kruis", 91:"sol", 92:"sol-kruis", 93:"la", 94:"la-kruis", 95:"si",
    96:"do", 97:"do-kruis", 98:"re", 99:"re-kruis", 100:"mi", 101:"fa", 102:"fa-kruis", 103:"sol", 104:"sol-kruis", 105:"la", 106:"la-kruis", 107:"si",
    108:"do"
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
	gemaakteFouten = 0;
    startTimer();
    nextNote();
	document.getElementById("sol-sleutel").disabled = true;
	document.getElementById("fa-sleutel").disabled = true;
	document.getElementById("van").disabled = true;
	document.getElementById("tot").disabled = true;
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
	
	/* WIJZIGINGSTEKENS 
	
	const kruis = document.createElement("img");
	kruis.src = "kruis.png";
	kruis.className = "accidental";
	testkader.appendChild(kruis);
	wijzigingsteken = "kruis";
	
	*/
	
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
	};
	previousNote = nootNummer;

    currentNootNaam = noteNamesNL[nootNummer];
	if (wijzigingsteken === "kruis") {
		currentNootNaam = noteNamesNL[nootNummer + 1];
	};

    const randomNoot = document.createElement("img");
    randomNoot.className = "random-noot-single";
	
	if (clef === "sol-sleutel") {
		randomNoot.src = "noten/sol/" + nootNummer +".png";
	} else {
		randomNoot.src = "noten/fa/" + nootNummer + ".png";
	}

    testkader.appendChild(randomNoot);
	notesShown++;
	} else { reset();
	}
}
function reset() {
	testkader.innerHTML = "";
	testkader.style.backgroundColor = "#46347A";
	currentNootNaam = "";
	notesShown = 0;
	
	document.getElementById("sol-sleutel").disabled = false;
	document.getElementById("fa-sleutel").disabled = false;
	document.getElementById("van").disabled = false;
	document.getElementById("tot").disabled = false;
	
	const min = parseInt(document.getElementById("min").innerHTML);
	const sec = parseInt(document.getElementById("sec").innerHTML);
	const count = document.getElementById("count").innerHTML;

	// remove leading zeros automatically with parseInt

	let timeString = "";

	// only show minutes if > 0
	if (min > 0) {
		timeString += `${min} min, `;
	}

	// seconds always shown (no leading zero now)
	timeString += `${sec} seconden en `;

	// keep hundredths padded (you probably want this)
	timeString += `${count} honderdsten`;	
	
	if (gemaakteFouten === 1) {
		fout = " fout."
	} else { 
	fout = " fouten."
	};
	const resultaat = document.createElement("div");
	resultaat.id = "testresultaat";
	resultaat.innerHTML =
	"Je haalde een tijd van " + timeString + "!" + 
	"<br> <br>" +
	"Je maakte " + gemaakteFouten + fout;
	testkader.appendChild(resultaat);
	
	
	const button = document.createElement("button");
	button.id = "start";
	button.setAttribute("onclick", "startTest()");
	button.className = "reset-test";
	testkader.appendChild(button);
	button.innerHTML = "Speel nog eens!";
	stopTimer();
	return;
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
			gemaakteFouten++;
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
