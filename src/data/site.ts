/* ============================================================
   SITE CONTENT (single source of truth) — BILINGUAL (EN / ES)
   ------------------------------------------------------------
   ALL text lives here, in BOTH English and Spanish.
   Structure:  content.en.<section>  and  content.es.<section>
   Both languages have the SAME shape, so components don't care
   which language they get.

   👉 To edit copy: change it under BOTH `en` and `es`.
   👉 Components get their text by calling getContent(lang) at
      the bottom of this file.

   Language is decided by the URL:  "/" = English, "/es/" = Spanish
   (configured in astro.config.mjs).
   ============================================================ */

const content = {
  // ==========================================================
  // ENGLISH
  // ==========================================================
  en: {
    // Small UI labels not tied to a section
    ui: {
      faqHeading: "FREQUENTLY ASKED",
      langLabel: "ES", // button shows the OTHER language to switch to
      langHref: "/es/",
    },

    nav: {
      brand: "Arias Latin Party",
      links: [
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Gallery", href: "#gallery" },
        { label: "Contact", href: "#contact" },
        { label: "Socials", href: "/linktree" },
      ],
      cta: { label: "BOOK NOW", href: "#contact" },
    },

    hero: {
      badge: "ECUADORIAN & LATIN DJ IN HOUSTON, TX",
      videoLabel: "DJ Edison Arias mixing live on a Pioneer controller",
      titleLines: ["DJ", "EDY", "SERRANO"],
      subtitle:
        "30+ years of experience from Ecuador, now bringing Latin music, sound and lighting to weddings, quinceañeras and parties across Houston and nearby areas.",
      primaryCta: { label: "Check Your Date", href: "#contact" },
      secondaryCta: { label: "Social Media", href: "/linktree" },
    },

    services: {
      eyebrow: "THE ARSENAL",
      title: "GEAR & SERVICES",
      intro:
        "Everything your Houston event needs — DJ, sound and lighting — from one team.",
      cards: [
        {
          title: "PROFESSIONAL DJ",
          body: "From intimate weddings to high-capacity nightclubs. We specialize in cutting-edge Latin soundscapes.",
          tags: ["Latino House", "Tribal House", "Cumbia Salsa", "Top 40", "Tech-House"],
        },
        {
          title: "AUDIO ENGINEERING FOR LIVE BANDS",
          body: "Provide services , equalization, and mixing for live bands and orchestras. ",
          tags: [],
        },
        {
          title: "LIGHTING DESIGN",
          body: "Atmospheric immersion through intelligent beam sequences.",
          tags: [],
        },
        {
          title: "HORA LOCA",
          body: "Available on request. Ask us and we'll check availability for your date.",
          tags: ["On request"],
        },
      ],
    },

    about: {
      eyebrow: "THE LEGEND",
      name: { first: "EDISON", last: "ARIAS" },
      yearsBadge: { value: "30+", label: "YEARS OF EXPERIENCE" },
      body: "More than a DJ; a sound architect. From Ecuador, now based in Houston, Texas. With a trajectory of immense success, Edison has played with world-renowned artists, including David Guetta & Tiesto",
    },

    testimonials: {
      title: "VOICES FROM THE RUMBA",
      items: [
        {
          quote:
            "Edison transformed our gala into a legendary night. The sound precision for the live band was world-class.",
          author: "Maria & Carlos",
          role: "Wedding Event",
        },
        {
          quote:
            "The Hora Loca dancers and LED setup were mind-blowing. Truly brought the Ecuadorian energy to NJ.",
          author: "Ricardo B.",
          role: "Corporate Fest",
        },
        {
          quote:
            "Clean, professional, and an unforgettable experience from start to finish. Exactly what we wanted.",
          author: "The Mendez Family",
          role: "Quinceañera",
        },
      ],
    },

    gallery: {
      eyebrow: "THE MOMENTS",
      title: "GALLERY",
      intro: "Swipe through. More moments coming soon.",
      imageAlt: "Latin DJ Edison Arias live event photo",
    },

    cta: {
      titleLines: ["Contact Us"],
      body: "Dates for 2026 season are filling fast. Secure your spot now.",
      phones: ["(201) 898-7592", "(201) 554-4914"],
      serviceArea: "HOUSTON, TX & NEARBY",
      areas: "Proudly serving Houston, Katy, Sugar Land, Pasadena, Pearland, Missouri City, Cypress, Spring, Humble, The Woodlands, Baytown, League City, Conroe and Galveston.",
      labels: { access: "DIRECT ACCESS", hq: "SERVICE AREA" },
      button: { label: "SEND INQUIRY NOW", href: "mailto:booking@edisonarias.com" },
    },

    // ---- Booking / date-request form (calendar + contact details) ----
    booking: {
      eyebrow: "CHECK A DATE",
      title: "REQUEST YOUR EVENT DATE",
      intro:
        "Pick the day you have in mind and send us your details. We'll confirm availability and get right back to you.",
      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ],
      weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      selectedLabel: "Selected date",
      noDateLabel: "No date selected yet",
      fields: {
        name: "Your name",
        email: "Email",
        phone: "Phone (optional)",
        eventType: "Type of event",
        message: "Tell us about your event",
      },
      eventTypes: ["Wedding", "Quinceañera", "Corporate", "Birthday", "Nightclub", "Other"],
      submit: "Request this date",
      sending: "Sending…",
      successTitle: "Request sent! 🎉",
      successBody: "Thanks — we received your date request and will reply by email soon.",
      errorTitle: "Something went wrong",
      errorBody: "Please try again, or reach us directly by phone or WhatsApp.",
      validation: {
        date: "Please pick a date.",
        name: "Please enter your name.",
        email: "Please enter a valid email.",
        captcha: "Please complete the verification.",
      },
    },

    // ---- "Send inquiry" modal (general email, no date) ----
    contact: {
      title: "Send us a message",
      subtitle: "Have a question? Drop us a note and we'll reply by email.",
      close: "Close",
    },

    footer: {
      brand: "EDISON ARIAS",
      copyright: "© 2026 Edison Arias. All rights reserved.",
      links: [
        { label: "PRIVACY", href: "#" },
        { label: "TERMS", href: "#" },
        { label: "FAQ", href: "#" },
      ],
    },

    seo: {
      title: "Latin DJ in Houston, TX | Ecuadorian DJ Edison Arias — Arias Latin Party",
      description:
        "Ecuadorian Latin DJ in Houston, TX for weddings, quinceañeras, birthdays & corporate events. Lighting & live sound. 30+ years. Check your date.",
      keywords:
        "Latin DJ Houston, Ecuadorian DJ Houston, Hispanic DJ Houston, Spanish DJ Houston, bilingual DJ Houston, quinceañera DJ Houston, Latin wedding DJ Houston, DJ for parties Houston, cumbia DJ Houston, salsa DJ Houston, DJ Katy TX, DJ Sugar Land, DJ Pasadena TX, DJ Pearland, DJ The Woodlands, DJ latino Houston",
      faq: [
        {
          q: "What areas does Edison Arias DJ serve?",
          a: "Edison Arias is a Latin DJ based in Houston, Texas, serving the greater Houston area including Katy, Sugar Land, Pasadena, Pearland, Missouri City, Cypress, Spring, Humble, The Woodlands, Baytown, League City, Conroe, and Galveston. Events outside the Houston area are available on request.",
        },
        {
          q: "What types of events do you DJ in Houston?",
          a: "Weddings, quinceañeras, birthdays, corporate events, private parties, and nightclubs. We also provide live sound for bands and orchestras, plus lighting design. Hora Loca is available on request.",
        },
        {
          q: "What music styles does Edison Arias specialize in?",
          a: "Edison is an Ecuadorian DJ specializing in Latin music — Cumbia, Salsa, Ecuadorian music, Latino House, Tribal House, Tech-House, and Top 40 — with 30+ years of experience reading the dance floor.",
        },
        {
          q: "Do you offer Hora Loca?",
          a: "Hora Loca ('crazy hour') is a high-energy party segment with performers and props. It's available on request — ask us when you book and we'll confirm availability for your date.",
        },
        {
          q: "How do I book Edison Arias for an event?",
          a: "Pick your date in the booking calendar on this website, message us on WhatsApp, or call (201) 898-7592 or (201) 554-4914. We'll confirm availability and reply quickly.",
        },
      ],
    },

    linktree: {
      subtitle: "DJ Edison Arias",
      tagline: "Ecuadorian Latin DJ · Sound · Lighting — Houston, TX",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/edisonarias9/", style: "bg-gradient-to-r from-pink-500 to-purple-600 text-white" },
        { label: "YouTube", url: "https://www.youtube.com/@DJEdisonArias", style: "bg-red-600 text-white" },
        { label: "Contact me on WhatsApp", url: "https://wa.me/12018987592", style: "bg-green-500 text-white" },
        { label: "Visit the Website", url: "/", style: "bg-white text-ink" },
      ],
    },
  },

  // ==========================================================
  // SPANISH
  // ==========================================================
  es: {
    ui: {
      faqHeading: "PREGUNTAS FRECUENTES",
      langLabel: "EN",
      langHref: "/",
    },

    nav: {
      brand: "Arias Latin Party",
      links: [
        { label: "Sobre Mí", href: "#about" },
        { label: "Servicios", href: "#services" },
        { label: "Galería", href: "#gallery" },
        { label: "Contacto", href: "#contact" },
        { label: "Redes Sociales", href: "/linktree" },
      ],
      cta: { label: "RESERVAR", href: "#contact" },
    },

    hero: {
      badge: "DJ LATINO Y ECUATORIANO EN HOUSTON, TX",
      videoLabel: "DJ Edison Arias mezclando en vivo en un controlador Pioneer",
      titleLines: ["DJ", "EDY", "SERRANO"],
      subtitle:
        "Más de 30 años de experiencia desde Ecuador, ahora llevando música latina, sonido e iluminación a bodas, quinceañeras y fiestas en Houston y alrededores.",
      primaryCta: { label: "Consulta Tu Fecha", href: "#contact" },
      secondaryCta: { label: "Redes Sociales", href: "/linktree" },
    },

    services: {
      eyebrow: "EL ARSENAL",
      title: "EQUIPO Y SERVICIOS",
      intro:
        "Todo lo que tu evento en Houston necesita — DJ, sonido e iluminación — con un solo equipo.",
      cards: [
        {
          title: "DJ PROFESIONAL",
          body: "Desde bodas íntimas hasta discotecas de gran capacidad. Nos especializamos en sonidos latinos de vanguardia.",
          tags: ["Latino House", "Tribal House", "Cumbia-House Fusion", "Top 40", "Tech-House"],
        },
        {
          title: "INGENIERÍA DE AUDIO PARA BANDAS EN VIVO",
          body: "Ofrecemos servicios de ecualización y mezcla para bandas y orquestas en vivo.",
          tags: [],
        },
        {
          title: "DISEÑO DE ILUMINACIÓN",
          body: "Inmersión atmosférica a través de secuencias de haces inteligentes.",
          tags: [],
        },
        {
          title: "HORA LOCA",
          body: "Disponible bajo pedido. Pregúntanos y revisamos la disponibilidad para tu fecha.",
          tags: ["Bajo pedido"],
        },
      ],
    },

    about: {
      eyebrow: "LA LEYENDA",
      name: { first: "EDISON", last: "ARIAS" },
      yearsBadge: { value: "30+", label: "AÑOS DE EXPERIENCIA" },
      body: "Más que un DJ; un arquitecto del sonido. Desde Ecuador, ahora en Houston, Texas. Con una trayectoria de enorme éxito, Edison ha compartido escenario con artistas de renombre mundial, incluyendo David Guetta y Tiesto.",
    },

    testimonials: {
      title: "VOCES DE LA RUMBA",
      items: [
        {
          quote:
            "Edison convirtió nuestra gala en una noche legendaria. La precisión del sonido para la banda en vivo fue de clase mundial.",
          author: "María y Carlos",
          role: "Boda",
        },
        {
          quote:
            "Los bailarines de la Hora Loca y el montaje de LED fueron impresionantes. Trajeron la energía ecuatoriana a NJ.",
          author: "Ricardo B.",
          role: "Evento Corporativo",
        },
        {
          quote:
            "Limpio, profesional y una experiencia inolvidable de principio a fin. Exactamente lo que queríamos.",
          author: "Familia Méndez",
          role: "Quinceañera",
        },
      ],
    },

    gallery: {
      eyebrow: "LOS MOMENTOS",
      title: "GALERÍA",
      intro: "Desliza. Más momentos próximamente.",
      imageAlt: "Foto de evento en vivo del DJ latino Edison Arias",
    },

    cta: {
      titleLines: ["Contácto"],
      body: "Las fechas para la temporada 2026 se están llenando rápido. Asegura tu lugar ahora.",
      phones: ["(201) 898-7592", "(201) 554-4914"],
      serviceArea: "HOUSTON, TX Y ALREDEDORES",
      areas: "Servimos con orgullo a Houston, Katy, Sugar Land, Pasadena, Pearland, Missouri City, Cypress, Spring, Humble, The Woodlands, Baytown, League City, Conroe y Galveston.",
      labels: { access: "ACCESO DIRECTO", hq: "ÁREA DE SERVICIO" },
      button: { label: "ENVIAR CONSULTA", href: "mailto:fdarias21@gmail.com" },
    },

    // ---- Formulario de reserva / solicitud de fecha (calendario + datos) ----
    booking: {
      eyebrow: "CONSULTA UNA FECHA",
      title: "SOLICITA LA FECHA DE TU EVENTO",
      intro:
        "Elige el día que tienes en mente y envíanos tus datos. Confirmaremos la disponibilidad y te responderemos enseguida.",
      months: [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
      ],
      weekdays: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      selectedLabel: "Fecha seleccionada",
      noDateLabel: "Aún no has elegido una fecha",
      fields: {
        name: "Tu nombre",
        email: "Correo electrónico",
        phone: "Teléfono (opcional)",
        eventType: "Tipo de evento",
        message: "Cuéntanos sobre tu evento",
      },
      eventTypes: ["Boda", "Quinceañera", "Corporativo", "Cumpleaños", "Discoteca", "Otro"],
      submit: "Solicitar esta fecha",
      sending: "Enviando…",
      successTitle: "¡Solicitud enviada! 🎉",
      successBody: "Gracias — recibimos tu solicitud de fecha y te responderemos por correo pronto.",
      errorTitle: "Algo salió mal",
      errorBody: "Inténtalo de nuevo o contáctanos directamente por teléfono o WhatsApp.",
      validation: {
        date: "Por favor elige una fecha.",
        name: "Por favor ingresa tu nombre.",
        email: "Por favor ingresa un correo válido.",
        captcha: "Por favor completa la verificación.",
      },
    },

    // ---- Modal "Enviar consulta" (correo general, sin fecha) ----
    contact: {
      title: "Envíanos un mensaje",
      subtitle: "¿Tienes una pregunta? Escríbenos y te responderemos por correo.",
      close: "Cerrar",
    },

    footer: {
      brand: "EDISON ARIAS",
      copyright: "© 2026 Edison Arias. Todos los derechos reservados.",
      links: [
        { label: "PRIVACIDAD", href: "#" },
        { label: "TÉRMINOS", href: "#" },
        { label: "FAQ", href: "#" },
      ],
    },

    seo: {
      title: "DJ Latino en Houston, TX | DJ Ecuatoriano Edison Arias — Arias Latin Party",
      description:
        "DJ latino ecuatoriano en Houston, TX para bodas, quinceañeras, cumpleaños y eventos. Iluminación y sonido en vivo. 30+ años. Consulta tu fecha.",
      keywords:
        "DJ latino Houston, DJ ecuatoriano Houston, DJ hispano Houston, DJ en español Houston, DJ para quinceañeras Houston, DJ para bodas Houston, DJ para fiestas Houston, DJ de cumbia Houston, DJ de salsa Houston, DJ Katy, DJ Sugar Land, DJ Pasadena TX, DJ Pearland",
      faq: [
        {
          q: "¿Qué áreas cubre el DJ Edison Arias?",
          a: "Edison Arias es un DJ latino con base en Houston, Texas, y cubre todo el área de Houston, incluyendo Katy, Sugar Land, Pasadena, Pearland, Missouri City, Cypress, Spring, Humble, The Woodlands, Baytown, League City, Conroe y Galveston. Eventos fuera de Houston disponibles bajo pedido.",
        },
        {
          q: "¿Para qué tipo de eventos ofrecen DJ en Houston?",
          a: "Bodas, quinceañeras, cumpleaños, eventos corporativos, fiestas privadas y discotecas. También ofrecemos sonido en vivo para bandas y orquestas, y diseño de iluminación. La Hora Loca está disponible bajo pedido.",
        },
        {
          q: "¿En qué estilos de música se especializa Edison Arias?",
          a: "Edison es un DJ ecuatoriano especializado en música latina — cumbia, salsa, música ecuatoriana, Latino House, Tribal House, Tech-House y Top 40 — con más de 30 años de experiencia.",
        },
        {
          q: "¿Ofrecen Hora Loca?",
          a: "La Hora Loca es un segmento de fiesta de alta energía con animadores y props. Está disponible bajo pedido — pregúntanos al reservar y confirmamos la disponibilidad para tu fecha.",
        },
        {
          q: "¿Cómo reservo a Edison Arias para un evento?",
          a: "Elige tu fecha en el calendario de reservas de este sitio, escríbenos por WhatsApp o llama al (201) 898-7592 o (201) 554-4914. Confirmaremos la disponibilidad y te responderemos pronto.",
        },
      ],
    },

    linktree: {
      subtitle: "DJ Edison Arias",
      tagline: "DJ latino ecuatoriano · sonido · iluminación — Houston, TX",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/edisonarias9/", style: "bg-gradient-to-r from-pink-500 to-purple-600 text-white" },
        { label: "YouTube", url: "https://www.youtube.com/@DJEdisonArias", style: "bg-red-600 text-white" },
        { label: "Contáctame en WhatsApp", url: "https://wa.me/12018987592", style: "bg-green-500 text-white" },
        { label: "Visitar el Sitio Web", url: "/", style: "bg-white text-ink" },
      ],
    },
  },
};

