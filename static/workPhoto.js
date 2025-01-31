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

function setAutoBackground() {
  const imageList = [
    "static/recources/images/pexels-christian-heitz-285904-842711.jpg",
    "static/recources/images/pexels-francesco-ungaro-1525041.jpg",
  ];
  const randomIndex = Math.floor(Math.random() * imageList.length);
  const randomPhoto = imageList[randomIndex];
  const postcard = document.getElementById("postcardDEMO");
  localStorage.setItem("imgURL", randomPhoto);

  postcard.style.backgroundImage = `url(${randomPhoto})`;
  postcard.style.backgroundSize = "cover";
  postcard.style.display = "block";
  document.getElementById("continue-btn").style.display = "block";
}

function generatePostcard() {
  const to = document.getElementById("to-name").value;
  const from = document.getElementById("from-name").value;
  const message = document.getElementById("message").value;

  const postcard = document.getElementById("postcard");
  const button = document.getElementById("donwload-btn-id");
  const imgURL = localStorage.getItem("imgURL");

  document.getElementById("toText").innerText = `To: ${to}`;
  document.getElementById("fromText").innerText = `From: ${from}`;
  document.getElementById("messageText").innerText = message;

  // Change the entire style with setAttribute
  document.getElementById("toText").classList.add("toText");
  document.getElementById("fromText").classList.add("fromText");
  document.getElementById("messageText").classList.add("messageText");

  if (imgURL) {
    postcard.style.backgroundImage = `url(${imgURL})`;
    postcard.style.backgroundSize = "cover";
    postcard.style.display = "block";
    button.style.display = "block";
  }
}
function downloadPostCard() {
  const postcard = document.getElementById("postcard");
  html2canvas(postcard, {
    useCORS: true,
  })
    .then((canvas) => {
      // Set the desired resolution by scaling the canvas size
      const scaleFactor = 2; // Adjust the scaling factor
      const canvasWidth = canvas.width * scaleFactor;
      const canvasHeight = canvas.height * scaleFactor;

      // Create a new canvas with increased resolution
      const highResCanvas = document.createElement("canvas");
      const highResCtx = highResCanvas.getContext("2d");
      highResCanvas.width = canvasWidth;
      highResCanvas.height = canvasHeight;

      // Draw the original canvas on the high-res canvas
      highResCtx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight);

      // Generate the high-res image
      const imgURL = highResCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgURL;
      link.download = "postcard.png";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => console.error("Error capturing postcard", error));
}
