const showNotes = true;

keys.addEventListener("click", (e) => {
	const key = e.target.closest("input")?.value;
	if (key) {
		buildChart(currentChart(selectedKey(), selectedScale()), numOctaves());
	}
});

modeSelect.addEventListener("change", () => buildChart(currentChart(selectedKey(), selectedScale()), numOctaves()))

twoOctaves.addEventListener("change", () => {
 	buildChart(currentChart(selectedKey(), selectedScale()), numOctaves())
})

const selectedKey = () => keys.querySelector('input[name="key"]:checked').value
const selectedScale = () =>	modeSelect.querySelector(`option[value=${modeSelect.value}]`)
.textContent.toLowerCase()
const numOctaves = () => twoOctaves.checked ? 2 : 1


const chart1 = {
	right: [1, 2, 3, 1, 2, 3, 4, 5, 4, 3, 2, 1, 3, 2, 1],
	left: [5, 4, 3, 2, 1, 3, 2, 1, 2, 3, 1, 2, 3, 4, 5]
};
const chart2 = {
	right: [1, 2, 3, 4, 1, 2, 3, 4, 3, 2, 1, 4, 3, 2, 1],
	left: [5, 4, 3, 2, 1, 3, 2, 1, 2, 3, 1, 2, 3, 4, 5]
};
const chart3 = {
	right: [1, 2, 3, 1, 2, 3, 4, 5, 4, 3, 2, 1, 3, 2, 1],
	left: [4, 3, 2, 1, 4, 3, 2, 1, 2, 3, 4, 1, 2, 3, 4]
};

const charts = {
	C: {
        relativeMinor: 'A',
		major: {
			chart: chart1,
			notes: ["C", "D", "E", "F", "G", "A", "B", "A", "G", "F", "E", "D", "C"]
		},
		'natural minor': {
			chart: chart1,
			notes: ["C", "D", "Eb", "F", "G", "Ab", "Bb", "Ab", "G", "F", "Eb", "D", "C"]
		}
	},
	G: {
        relativeMinor: 'E',
		major: {
			chart: chart1,
			notes: ["G", "A", "B", "C", "D", "E", "F#", "E", "D", "C", "B", "A", "G"]
		},
		'natural minor': {
			chart: chart1,
			notes: ["G", "A", "Bb", "C", "D", "Eb", "F", "Eb", "D", "C", "Bb", "A", "G"]
		}
	},
	D: {
        relativeMinor: 'B',
		major: {
			chart: chart1,
			notes: ["D", "E", "F#", "G", "A", "B", "C#", "B", "A", "G", "F#", "E", "D"]
		},
		'natural minor': {
			chart: chart1,
			notes: ["D", "E", "F", "G", "A", "Bb", "C", "Bb", "A", "G", "F", "E", "D"]
		}
	},
	A: {
        relativeMinor: 'F#',
		major: {
			chart: chart1,
			notes: [
				"A",
				"B",
				"C#",
				"D",
				"E",
				"F#",
				"G#",
				"F#",
				"E",
				"D",
				"C#",
				"B",
				"A"
			]
		},
        'natural minor': {
			chart: chart1,
			notes: ["A", "B", "C", "D", "E", "F", "G", "F", "E", "D", "C", "B", "A"]
		},
	},
	E: {
        relativeMinor: 'C#',
		major: {
			chart: chart1,
			notes: [
				"E",
				"F#",
				"G#",
				"A",
				"B",
				"C#",
				"D#",
				"C#",
				"B",
				"A",
				"G#",
				"F#",
				"E"
			]
		},
		'natural minor': {
			chart: chart1,
			notes: [
				"E",
				"F#",
				"G",
				"A",
				"B",
				"C",
				"D",
				"C",
				"B",
				"A",
				"G",
				"F#",
				"E"
			]
		}
	},
	B: {
        relativeMinor: 'G#',
		major: {
			chart: chart3,
			notes: [
				"B",
				"C#",
				"D#",
				"E",
				"F#",
				"G#",
				"A#",
				"G#",
				"F#",
				"E",
				"D#",
				"C#",
				"B"
			]
		},
		'natural minor': {
			chart: chart3,
			notes: [
				"B",
				"C#",
				"D",
				"E",
				"F#",
				"G",
				"A",
				"G",
				"F#",
				"E",
				"D",
				"C#",
				"B"
			]
		}
	},
	F: {
        relativeMinor: 'D',
		major: {
			chart: chart2,
			notes: ["F", "G", "A", "Bb", "C", "D", "E", "D", "C", "Bb", "A", "G", "F"]
		},
		'natural minor': {
			chart: chart2,
			notes: ["F", "G", "Ab", "Bb", "C", "Db", "Eb", "Db", "C", "Bb", "Ab", "G", "F"]
		}
	}
};
const currentChart = (key, scale) => charts[key][scale] || null;

function addFinger(chart, index, rootnote = false) {
	const rightdiv = document.createElement("div");
	const leftdiv = document.createElement("div");

	rightdiv.textContent = rootnote ? "1" : chart.chart.right[index];
	leftdiv.textContent = rootnote ? "1" : chart.chart.left[index];

	rightHandContainer.appendChild(rightdiv);
	leftHandContainer.appendChild(leftdiv);
}

function addNote(chart, index) {
	const rightdiv = document.createElement("div");
	const leftdiv = document.createElement("div");

	if (chart.notes[index].length === 2) {
		rightdiv.classList.add("black");
		leftdiv.classList.add("black");
	}

	rightdiv.textContent = chart.notes[index];
	leftdiv.textContent = chart.notes[index];

	rightHandNotes.appendChild(rightdiv);
	leftHandNotes.appendChild(leftdiv);
}

function clearChart() {
	leftHandContainer.textContent = "";
	rightHandContainer.textContent = "";
	leftHandNotes.textContent = "";
	rightHandNotes.textContent = "";
}

function addNotes(chart, numberOctaves) {
	// notes ->
	for (let octave = 0; octave < numberOctaves; octave++) {
		for (let i = 0; i < 7; i++) {
			addNote(chart, i);
		}
	}

	addNote(chart, 0);

	// notes <-
	for (let octave = 0; octave < numberOctaves; octave++) {
		for (let i = 6; i < 13; i++) {
			addNote(chart, i);
		}
	}
}

function addFingers(chart, numberOctaves) {
	// fingers ->
	for (let octave = 0; octave < numberOctaves; octave++) {
		for (let i = 0; i < 7; i++) {
			addFinger(chart, i, i === 0 && octave === 1);
		}
	}

	// top note
	addFinger(chart, 7);

	// <-
	for (let octave = 0; octave < numberOctaves; octave++) {
		for (let i = 0; i < 7; i++) {
			addFinger(chart, i + 8, i === 6 && octave < numberOctaves - 1);
		}
	}
}

function buildChart(chart, numberOctaves = 1) {
	clearChart();
	key.textContent = `${selectedKey()} ${selectedScale()}`;

    if (!chart) {
        chartPlaceholder.style.display = 'block'
        chartDisplay.style.display = 'none'
        console.log(selectedScale())
        return
    }

    chartPlaceholder.style.display = 'none'
    chartDisplay.style.display = 'grid'
	addNotes(chart, numberOctaves);
	addFingers(chart, numberOctaves);
}

buildChart(currentChart(selectedKey(), selectedScale()), numOctaves());
