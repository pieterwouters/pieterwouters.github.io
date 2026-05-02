let currentSolution = [];

    const imagesToShow = 8;

    const availableImages = [
      36, 38, 40, 41, 43, 45, 47,
      48, 50, 52, 53, 55, 57, 59,
      60, 62, 64, 65, 67, 69, 71,
      72, 74, 76, 77, 79, 81, 83,
      84, 86, 88, 89, 91, 93, 95,
      96, 98, 100, 101, 103, 105, 107,
      108
    ];

    // Fisher–Yates shuffle
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function nextImage() {

  const oplossing = document.getElementById("oplossing");
  oplossing.innerHTML = "";

  const gallery = document.getElementById("gallery");
  const mainImage = document.getElementById("myImage");
  const clef = document.querySelector('input[name="sleutel"]:checked').value;

  mainImage.style.display = "none";
  gallery.innerHTML = "";

  const start = parseInt(document.getElementById("van").value);
  const end = parseInt(document.getElementById("tot").value);

  let filtered = availableImages.filter(n =>
    n >= start && n <= end
  );

  shuffle(filtered);

  let selected = filtered.slice(0, imagesToShow);
  currentSolution = selected;


  // LEFT bar
  const left = document.createElement("img");
  if (clef === "sol-sleutel") {
  left.src = "balk-L.png";
  left.height = 530;
  gallery.appendChild(left);
  }
  
  if (clef === "fa-sleutel") {
  left.src = "balk-L-fa.png";
  left.height = 530;
  gallery.appendChild(left);
  }

  // NOTES + middle bars
selected.forEach((n, index) => {

  const slot = document.createElement("div");
  slot.className = "note-slot";

  const img = document.createElement("img");
  if (clef === "sol-sleutel") {
  img.src = "noten/sol/" + n + ".png";
  img.height = 530;

  slot.appendChild(img);
  gallery.appendChild(slot);

  if (index < selected.length - 1) {
    const sep = document.createElement("img");
    sep.src = "balk-M.png";
    sep.height = 530;
    gallery.appendChild(sep);
  }
  }
  
  if (clef === "fa-sleutel") {
    img.src = "noten/fa/" + n + ".png";
  img.height = 530;

  slot.appendChild(img);
  gallery.appendChild(slot);

  if (index < selected.length - 1) {
    const sep = document.createElement("img");
    sep.src = "balk-M.png";
    sep.height = 530;
    gallery.appendChild(sep);
  }
  }
});

  // RIGHT bar
  const right = document.createElement("img");
  right.src = "balk-R.png";
  right.height = 530;
  gallery.appendChild(right);

  console.log(selected);
}

function reset() {

  const gallery = document.getElementById("gallery");
  const mainImage = document.getElementById("myImage");
  const oplossing = document.getElementById("oplossing");
  const clef = document.querySelector('input[name="sleutel"]:checked').value;

  // Clear generated gallery
  gallery.innerHTML = "";
  oplossing.innerHTML = "";

  // Clear stored solution
  currentSolution = [];

  // Restore default image
if (clef === "sol-sleutel") {
  mainImage.src = "blanco.png";
  mainImage.style.display = "block";
  mainImage.style.height = "530px";
}

if (clef === "fa-sleutel") {
  mainImage.src = "blanco-fa.png";
  mainImage.style.display = "block";
  mainImage.style.height = "530px";
}
}

function showSolution() {

  const div = document.getElementById("oplossing");
  div.innerHTML = "";

  const noteNamesNL = {
    36: "do", 38: "re", 40: "mi", 41: "fa", 43: "sol", 45: "la", 47: "si",
    48: "do", 50: "re", 52: "mi", 53: "fa", 55: "sol", 57: "la", 59: "si",
    60: "do", 62: "re", 64: "mi", 65: "fa", 67: "sol", 69: "la", 71: "si",
    72: "do", 74: "re", 76: "mi", 77: "fa", 79: "sol", 81: "la", 83: "si",
    84: "do", 86: "re", 88: "mi", 89: "fa", 91: "sol", 93: "la", 95: "si",
    96: "do", 98: "re", 100: "mi", 101: "fa", 103: "sol", 105: "la", 107: "si",
    108: "do"
  };

  let left = document.createElement("img");
  left.src = "oplossingen/nl/blanco-oplossing-L.png";
  div.appendChild(left);

  currentSolution.forEach((note, index) => {

    const slot = document.createElement("div");
    slot.className = "note-slot-oplossing";

    const img = document.createElement("img");
    img.src = "oplossingen/nl/" + noteNamesNL[note] + ".png";

    slot.appendChild(img);
    div.appendChild(slot);

    if (index < currentSolution.length - 1) {
      const sep = document.createElement("img");
      sep.src = "oplossingen/nl/blanco-oplossing.png";
      div.appendChild(sep);
    }
  });

  let right = document.createElement("img");
  right.src = "oplossingen/nl/blanco-oplossing-R.png";
  div.appendChild(right);
}

function updateClefRange() {

  const clef =
    document.querySelector('input[name="sleutel"]:checked').value;

  const selects = [
    document.getElementById("van"),
    document.getElementById("tot")
  ];


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