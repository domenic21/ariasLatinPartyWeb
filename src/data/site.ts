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
        { label: "Socials", href: "https://www.ariaslatinparty.com/linktree" },
      ],
      cta: { label: "BOOK NOW", href: "#contact" },
    },

    hero: {
      badge: "PREMIUM SOUND & PROFESSIONAL DJ SERVICES",
      titleLines: ["DJ", "EDY", "SERRANO"],
      subtitle:
        "30+ years of experience in Ecuador, now offerering services across NY - NJ and on request many other states across the US. ",
      primaryCta: { label: "Social Media", href: "https://www.ariaslatinparty.com/linktree" },
      secondaryCta: { label: "Contact Us", href: "#contact" },
    
    },

    services: {
      eyebrow: "THE ARSENAL",
      title: "GEAR & SERVICES",
      intro:
        "We provide a full spectrum of services to elevate your event.",
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
          title: "HORA LOCA",
          body: "LED Robots, Professional Dancers, and more.",
          tags: [],
          stats: [
            { value: "MAX", label: "ENERGY OUTPUT" },
            { value: "4K", label: "LED INTENSITY" },
          ],
        },
        {
          title: "LIGHTING DESIGN",
          body: "Atmospheric immersion through intelligent beam sequences.",
          tags: [],
        },
         {
          title: "Bartending & Mixology",
          body: "Crafting exquisite cocktails and providing top-notch bartending services. Partnered with local business Lily's Experience, a full-service mobile bar with a wide variety of spirits, mixers, and garnishes to elevate your event.",
          tags: [],
        },
      ],
    },

    about: {
      eyebrow: "THE LEGEND",
      name: { first: "EDISON", last: "ARIAS" },
      yearsBadge: { value: "30+", label: "YEARS OF EXPERIENCE" },
      body: "More than a DJ; a sound architect. From Ecuador, now in New Jersey, USA. With a trajectory of immense success, Edison has played with world-renowned artists, including David Guetta & Tiesto",
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
    },

    cta: {
      titleLines: ["Contact Us"],
      body: "Dates for 2026 season are filling fast. Secure your spot now.",
      phones: ["(201) 898-7592", "(201) 554-4914"],
      serviceArea: "NJ & TRI-STATE",
      labels: { access: "DIRECT ACCESS", hq: "SERVICE HQ" },
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
      title: "Edison Arias | Latin DJ & Sound Engineering — NJ & NY Tri-State",
      description:
        "Edison Arias delivers premium Latin DJ services, live sound engineering, and high-energy Hora Loca shows across New Jersey & the NY Tri-State. 30+ years of experience.",
      keywords:
        "Latin DJ New Jersey, Hora Loca NJ, wedding DJ NY, Latino House DJ, Ecuadorian DJ, sound engineering, quinceañera DJ, Tri-State DJ",
      faq: [
        {
          q: "What areas does Edison Arias DJ serve?",
          a: "Edison Arias provides DJ and sound services across New Jersey and the New York Tri-State area, mainly focusing on nightclubs.",
        },
        {
          q: "What music styles does Edison Arias specialize in?",
          a: "Edison specializes in Latin soundscapes including Latino House, Tribal House, Cumbia, Salsa, Ecuadorian Music, Top 40, and Tech-House, with 30+ years of experience.",
        },
        {
          q: "What is a Hora Loca and does Edison Arias offer it?",
          a: "Hora Loca ('crazy hour') is a high-energy party segment with LED robots, professional dancers, and props.",
        },
        {
          q: "How do I book Edison Arias for an event?",
          a: "You can book by calling or messaging. We do have WhatsApp available at (201) 898-7592 or (201) 554-4914, or by sending an inquiry through the contact section of this website.",
        },
      ],
    },

    linktree: {
      subtitle: "DJ Edison Arias",
      tagline: "Premium Latin DJ · Sound · Hora Loca — NJ & NY",
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
        { label: "Redes Sociales", href: "https://www.ariaslatinparty.com/linktree" },
      ],
      cta: { label: "RESERVAR", href: "#contact" },
    },

    hero: {
      badge: "SONIDO PREMIUM Y SERVICIOS DE DJ PROFESIONAL",
      titleLines: ["DJ", "EDY", "SERRANO"],
      subtitle:
        "Más de 30 años de experiencia en Ecuador, ahora ofreciendo servicios en NY y NJ, y bajo pedido en muchos otros estados de EE. UU.",
      primaryCta: { label: "VER PAQUETES", href: "#services" },
      secondaryCta: { label: "NUESTRO EQUIPO", href: "#services" },
    },

    services: {
      eyebrow: "EL ARSENAL",
      title: "EQUIPO Y SERVICIOS",
      intro:
        "Ofrecemos una amplia gama de servicios para elevar tu evento.",
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
          title: "HORA LOCA",
          body: "Robots LED, bailarines profesionales y más.",
          tags: [],
          stats: [
            { value: "MÁX", label: "ENERGÍA" },
            { value: "4K", label: "INTENSIDAD LED" },
          ],
        },
        {
          title: "DISEÑO DE ILUMINACIÓN",
          body: "Inmersión atmosférica a través de secuencias de haces inteligentes.",
          tags: [],
        },
        {
          title: "COCTELERÍA Y MIXOLOGÍA",
          body: "Preparamos cócteles exquisitos y ofrecemos servicios de coctelería de primera categoría. Estamos asociados con el negocio local Lily's Experience, un bar móvil de servicio completo con una amplia variedad de licores, mezcladores y adornos para elevar tu evento.",
          tags: [],
        },
      ],
    },

    about: {
      eyebrow: "LA LEYENDA",
      name: { first: "EDISON", last: "ARIAS" },
      yearsBadge: { value: "30+", label: "AÑOS DE EXPERIENCIA" },
      body: "Más que un DJ; un arquitecto del sonido. Desde Ecuador, ahora en Nueva Jersey, EE. UU. Con una trayectoria de enorme éxito, Edison ha compartido escenario con artistas de renombre mundial, incluyendo David Guetta y Tiesto.",
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
    },

    cta: {
      titleLines: ["Contácto"],
      body: "Las fechas para la temporada 2026 se están llenando rápido. Asegura tu lugar ahora.",
      phones: ["(201) 898-7592", "(201) 554-4914"],
      serviceArea: "NJ Y TRI-STATE",
      labels: { access: "ACCESO DIRECTO", hq: "SEDE DE SERVICIO" },
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
      title: "Edison Arias | DJ Latino e Ingeniería de Sonido — NJ y NY",
      description:
        "Edison Arias ofrece servicios premium de DJ latino, ingeniería de sonido en vivo y espectáculos de Hora Loca de alta energía en Nueva Jersey y el área Tri-State de NY. Más de 30 años de experiencia.",
      keywords:
        "DJ latino Nueva Jersey, Hora Loca NJ, DJ de bodas NY, DJ Latino House, DJ ecuatoriano, ingeniería de sonido, DJ de quinceañera, DJ Tri-State",
      faq: [
        {
          q: "¿Qué áreas cubre el DJ Edison Arias?",
          a: "Edison Arias ofrece servicios de DJ y sonido en Nueva Jersey y el área Tri-State de Nueva York, principalmente enfocándose en discotecas.",
        },
        {
          q: "¿En qué estilos de música se especializa Edison Arias?",
          a: "Edison se especializa en sonidos latinos incluyendo Latino House, Tribal House, Cumbia-House Fusion, Top 40 y Tech-House, con más de 30 años de experiencia.",
        },
        {
          q: "¿Qué es la Hora Loca y la ofrece Edison Arias?",
          a: "La Hora Loca es un segmento de fiesta de alta energía con robots LED, bailarines profesionales y props. Sí — Edison Arias ofrece producciones completas de Hora Loca.",
        },
        {
          q: "¿Cómo reservo a Edison Arias para un evento?",
          a: "Puedes reservar llamando al (201) 898-7592 o (201) 554-4914, o enviando una consulta a través de la sección de contacto de este sitio web.",
        },
      ],
    },

    linktree: {
      subtitle: "DJ Edison Arias",
      tagline: "DJ latino premium · sonido · Hora Loca — NJ y NY",
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
    phone: "+1-201-898-7592",
    email: "booking@edisonarias.com",
    areaServed: ["New Jersey", "New York", "Tri-State Area"],
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
