let popupWindow = null;
const myImage = document.getElementById('my-image');

myImage.addEventListener('click', () => {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.close();
    popupWindow = null;
  } else {
    const popupContent = '<html><head><title>Popup Image</title></head><body><img src="mci/static/images/member2.JPG"></body></html>';
    popupWindow = window.open('', 'popup-window', 'width=400,height=400');
    popupWindow.document.write(popupContent);
  }
});
