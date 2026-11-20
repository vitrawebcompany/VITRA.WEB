/* ==========================================================================
   VITRAWEB — main.js
   JavaScript vanilla, sin dependencias.
   Bloques: countdown, navegación, animaciones, formulario WhatsApp,
   acordeón de FAQ, aviso de cookies y año del footer.
   ========================================================================== */

/* Bloque 1: countdown de la promoción + estado de la oferta ---------------- */
(() => {
  "use strict";

  const root = document.documentElement;
  const countdown = document.querySelector("[data-countdown]");

  root.classList.add("js");

  if (!countdown) return;

  /* La fecha límite se toma del HTML: 31/12/2026 23:59:59 (America/Bogota). */
  const deadline = new Date(countdown.dataset.deadline || "").getTime();
  const endedMessage = document.querySelector("[data-countdown-ended]");
  const promoBar = countdown.closest(".plans__promo");

  let timer = null;

  const parts = {
    days: countdown.querySelector("[data-countdown-days]"),
    hours: countdown.querySelector("[data-countdown-hours]"),
    minutes: countdown.querySelector("[data-countdown-minutes]"),
    seconds: countdown.querySelector("[data-countdown-seconds]"),
  };

  const pad = (value) => String(value).padStart(2, "0");

  const setValues = ({ days, hours, minutes, seconds }) => {
    if (parts.days) parts.days.textContent = pad(days);
    if (parts.hours) parts.hours.textContent = pad(hours);
    if (parts.minutes) parts.minutes.textContent = pad(minutes);
    if (parts.seconds) parts.seconds.textContent = pad(seconds);
  };

  const showEndedState = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }

    root.classList.add("is-promo-ended");
    root.dataset.promo = "ended";
    setValues({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    countdown.hidden = true;

    if (endedMessage) endedMessage.hidden = false;
    if (promoBar) promoBar.dataset.state = "ended";

    /* Los precios promocionales se ocultan; los de lista toman el relevo. */
    document.querySelectorAll("[data-promo-price]").forEach((price) => {
      price.hidden = true;
    });
    document.querySelectorAll("[data-regular-price]").forEach((price) => {
      price.hidden = false;
    });

    /* El precio del JSON-LD también vuelve a la tarifa de lista. */
    const serviceSchema = document.getElementById("service-offer-schema");

    if (serviceSchema) {
      try {
        const data = JSON.parse(serviceSchema.textContent);

        if (data.offers) {
          data.offers.lowPrice = "900000";
          data.offers.highPrice = "3600000";
          delete data.offers.priceValidUntil;
          serviceSchema.textContent = JSON.stringify(data, null, 2);
        }
      } catch (error) {
        /* Si el JSON no se puede leer, el resto del sitio sigue funcionando. */
      }
    }

    /* En las páginas de plan, el Service vuelve al precio de lista. */
    const planSchema = document.getElementById("plan-service-schema");

    if (planSchema) {
      try {
        const data = JSON.parse(planSchema.textContent);

        if (data.offers && data.offers.lowPrice && data.offers.highPrice) {
          data.offers.lowPrice = data.offers.highPrice;
          delete data.offers.priceValidUntil;
          planSchema.textContent = JSON.stringify(data, null, 2);
        }
      } catch (error) {
        /* Si el JSON no se puede leer, el resto del sitio sigue funcionando. */
      }
    }
  };

  const update = () => {
    const remaining = deadline - Date.now();

    if (remaining <= 0) {
      showEndedState();
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);

    setValues({
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    });
  };

  /* Si la fecha del HTML no es válida, no mostramos una cuenta regresiva falsa. */
  if (!Number.isFinite(deadline)) {
    showEndedState();
    return;
  }

  root.dataset.promo = "active";
  if (promoBar) promoBar.dataset.state = "active";

  update();

  if (!root.classList.contains("is-promo-ended")) {
    timer = window.setInterval(update, 1000);
  }
})();

