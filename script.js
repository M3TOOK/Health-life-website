// ========== SCROLL PROGRESS BAR ==========
// Create scroll progress bar elements
const scrollProgressBar = document.createElement('div');
scrollProgressBar.className = 'scroll-progress-bar';
scrollProgressBar.innerHTML = '<div class="scroll-progress"></div>';
document.body.insertBefore(scrollProgressBar, document.body.firstChild);

// Update scroll progress bar width
window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY;
  const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
  
  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }
  
  // Back to top button visibility
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
});

// ========== INFINITE WRITING EFFECT FOR H1 ==========
const h1Element = document.querySelector('.home-content h1');
if (h1Element) {
  const originalText = h1Element.textContent;
  h1Element.innerHTML = '';
  h1Element.classList.add('writing-effect');
  
  let charIndex = 0;
  let isDeleting = false;
  
  function typeEffect() {
    const currentText = originalText.slice(0, charIndex);
    h1Element.textContent = currentText;
    
    if (!isDeleting && charIndex < originalText.length) {
      // Typing
      charIndex++;
      setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      charIndex--;
      setTimeout(typeEffect, 50);
    } else if (!isDeleting && charIndex === originalText.length) {
      // Finished typing, wait 2 seconds then start deleting
      isDeleting = true;
      setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, wait 1 second then start typing again
      isDeleting = false;
      setTimeout(typeEffect, 1000);
    }
  }
  
  // Start the infinite writing effect
  typeEffect();
}

// ========== SCROLL REVEAL CONTENT ==========
// Add classes to elements that need scroll reveal
const homeSection = document.querySelector('.home');
const featuresSection = document.querySelector('.features');
const subscriptionsSection = document.querySelector('.subscriptions');
const footerSection = document.querySelector('.footer');
const allCards = document.querySelectorAll('.subscriptions div');
const featureBoxes = document.querySelectorAll('.features a');

// Add scroll-reveal class to sections
if (homeSection) homeSection.classList.add('scroll-reveal');
if (featuresSection) featuresSection.classList.add('scroll-reveal');
if (subscriptionsSection) subscriptionsSection.classList.add('scroll-reveal');
if (footerSection) footerSection.classList.add('scroll-reveal');

// Add card-reveal class to subscription cards
allCards.forEach(card => {
  card.classList.add('card-reveal');
});

// Add feature-reveal class to feature boxes
featureBoxes.forEach(box => {
  box.classList.add('feature-reveal');
});

// Create intersection observer for scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      
      // If it's a card, add staggered delay
      if (entry.target.classList.contains('card-reveal')) {
        const cards = document.querySelectorAll('.subscriptions div');
        const index = Array.from(cards).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
      }
    }
  });
}, { 
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all elements with reveal classes
document.querySelectorAll('.scroll-reveal, .card-reveal, .feature-reveal').forEach(el => {
  revealObserver.observe(el);
});

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========== SMOOTH SCROLL FOR NAVIGATION ==========
document.querySelectorAll('.sections a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href') !== '#info') {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ========== SEARCH BAR FUNCTIONALITY ==========
const search = document.querySelector(".search");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");

if (btn) {
  btn.addEventListener("click", () => {
    search.classList.toggle("active");
    if (search.classList.contains("active")) {
      input.focus();
    }
  });
}

// Search Input Functionality
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const value = this.value.toLowerCase().trim();
      
      if (value === "") {
        return;
      }

      const allElements = document.querySelectorAll("body *");
      let found = false;

      for (let el of allElements) {
        if (
          el.tagName === "SCRIPT" ||
          el.tagName === "STYLE" ||
          el.tagName === "INPUT" ||
          el.tagName === "BUTTON" ||
          el.children.length > 0
        )
          continue;

        if (el.textContent && el.textContent.toLowerCase().includes(value)) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.style.backgroundColor = "#00c896";
          el.style.transition = "background-color 0.3s ease";
          el.style.color = "white";
          el.style.padding = "5px";
          el.style.borderRadius = "10px";

          setTimeout(() => {
            el.style.backgroundColor = "";
            el.style.color = "";
            el.style.padding = "";
            el.style.borderRadius = "";
          }, 2000);
          
          found = true;
          break;
        }
      }
      
      if (!found) {
        alert(`No results found for "${value}"`);
      }
    }
  });
}

// ========== MODAL FUNCTIONS ==========
function openModal(price) {
  const paymentModal = document.getElementById("paymentModal");
  const priceInput = document.getElementById("price");
  if (paymentModal && priceInput) {
    paymentModal.style.display = "flex";
    priceInput.value = price + "$";
    document.body.style.overflow = "hidden";
  }
}

