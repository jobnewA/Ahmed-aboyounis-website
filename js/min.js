window.addEventListener("load", function () {
  document.querySelector(".page-loader").style.display = "none";
});

function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";
  const icon = document.getElementById("theme-icon");

  if (isDark) {
    root.setAttribute("data-theme", "light");
    icon.className = "bi bi-lightbulb";
  } else {
    root.setAttribute("data-theme", "dark");
    icon.className = "bi bi-lightbulb-fill";
  }
}

// عند تحميل الصفحة، خليه يعرض الأيقونة المناسبة حسب الثيم الحالي
window.addEventListener("DOMContentLoaded", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const icon = document.getElementById("theme-icon");
  icon.className = isDark ? "bi bi-lightbulb-fill" : "bi bi-lightbulb";
});

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex = (newIndex + cards.length) % cards.length;

  cards.forEach((card, i) => {
    const offset = (i - currentIndex + cards.length) % cards.length;

    card.classList.remove(
      "center",
      "left-1",
      "left-2",
      "right-1",
      "right-2",
      "hidden"
    );

    if (offset === 0) {
      card.classList.add("center");
    } else if (offset === 1) {
      card.classList.add("right-1");
    } else if (offset === 2) {
      card.classList.add("right-2");
    } else if (offset === cards.length - 1) {
      card.classList.add("left-1");
    } else if (offset === cards.length - 2) {
      card.classList.add("left-2");
    } else {
      card.classList.add("hidden");
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });

  setTimeout(() => {
    isAnimating = false;
  }, 800);
}

leftArrow.addEventListener("click", () => {
  updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
  updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    updateCarousel(i);
  });
});

cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    updateCarousel(i);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    updateCarousel(currentIndex - 1);
  } else if (e.key === "ArrowRight") {
    updateCarousel(currentIndex + 1);
  }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      updateCarousel(currentIndex + 1);
    } else {
      updateCarousel(currentIndex - 1);
    }
  }
}

updateCarousel(0);

window.onload = function () {
  try {
    TagCanvas.Start("cloud", "tags", {
      textColour: null, // نخلي الألوان من الـ <a style="color:...">
      outlineMethod: "none", // نشيل البوردر عند الوقوف
      reverse: true,
      depth: 0.8,
      maxSpeed: 0.05,
      textFont: "Arial, sans-serif",
      textHeight: 10, // حجم الخط
      freezeActive: true,
      shuffleTags: true,
    });
  } catch (e) {
    document.getElementById("cloud").outerHTML =
      "<div>TagCanvas not loaded!</div>";
  }
};

const text =
  "Hi, I'm Ahmed Aboyounis an expert in SEO and a WordPress Developer, with solid experience in solving search engine issues and optimizing website performance. I help businesses grow online by combining smart strategies with clean, high-performing code.";

const container = document.getElementById("animatedText");
const words = text.split(" ");

gsap.registerPlugin(ScrollTrigger);

let wordSpans = [];

// إنشاء عناصر span لكل كلمة وإخفائها
words.forEach((word, index) => {
  const span = document.createElement("span");
  span.textContent = word + " ";
  span.style.opacity = 0;
  container.appendChild(span);
  wordSpans.push(span);
});

// حركة الظهور عند السحب لأسفل
gsap.to(wordSpans, {
  scrollTrigger: {
    trigger: "#hero-intro",
    start: "top top",
    end: "+=100%",
    scrub: true,
    pin: true,
  },
  opacity: 1,
  stagger: {
    each: 0.05,
  },
  ease: "power2.out",
});

// حركة الاختفاء عند الرجوع لأعلى
gsap.to(wordSpans, {
  scrollTrigger: {
    trigger: "#hero-intro",
    start: "top top",
    end: "+=100%",
    scrub: true,
  },
  opacity: (i, target, t) => 1 - i / wordSpans.length,
  stagger: {
    each: 0.05,
  },
  ease: "power2.in",
});

const s = document.createElement("script");
s.src =
  "https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js";
s.type = "module";
document.head.appendChild(s);

