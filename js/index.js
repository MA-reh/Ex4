let popUpEle = document.querySelector("#popup"),
  popUpKeys = document.querySelectorAll("#Gallery .item i"),
  popUpClose = popUpEle.querySelector(".close"),
  popUpImg = popUpEle.querySelector("img"),
  currentImgIndex,
  popUpNext = popUpEle.querySelector(".right"),
  popUpLeft = popUpEle.querySelector(".left"),
  allImagesGallery = document.querySelectorAll("#Gallery img.img-fluid"),
  popUpBox = popUpEle.querySelector(".box");

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

let popUpIndicators = popUpEle.querySelectorAll("li"),
  indexArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// add attribute data-index in html for li
for (let indexImg of indexArray) {
  popUpIndicators[indexImg - 1].setAttribute("data-index", indexImg);
}

// open popUp by class show
function addPopUp() {
  popUpEle.classList.add("show");
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

// all control of popUpBox
function keysPopUpIndicators(e) {
  let keysArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let key of keysArray) {
    popUpIndicators[key - 1];
    if (e.key == key) {
      // if user click on indicator active => start animation scale for image
      if (
        popUpIndicators[key - 1].classList.contains("active") &&
        popUpEle.classList.contains("show")
      ) {
        // start animation
        popUpBox.classList.add("scale-box");
        // if animation end remove class animation
        popUpBox.addEventListener("animationend", () => {
          popUpBox.classList.remove("scale-box");
        });

        return;
      }

      // if user click on any number indicator => image change to number clicked
      currentImgIndex = Array.from(popUpIndicators).indexOf(
        popUpIndicators[key - 1]
      );

      // take src from image index and set in New variable
      currentImgSrc = allImagesGallery[currentImgIndex].getAttribute("src");

      // call back functions
      addPopUp();
      updateImgScr(currentImgSrc);
      updateIndicator();
    }
  }

  //  check if popUpElement is has class show
  if (popUpEle.classList == "popup show") {
    // if user click ESC in keyBoard => close popUp
    if (e.code == "Escape") {
      popUpEle.classList.remove("show");
    }
    // if user click arrowRight in keyBoard => change next img
    if (e.code == "ArrowRight") {
      currentImgIndex =
        currentImgIndex >= allImagesGallery.length - 1 ? 0 : ++currentImgIndex;
      let nextImgSrc = allImagesGallery[currentImgIndex].getAttribute("src");
      //   call back functions
      updateImgScr(nextImgSrc);
      updateIndicator();
    }
    // if user click arrowRight in keyBoard => change pervious img
    if (e.code == "ArrowLeft") {
      currentImgIndex =
        currentImgIndex <= 0 ? allImagesGallery.length - 1 : --currentImgIndex;
      let prevImgSrc = allImagesGallery[currentImgIndex].getAttribute("src");

      //   call back functions
      updateImgScr(prevImgSrc);
      updateIndicator();
    }

    // all Keys not have any action have animation // try that
    if (
      !(
        (1 <= e.key && e.key <= 9) ||
        e.key == "ArrowRight" ||
        e.key == "ArrowLeft" ||
        e.code == "Escape"
      )
    ) {
      popUpBox.classList.add("animation");
      popUpBox.addEventListener("animationend", (e) => {
        popUpBox.classList.remove("animation");
      });
      return;
    }
  }
}

// if user click any key in Keyboard he is have active // try it too see
window.addEventListener("keyup", keysPopUpIndicators);

// click any place in screen => close the popUpElement
popUpEle.addEventListener("click", removePopUp);

// button X in popUpBox => close the popUpElement
popUpClose.addEventListener("click", removePopUp);

// buttons layOut up image in Section Gallery
popUpKeys.forEach((popUpKey) => {
  // know any button his clicked because open popUp with image this button
  popUpKey.addEventListener("click", function () {
    // take src image at button clicked there in New variable
    currentImgSrc =
      popUpKey.parentElement.previousElementSibling.getAttribute("src");

    // replace old imageSrc in place NewImageSrc
    popUpImg.setAttribute("src", currentImgSrc);

    currentImgIndex =
      popUpKey.parentElement.previousElementSibling.dataset.index;

    //   call back functions
    updateIndicator();
    addPopUp();
  });
});

// if user click on box popUp doesn't close popUpElement
popUpBox.addEventListener("click", (e) => {
  e.stopPropagation();
});

// click button Next in popUp => change after image
popUpNext.addEventListener("click", () => {
  currentImgIndex =
    currentImgIndex >= allImagesGallery.length - 1 ? 0 : ++currentImgIndex;

  // take src next image in New variable
  let nextImgSrc = allImagesGallery[currentImgIndex].getAttribute("src");

  //   call back functions
  updateImgScr(nextImgSrc);
  updateIndicator();
});

// click button pervious in popUp => change before image
popUpLeft.addEventListener("click", () => {
  currentImgIndex =
    currentImgIndex <= 0 ? allImagesGallery.length - 1 : --currentImgIndex;

  // take src pervious image in New variable
  let prevImgSrc = allImagesGallery[currentImgIndex].getAttribute("src");

  //   call back functions
  updateImgScr(prevImgSrc);
  updateIndicator();
});

// indicators li in popUpBox
popUpIndicators.forEach((popUpIndicator) => {
  // if user click on indicator active => start animation scale for image
  popUpIndicator.addEventListener("click", () => {
    // check if indicator has class active or not // is have ? start animation
    if (popUpIndicator.classList.contains("active")) {
      // start animation
      popUpBox.classList.add("scale-box");
      // if animation end remove class animation
      popUpBox.addEventListener("animationend", () => {
        popUpBox.classList.remove("scale-box");
      });
    }
    return;
  });

  // if user click on any number indicator => image change to number clicked
  popUpIndicator.addEventListener("click", () => {
    // take number "popUpIndicator" of index in array "popUpIndicators" and set in New variable
    currentImgIndex = Array.from(popUpIndicators).indexOf(popUpIndicator);

    // take src from image index and set in New variable
    currentImgSrc = allImagesGallery[currentImgIndex].getAttribute("src");

    // call back functions
    updateImgScr(currentImgSrc);
    updateIndicator();
  });
});

/* 
let jana = "",
  sequenceTimer = "";

document.addEventListener("keydown", (e) => {
  if (e.code.startsWith("Digit")) {
    jana += e.code.charAt(e.code.length - 1);
    clearTimeout(sequenceTimer);
    sequenceTimer = setTimeout(() => {
      jana = "";
    }, 1000);
    if (jana.length === 2) {
      let targetIndex = parseInt(jana) - 1;
      if (targetIndex >= 0 && targetIndex < allImagesGallery.length) {
        currentImgIndex = targetIndex;

        let NewSrc = allImagesGallery[currentImgIndex].getAttribute("src");
        updateImgScr(NewSrc);
      }
      jana = "";
      sequenceTimer = "";
      updateIndicator();
    }
  }
});
 */