/* ------------------------------------------------------------
   Shared (non-translated) values used by every language.
   ------------------------------------------------------------ */
export const shared = {
  // Business facts for SEO structured data (same in both languages).
  business: {
    name: "Edison Arias — Arias Latin Party",
    founderName: "Edison Arias",
    alternateNames: ["Arias Latin Party", "DJ Edison Arias", "DJ Edy Serrano"],
    phone: "+1-201-898-7592",
    email: "booking@edisonarias.com",
    // Houston metro — used for LocalBusiness `areaServed` in Layout.astro.
    city: "Houston",
    region: "TX",
    areaServed: [
      "Houston", "Katy", "Sugar Land", "Pasadena", "Pearland", "Missouri City",
      "Cypress", "Spring", "Humble", "The Woodlands", "Baytown", "League City",
      "Conroe", "Galveston",
    ],
    priceRange: "$$$",
    sameAs: [
      "https://www.instagram.com/edisonarias9/",
      "https://www.youtube.com/@DJEdisonArias",
    ],
  },
  ogImage: "/images/logo.png",
  // Gallery photos (same in both languages). Add/remove files here —
  // drop new images in public/images/gallery/ and list them.
  galleryImages: [
    "/images/gallery/g3.jpg",
    "/images/gallery/g4.jpg",
    "/images/gallery/g6.jpg",
    "/images/gallery/g7.jpg",
    "/images/gallery/g8.jpg",
    "/images/gallery/g9.jpg",
  ],
  // Linktree top image (logo) — same regardless of language.
  linktreeAvatar: "/images/logo.png",
  linktreeName: "Arias Latin Party",
  // 3D model attributions (required by Creative Commons licenses).
  attributions: [
    {
      text: '3D model "Pioneer DJ console" by TwoPixels Studio — CC BY 4.0',
      modelUrl: "https://skfb.ly/pxHQG",
      licenseUrl: "http://creativecommons.org/licenses/by/4.0/",
    },
    {
      text: '3D model "KRK-CE-99" by Antoine (Wazahole) — CC BY 4.0',
      modelUrl:
        "https://sketchfab.com/3d-models/krk-ce-99-f4423119386447bc9c0de9e47efd4699",
      licenseUrl: "http://creativecommons.org/licenses/by/4.0/",
    },
  ],
};

/* ------------------------------------------------------------
   getContent(lang) — components call this to get their text.
   Pass Astro.currentLocale; falls back to English.
   ------------------------------------------------------------ */
export function getContent(lang?: string | null) {
  return lang === "es" ? content.es : content.en;
}
