export const landing = {
  metadata: {
    title: "Renaciendo en Sol Mayor",
    description:
      "Naturaleza y escritura. Reconectá con vos a través de la expresión escrita.",
  },
  nav: {
    logoAlt: "Renaciendo en Sol Mayor",
    links: [
      { href: "#about", label: "Sobre nosotros" },
      { href: "#products", label: "Productos" },
      { href: "#team", label: "Equipo" },
      { href: "#subscribe", label: "Suscribite" },
    ],
  },
  hero: {
    tagline: "Dejarse atravesar por la vida",
    subtitle:
      "Naturaleza y escritura. Un espacio para reconectar con lo esencial.",
    cta: "Quiero ser parte",
    logoAlt: "Renaciendo en Sol Mayor",
  },
  about: {
    title: "Qué es Renaciendo en Sol Mayor",
    paragraphs: [
      "Renaciendo en Sol Mayor nace de la fusión de dos grandes amores: la naturaleza y la escritura. Es una invitación a despertar la sensibilidad, a reavivar el amor por la vida y a reconectar con aquello que nos hace profundamente humanos.",
      "A través de la expresión escrita, buscamos que cada persona vuelva a percibirse parte de la naturaleza, recuperando esos procesos vitales que nos atraviesan y nos transforman.",
    ],
  },
  products: {
    title: "Qué estamos creando",
    subtitle: "Muy pronto disponibles para vos",
    items: [
      {
        icon: "\ud83d\udcd3",
        title: "Cuadernos Premium",
        description:
          "Diseñados para que la experiencia de escribir sea única y de conexión. Papel de alta calidad, tapas ilustradas y detalles que invitan a plasmar tu mundo interior.",
      },
      {
        icon: "\ud83c\udf3f",
        title: "Bitácoras de Escritura Reflexiva",
        description:
          "Guías temáticas basadas en los procesos de la naturaleza. Cada bitácora te acompaña a reconectar con los ciclos vitales y a explorar tu propia transformación a través de la escritura.",
      },
      {
        icon: "\ud83d\uddbc\ufe0f",
        title: "Arte y Decoración",
        description:
          "Cuadros con ilustraciones y frases originales, stickers y objetos que llevan la esencia de Renaciendo en Sol Mayor a tus espacios cotidianos.",
      },
    ],
  },
  team: {
    title: "Quiénes somos",
    paragraphs: [
      "Somos dos personas unidas por la convicción de que la naturaleza y la escritura tienen el poder de transformar. Creemos que reconectar con los procesos vitales nos hace más empáticos, más presentes y más humanos.",
    ],
    authorHighlight: "Sol María Comas",
    authorDescription:
      "quien firma como Renaciendo en Sol Mayor — un nombre que es a la vez una declaración y una invitación.",
    authorIntro: "Los escritos que dan vida a este proyecto son de",
  },
  subscribe: {
    title: "Sé parte del renacer",
    subtitle:
      "Enterate antes que nadie cuando abramos la tienda y recibí novedades del proyecto.",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "Tu email",
    cta: "Quiero ser parte",
    loading: "Enviando...",
    success: "Gracias por sumarte al renacer.",
    connectionError: "Error de conexión. Intentá de nuevo.",
    genericError: "Algo salió mal. Intentá de nuevo.",
    errors: {
      nameRequired: "El nombre es requerido",
      emailInvalid: "El email no es válido",
      emailDuplicate: "Este email ya está registrado",
      serverError: "Error procesando la solicitud",
    },
    successMessage: "Suscripción exitosa",
  },
  quotes: [
    "Escribir es volver a casa",
    "La naturaleza no tiene prisa, y sin embargo todo lo logra",
  ],
  footer: {
    quote: "La vida nos atraviesa para que podamos florecer.",
    instagramHandle: "@renaciendoensolmayor",
    instagramUrl: "https://www.instagram.com/renaciendoensolmayor/",
    copyright: "Renaciendo en Sol Mayor. Todos los derechos reservados.",
  },
} as const;
