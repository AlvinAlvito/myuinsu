
//Loader
window.addEventListener("DOMContentLoaded", function() {
  const loaderContainer = document.getElementById("loader-container");
  loaderContainer.classList.add("show");
});

window.addEventListener("load", function() {
  const loaderContainer = document.getElementById("loader-container");
  setTimeout(function() {
      loaderContainer.classList.remove("show");
      loaderContainer.style.display = "none";
  }, 1500); // Jeda 1.5 detik (1500 milidetik)
});


document.addEventListener("DOMContentLoaded", function () {
  function counterUp(element, start, end, duration) {
      let range = end - start;
      let current = start;
      let increment = end > start ? 1 : -1;
      let stepTime = Math.abs(Math.floor(duration / range));
      let timer = setInterval(() => {
          current += increment;
          element.textContent = current.toLocaleString(); // Tambah pemisah ribuan
          if (current == end) {
              clearInterval(timer);
          }
      }, stepTime);
  }

  function startCounters() {
      let counters = document.querySelectorAll(".counter");
      counters.forEach((counter) => {
          let target = parseInt(counter.textContent);
          let startValue = target; 

          // Jika ID-nya "clientsCount" (Mahasiswa), mulai dari target - 500
          if (counter.id === "clientsCount") {
              startValue = target - 500;
          } else {
              startValue = 0;
          }

          counter.textContent = startValue.toLocaleString(); // Format angka
          counterUp(counter, startValue, target, 2000); // Durasi 2 detik
      });
  }

  function isInViewport(element) {
      let rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

  function handleScroll() {
      let section = document.querySelector(".about-counter");
      if (isInViewport(section)) {
          startCounters();
          window.removeEventListener("scroll", handleScroll);
      }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Cek saat pertama kali dimuat
});


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

new WOW().init();

//Loader
window.addEventListener("DOMContentLoaded", function() {
    const loaderContainer = document.getElementById("loader-container");
    loaderContainer.classList.add("show");
});

window.addEventListener("load", function() {
    const loaderContainer = document.getElementById("loader-container");
    setTimeout(function() {
        loaderContainer.classList.remove("show");
        loaderContainer.style.display = "none";
    }, 1500); // Jeda 1.5 detik (1500 milidetik)
});



(function() {
    //===== Prealoder
        // ===== pricing-style-4 slider
        tns({
            container: '.pricing-active',
            autoplay: false,
            mouseDrag: true,
            gutter: 0,
            nav: false,
            controls: true,
            controlsText: [
              '<i class="lni lni-chevron-left prev"></i>',
              '<i class="lni lni-chevron-right prev"></i>',
            ],
            responsive: {
              0: {
                items: 1,
              },
              768: {
                items: 2,
              },
              992: {
                items: 1.2,
              },
              1200: {
                items: 2,
              }
            }
          });
    
    
        window.onscroll = function () {

    
            // show or hide the back-top-top button
            var backToTo = document.querySelector(".scroll-top");
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                backToTo.style.display = "flex";
            } else {
                backToTo.style.display = "none";
            }
        };
    
        // for menu scroll 
        var pageLink = document.querySelectorAll('.page-scroll');
        
        pageLink.forEach(elem => {
            elem.addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(elem.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth',
                    offsetTop: 1 - 60,
                });
            });
        });
    
     
        window.document.addEventListener('scroll', onScroll);
    
    
    
        // WOW active
        new WOW().init();
    
        
        //====== counter up 
        var cu = new counterUp({
            start: 0,
            duration: 2000,
            intvalues: true,
            interval: 100,
            append: " ",
        });
        cu.start();
    
})();