document.addEventListener("DOMContentLoaded", function () {
  let chatButton = document.createElement("button");
  chatButton.style.cssText = `
    position: fixed;
    bottom: 66px;
    right: 5px;
    background: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1000;
    display: flex;
  `;
  document.body.appendChild(chatButton);

  const lottieIcon = document.createElement("dotlottie-wc");
  lottieIcon.setAttribute(
    "src",
    "https://lottie.host/b51458ca-1033-4804-81d2-c107876d16c2/0DR3YPLNSL.json"
  );
  lottieIcon.setAttribute("autoplay", "");
  lottieIcon.setAttribute("loop", "");
  lottieIcon.setAttribute("speed", "1");
  lottieIcon.style.cssText = "width: 90px; height: 90px;";
  chatButton.appendChild(lottieIcon);

  let chatContainer = document.createElement("div");
  chatContainer.style.cssText = `
    position: fixed;
    bottom: 150px;
    right: 20px;
    width: 320px;
    height: 420px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    display: none;
    flex-direction: column;
    overflow: hidden;
    z-index: 1001;
  `;

  let chatHeader = document.createElement("div");
  chatHeader.innerText = "🤖 Personal Assistant";
  chatHeader.style.cssText = `
    background: #0C62A4;
    color: var(--text-color);
    padding: 12px;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
  `;

  let chatMessages = document.createElement("div");
  chatMessages.style.cssText = `
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background: #f9f9f9;
  `;

  let optionsContainer = document.createElement("div");

let questions = {
  "Who am I?":
    "I am Ahmed Aboyounis, a Computer Science student, WordPress Developer, and SEO Specialist. I work on developing high-performance websites and improving their visibility on search engines.",

  "What is your professional experience?":
    "I have experience as a freelance programmer for one year, worked as an SEO specialist in companies like GoalMakers, Racing, and Saturn, and currently work as a WordPress developer at GoalMakers.",

  "What are your areas of expertise?":
    "WordPress development from scratch, theme and plugin development, SEO optimization, Python programming tools, and UI/UX design.",

  "What recent projects have you completed?":
    "I developed a WordPress Custom Forms Plugin, an Abaya Size Calculator on Zed, a custom 404 page on WordPress, and a Python tool to connect an e-commerce site with a billing platform.",

  "What are your SEO results?":
    "In 3 months, I improved website visibility from unknown to first-page ranking, increased CTR by 70%, and indexed over 100 new pages.",

  "What certifications do you have?":
    "Certifications in Front End from Createivo, Advanced SEO from Seomostamr, and WordPress development from YouTube and advanced workshops.",

  "Which tools do you use?":
    "WordPress, PHP, WooCommerce, Salla, Zid, Shopify, Ahrefs, SEMrush, Google Analytics, Google Search Console, Google Tag Manager, Google Maps.",

  "Can I download your CV?":
    "Yes, you can download my CV directly from the website.",

  "How can I contact you?":
    "Via email or WhatsApp, and you can also follow me on LinkedIn, Facebook, and Instagram."
};


  Object.keys(questions).forEach((q) => {
    let btn = document.createElement("button");
    btn.innerText = q;
    btn.style.cssText = `
      display: block;
      width: 100%;
      margin: 5px 0;
      padding: 10px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      text-align: right;
    `;
    btn.onclick = () => {
      let user = document.createElement("div");
      user.style.cssText = `
        background: var(--bg-color);
        padding: 8px;
        margin: 8px 0 8px 30px;
        border-radius: 8px;
        font-size: 13px;
        text-align: right;
      `;
      user.innerText = q;
      chatMessages.appendChild(user);

      setTimeout(() => {
        let bot = document.createElement("div");
        bot.style.cssText = `
          background: #0C62A4;
          color: white;
          padding: 8px;
          margin: 0 30px 8px 0;
          border-radius: 8px;
          font-size: 13px;
          text-align: right;
        `;
        bot.innerText = questions[q];
        chatMessages.appendChild(bot);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 400);

      chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    optionsContainer.appendChild(btn);
  });

  // WhatsApp button
  let notFoundBtn = document.createElement("button");
  notFoundBtn.innerText = "📲 Chat with me on WhatsApp";
  notFoundBtn.style.cssText = `
    background: #25D366;
    color: white;
    padding: 10px;
    margin-top: 10px;
    border: none;
    width: 100%;
    font-size: 14px;
    border-radius: 6px;
    cursor: pointer;
  `;
  notFoundBtn.onclick = function () {
    window.open("https://wa.me/201142242076", "_blank");
  };
  optionsContainer.appendChild(notFoundBtn);

  // Direct call button
  let callButton = document.createElement("button");
  callButton.innerText = "📞 Call Now";
  callButton.style.cssText = `
    background: #28a745;
    color: white;
    padding: 10px;
    margin-top: 10px;
    border: none;
    width: 100%;
    font-size: 14px;
    border-radius: 6px;
    cursor: pointer;
  `;
  callButton.onclick = () => window.open("tel:+201142242076", "_self");
  optionsContainer.appendChild(callButton);

  chatButton.onclick = function () {
    const wasHidden = chatContainer.style.display === "none";
    chatContainer.style.display = wasHidden ? "flex" : "none";

    if (wasHidden && chatMessages.innerHTML.trim() === "") {
      // رسالة ترحيب تلقائية
      const welcome = document.createElement("div");
      welcome.style.cssText = `
        background: #0C62A4;
        color: white;
        padding: 8px;
        margin: 0 30px 8px 0;
        border-radius: 8px;
        font-size: 13px;
        text-align: right;
      `;
      welcome.innerText = "👋 Hello! How can I assist you today?";
      chatMessages.appendChild(welcome);
      chatMessages.appendChild(optionsContainer);
    }
  };

  chatContainer.appendChild(chatHeader);
  chatContainer.appendChild(chatMessages);
  document.body.appendChild(chatContainer);
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const gmailLink = `https://mail.google.com/mail/u/0/?to=ahmedaboyouniscodee@gmail.com&fs=1&tf=cm&su=${encodeURIComponent(
    "رسالة من " + name
  )}&body=${encodeURIComponent("البريد: " + email + "\n\n" + message)}`;

  window.open(gmailLink, "_blank"); // تفتح في تبويب جديد
});

const script = document.createElement("script");
script.src =
  "https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.2/dist/vanilla-tilt.min.js";
script.onload = () => VanillaTilt.init(document.querySelectorAll(".impact"));
document.head.appendChild(script);

// <!-- new section -->
const projectCards = document.querySelectorAll(".project-card");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDesc = document.getElementById("popup-desc");
const closeBtn = document.querySelector(".close-btn");

// Show Popup
projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const videoSrc = card.dataset.video; // تحقق لو فيه فيديو
    const imgSrc = card.dataset.img;

    // إزالة أي فيديو موجود مسبقًا في Popup
    const existingVideo = document.getElementById("popup-video");
    if (existingVideo) {
      existingVideo.remove();
    }

    if (videoSrc) {
      popupImg.style.display = "none"; // اخفاء الصورة
      const popupVideo = document.createElement("video");
      popupVideo.id = "popup-video";
      popupVideo.src = videoSrc;
      popupVideo.autoplay = true;
      popupVideo.loop = true;
      popupVideo.muted = true;
      popupVideo.playsInline = true;
      popupVideo.style.width = "100%";
      popupVideo.style.borderRadius = "10px";
      popupVideo.style.marginBottom = "15px";
      popup.querySelector(".popup-content").prepend(popupVideo);

      // تشغيل الفيديو فورًا
      popupVideo.play();
    } else {
      popupImg.style.display = "block";
      popupImg.src = imgSrc;
    }

    popupTitle.textContent = card.dataset.title;
    popupDesc.textContent = card.dataset.desc;
    popup.style.display = "flex";
  });
});
// Close Popup
closeBtn.addEventListener("click", () => {
  const popupVideo = document.getElementById("popup-video");
  if (popupVideo) popupVideo.pause(); // إيقاف الفيديو عند إغلاق
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    const popupVideo = document.getElementById("popup-video");
    if (popupVideo) popupVideo.pause();
    popup.style.display = "none";
  }
});
