const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


const visual = document.getElementById("visualImg");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      visual.classList.add("animate");
      observer.unobserve(visual); // Only run once
    }
  });
}, {
  threshold: 0.5
});

observer.observe(visual);


// Dynamically set background images from data-bg attributes
document.querySelectorAll('.category-panel').forEach(panel => {
  const bg = panel.getAttribute('data-bg');
  if (bg) {
    panel.style.backgroundImage = `url('${bg}')`;
  }
});


// Bridal slider with pause on hover/touch
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('bridalSlider');
  if (!slider) return;

  const images = Array.from(slider.querySelectorAll('img'));
  if (images.length === 0) return;

  let current = 0;
  let intervalId = null;
  const INTERVAL_MS = 5000;

  // Show a slide by index
  function showSlide(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
      img.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
  }

  function nextSlide() {
    current = (current + 1) % images.length;
    showSlide(current);
  }

  // Start autoplay
  function startAutoplay() {
    if (intervalId) return;
    intervalId = setInterval(nextSlide, INTERVAL_MS);
  }

  // Stop autoplay
  function stopAutoplay() {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
  }

  // Initial
  showSlide(current);
  startAutoplay();

  // Pause on hover (desktop)
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // For touch devices: pause while touching
  slider.addEventListener('touchstart', stopAutoplay, { passive: true });
  slider.addEventListener('touchend', startAutoplay, { passive: true });

  // Optional: keyboard control (left/right)
  slider.tabIndex = 0;
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      current = (current - 1 + images.length) % images.length;
      showSlide(current);
      stopAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      stopAutoplay();
    }
  });
});





const hairCardData = [
  {
    img: "hair1.webp",
    title: "Voluminous Curls",
    desc: "Luxurious & long-lasting hold for glamorous evenings."
  },
  {
    img: "hair2.webp",
    title: "Glossy Straight",
    desc: "Sleek, frizz-free with intense shine & smoothness."
  },
  {
    img: "hair3.webp",
    title: "Keratin Treatment",
    desc: "Frizz-free smoothness that lasts up to 6 months."
  },
  {
    img: "hair4.webp",
    title: "Global Coloring",
    desc: "Rich tone to enhance your personality with shine."
  },
  {
    img: "hair5.webp",
    title: "Bridal Hair",
    desc: "Timeless traditional hairstyles for special day."
  },
];

const wrapper = document.getElementById("hairCardWrapper");

function loadHairCards() {
  hairCardData.forEach(card => {
    const cardHTML = `
      <div class="hair-card">
        <div class="hair-card-inner">
          <img src="${card.img}" alt="${card.title}">
          <h3>${card.title}</h3>
          <p>${card.desc}</p>
        </div>
      </div>`;
    wrapper.innerHTML += cardHTML;
  });
}

let cardIndex = 0;

function slideHairCards() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) return;

  const totalVisible = 2;
  const totalCards = hairCardData.length;
  const maxIndex = totalCards - totalVisible;

  cardIndex = (cardIndex + 1) > maxIndex ? 0 : cardIndex + 1;
  wrapper.style.transform = `translateX(-${cardIndex * 50}%)`;
}

loadHairCards();
setInterval(slideHairCards, 4000);






document.querySelectorAll('.category-panel').forEach(panel => {
  panel.addEventListener('click', function(e) {
    if (!this.classList.contains('active')) {
      e.preventDefault(); // prevent link clicks until active
      document.querySelectorAll('.category-panel').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
    }
  });
});
