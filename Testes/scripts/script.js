function coordinates(element, x, y) {
  element.style.position = 'absolute';
  element.style.left = `${x}%`;
  element.style.top = `${y}px`;
  element.style.margin = '0';
}

function initializePositions() {
  const elements = document.querySelectorAll('[coordinates]');
  elements.forEach(element => {
    const positionData = element.getAttribute('coordinates').split(',');
    const x = parseFloat(positionData[0]);
    const y = parseFloat(positionData[1]);
    coordinates(element, x, y);
  });
}

window.onload = initializePositions;