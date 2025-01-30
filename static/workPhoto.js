let imgURL = '';

function setBackground(event) {
  const file = event.target.files[0];
  if(file){
    const reader = new FileReader();

    reader.onload = function(e){
        imgURL = e.target.result;
        localStorage.setItem('imgURL',imgURL);
        document.getElementById('postcardDEMO').style.backgroundImage = `url(${imgURL})`;
        document.getElementById('postcardDEMO').style.backgroundSize = 'cover';
        document.getElementById('postcardDEMO').style.display = "block";
        document.getElementById('continue-btn').style.display = "block";
    }
    reader.readAsDataURL(file);
  }
}

function generatePostcard() {
    const to = document.getElementById('to-name').value;
    const from = document.getElementById('from-name').value;
    const message = document.getElementById('message').value;

    const postcard = document.getElementById('postcard');
    const imgURL = localStorage.getItem('imgURL');

    document.getElementById('toText').innerText = `To: ${to}`;
    document.getElementById('fromText').innerText = `From: ${from}`;
    document.getElementById('messageText').innerText = message;

    if(imgURL){
        postcard.style.backgroundImage = `url(${imgURL})`;
        postcard.style.backgroundSize = 'cover';
        postcard.style.display = "block";
    }
}
