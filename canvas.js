//if tatted true
const colorCheck = (gridItem) => {
  const isTatted = gridItem.dataset.isTatted == "1";
  gridItem.dataset.isTatted = isTatted ? "0" : "1";
  return isTatted;
};
//body obj: type/fat/direction

const imageLinks = {
  "000": "https://i.imgur.com/U7mevkM.png", //not fat male front
  "001": "https://i.imgur.com/w8rdJci.png", // not fat male back
  "010": "https://i.imgur.com/Ab1T1KA.png", // fat male front
  "011": "https://i.imgur.com/7waSJ7M.png", //fat male back
  100: "image4.png", //not fat female front
  101: "image5.png", //not fat female back
  110: "image6.png", //fat female front
  111: "image7.png", //fat female back
};

const startingPoints = {
  "000": { tatStartX: 40, tatEndX: 44, tatStartY: 44, tatEndY: 48 }, //not fat male front
  "001": { tatStartX: 40, tatEndX: 44, tatStartY: 44, tatEndY: 48 }, // not fat male back
  "010": { tatStartX: 40, tatEndX: 44, tatStartY: 48, tatEndY: 52 }, // fat male front
  "011": { tatStartX: 40, tatEndX: 44, tatStartY: 48, tatEndY: 52 }, //fat male back
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

const doNotChangePixel = (bodyObj, rowPosition, gridItem) => {
  if (bodyObj.fat === 0 && (rowPosition == 0 || rowPosition == 10)) {
    const isTatted = gridItem.dataset.isTatted == "1";
    gridItem.dataset.isTatted = isTatted ? "0" : "1";
    return true;
  }
  return false;
};

const changePixelColor = (imageData, data, gridItem, bodyObj) => {
  const { tatStartX, tatEndX, tatStartY, tatEndY } = getStartingPoint(bodyObj);

  let xOffSet = 4 * gridItem.dataset.positionInRow;
  let yOffSet = 4 * gridItem.dataset.yNum;

  // Define the start and end coordinates
  let startX = tatStartX + xOffSet;
  let endX = tatEndX + xOffSet;
  let startY = tatStartY + yOffSet;
  let endY = tatEndY + yOffSet;

  // Loop through the specified region and set the color of each pixel to black
  const isSkinColor = colorCheck(gridItem);

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const index = (y * canvas.width + x) * 4;

      // Assign colors based on the condition
      data[index] = isSkinColor ? 255 : 53; // Red channel
      data[index + 1] = isSkinColor ? 202 : 41; // Green channel
      data[index + 2] = isSkinColor ? 149 : 18; // Blue channel
    }
  }
  return imageData;
};

const renderCanvas = (canvas, ctx, gridItems) => {
  let img = new Image();
  img.crossOrigin = "anonymous";
  img.src = getImage(bodyObj);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.putImageData(imageData, 0, 0);
  };
};

const renderAndRedrawCanvas = (canvas, ctx, gridItems) => {
  let img = new Image();
  img.crossOrigin = "anonymous";
  img.src = getImage(bodyObj);

  img.onload = function () {
    ctx.drawImage(img, 0, 0);

    // Get the image data
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    const { tatStartX, tatEndX, tatStartY, tatEndY } =
      getStartingPoint(bodyObj);

    gridItems.forEach((gridItem) => {
      if (gridItem.dataset.isTatted == 1) {
        let xOffSet = 4 * gridItem.dataset.positionInRow;
        let yOffSet = 4 * gridItem.dataset.yNum;

        // Define the start and end coordinates
        let startX = tatStartX + xOffSet;
        let endX = tatEndX + xOffSet;
        let startY = tatStartY + yOffSet;
        let endY = tatEndY + yOffSet;

        for (let y = startY; y < endY; y++) {
          for (let x = startX; x < endX; x++) {
            const index = (y * canvas.width + x) * 4;

            // Assign colors based on the condition
            data[index] = 53; // Red channel
            data[index + 1] = 41; // Green channel
            data[index + 2] = 18; // Blue channel
          }
        }
      }
    });

    // Put the modified image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);
  };
};
