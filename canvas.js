const colorCheck = (red) => {
  if (red === 53) {
    console.log("skin is tatted");
    return true;
  }
  return false;
};

const changePixelColor = (imageData, data, gridIndex) => {
  const tatStartX = 40;
  const tatStartY = 44;
  const tatEndX = 44;
  const tatEndY = 48;
  let offset = 4 * gridIndex;

  // Define the start and end coordinates
  let startX = tatStartX + offset;
  let endX = tatEndX + offset;
  let startY = tatStartY;
  let endY = tatEndY;

  const tatColor = 0xff29129; // Equivalent to (53, 41, 18) in hexadecimal
  const skinColor = 0xffcacb95; // Equivalent to (255, 202, 149) in hexadecimal

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