/* Bloque 2: header al hacer scroll y menú móvil ---------------------------- */
(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const navCheck = document.querySelector(".nav-check");

  if (header) {
    const syncHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  if (!navCheck) return;

  document.querySelectorAll(".primary-nav a:not(.nav-menu__toggle)").forEach((link) => {
    link.addEventListener("click", () => {
      navCheck.checked = false;
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") navCheck.checked = false;
  });

  document.addEventListener("click", (event) => {
    if (!navCheck.checked) return;
    if (event.target.closest(".primary-nav, .nav-toggle, .nav-check")) return;
    navCheck.checked = false;
  });
})();

/* Bloque 2b: enlace activo del menú según la sección visible --------------- */
(() => {
  "use strict";

  const links = [...document.querySelectorAll('.primary-nav a[href^="#"]:not(.btn)')];
  if (!links.length) return;

  const header = document.querySelector(".site-header");
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  let frame = null;

  const syncActive = () => {
    const headerOffset = header ? header.offsetHeight : 0;
    const marker = window.scrollY + headerOffset + 120;
    let current = null;

    sections.forEach((section) => {
      if (section.offsetTop <= marker) current = section;
    });

    /* Al llegar al final, el último enlace (Contacto) queda activo. */
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }

    links.forEach((link) => {
      const isActive = Boolean(current) && link.getAttribute("href") === `#${current.id}`;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const requestSync = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = null;
      syncActive();
    });
  };

  syncActive();
  window.addEventListener("scroll", requestSync, { passive: true });
  window.addEventListener("resize", requestSync);
})();

/* Bloque 3: aparición suave de bloques al entrar en pantalla --------------- */
(() => {
  "use strict";

  const targets = document.querySelectorAll(
    [
      ".section-head",
      ".tools-section",
      ".service-card",
      ".service",
      ".project",
      ".plans__promo",
      ".plan",
      ".plans__subscriptions-head",
      ".plans__foot",
      ".canvas-step",
      ".garantia__inner",
      ".faq__item",
      ".contact__copy",
      ".contact__form",
    ].join(",")
  );

  if (!targets.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  targets.forEach((element) => {
    element.setAttribute("data-reveal", "");

    const index = Array.prototype.indexOf.call(element.parentElement.children, element);
    element.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 0.055}s`);

    const rect = element.getBoundingClientRect();

    /* Lo que ya está en pantalla o por encima se muestra sin esperar. */
    if (rect.top < window.innerHeight) {
      element.classList.add("is-visible");
    } else {
      observer.observe(element);
    }
  });
})();

/* Bloque 4: formulario que construye un mensaje de WhatsApp ---------------- */
(() => {
  "use strict";

  const form = document.querySelector("[data-whatsapp-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const submitButton = form.querySelector('button[type="submit"]');
  const whatsappNumber = "573003100691";
  const field = (name) => form.elements.namedItem(name);
  let opening = false;
  let unlockTimer = null;

  const unlockSubmit = () => {
    opening = false;
    if (submitButton) submitButton.disabled = false;
  };

  const setStatus = (message, url, isError = false) => {
    if (!status) return;

    status.textContent = message;
    status.classList.add("is-visible");
    status.classList.toggle("is-error", isError);

    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Abrir WhatsApp manualmente";
      status.append(" ", link);
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    /* Se valida primero: si falla, el botón queda disponible para corregir. */
    if (!form.reportValidity()) return;

    /* Honeypot: los humanos no ven este campo; los bots suelen rellenarlo. */
    const honeypot = field("website");
    if (honeypot && honeypot.value.trim() !== "") return;

    /* Un solo envío por interacción: ignora el segundo clic del doble clic. */
    if (opening) return;
    opening = true;
    if (submitButton) submitButton.disabled = true;

    try {
      const name = field("name").value.trim();
      const business = field("business").value.trim();
      const phone = field("phone").value.trim();
      const email = field("email").value.trim();
      const plan = field("plan").value.trim();
      const message = field("message").value.trim();

      const lines = ["Hola VITRAWEB, quiero cotizar mi proyecto web.", "", `Nombre: ${name}`];

      if (business) lines.push(`Negocio: ${business}`);
      if (phone) lines.push(`WhatsApp: ${phone}`);
      if (email) lines.push(`Correo: ${email}`);
      lines.push(`Plan: ${plan}`, "", "Mensaje:", message);

      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;

      setStatus("Abriendo WhatsApp con tu mensaje…", url);

      const popup = window.open(url, "_blank");

      if (popup) {
        popup.opener = null;
        setStatus("Abrimos WhatsApp en otra pestaña. Revisa el mensaje y envíalo cuando quieras.", url);
      } else {
        setStatus("No pudimos abrir WhatsApp automáticamente. Usa el enlace directo:", url, true);
      }
    } finally {
      /* Se reactiva tras la apertura; el margen impide que un doble clic abra dos pestañas. */
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(unlockSubmit, 1200);
    }
  });
})();

/* Bloque 5: acordeón de objeciones (solo una abierta a la vez) ------------- */
(() => {
  "use strict";

  const items = [...document.querySelectorAll(".faq__item")];
  if (!items.length) return;

  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
})();

/* Bloque 6: aviso de cookies y año del footer ------------------------------ */
(() => {
  "use strict";

  const banner = document.querySelector("[data-cookie-banner]");
  const storageKey = "vitraweb-cookie-consent";

  if (banner) {
    const body = document.body;
    let consent = null;

    try {
      consent = window.localStorage.getItem(storageKey);
    } catch (error) {
      consent = null;
    }

    const syncHeight = () => {
      document.documentElement.style.setProperty("--cookie-h", `${banner.offsetHeight}px`);
    };

    const showBanner = () => {
      banner.hidden = false;
      body.classList.add("cookie-open");
      syncHeight();
      window.requestAnimationFrame(() => banner.classList.add("is-visible"));
      window.addEventListener("resize", syncHeight);
    };

    const hideBanner = () => {
      banner.classList.remove("is-visible");
      body.classList.remove("cookie-open");
      window.removeEventListener("resize", syncHeight);
      window.setTimeout(() => {
        banner.hidden = true;
      }, 500);
    };

    if (!consent) showBanner();

    const accept = banner.querySelector("[data-cookie-accept]");

    if (accept) {
      accept.addEventListener("click", () => {
        try {
          window.localStorage.setItem(storageKey, "accepted");
        } catch (error) {
          /* Si el navegador bloquea el almacenamiento, igual cerramos el aviso. */
        }
        hideBanner();
      });
    }
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();

/* Bloque 6b: interruptor Pago único / 3 cuotas en planes ------------------ */
(() => {
  "use strict";

  const section = document.querySelector(".plans");
  const toggle = document.querySelector(".plans__switch-toggle");

  if (!section || !toggle) return;

  const sync = (view) => {
    section.dataset.view = view;
    toggle.setAttribute("aria-checked", String(view === "monthly"));
    toggle.setAttribute(
      "aria-label",
      view === "monthly" ? "Cambiar a planes de pago único" : "Cambiar a planes en 3 cuotas"
    );
  };

  sync("once");

  toggle.addEventListener("click", () => {
    const isMonthly = toggle.getAttribute("aria-checked") === "true";
    sync(isMonthly ? "once" : "monthly");
  });
})();

/* Bloque 7: copiar el correo al portapapeles con aviso --------------------- */
(() => {
  "use strict";

  const links = [...document.querySelectorAll("[data-copy-email]")];
  const toast = document.querySelector("[data-toast]");
  const toastText = document.querySelector("[data-toast-text]");
  const toastClose = document.querySelector("[data-toast-close]");

  if (!links.length) return;

  let hideTimer = null;

  const hideToast = () => {
    if (!toast) return;
    toast.classList.remove("is-visible");
    window.clearTimeout(hideTimer);
    window.setTimeout(() => {
      if (!toast.classList.contains("is-visible")) toast.hidden = true;
    }, 320);
  };

  const showToast = (message) => {
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.hidden = false;
    window.clearTimeout(hideTimer);
    window.requestAnimationFrame(() => toast.classList.add("is-visible"));
    hideTimer = window.setTimeout(hideToast, 6000);
  };

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (error) {
      /* Probamos el método clásico antes de rendirnos. */
    }

    try {
      const helper = document.createElement("textarea");
      helper.value = text;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.top = "-9999px";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(helper);
      return copied;
    } catch (error) {
      return false;
    }
  };

  links.forEach((link) => {
    link.addEventListener("click", async (event) => {
      const email = link.dataset.copyEmail;
      if (!email) return;

      event.preventDefault();
      const copied = await copyText(email);

      if (copied) {
        showToast(`Correo copiado: ${email}. Pégalo en tu app de correo.`);
      } else {
        showToast(`Escríbenos a ${email}. También puedes seleccionarlo y copiarlo.`);
      }
    });
  });

  if (toastClose) {
    toastClose.addEventListener("click", hideToast);
  }
})();

/* Bloque 8: intención de pago en 3 cuotas en las páginas de plan ------------ */
(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  if (params.get("pago") !== "3") return;

  const card = document.querySelector(".plan-hero__card");
  const installment = card && card.querySelector(".plan__installment");
  if (!card || !installment) return;

  card.classList.add("is-installment");
  installment.id = "pagos";

  document.querySelectorAll('.plan-hero a[href*="wa.me"]').forEach((link) => {
    try {
      const url = new URL(link.href);
      const text = url.searchParams.get("text") || "";
      url.searchParams.set("text", `${text} Quiero pagarlo en 3 cuotas.`.trim());
      link.href = url.toString();
    } catch (error) {
      /* Si la URL no se puede parsear, se conserva el enlace original. */
    }
  });

  const primary = card.querySelector(".btn--xl");
  const textNode = primary && primary.firstChild;
  if (textNode && textNode.nodeType === Node.TEXT_NODE) {
    textNode.textContent = " Quiero este plan en 3 cuotas ";
  }
})();

/* Bloque 9: desplegable de planes — tap alterna en móvil/táctil; hover en escritorio ---- */
(() => {
  "use strict";

  const item = document.querySelector(".nav-item--menu");
  const toggle = item && item.querySelector(".nav-menu__toggle");

  if (!item || !toggle) return;

  const media = window.matchMedia("(min-width: 48em)");
  const desktop = () => media.matches;

  /* El CSS abre el panel con :hover / :focus-within en escritorio y con .is-open en
     móvil. aria-expanded debe reflejar ese mismo estado para lectores de pantalla. */
  const isOpen = () =>
    item.matches(":hover") ||
    item.matches(":focus-within") ||
    item.classList.contains("is-open");

  const syncExpanded = () => {
    if (desktop()) toggle.setAttribute("aria-expanded", String(isOpen()));
  };

  const setOpen = (open) => {
    item.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", (event) => {
    if (desktop()) return; /* en escritorio el despliegue es por hover/focus */

    event.preventDefault();
    setOpen(!item.classList.contains("is-open"));
  });

  ["mouseenter", "mouseleave", "focusin"].forEach((type) => {
    item.addEventListener(type, syncExpanded);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!item.classList.contains("is-open")) return;

    setOpen(false);
    toggle.focus();
    syncExpanded();
  });

  item.addEventListener("focusout", () => {
    window.requestAnimationFrame(() => {
      if (!item.contains(document.activeElement)) {
        item.classList.remove("is-open");
        if (!desktop()) toggle.setAttribute("aria-expanded", "false");
      }
      syncExpanded();
    });
  });

  const onBreakpointChange = () => {
    item.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    syncExpanded();
  };

  if (media.addEventListener) media.addEventListener("change", onBreakpointChange);
  else if (media.addListener) media.addListener(onBreakpointChange);

  syncExpanded();
})();
