let popUpEle = document.querySelector("#popup"),
  popUpKeys = document.querySelectorAll("#Gallery .item i"),
  popUpClose = popUpEle.querySelector(".close"),
  popUpImg = popUpEle.querySelector("img"),
  currentImgIndex,
  popUpNext = popUpEle.querySelector(".right"),
  popUpLeft = popUpEle.querySelector(".left"),
  allImagesGallery = document.querySelectorAll("#Gallery img");

//   call one time => invoke function
(function createIndicators() {
  let counter = 0;
  //   create indicator for number of images
  allImagesGallery.forEach(function () {
    let newIndicator = document.createElement("li");
    newIndicator.className =
      counter == allImagesGallery.length - 1
        ? " "
        : counter == 0
        ? "me-2 active"
        : "me-2";
    newIndicator.textContent = counter + 1;
    document.querySelector(".indicators ul").append(newIndicator);
    counter++;
  });
})();

let popUpIndicators = popUpEle.querySelectorAll("li");

// open and close popUp by class show
function togglePopUp() {
  popUpEle.classList.toggle("show");
}

// only close popUp
function removePopUp() {
  popUpEle.classList.remove("show");
}

// add class active for indicator if i click there
function updateIndicator() {
  popUpEle.querySelector("ul li.active").classList.remove("active");
  popUpIndicators[currentImgIndex].classList.add("active");
}

// change src img in popUp to New src you want
function updateImgScr(newSrc) {
  popUpImg.setAttribute("src", newSrc);
}

// click ArrowRight in keyboard && opened a popUpElement
function popUpArrowRight(e) {
  //  check if popUpElement is has class show
  if (popUpEle.classList == "popup show") {
    // if user click arrowRight in keyBoard => change next img
    if (e.code == "ArrowRight") {
      currentImgIndex =
        currentImgIndex >= allImagesGallery.length - 1 ? 0 : ++currentImgIndex;

      let nextImgSrc = allImagesGallery[currentImgIndex].getAttribute("src");

      //   call back function
      updateImgScr(nextImgSrc);
      updateIndicator();
    }
  }
}

// click ArrowLeft in keyboard && opened a popUpElement
function popUpArrowLeft(e) {
  //  check if popUpElement is has class show
  if (popUpEle.classList == "popup show") {
    // if user click arrowRight in keyBoard => change pervious img
    if (e.code == "ArrowLeft") {
      currentImgIndex =
        currentImgIndex <= 0 ? allImagesGallery.length - 1 : --currentImgIndex;
      let prevImgSrc = allImagesGallery[currentImgIndex].getAttribute("src");

      //   call back function
      updateImgScr(prevImgSrc);
      updateIndicator();
    }
  }
}

// click ESC in keyBoard => close popUp
function closePopUpByKey(e) {
  //  check if popUpElement is has class show
  if (popUpEle.classList == "popup show") {
    // if user click ESC in keyBoard => close popUp
    if (e.code == "Escape") {
      popUpEle.classList.remove("show");
    }
  }
}

// click Numbers 1 to number images in keyBoard => change image to number user click there
function numberPopUpIndicators(e) {
  //  check if popUpElement is has class show
  if (popUpEle.classList == "popup show") {
    for (let i = 1; i <= allImagesGallery.length; ++i) {
      if (e.code == "Digit" + i) {
        currentImgIndex = i - 1;
        let indexImgSrc = allImagesGallery[currentImgIndex].getAttribute("src");

        // call back function
        updateImgScr(indexImgSrc);
        updateIndicator();
      }
    }
  }
}

popUpEle.addEventListener("click", removePopUp);
popUpClose.addEventListener("click", removePopUp);

// buttons layOut up image in Section Gallery
popUpKeys.forEach((popUpKey) => {
  // know any button his clicked because open popUp with image this button
  popUpKey.addEventListener("click", function () {
    currentImgSrc =
      popUpKey.parentElement.previousElementSibling.getAttribute("src");
    popUpImg.setAttribute("src", currentImgSrc);
    currentImgIndex =
      popUpKey.parentElement.previousElementSibling.dataset.index;

    //   call back function
    updateIndicator();
    togglePopUp();
  });
});

// if user click on box popUp doesn't close popUpElement
popUpEle.querySelector(".box").addEventListener("click", (e) => {
  e.stopPropagation();
});

// click button Next in popUp => change after image
popUpNext.addEventListener("click", () => {
  currentImgIndex =
    currentImgIndex >= allImagesGallery.length - 1 ? 0 : ++currentImgIndex;
  let nextImgSrc = allImagesGallery[currentImgIndex].getAttribute("src");

  //   call back function
  updateImgScr(nextImgSrc);
  updateIndicator();
});

window.addEventListener("keyup", popUpArrowRight);

window.addEventListener("keyup", popUpArrowLeft);

window.addEventListener("keyup", closePopUpByKey);

window.addEventListener("keydown", numberPopUpIndicators);

// click button pervious in popUp => change before image
popUpLeft.addEventListener("click", () => {
  currentImgIndex =
    currentImgIndex <= 0 ? allImagesGallery.length - 1 : --currentImgIndex;
  let prevImgSrc = allImagesGallery[currentImgIndex].getAttribute("src");

  //   call back function
  updateImgScr(prevImgSrc);
  updateIndicator();
});

popUpIndicators.forEach((popUpIndicator) => {
  // if user click on any number indicator => image change to number clicked
  popUpIndicator.addEventListener("click", () => {
    currentImgIndex = Array.from(popUpIndicators).indexOf(popUpIndicator);
    currentImgSrc = allImagesGallery[currentImgIndex].getAttribute("src");

    //   call back function
    updateImgScr(currentImgSrc);
    updateIndicator();
  });
});