function closeModal() {
  const paymentModal = document.getElementById("paymentModal");
  if (paymentModal) {
    paymentModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function openInfo() {
  const infoModal = document.getElementById("infoModal");
  if (infoModal) {
    infoModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeInfo() {
  const infoModal = document.getElementById("infoModal");
  if (infoModal) {
    infoModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function openFood() {
  const foodModal = document.getElementById("foodModal");
  if (foodModal) {
    foodModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeFood() {
  const foodModal = document.getElementById("foodModal");
  if (foodModal) {
    foodModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function openSports() {
  const sportsModal = document.getElementById("sportsModal");
  if (sportsModal) {
    sportsModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeSports() {
  const sportsModal = document.getElementById("sportsModal");
  if (sportsModal) {
    sportsModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function openHabits() {
  const habitsModal = document.getElementById("habitsModal");
  if (habitsModal) {
    habitsModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeHabits() {
  const habitsModal = document.getElementById("habitsModal");
  if (habitsModal) {
    habitsModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Close modal on outside click
window.onclick = function (e) {
  const paymentModal = document.getElementById("paymentModal");
  if (e.target === paymentModal) closeModal();
  
  const infoModal = document.getElementById("infoModal");
  if (e.target === infoModal) closeInfo();
  
  const foodModal = document.getElementById("foodModal");
  if (e.target === foodModal) closeFood();
  
  const sportsModal = document.getElementById("sportsModal");
  if (e.target === sportsModal) closeSports();
  
  const habitsModal = document.getElementById("habitsModal");
  if (e.target === habitsModal) closeHabits();
};

// Close on ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
    closeInfo();
    closeFood();
    closeSports();
    closeHabits();
    document.body.style.overflow = "auto";
  }
});

// ========== PAYMENT FORM VALIDATION ==========
const cardNumber = document.getElementById("cardNumber");
if (cardNumber) {
  cardNumber.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4);
    }
    if (value.length > 9) {
      value = value.slice(0, 9) + "-" + value.slice(9);
    }
    if (value.length > 14) {
      value = value.slice(0, 14) + "-" + value.slice(14, 18);
    }
    this.value = value;
  });
}

const expiryInput = document.getElementById("expire");
if (expiryInput) {
  expiryInput.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    if (value.length >= 2) {
      const month = parseInt(value.slice(0, 2));
      if (month > 12) value = "12" + value.slice(2);
    }
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    this.value = value;
  });
}

const paymentForm = document.querySelector("#paymentModal form");
if (paymentForm) {
  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username");
    const cardNumber = document.getElementById("cardNumber");
    const expire = document.getElementById("expire");
    const cvv = document.getElementById("cvv");
    const price = document.getElementById("price");
    
    if (!username.value.trim()) {
      alert("Please enter your username");
      username.focus();
      return;
    }
    
    if (!cardNumber.value.trim()) {
      alert("Please enter your card number");
      cardNumber.focus();
      return;
    }
    
    const cleanCardNumber = cardNumber.value.replace(/-/g, "");
    if (cleanCardNumber.length !== 16) {
      alert("Please enter a valid 16-digit card number");
      cardNumber.focus();
      return;
    }
    
    if (!expire.value.trim()) {
      alert("Please enter expiry date");
      expire.focus();
      return;
    }
    
    const expireRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    if (!expireRegex.test(expire.value)) {
      alert("Please enter a valid expiry date (MM/YY)");
      expire.focus();
      return;
    }
    
    if (!cvv.value.trim()) {
      alert("Please enter CVV");
      cvv.focus();
      return;
    }
    
    if (cvv.value.length !== 3) {
      alert("CVV must be 3 digits");
      cvv.focus();
      return;
    }
    
    alert(`✅ Payment Successful!\n\nThank you ${username.value}!\nAmount: ${price.value}\n\nYour subscription has been activated.`);
    this.reset();
    closeModal();
  });
}

// ========== BUTTON EVENT LISTENERS ==========
const downloadBtn = document.querySelector(".download");
if (downloadBtn) {
  downloadBtn.addEventListener("click", function () {
    alert("🚀 Thanks for your interest!\n\nThe Health Life App will be available for download soon.\n\nStay tuned!");
  });
}

const learnBtn = document.querySelector(".learn");
if (learnBtn) {
  learnBtn.addEventListener("click", function () {
    const subscriptionsSection = document.getElementById("subscriptions");
    if (subscriptionsSection) {
      subscriptionsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}


// Footer Links
const footerLinks = document.querySelectorAll(".links a");
footerLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    alert(`📄 ${this.textContent}\n\nThis page is under construction.\nPlease check back soon!`);
  });
});

// Prevent modal close when clicking inside
const modalContents = document.querySelectorAll(".modal-content, .info-content, .food-content, .sports-content, .habits-content");
modalContents.forEach(content => {
  content.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

// ========== INITIALIZATION ==========
window.addEventListener("load", function () {
  console.log("✅ Health Life App loaded with scroll effects and writing animation!");
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
  
  // Trigger initial reveal for visible elements
  setTimeout(() => {
    document.querySelectorAll('.scroll-reveal, .card-reveal, .feature-reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('revealed');
      }
    });
  }, 200);
});

// Mobile Responsive Toggle
const checkMobile = () => {
  if (window.innerWidth <= 768) {
    const sections = document.querySelector(".sections");
    const logo = document.querySelector(".logo");
    search.style.position='relative';
    search.style.top='0';
    if (sections && logo && !document.querySelector(".mobile-toggle")) {
      searchInput.style.position="relative"
      const toggleBtn = document.createElement("button");
      toggleBtn.innerHTML = "☰";
      toggleBtn.className = "mobile-toggle";
      toggleBtn.style.cssText = `
        position: absolute;
        right: 15px;
        top: 15px;
        background: #00c896;
        border: none;
        color: white;
        font-size: 24px;
        padding: 8px 15px;
        border-radius: 10px;
        cursor: pointer;
        z-index: 100;
      `;
      
      logo.parentElement.style.position = "relative";
      logo.parentElement.appendChild(toggleBtn);
      
      let isOpen = false;
      toggleBtn.addEventListener("click", () => {
        sections.style.display = isOpen ? "flex" : "none";
        isOpen = !isOpen;
      });
    }
  }
};

window.addEventListener("resize", checkMobile);
checkMobile();

console.log("✅ All JavaScript features with scroll effects and writing animation are ready!");