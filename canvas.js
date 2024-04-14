//if tatted true
const colorCheck = (red) => {
  if (red === 53) {
    return true;
  }
  return false;
};
//body obj: type/fat/direction

const imageLinks = {
  "000": "https://i.imgur.com/U7mevkM.png", //not fat male front
  "001": "image1.png", // not fat male back
  "010": "image2.png", // fat male front
  "011": "image3.png", //fat male back
  100: "image4.png", //not fat female front
  101: "image5.png", //not fat female back
  110: "image6.png", //fat female front
  111: "image7.png", //fat female back
};

const startingPoints = {
  "000": { tatStartX: 40, tatEndX: 44, tatStartY: 44, tatEndY: 48 }, //not fat male front
  "001": { startX: 40, endX: 44, startY: 44, endY: 48 }, // not fat male back
  "010": { startX: 40, endX: 44, startY: 44, endY: 48 }, // fat male front
  "011": { startX: 40, endX: 44, startY: 44, endY: 48 }, //fat male back
  100: { startX: 40, endX: 44, startY: 44, endY: 48 }, //not fat female front
  101: { startX: 40, endX: 44, startY: 44, endY: 48 }, //not fat female back
  110: { startX: 40, endX: 44, startY: 44, endY: 48 }, //fat female front
  111: { startX: 40, endX: 44, startY: 44, endY: 48 }, //fat female back
};

const getImage = (bodyObj) => {
  const key = `${Number(bodyObj.bodyType)}${Number(bodyObj.fat)}${Number(
    bodyObj.direction
  )}`;
  return imageLinks[key] || "https://i.imgur.com/U7mevkM.png";
};

// fat types
//not fat === 0
//fat === 1

//body types
//male === 0
//female === 1

//fat bodies show the outer rows

const getStartingPoint = (bodyObj) => {
  const key = `${Number(bodyObj.bodyType)}${Number(bodyObj.fat)}${Number(
    bodyObj.direction
  )}`;
  return (
    startingPoints[key] || {
      tatStartX: 40,
      tatEndX: 44,
      tatStartY: 44,
      tatEndY: 48,
    }
  );
};

const doNotChangePixel = (bodyObj, rowPosition) => {
  if (bodyObj.fat === 0 && (rowPosition == 0 || rowPosition == 10)) {
    return true;
  }
  return false;
};

const changePixelColor = (imageData, data, rowPosition, yNum, bodyObj) => {
  const { tatStartX, tatEndX, tatStartY, tatEndY } = getStartingPoint(bodyObj);

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
