AOS.init();

function validateNumericInput(inputField) {
  // Remove non-numeric characters using a regular expression
  inputField.value = inputField.value.replace(/[^0-9]/g, '');
}



// Nav Bottom
document.addEventListener("DOMContentLoaded", function() {
  const navBar = document.querySelector(".navbar");
  const allLi = document.querySelectorAll("li");
  const indicator = document.querySelector(".indicator");

  function setIndicatorPosition() {
      const activeLi = navBar.querySelector(".active");
      if (activeLi) {
          const index = Array.from(allLi).indexOf(activeLi);
          indicator.style.transform = `translateX(calc(${index * 70}px))`;
      }
  }

  allLi.forEach((li, index) => {
      li.addEventListener("click", e => {
          e.preventDefault(); // Mencegah pengiriman form
          navBar.querySelector(".active").classList.remove("active");
          li.classList.add("active");

          indicator.style.transform = `translateX(calc(${index * 70}px))`;
      });
  });

  // Set posisi indikator saat halaman dimuat
  setIndicatorPosition();
});
