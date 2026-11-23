document.addEventListener("DOMContentLoaded", () => {
  try {
    const settings = JSON.parse(localStorage.getItem("meghpushpam_settings") || "{}");
    if (settings.heroTitle) {
      const title = document.querySelector("[data-site-hero-title]");
      if (title) title.innerHTML = settings.heroTitle;
    }
    if (settings.heroText) {
      const text = document.querySelector("[data-site-hero-text]");
      if (text) text.textContent = settings.heroText;
    }
    if (settings.contactEmail) {
      document.querySelectorAll("[data-site-email]").forEach(el => el.textContent = settings.contactEmail);
    }
    const content = JSON.parse(localStorage.getItem("meghpushpam_content") || "{}");
    if (content.brandTagline) document.querySelectorAll("[data-site-tagline]").forEach(el => el.textContent = content.brandTagline);
    if (content.publicPhone) document.querySelectorAll("[data-site-phone]").forEach(el => el.textContent = content.publicPhone);
    if (content.brandDescription) document.querySelectorAll("[data-site-brand-description]").forEach(el => el.textContent = content.brandDescription);
    if (content.footerText) document.querySelectorAll("[data-site-footer]").forEach(el => el.textContent = content.footerText);
  } catch (_) {}

  try {
    const pages = JSON.parse(localStorage.getItem("meghpushpam_pages") || "{}");
    const key = window.location.pathname.split("/").pop() || "index.html";
    const page = pages[key];
    if (page) {
      const heroTitle = document.querySelector(".page-hero h1");
      const heroSubtitle = document.querySelector(".page-hero p");
      if (heroTitle && page.title) heroTitle.textContent = page.title;
      if (heroSubtitle && page.subtitle) heroSubtitle.textContent = page.subtitle;
      if (page.title) document.title = `${page.title} | Meghpushpam`;
    }
  } catch (_) {}

  try {
    const distributorContent = JSON.parse(localStorage.getItem("meghpushpam_distributor") || "{}");
    Object.entries(distributorContent).forEach(([key, value]) => {
      const element = document.querySelector(`[data-distributor="${key}"]`);
      if (element && typeof value === "string") element.textContent = value;
    });
  } catch (error) {
    console.error("Could not load distributor page content.", error);
  }
  window.addEventListener("storage", event => {
    if (event.key !== "meghpushpam_distributor") return;
    try {
      const updatedContent = JSON.parse(event.newValue || "{}");
      Object.entries(updatedContent).forEach(([key, value]) => {
        const element = document.querySelector(`[data-distributor="${key}"]`);
        if (element && typeof value === "string") element.textContent = value;
      });
    } catch (error) {
      console.error("Could not update distributor page content.", error);
    }
  });

  const heroTitle = document.querySelector("[data-site-hero-title]");
  const heroText = document.querySelector("[data-site-hero-text]");
  const heroImage = document.querySelector(".hero-visual > img");
  if (heroTitle && heroText && heroImage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let settings = {};
    try { settings = JSON.parse(localStorage.getItem("meghpushpam_settings") || "{}"); } catch (_) {}
    const slides = [
      {
        title: settings.heroTitle || "Discover a better way to <span>live, grow & thrive.</span>",
        text: settings.heroText || "Explore a thoughtful world of wellness, innovative lifestyle solutions, and meaningful opportunities with Meghpushpam.",
        image: "images/banner-img5.png",
        alt: "Meghpushpam LEVELUK K8 wellness solution"
      },
      {
        title: "Build <span>healthier daily habits.</span>",
        text: "Learn about hydration, balanced living, and practical choices that fit naturally into your everyday routine.",
        image: "images/company-img1.png",
        alt: "Balanced lifestyle with Meghpushpam"
      },
      {
        title: "Grow with <span>purpose and clarity.</span>",
        text: "Explore trusted guidance, considered products, and an opportunity designed around learning and responsible participation.",
        image: "images/banner-img7.png",
        alt: "Meghpushpam ANESPA DX wellness solution"
      }
    ];
    let slideIndex = 0;
    window.setInterval(() => {
      slideIndex = (slideIndex + 1) % slides.length;
      const slide = slides[slideIndex];
      heroTitle.classList.add("hero-switch");
      heroText.classList.add("hero-switch");
      heroImage.classList.add("hero-switch");
      window.setTimeout(() => {
        heroTitle.innerHTML = slide.title;
        heroText.textContent = slide.text;
        heroImage.src = slide.image;
        heroImage.alt = slide.alt;
      }, 220);
      window.setTimeout(() => {
        heroTitle.classList.remove("hero-switch");
        heroText.classList.remove("hero-switch");
        heroImage.classList.remove("hero-switch");
      }, 520);
    }, 5200);
  }

  const header = document.querySelector(".header");
  const progress = document.querySelector(".progress");
  const backTop = document.querySelector(".back-top");
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");
  if (navList) {
    const path = window.location.pathname.replace(/\\/g, "/");
    const inSubfolder = /\/(products|blog)\//.test(path);
    if (inSubfolder && header) header.classList.add("inner-header");
    const prefix = inSubfolder ? "../" : "";
    const active = path.split("/").pop() || "index.html";
    const inProducts = active === "products.html" || (inSubfolder && path.includes("/products/"));
    const inOpportunity = active === "opportunity.html";
    const inDistributor = active === "distributor.html";
    navList.innerHTML = `
      <li><a class="nav-link${active === "index.html" ? " active" : ""}" href="${prefix}index.html">Home</a></li>
      <li><a class="nav-link${active === "about.html" ? " active" : ""}" href="${prefix}about.html">About</a></li>
      <li class="nav-item has-dropdown products-dropdown">
        <a class="nav-link${inProducts ? " active" : ""}" href="${prefix}products.html">Products <span class="dropdown-arrow" aria-hidden="true">⌄</span></a>
        <div class="dropdown products-menu">
          <a class="dropdown-featured" href="${prefix}products.html">
            <span class="dropdown-featured-icon">MP</span>
            <span><strong>Explore the Collection</strong><small>View all Meghpushpam products</small></span>
          </a>
          <span class="dropdown-label">Featured products</span>
          <a href="${prefix}products/leveluk-k8.html"><span>01</span><strong>LEVELUK K8</strong></a>
          <a href="${prefix}products/anespa-dx.html"><span>02</span><strong>ANESPA DX</strong></a>
          <a href="${prefix}products/enaguarde.html"><span>03</span><strong>ENAGuarde</strong></a>
        </div>
      </li>
      <li><a class="nav-link${active === "wellness.html" ? " active" : ""}" href="${prefix}wellness.html">Wellness Academy</a></li>
      <li><a class="nav-link${inOpportunity ? " active" : ""}" href="${prefix}opportunity.html">Business Opportunity</a></li>
      <li><a class="nav-link${inDistributor ? " active" : ""}" href="${prefix}distributor.html">Distributor</a></li>
      <li><a class="nav-link nav-cta" href="${prefix}contact.html">Get in Touch</a></li>`;
  }

  const footer = document.querySelector(".footer");
  if (footer) {
    const path = window.location.pathname.replace(/\\/g, "/");
    const inSubfolder = /\/(products|blog)\//.test(path);
    const prefix = inSubfolder ? "../" : "";
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="${prefix}images/logo.png" alt="Meghpushpam">
            <p><strong style="color:white" data-site-tagline>WELLNESS. WEALTH. WORLDWIDE.</strong></p>
            <p data-site-brand-description>A brand experience focused on education, balanced living and responsible opportunity.</p>
          </div>
          <div><h3>Explore</h3><div class="footer-links"><a href="${prefix}about.html">About Us</a><a href="${prefix}company.html">Our Company</a><a href="${prefix}opportunity.html">Opportunities</a><a href="${prefix}team.html">Our Team</a></div></div>
          <div><h3>Resources</h3><div class="footer-links"><a href="${prefix}products.html">Products</a><a href="${prefix}wellness.html">Wellness</a><a href="${prefix}news.html">News &amp; Blog</a><a href="${prefix}faq.html">FAQ</a></div></div>
          <div><h3>Stay Connected</h3><p data-site-footer>Receive thoughtful updates and editorial news.</p><form class="newsletter" data-newsletter><input type="email" aria-label="Email address" placeholder="Email address" required><button type="submit" aria-label="Subscribe">→</button></form><div class="footer-links" style="margin-top:15px"><a href="${prefix}contact.html">Contact Us</a><a href="${prefix}privacy-policy.html">Privacy Policy</a><a href="${prefix}terms.html">Terms &amp; Conditions</a></div></div>
        </div>
        <div class="footer-bottom"><span>© 2026 Meghpushpam. All rights reserved.</span><span>Website content should be reviewed before publication.</span></div>
      </div>`;
    try {
      const content = JSON.parse(localStorage.getItem("meghpushpam_content") || "{}");
      if (content.brandTagline) footer.querySelectorAll("[data-site-tagline]").forEach(el => el.textContent = content.brandTagline);
      if (content.brandDescription) footer.querySelectorAll("[data-site-brand-description]").forEach(el => el.textContent = content.brandDescription);
      if (content.footerText) footer.querySelectorAll("[data-site-footer]").forEach(el => el.textContent = content.footerText);
    } catch (_) {}
  }

  const updateScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (backTop) backTop.classList.toggle("show", y > 600);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    }
  };
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      const open = navList.classList.toggle("open");
      document.body.classList.toggle("menu-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });
  }
  document.querySelectorAll(".has-dropdown > .nav-link").forEach(link => {
    link.addEventListener("click", event => {
      if (window.innerWidth <= 1050) {
        event.preventEvent?.();
        event.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });
  document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", () => {
      navList?.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });
  document.querySelectorAll(".back-top").forEach(button => button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" })));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const open = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  });

  const articleGrid = document.querySelector(".article-grid");
  if (articleGrid) {
    try {
      const articles = JSON.parse(localStorage.getItem("meghpushpam_articles") || "[]");
      if (articles.length) {
        articleGrid.insertAdjacentHTML("beforeend", articles.map(article => `
          <article class="article-card reveal">
            <img src="${article.image||"images/img-1.png"}" alt="${String(article.title||"Article").replace(/"/g,"&quot;")}">
            <div class="article-content"><span class="product-category">${String(article.category||"Article")}</span><h3>${String(article.title||"Untitled")}</h3><p>${String(article.summary||"Editorial article.")}</p><a class="btn btn-blue-outline" href="news.html">Read More</a></div>
          </article>
        `).join(""));
      }
    } catch (_) {}
  }

  const productGrid = document.querySelector(".product-grid");
  if (productGrid) {
    try {
      const storedProducts = JSON.parse(localStorage.getItem("meghpushpam_products") || "null");
      if (storedProducts && Array.isArray(storedProducts)) {
        productGrid.innerHTML = storedProducts.map(product => `
          <article class="product-card" data-category="${String(product.category||"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}" data-name="${String(product.name||"").replace(/"/g,"&quot;")}">
            <a class="product-image" href="${product.link || "product.html"}"><img src="${product.image || "images/logo.png"}" alt="${String(product.name||"Product").replace(/"/g,"&quot;")}"></a>
            <div class="product-info"><span class="product-category">${String(product.category||"Product")}</span><h3>${String(product.name||"Unnamed Product")}</h3><p>${String(product.description||"Product information available on request.")}</p><a class="btn btn-blue-outline" href="${product.link || "product.html"}">View Details</a></div>
          </article>
        `).join("");
      }
    } catch (_) {}
    const search = document.querySelector("[data-product-search]");
    const filter = document.querySelector("[data-product-filter]");
    const sort = document.querySelector("[data-product-sort]");
    const applyProducts = () => {
      const cards = [...productGrid.querySelectorAll(".product-card")];
      const term = (search?.value || "").toLowerCase();
      const category = filter?.value || "all";
      cards.forEach(card => {
        const matchesSearch = card.textContent.toLowerCase().includes(term);
        const matchesCategory = category === "all" || card.dataset.category === category;
        card.style.display = matchesSearch && matchesCategory ? "" : "none";
      });
      if (sort?.value === "name") {
        cards.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name)).forEach(card => productGrid.appendChild(card));
      }
    };
    [search, filter, sort].forEach(control => control?.addEventListener("input", applyProducts));
  }

  document.querySelectorAll("[data-validate-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const message = form.querySelector(".form-message");
      if (!form.checkValidity()) {
        form.reportValidity();
        if (message) {
          message.className = "form-message error";
          message.textContent = "Please complete the required fields before submitting.";
        }
        return;
      }
      if (message) {
        message.className = "form-message success";
        message.textContent = "Thank you. This demo form is ready for integration with a secure backend or form service.";
        try {
          const submissions = JSON.parse(localStorage.getItem("meghpushpam_enquiries") || "[]");
          const data = Object.fromEntries(new FormData(form).entries());
          submissions.unshift({ id: Date.now(), createdAt: new Date().toISOString(), ...data });
          localStorage.setItem("meghpushpam_enquiries", JSON.stringify(submissions));
        } catch (_) {}
      }
      form.reset();
    });
  });

  document.querySelectorAll("[data-newsletter]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventEvent?.();
      event.preventDefault();
      const input = form.querySelector("input[type=email]");
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
      try {
        const subscribers = JSON.parse(localStorage.getItem("meghpushpam_subscribers") || "[]");
        subscribers.unshift({ id: Date.now(), email: input.value, createdAt: new Date().toISOString() });
        localStorage.setItem("meghpushpam_subscribers", JSON.stringify(subscribers));
      } catch (_) {}
      input.value = "";
      input.placeholder = "Thank you - integration required";
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
});
