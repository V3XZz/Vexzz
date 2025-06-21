const buttons = document.querySelectorAll("#taskbar .taskbar-btn");
    const pages = document.querySelectorAll(".page");
    const pageContainer = document.getElementById("page-container");

    function setActivePage(pageId, updateHash = true) {
      pages.forEach((page) => {
        if (page.id === pageId) {
          page.classList.add("active");
          page.setAttribute("tabindex", "-1");
          page.focus();
        } else {
          page.classList.remove("active");
          page.removeAttribute("tabindex");
        }
      });
      buttons.forEach((btn) => {
        if (btn.dataset.page === pageId) {
          btn.classList.add("active");
          btn.setAttribute("aria-current", "page");
        } else {
          btn.classList.remove("active");
          btn.removeAttribute("aria-current");
        }
      });
      
      pageContainer.scrollTop = 0;
      if (updateHash) {
        history.replaceState(null, "", "#" + pageId);
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        setActivePage(btn.dataset.page);
      });
    });

    
    function openPageFromHash() {
      const hash = window.location.hash.substring(1);
      const validPage = Array.from(pages).some((p) => p.id === hash);
      if (validPage) {
        setActivePage(hash, false);
      } else {
        setActivePage("home", false);
      }
    }
    window.addEventListener("load", openPageFromHash);
    window.addEventListener("hashchange", openPageFromHash);

    
    const skillBars = document.querySelectorAll(".skill-bar-fill");
    function animateSkills() {
      const triggerBottom = window.innerHeight * 0.9;
      skillBars.forEach((bar) => {
        const barTop = bar.getBoundingClientRect().top;
        if (barTop < triggerBottom) {
          bar.style.width = bar.style.getPropertyValue("--skill-width");
        }
      });
    }
    window.addEventListener("scroll", animateSkills);
    window.addEventListener("load", animateSkills);


  document.querySelectorAll(".circle-skill").forEach((el) => {
    const percent = el.getAttribute("data-percent");
    const circle = el.querySelector(".progress");
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const offset = circumference - (percent / 100) * circumference;
    setTimeout(() => {
      circle.style.strokeDashoffset = offset;
    }, 300); 
  });