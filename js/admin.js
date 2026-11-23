document.addEventListener("DOMContentLoaded", () => {
  const loginView = document.querySelector("#loginView");
  const adminShell = document.querySelector("#adminShell");
  const loginForm = document.querySelector("#loginForm");
  const loginError = document.querySelector("#loginError");
  const sessionKey = "meghpushpam_admin_session";
  const showDashboard = () => { loginView.classList.add("hidden"); adminShell.classList.remove("hidden"); };
  if (sessionStorage.getItem(sessionKey) === "active") showDashboard();

  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    if (document.querySelector("#adminId").value.trim() === "admin" && document.querySelector("#adminPassword").value === "meghpushpam2026") {
      sessionStorage.setItem(sessionKey, "active");
      loginError.style.display = "none";
      showDashboard();
      renderDashboard();
    } else loginError.style.display = "block";
  });
  document.querySelector("#logoutButton").addEventListener("click", () => { sessionStorage.removeItem(sessionKey); location.reload(); });

  document.querySelectorAll("[data-admin-tab]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-admin-tab]").forEach(item => item.classList.remove("active"));
    document.querySelectorAll("[data-admin-panel]").forEach(panel => panel.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`[data-admin-panel="${button.dataset.adminTab}"]`)?.classList.add("active");
  }));

  const read = key => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch (_) { return []; } };
  const readObject = key => { try { return JSON.parse(localStorage.getItem(key) || "{}"); } catch (_) { return {}; } };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" })[char]);
  const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

  const defaultProducts = [
    { id:"leveluk-jr-iv", name:"LEVELUK Jr IV", category:"Water ionizer", description:"An entry-level model in the LEVELUK range.", image:"images/banner-img2.png", link:"products/leveluk-jr-iv.html" },
    { id:"leveluk-sd-501", name:"LEVELUK SD 501", category:"Water ionizer", description:"A model featured in the Meghpushpam collection.", image:"images/banner-img3.png", link:"products/leveluk-sd-501.html" },
    { id:"leveluk-sd-501-platinum", name:"LEVELUK SD 501 Platinum", category:"Water ionizer", description:"The Platinum variant of the SD 501 range.", image:"images/banner-img4.png", link:"products/leveluk-sd-501-platinum.html" },
    { id:"leveluk-k8", name:"LEVELUK K8", category:"Water ionizer", description:"Explore this LEVELUK model and available information.", image:"images/banner-img5.png", link:"products/leveluk-k8.html" },
    { id:"leveluk-super-501", name:"LEVELUK Super 501", category:"Water ionizer", description:"A model in the Super 501 product family.", image:"images/banner-img6.png", link:"products/leveluk-super-501.html" },
    { id:"anespa-dx", name:"ANESPA DX", category:"Spa", description:"A lifestyle shower spa solution.", image:"images/banner-img7.png", link:"products/anespa-dx.html" },
    { id:"enaguarde", name:"ENAGuarde", category:"Filtration", description:"Explore the ENAGuarde filtration overview.", image:"images/banner-img8.png", link:"products/enaguarde.html" }
  ];
  const getProducts = () => {
    const stored = localStorage.getItem("meghpushpam_products");
    if (stored === null) { write("meghpushpam_products", defaultProducts); return defaultProducts; }
    try { return JSON.parse(stored); } catch (_) { return defaultProducts; }
  };
  const getArticles = () => read("meghpushpam_articles");

  const renderDashboard = () => {
    const enquiries = read("meghpushpam_enquiries");
    const subscribers = read("meghpushpam_subscribers");
    const products = getProducts();
    const articles = getArticles();
    document.querySelector("#enquiryCount").textContent = enquiries.length;
    document.querySelector("#subscriberCount").textContent = subscribers.length;
    document.querySelector("#productCount").textContent = products.length;

    document.querySelector("#enquiryRows").innerHTML = enquiries.length ? enquiries.map(item => `<tr><td>${escapeHtml(new Date(item.createdAt).toLocaleString())}</td><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.email)}</td><td>${escapeHtml(item.phone)}</td><td>${escapeHtml(item.subject)}</td><td>${escapeHtml(item.type)}</td><td>${escapeHtml(item.message)}</td></tr>`).join("") : '<tr><td colspan="7">No enquiries received in this browser yet.</td></tr>';
    document.querySelector("#subscriberRows").innerHTML = subscribers.length ? subscribers.map(item => `<tr><td>${escapeHtml(new Date(item.createdAt).toLocaleString())}</td><td>${escapeHtml(item.email)}</td></tr>`).join("") : '<tr><td colspan="2">No newsletter subscribers yet.</td></tr>';

    document.querySelector("#productRows").innerHTML = products.length ? products.map(product => `<tr><td><strong>${escapeHtml(product.name)}</strong></td><td>${escapeHtml(product.category)}</td><td>${escapeHtml(product.image)}</td><td><div class="admin-actions"><button type="button" data-edit-product="${escapeHtml(product.id)}">Edit</button><button type="button" data-delete-product="${escapeHtml(product.id)}">Delete</button></div></td></tr>`).join("") : '<tr><td colspan="4">No products added.</td></tr>';
    document.querySelector("#articleRows").innerHTML = articles.length ? articles.map(article => `<tr><td><strong>${escapeHtml(article.title)}</strong></td><td>${escapeHtml(article.category)}</td><td><div class="admin-actions"><button type="button" data-edit-article="${escapeHtml(article.id)}">Edit</button><button type="button" data-delete-article="${escapeHtml(article.id)}">Delete</button></div></td></tr>`).join("") : '<tr><td colspan="3">No articles added.</td></tr>';

    const settings = readObject("meghpushpam_settings");
    if (settings.heroTitle) document.querySelector("#heroTitle").value = settings.heroTitle.replace(/<[^>]*>/g, "");
    if (settings.heroText) document.querySelector("#heroText").value = settings.heroText;
    if (settings.contactEmail) document.querySelector("#contactEmail").value = settings.contactEmail;
    if (settings.contactPhone) document.querySelector("#contactPhone").value = settings.contactPhone;
    const content = readObject("meghpushpam_content");
    ["brandTagline","publicPhone","brandDescription","footerText"].forEach(key => { if (content[key]) document.querySelector(`#${key}`).value = content[key]; });
  };

  document.querySelector("#clearEnquiries").addEventListener("click", () => { if (confirm("Clear all enquiries?")) { localStorage.removeItem("meghpushpam_enquiries"); renderDashboard(); } });
  document.querySelector("#clearSubscribers").addEventListener("click", () => { if (confirm("Clear all subscribers?")) { localStorage.removeItem("meghpushpam_subscribers"); renderDashboard(); } });

  document.querySelector("#settingsForm").addEventListener("submit", event => {
    event.preventDefault();
    write("meghpushpam_settings", { heroTitle:document.querySelector("#heroTitle").value.trim(), heroText:document.querySelector("#heroText").value.trim(), contactEmail:document.querySelector("#contactEmail").value.trim(), contactPhone:document.querySelector("#contactPhone").value.trim() });
    const message=document.querySelector("#settingsMessage"); message.className="form-message success"; message.textContent="Homepage settings saved.";
  });
  document.querySelector("#contentForm").addEventListener("submit", event => {
    event.preventEvent?.();
    event.preventDefault();
    write("meghpushpam_content",{ brandTagline:document.querySelector("#brandTagline").value.trim(), publicPhone:document.querySelector("#publicPhone").value.trim(), brandDescription:document.querySelector("#brandDescription").value.trim(), footerText:document.querySelector("#footerText").value.trim() });
    const message=document.querySelector("#contentMessage"); message.className="form-message success"; message.textContent="Page content saved.";
  });

  document.querySelector("#productForm").addEventListener("submit", event => {
    event.preventEvent?.();
    event.preventDefault();
    const products=getProducts();
    const id=document.querySelector("#productId").value;
    const itemId=id||uid();
    const item={ id:itemId, name:document.querySelector("#productName").value.trim(), category:document.querySelector("#productCategory").value.trim(), description:document.querySelector("#productDescription").value.trim(), image:document.querySelector("#productImage").value.trim()||"images/logo.png", link:document.querySelector("#productLink").value.trim()||`product.html?id=${encodeURIComponent(itemId)}` };
    if(id){ const index=products.findIndex(product=>product.id===id); if(index>=0) products[index]=item; } else products.push(item);
    write("meghpushpam_products",products); event.target.reset(); document.querySelector("#productId").value=""; document.querySelector("#productSubmit").textContent="Add Product"; renderDashboard();
  });
  document.querySelector("#cancelProductEdit").addEventListener("click",()=>{document.querySelector("#productForm").reset();document.querySelector("#productId").value="";document.querySelector("#productSubmit").textContent="Add Product";});
  document.querySelector("#productRows").addEventListener("click",event=>{
    const edit=event.target.closest("[data-edit-product]");
    const remove=event.target.closest("[data-delete-product]");
    if(edit){ const item=getProducts().find(product=>product.id===edit.dataset.editProduct); if(!item)return; document.querySelector("#productId").value=item.id;document.querySelector("#productName").value=item.name;document.querySelector("#productCategory").value=item.category;document.querySelector("#productDescription").value=item.description||"";document.querySelector("#productImage").value=item.image||"";document.querySelector("#productLink").value=item.link||"";document.querySelector("#productSubmit").textContent="Save Product";}
    if(remove&&confirm("Delete this product?")){write("meghpushpam_products",getProducts().filter(product=>product.id!==remove.dataset.deleteProduct));renderDashboard();}
  });

  document.querySelector("#articleForm").addEventListener("submit", event=>{
    event.preventEvent?.();event.preventDefault();
    const articles=getArticles();const id=document.querySelector("#articleId").value;
    const item={id:id||uid(),title:document.querySelector("#articleTitle").value.trim(),category:document.querySelector("#articleCategory").value.trim(),summary:document.querySelector("#articleSummary").value.trim(),image:document.querySelector("#articleImage").value.trim()||"images/img-1.png"};
    if(id){const index=articles.findIndex(article=>article.id===id);if(index>=0)articles[index]=item;}else articles.push(item);
    write("meghpushpam_articles",articles);event.target.reset();document.querySelector("#articleId").value="";document.querySelector("#articleSubmit").textContent="Add Article";renderDashboard();
  });
  document.querySelector("#cancelArticleEdit").addEventListener("click",()=>{document.querySelector("#articleForm").reset();document.querySelector("#articleId").value="";document.querySelector("#articleSubmit").textContent="Add Article";});
  document.querySelector("#articleRows").addEventListener("click",event=>{
    const edit=event.target.closest("[data-edit-article]");
    const remove=event.target.closest("[data-delete-article]");
    if(edit){const item=getArticles().find(article=>article.id===edit.dataset.editArticle);if(!item)return;document.querySelector("#articleId").value=item.id;document.querySelector("#articleTitle").value=item.title;document.querySelector("#articleCategory").value=item.category;document.querySelector("#articleSummary").value=item.summary||"";document.querySelector("#articleImage").value=item.image||"";document.querySelector("#articleSubmit").textContent="Save Article";}
    if(remove&&confirm("Delete this article?")){write("meghpushpam_articles",getArticles().filter(article=>article.id!==remove.dataset.deleteArticle));renderDashboard();}
  });

  const distributorDefaults = {
    opportunityHeading:"Build product knowledge and customer relationships.",
    opportunityText1:"Meghpushpam distributors introduce customers to the product range, share accurate product information and help interested people find the right information before making a decision.",
    opportunityText2:"This is a relationship- and product-focused business opportunity. Participation should be based on verified product details, written terms and a clear understanding of any costs and responsibilities.",
    modelIntro:"Confirm the official distributor agreement and current compensation plan before participating.",
    step1Title:"Learn",
    step1Text:"Understand product features, pricing, appropriate claims and the official distributor requirements.",
    step2Title:"Share",
    step2Text:"Provide interested customers with clear, accurate information and direct them to verified product resources.",
    step3Title:"Support",
    step3Text:"Respond to customer questions and provide follow-up in line with the official policies and your role.",
    reviewHeading:"Review the details that matter.",
    reviewText:"Ask for the current written terms, eligibility requirements, product pricing, any startup or ongoing costs, applicable refund policies and the official compensation plan. Take time to review them and decide whether the opportunity suits your circumstances.",
    disclaimer:"Earnings are not guaranteed. Results depend on individual activity and the official terms; review all costs and conditions before participating."
  };
  const distributorFields = Object.keys(distributorDefaults).map(key => ({
    key,
    input:document.querySelector(`#distributor${key[0].toUpperCase()}${key.slice(1)}`)
  }));
  const loadDistributorContent = () => {
    const saved = readObject("meghpushpam_distributor");
    distributorFields.forEach(({key,input}) => { if (input) input.value = saved[key] ?? distributorDefaults[key]; });
  };
  document.querySelector("#distributorForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const content = {};
    distributorFields.forEach(({key,input}) => { content[key] = input.value.trim(); });
    write("meghpushpam_distributor", content);
    const message = document.querySelector("#distributorMessage");
    message.className = "form-message success";
    message.textContent = "Distributor details saved and updated on the Distributor page.";
  });
  loadDistributorContent();

  const pageKey=document.querySelector("#pageKey");
  const loadPage=()=>{
    try{
      const pages=JSON.parse(localStorage.getItem("meghpushpam_pages")||"{}");
      const page=pages[pageKey.value];
      document.querySelector("#pageTitle").value=page?.title||"";
      document.querySelector("#pageSubtitle").value=page?.subtitle||"";
    }catch(_){}
  };
  pageKey?.addEventListener("change",loadPage);
  document.querySelector("#pageForm")?.addEventListener("submit",event=>{
    event.preventDefault();
    let pages={};
    try{pages=JSON.parse(localStorage.getItem("meghpushpam_pages")||"{}");}catch(_){}
    pages[pageKey.value]={title:document.querySelector("#pageTitle").value.trim(),subtitle:document.querySelector("#pageSubtitle").value.trim()};
    localStorage.setItem("meghpushpam_pages",JSON.stringify(pages));
    const message=document.querySelector("#pageMessage");message.className="form-message success";message.textContent="Page content saved.";
  });
  document.querySelector("#deletePageContent")?.addEventListener("click",()=>{
    let pages={};
    try{pages=JSON.parse(localStorage.getItem("meghpushpam_pages")||"{}");}catch(_){}
    delete pages[pageKey.value];
    localStorage.setItem("meghpushpam_pages",JSON.stringify(pages));
    document.querySelector("#pageTitle").value="";
    document.querySelector("#pageSubtitle").value="";
    const message=document.querySelector("#pageMessage");message.className="form-message success";message.textContent="Custom page content restored to default.";
  });
  loadPage();

  if(sessionStorage.getItem(sessionKey)==="active")renderDashboard();
});
