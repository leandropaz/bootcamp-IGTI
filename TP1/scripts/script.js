const redSlider = document.getElementById('redSlider');
const redInput = document.getElementById('redInput');

const greenSlider = document.getElementById('greenSlider');
const greenInput = document.getElementById('greenInput');

const blueSlider = document.getElementById('blueSlider');
const blueInput = document.getElementById('blueInput');

const colorPlate = document.getElementById('color-plate');
const colors = [
  parseInt(redInput.value),
  parseInt(greenInput.value),
  parseInt(blueInput.value)
];

const start = () => {
  redSlider.addEventListener('input', handleRedInput);
  greenSlider.addEventListener('input', handleGreenInput);
  blueSlider.addEventListener('input', handleBlueInput);
  updateColors(colors);
};

const handleRedInput = (event) => {
  redInput.value = colors[0] = parseInt(event.target.value);
  updateColors(colors);
};

const handleGreenInput = (event) => {
  greenInput.value = colors[1] = parseInt(event.target.value);
  updateColors(colors);
};

const handleBlueInput = (event) => {
  blueInput.value = colors[2] = parseInt(event.target.value);
  updateColors(colors);
};

const updateColors = (colors) => {
  colorPlate.style.backgroundColor = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
};

start();
