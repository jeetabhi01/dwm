const SLIDESHOW_INTERVAL_MS = 5000;  // Set the slideshow interval in milliseconds
const DOMAIN_NAME = 'http://localhost:5000'
// Initialize variables
let currentSlideIndex = 0;
let slideshowTimer;


// Define the list of EJS template names to use in the slideshow
const templateNames = [
  `${DOMAIN_NAME}/safety/target`,
  `${DOMAIN_NAME}/safety/trcfr`,
  `${DOMAIN_NAME}/safety/actionPlan`,
  `${DOMAIN_NAME}/quality/do`,
  `${DOMAIN_NAME}/quality/overallPunch`,
  `${DOMAIN_NAME}/quality/overallAltroz`,
  `${DOMAIN_NAME}/quality/cpaPunch`,
  `${DOMAIN_NAME}/quality/cpaAltroz`,
  `${DOMAIN_NAME}/quality/action`,
  `${DOMAIN_NAME}/productivity/target`,
  `${DOMAIN_NAME}/productivity/hpev2`,
  `${DOMAIN_NAME}/productivity/moptrend`,

];




function renderSlide(slide, container) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", slide, true);
  xhr.onreadystatechange = function () {

    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      container.innerHTML = xhr.responseText;

      const head = document.getElementsByTagName("head")[0];
      const scripts = container.getElementsByTagName("script");
      for (let i = 0; i < scripts.length; i++) {
        const script = document.createElement("script");
        script.type = scripts[i].type || "text/javascript";
        if (scripts[i].src) {
          // script.src = scripts[i].src;
        } else {
          script.text = scripts[i].innerText;
        }
        head.appendChild(script);
      }
    }
  };
  xhr.send();
}


function startSlideshow() {
  slideshowTimer = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % templateNames.length;
    const slideContentContainer = document.createElement("div");
    slideshowContainer.innerHTML = "";
    slideshowContainer.appendChild(slideContentContainer);
    renderSlide(templateNames[currentSlideIndex], slideContentContainer);
  }, SLIDESHOW_INTERVAL_MS);
}

function handleUserActivity() {
  clearInterval(slideshowTimer);
  window.location.href = 'http://localhost:5000/';
  setTimeout(() => {
    currentSlideIndex = 0;
    renderSlide(templateNames[currentSlideIndex], container);
    startSlideshow();
  }, 5000);
}
