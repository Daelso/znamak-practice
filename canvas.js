//if tatted true
const colorCheck = (red) => {
  if (red === 53) {
    return true;
  }
  return false;
};

//This is how we move down the y axis of the canvas
const getSecondDigit = (num) => {
  if (num >= 0 && num <= 9) {
    return num;
  } else if (num >= 10 && num <= 99) {
    return Math.floor(num / 10) % 10;
  } else if (num >= 100) {
    return Math.floor(num / 100) % 10;
  } else {
    return null;
  }
};

const changePixelColor = (imageData, data, gridIndex) => {
  const tatStartX = 40;
  const tatStartY = 44;
  const tatEndX = 44;
  const tatEndY = 48;
  let offset = 4 * getSecondDigit(gridIndex);

  // Define the start and end coordinates
  let startX = tatStartX + offset;
  let endX = tatEndX + offset;
  let startY = tatStartY;
  let endY = tatEndY;

  console.log(startX);

  // Loop through the specified region and set the color of each pixel to black
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const index = (y * canvas.width + x) * 4;
      const isSkinColor = colorCheck(data[index]);

      // Assign colors based on the condition
      data[index] = isSkinColor ? 255 : 53; // Red channel
      data[index + 1] = isSkinColor ? 202 : 41; // Green channel
      data[index + 2] = isSkinColor ? 149 : 18; // Blue channel
    }
  }

  return imageData;
};
