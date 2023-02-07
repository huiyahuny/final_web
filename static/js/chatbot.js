let chatbot = document.getElementById("chatbot");
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

chatbot.addEventListener("mousedown", dragStart);
chatbot.addEventListener("mouseup", dragEnd);
chatbot.addEventListener("mouseout", dragEnd);
chatbot.addEventListener("mousemove", drag);

function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  isDragging = true;
}

function dragEnd(e) {
  isDragging = false;
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, chatbot);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
