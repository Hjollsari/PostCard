let imgURL = "";

function setBackground(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imgURL = e.target.result;
      localStorage.setItem("imgURL", imgURL);
      document.getElementById(
        "postcardDEMO"
      ).style.backgroundImage = `url(${imgURL})`;
      document.getElementById("postcardDEMO").style.backgroundSize = "cover";
      document.getElementById("postcardDEMO").style.display = "block";
      document.getElementById("continue-btn").style.display = "block";
    };
    reader.readAsDataURL(file);
  }
}

let index = 0;

function setAutoBackground() {
  const imageList = [
    "static/recources/images/pexels-christian-heitz-285904-842711.jpg",
    "static/recources/images/pexels-francesco-ungaro-1525041.jpg",
    "static/recources/images/pexels-daejeung-2734421.jpg",
    "static/recources/images/pexels-eberhardgross-1367192.jpg",
    "static/recources/images/pexels-felixmittermeier-1146134.jpg",
    "static/recources/images/pexels-iriser-1707213.jpg",
    "static/recources/images/pexels-quang-nguyen-vinh-222549-2171277.jpg",
    "static/recources/images/pexels-gochrisgoxyz-1643403.jpg",
    "static/recources/images/pexels-hakantahmaz-2536643.jpg",
    "static/recources/images/pexels-jplenio-1690355.jpg",
    "static/recources/images/pexels-maoriginalphotography-1485894.jpg",
    "static/recources/images/pexels-rpnickson-2647990.jpg",
  ];

  //random mynd - taka ut
  //const randomIndex = Math.floor(Math.random() * imageList.length);

  index = (index + 1) % imageList.length;
  const randomPhoto = imageList[index];

  const postcard = document.getElementById("postcardDEMO");
  localStorage.setItem("imgURL", randomPhoto);

  const img = new Image();
  img.src = randomPhoto;

  img.onload = function () {
    postcard.style.backgroundImage = `url(${randomPhoto})`;
    postcard.style.backgroundSize = "cover";
    postcard.style.display = "block";
    document.getElementById("continue-btn").style.display = "block";
  };
}

function generatePostcard() {
  const to = document.getElementById("to-name").value;
  const from = document.getElementById("from-name").value;
  const message = document.getElementById("message").value;

  const postcard = document.getElementById("postcard");
  const button = document.getElementById("download-btn");
  const colorP = document.getElementById("color-div");
  const imgURL = localStorage.getItem("imgURL");

  document.getElementById("toText").innerText = `Til: ${to}`;
  document.getElementById("fromText").innerText = `Frá: ${from}`;
  document.getElementById("messageText").innerText = message;

  document.getElementById("toText").classList.add("toText");
  document.getElementById("fromText").classList.add("fromText");
  document.getElementById("messageText").classList.add("messageText");

  if (imgURL) {
    postcard.style.backgroundImage = `url(${imgURL})`;
    postcard.style.backgroundSize = "cover";
    postcard.style.display = "block";
    button.style.display = "block";
    colorP.style.display = "block";
  }
}

const colorPicker = document.getElementById("colorPicker");
const toText = document.getElementById("toText");
const fromText = document.getElementById("fromText");
const messageText = document.getElementById("messageText");

colorPicker.addEventListener("input", function () {
  toText.style.color = colorPicker.value;
  fromText.style.color = colorPicker.value;
  messageText.style.color = colorPicker.value;
});

function downloadPostCard() {
  const toText = document.getElementById("to-name").value;
  const fromText = document.getElementById("from-name").value;
  const messageText = document.getElementById("message").value;
  const bgImg = new Image();
  bgImg.src = localStorage.getItem("imgURL");

  const textColor = document.getElementById("colorPicker").value;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  bgImg.onload = function () {
    canvas.width = bgImg.width;
    canvas.height = bgImg.height;

    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.font = "bold 130px Impact, sans-serif";
    ctx.fillStyle = textColor;

    const MARGAIN = 140;
    const LINE_SPACING = 200;
    const TOP_MARGAIN = 280;

    ctx.fillText(`Til: ${toText}`, MARGAIN, TOP_MARGAIN);
    ctx.fillText(`Frá: ${fromText}`, MARGAIN, TOP_MARGAIN + LINE_SPACING);

    const lines = messageText.split("\n");
    let y = 680;
    const x = 140; 
    const maxWidth = canvas.width / 2.5; 
    const lineSpacing = 140; 
    ctx.font = "bold 100px Impact, sans-serif";

    lines.forEach((line) => {
      let words = line.split(" "); 
      let currentLine = ""; 
      let lineWidth = 0; 

      words.forEach((word, index) => {
        const wordWidth = ctx.measureText(word).width;

        if (lineWidth + wordWidth > maxWidth) {
          ctx.fillText(currentLine, x, y); 
          y += lineSpacing; 
          currentLine = word + " "; 
          lineWidth = wordWidth; 
        } else {
          currentLine += word + " "; 
          lineWidth += wordWidth + ctx.measureText(" ").width; 
        }
      });

    
      if (currentLine) {
        ctx.fillText(currentLine, x, y);
        y += lineSpacing;
      }
    });
    canvas.toBlob((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "postcard.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, "image/png");
  };
}
//Backup tekur screenshot í stað að nota canvas (html2canvas)

// function downloadPostCard() {
//   const postcard = document.getElementById("postcard");
//   html2canvas(postcard, {
//     useCORS: true,
//   })
//     .then((canvas) => {
//       const scaleFactor = 2;
//       const canvasWidth = canvas.width * scaleFactor;
//       const canvasHeight = canvas.height * scaleFactor;

//       const highResCanvas = document.createElement("canvas");
//       const highResCtx = highResCanvas.getContext("2d");
//       highResCanvas.width = canvasWidth;
//       highResCanvas.height = canvasHeight;

//       highResCtx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight);

//       const imgURL = highResCanvas.toDataURL("image/png");
//       const link = document.createElement("a");
//       link.href = imgURL;
//       link.download = "postcard.png";

//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     })
//     .catch((error) => console.error("Error capturing postcard", error));
// }
