// app.js
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const brush = document.getElementById("jsBrush");
const erase = document.getElementById("jsErase");
const submitButton = document.getElementById("jsSubmitButton");
const submitButton2 = document.getElementById("jsSubmitButton2");

// send image
submitButton.addEventListener("click", () => {
    const dataURI = canvas.toDataURL();
    fetch('/process-image', {
        method: 'POST',
        body: JSON.stringify({ image: dataURI }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

submitButton2.addEventListener("click", () => {
    const dataURI = canvas.toDataURL();
    const imageBlob = dataURIToBlob(dataURI); // Convert the dataURI to a Blob object
    const formData = new FormData();
    formData.append('image', imageBlob, 'image.png'); // Add the Blob object to the form data with a file name
    fetch('/predict', {
        method: 'POST', 
        body: formData, // Use the formData instead of JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Helper function to convert dataURI to Blob
function dataURIToBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i += 1) {
        int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
}


// Brush option
const INITIAL_COLOR = "#2c2c2c";
const INITIAL_LINEWIDTH = 5.0;
const CANVAS_SIZE = 500;

// canvas option
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = INITIAL_LINEWIDTH;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const MODE_BUTTON = [brush, erase];
let mode = brush;
let painting = false;

function stopPainting(event){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){ //모든 움직임을 감지하고 line을 만든다.
     //스크린과 캠퍼스가 크기가 다른 경우 offsetX와 offsetY를 사용한다.
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath(); //path를 만듬
        ctx.moveTo(x, y); //x, y로 옮김
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
} 
    // else if(mode === erase){
    //     if(painting) {
    //         ctx.clearRect(x-ctx.lineWidth/2, y-ctx.lineWidth/2, ctx.lineWidth, ctx.lineWidth);
    //     }
    // }

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

function handleModeChange(event) {
    mode = event.target;
    // Button Highlight
    for (i = 0; i < MODE_BUTTON.length; i++) {
        var button = MODE_BUTTON[i];
        if (button === mode) {
            button.style.backgroundColor = "skyblue";
        }
        else {
            button.style.backgroundColor = "white";
        }
    }
}


// All Remove Bts

jsAllremove.addEventListener("click", () => ctx.clearRect(0, 0, canvas.width, canvas.height));

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

MODE_BUTTON.forEach(mode => mode.addEventListener("click", handleModeChange)
);