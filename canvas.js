//if tatted true
const colorCheck = (red) => {
  if (red === 53) {
    return true;
  }
  return false;
};

const changePixelColor = (imageData, data, rowPosition, yNum) => {
  const tatStartX = 40;
  const tatStartY = 44;
  const tatEndX = 44;
  const tatEndY = 48;
  let xOffSet = 4 * rowPosition;
  let yOffSet = 4 * yNum;

  // Define the start and end coordinates
  let startX = tatStartX + xOffSet;
  let endX = tatEndX + xOffSet;
  let startY = tatStartY + yOffSet;
  let endY = tatEndY + yOffSet;

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
