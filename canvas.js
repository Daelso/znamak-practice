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

const isFat = (fat) => {
  return fat === 1 ? true : false;
};

const calculateStartingPoint = (isFat) => {};

const changePixelColor = (imageData, data, rowPosition, yNum) => {
  console.log(rowPosition);

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
