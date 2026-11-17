/* ==========================================================================
   CONTENIDO DE LA GALERÍA — edita este archivo para actualizar los proyectos.

   • Imágenes en  assets/images/   (cada una tiene versión completa + versión "-800")
   • Vídeos en    assets/video/    con su fotograma de portada en  assets/posters/
   • "file" es el nombre del archivo SIN extensión.
   • Los textos van en los dos idiomas:  { es: "…", en: "…" }
   • concept: true  añade la etiqueta "Concepto independiente" al proyecto.
   • Para añadir imágenes o vídeos nuevos, mira README.md.
   • Los textos generales de la página están en translations.js.
   ========================================================================== */

window.SITE = {

  studio: {
    name: "KN.",           // nombre provisional del estudio: cámbialo aquí y se actualiza en toda la página
    email: "kncreativeagency@gmail.com",  // email de contacto: aparece en Contacto y en el pie, y recibe los briefs del formulario

    /* Datos para el aviso legal y la política de privacidad (aviso-legal.html y privacidad.html).
       Mientras un dato esté vacío, la página legal muestra un hueco marcado como «pendiente»
       (salvo el NIF, que simplemente no aparece). Rellénalos antes de publicar.
       Los datos que cambian con el idioma se escriben así:  { es: "…", en: "…" } */
    legal: {
      owner: "Naomi Rivas Borges",   // titular de la web: nombre y apellidos, o razón social
      taxId: "",       // NIF / CIF — opcional: mientras esté vacío, la línea del NIF no aparece en las páginas
      address: { es: "Ibiza, España", en: "Ibiza, Spain" },   // domicilio profesional o fiscal
      domain: "kncreativeagency.github.io/kn-creator.github.io",   // dirección de la web (cámbiala aquí si conectas un dominio propio)
      host: "GitHub Pages (GitHub, Inc.)",            // empresa de alojamiento web (hosting)
      retention: { es: "12 meses", en: "12 months" },   // cuánto tiempo guardas las consultas que no acaban en encargo
      updated: { es: "16 de noviembre de 2026", en: "16 November 2026" }   // fecha de la última revisión de los textos, por ejemplo "20 de noviembre de 2026"
    }
  },

  /* ------------------------------------------------------------ CLIENTES
     Marcas que aparecen en la franja «Marcas que confían en nosotros». Solo clientes reales. */
  clients: ["Maison Lune", "Futuralife", "Mousse Kids", "Les Filles d’Eva", "Praline", "The Longevity Suite", "Bellavitis"],

  /* ---------------------------------------------------------------- HERO */
  hero: {
    main: {
      file: "hero-maison-lune", w: 1600, h: 1600,
      alt: { es: "Bolso de ante marrón con flecos sobre el alféizar de una ventana encalada con vistas al mar", en: "Tan suede fringed handbag on a whitewashed window ledge overlooking the sea" },
      caption: { es: "Maison Lune — Fotografía de producto con IA", en: "Maison Lune — AI Product Photography" }
    }
  },

  /* ------------------------------------------------------------ SERVICIOS
     Imagen o vídeos que acompañan a cada servicio (los vídeos, por su nombre de archivo). */
  services: {
    photo:  { image: { file: "hero-praline", w: 1024, h: 1024, alt: { es: "Pulsera de eslabones dorados sobre una superficie crema", en: "Gold chain-link bracelet on a cream surface" } } },
    ugc:    { videos: ["ugc-longevity", "ugc-lace-dress"] },
    motion: { videos: ["hyper-nike"] }
  },

  /* ------------------------------------------------------ FOTOGRAFÍA CON IA
     Un bloque por marca. Las imágenes se muestran en mosaico, en este orden. */
  photography: [
    {
      brand: "Maison Lune",
      note: { es: "Bolsos de lujo — producto, detalle y lifestyle", en: "Luxury handbags — product, detail & lifestyle" },
      concept: false,
      images: [
        { file: "maison-lune-03", w: 1024, h: 1024, alt: { es: "Bolso de piel blanca con tachuelas y colgante en forma de corazón sobre una superficie de mármol", en: "White studded leather bag with a heart-shaped charm on a marble surface" } },
        { file: "maison-lune-02", w: 1440, h: 2560, alt: { es: "Mujer con vestido de punto de espalda abierta y un bolso acolchado azul claro junto a una piscina al atardecer", en: "Woman in a knitted open-back dress holding a pale blue quilted bag beside a pool at sunset" } },
        { file: "maison-lune-04", w: 1024, h: 1024, alt: { es: "Primer plano del cierre dorado de un bolso acolchado azul claro con cadena", en: "Close-up of the gold clasp on a pale blue quilted bag with a chain strap" } },
        { file: "maison-lune-01", w: 1600, h: 1600, alt: { es: "Primer plano de un bolso de piel crema con tachuelas y hebillas envejecidas", en: "Close-up of a cream leather shoulder bag with antiqued studs and buckles" } }
      ]
    },
    {
      brand: "Bellavitis",
      note: { es: "Moda mujer — editorial", en: "Womenswear — editorial" },
      concept: false,
      images: [
        { file: "bellavitis-01", w: 1600, h: 1986, alt: { es: "Modelo con un vestido largo negro estampado en la escalinata de una villa al anochecer", en: "Model in a flowing black printed maxi dress on the steps of a villa at dusk" } },
        { file: "bellavitis-03", w: 1600, h: 1986, alt: { es: "Modelo con un conjunto negro estampado con encaje naranja apoyada en un muro de piedra de noche", en: "Model in a black printed set with orange lace leaning against a stone wall at night" } },
        { file: "bellavitis-02", w: 1600, h: 1986, alt: { es: "Modelo con un conjunto azul estampado semitransparente y pañuelo en la cabeza caminando junto al mar", en: "Model in a sheer blue printed set and headscarf walking by the sea" } }
      ]
    },
    {
      brand: "The Longevity Suite",
      note: { es: "Cosmética y suplementos — producto y creatividades de anuncio", en: "Skincare & supplements — product and ad creatives" },
      concept: false,
      images: [
        { file: "longevity-03", w: 941,  h: 1672, alt: { es: "Creatividad publicitaria: frasco ámbar de suplemento Dren entre salpicaduras de agua sobre fondo negro", en: "Ad creative: amber Dren supplement bottle amid water splashes on a black background" } },
        { file: "longevity-01", w: 768,  h: 1376, alt: { es: "Frasco negro de sérum entre rocas volcánicas oscuras", en: "Black serum bottle standing among dark volcanic rocks" } },
        { file: "longevity-02", w: 928,  h: 1152, alt: { es: "Manos sosteniendo un frasco negro de cosmética", en: "Hands holding a black skincare bottle" } },
        { file: "longevity-04", w: 1055, h: 1491, alt: { es: "Creatividad publicitaria: bote negro de colágeno abierto con comprimidos en el aire bajo un haz de luz", en: "Ad creative: open black collagen jar with tablets in mid-air under a beam of light" } }
      ]
    },
    {
      brand: "Les Filles d’Eva",
      note: { es: "Moda mujer — imagen de campaña", en: "Womenswear — campaign imagery" },
      concept: false,
      images: [
        { file: "lesfilles-01", w: 1536, h: 2752, alt: { es: "Mujer con un vestido largo de encaje blanco sobre las rocas de una cala", en: "Woman in a long white lace dress standing on rocks in a sea cove" } },
        { file: "lesfilles-03", w: 1536, h: 2752, alt: { es: "Retrato de una mujer rubia con blusa y pañuelo azul claro junto a un muro de piedra", en: "Portrait of a blonde woman in a pale blue blouse and scarf beside a stone wall" } },
        { file: "lesfilles-02", w: 1536, h: 2752, alt: { es: "Mujer con un vestido cruzado de satén negro caminando de noche por una calle de piedra iluminada por farolas", en: "Woman in a black satin wrap dress walking down a lamplit stone street at night" } }
      ]
    },
    {
      brand: "Praline",
      note: { es: "Joyería — producto y retrato", en: "Jewellery — still life & portrait" },
      concept: false,
      images: [
        { file: "praline-01", w: 1024, h: 1024, alt: { es: "Pulsera de cadena dorada con bombones y macarons sobre superficies crema y verde", en: "Gold chain bracelet styled with chocolates and macarons on cream and green surfaces" } },
        { file: "praline-02", w: 896,  h: 1152, alt: { es: "Mujer con blazer crema y collar de cadena dorada, con el perfil de la ciudad al fondo", en: "Woman in a cream blazer wearing a gold chain necklace, city skyline behind" } },
        { file: "praline-03", w: 928,  h: 1152, alt: { es: "Collar de cadena dorada rodeando dos canelés sobre una superficie clara con luz rasante", en: "Gold chain necklace circling two canelés on a pale surface in raking light" } }
      ]
    },
    {
      brand: "Mousse Kids",
      note: { es: "Moda infantil — lifestyle", en: "Kidswear — lifestyle" },
      concept: false,
      images: [
        { file: "mouse-kids-01", w: 768, h: 1376, alt: { es: "Dos niños con ropa estampada riendo en una calle adoquinada", en: "Two children in printed outfits laughing on a cobbled city street" } }
      ]
    }
  ],

  /* ------------------------------------------------ VÍDEOS ESTILO UGC CON IA
     format: "vertical" (9:16), "wide" (16:9) o "poster" (2:3).  sound: true muestra el botón de sonido. */
  ugc: [
    { file: "ugc-longevity",   format: "vertical", sound: true,  concept: false, title: "The Longevity Suite", note: { es: "Cosmética — rutina a cámara", en: "Skincare — to-camera routine" } },
    { file: "ugc-lace-dress",  format: "vertical", sound: true,  concept: false, title: { es: "Vestido de encaje", en: "Lace Dress" }, note: { es: "Moda — selfie al atardecer", en: "Fashion — golden-hour selfie" } },
    { file: "ugc-maison-lune", format: "vertical", sound: false, concept: false, title: "Maison Lune",         note: { es: "Bolsos — clip lifestyle", en: "Handbags — lifestyle clip" } },
    { file: "ugc-mouse-kids",  format: "vertical", sound: false, concept: false, title: "Mousse Kids",          note: { es: "Moda infantil — clip lifestyle", en: "Kidswear — lifestyle clip" } }
  ],

  /* -------------------------------------------------------- ANUNCIOS CON IA */
  ads: [
    { file: "hyper-nike",  format: "wide",     sound: true, concept: true, title: "Nike",       note: { es: "Calzado — anuncio con efectos visuales", en: "Footwear — VFX ad" } },
    { file: "ad-lobos",    format: "wide",     sound: true, concept: false, title: "Los Lobos",  note: { es: "Proyecto propio — pieza cinematográfica", en: "In-house project — cinematic piece" } },
    { file: "ad-ysl-claw", format: "vertical", sound: true, concept: true, title: "YSL Beauty", note: { es: "Labial — anuncio vertical", en: "Lipstick — vertical ad" } }
  ],

  /* --------------------------------------------- HYPERMOTION 3D DE PRODUCTO
     Vídeos de producto de estilo 3D.  format: "poster" es para vídeos 2:3 (como los de Futuralife). */
  hypermotion: [
    { file: "hyper-ysl-lipstick", format: "vertical", sound: true,  concept: true,  title: "YSL Beauty", note: { es: "Labial — vídeo de producto", en: "Lipstick — product video" } },
    { file: "hyper-lace-dress",   format: "vertical", sound: true,  concept: false, title: { es: "Vestido de encaje", en: "Lace Dress" }, note: { es: "Moda — vídeo de producto", en: "Fashion — product video" } },
    { file: "hyper-duffel",       format: "vertical", sound: true,  concept: false, title: { es: "Bolsa de viaje de piel", en: "Leather Duffel" }, note: { es: "Accesorios — vídeo de producto", en: "Accessories — product video" } },
    { file: "hyper-balenciaga",   format: "vertical", sound: true,  concept: true,  title: "Balenciaga", note: { es: "Ropa — vídeo de producto", en: "Apparel — product video" } },
    { file: "hyper-jersey",       format: "vertical", sound: false, concept: false, title: { es: "Camiseta KN.", en: "KN. Jersey" }, note: { es: "Proyecto propio — vídeo de producto", en: "In-house project — product video" } },
    { file: "hyper-futuralife-memorplus", format: "poster", sound: false, concept: false, title: "Futuralife", note: { es: "MemorPlus — vídeo de producto", en: "MemorPlus — product video" } },
    { file: "hyper-futuralife-nattolar",  format: "poster", sound: false, concept: false, title: "Futuralife", note: { es: "Nattolar — vídeo de producto", en: "Nattolar — product video" } },
    { file: "hyper-futuralife-kynosulin", format: "poster", sound: false, concept: false, title: "Futuralife", note: { es: "Kynosulin — vídeo de producto", en: "Kynosulin — product video" } }
  ]
};
