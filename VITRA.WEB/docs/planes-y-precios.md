# VITRAWEB — Estructura de planes y precios (v1 para aprobación)

> Documento de trabajo previo al código. Moneda: COP. Precios de lista vs. precio promocional con **50 % de descuento aplicado solo a pagos únicos**.
> Los cuatro servicios de pago único también se pueden pagar en **3 cuotas mensuales iguales** sobre el precio de lista, **sin descuento, sin intereses y sin recargo**. No son una suscripción: el proyecto termina con la tercera cuota y la propiedad se transfiere en ese momento.
> La **suscripción mensual** es otra cosa: solo aplica a SEO + Google Business y Chatbot + Mantenimiento, se paga mes a mes y se cancela cuando quieras.
> Vigencia de la promoción: hasta el **31 de diciembre de 2026, 23:59:59 (America/Bogota)**. La fecha visible y el `priceValidUntil` del JSON-LD deben cambiar juntos; ver `docs/actualizar-promocion.md`.

## 1. Los 6 planes

| # | Plan | Forma de pago | Precio lista | Precio promoción | 3 cuotas | Entrega |
|---|------|------|-------------:|-----------------:|-------------:|---------|
| 1 | **Landing Page Express** | Pago único | $900.000 | **$450.000** | 3 × $300.000 | 5–7 días |
| 2 | **Identidad Visual + Copywriting** | Pago único | $1.200.000 | **$600.000** | 3 × $400.000 | 8–10 días |
| 3 | **Web Corporativa 360** ⭐ | Pago único | $2.400.000 | **$1.200.000** | 3 × $800.000 | 10–15 días |
| 4 | **Tienda Online E-commerce** | Pago único | $3.600.000 | **$1.800.000** | 3 × $1.200.000 | 21–25 días |
| 5 | **Chatbot + Mantenimiento** | Suscripción mensual | $390.000/mes | **$390.000/mes** | — | Activo en 5 días |
| 6 | **SEO + Google Business** | Suscripción mensual | $490.000/mes | **$490.000/mes** | — | Activo en 7 días |

**Regla de promoción:** el descuento se calcula y muestra únicamente en los planes 1, 2, 3 y 4 (pago único). En los planes 5 y 6 el precio mensual se mantiene y se etiqueta como *“Tarifa plana, sin descuento”*. El precio tachado es siempre el valor de lista de referencia. Al vencer el countdown, se ocultan los precios promocionales y se muestran los de lista + el aviso **“Promoción finalizada”**.

**Regla del plan de 3 cuotas:** aplica solo a los planes 1, 2, 3 y 4. Se calcula siempre sobre el **precio de lista** (nunca sobre el promocional), no lleva descuento ni intereses, y la propiedad del diseño, el código y los archivos se transfiere al completar la tercera cuota. No es una suscripción. El interruptor **Pago único / 3 cuotas** y la línea `.plan__installment` de cada tarjeta muestran estas cuotas.

**Regla de la suscripción mensual:** los planes 5 y 6 viven fuera del interruptor, siempre visibles. Se pagan mes a mes, sin permanencia forzosa, y se cancelan antes del siguiente ciclo. No son cuotas de un proyecto, no tienen anticipo ni cobro de proyecto, y no aplican al precio de una web. Su proceso es diagnóstico, configuración inicial, trabajo mensual y reporte/revisión, no “diseño y copy” ni “desarrollo y entrega”.

## 2. Qué incluye cada plan

### Plan 1 — Landing Page Express · $450.000 (antes $900.000)
- 1 página one-page con hasta 5 secciones.
- Diseño 100 % a medida (sin plantillas), responsive mobile-first.
- Formulario conectado a WhatsApp + botón flotante.
- SEO on-page básico: title, meta description, H1–H3, alt, JSON-LD.
- Velocidad optimizada y favicon.
- 3 rondas de revisión y acompañamiento 30 días.
- Ideal para: emprendedores, servicios locales, campañas de pauta.

### Plan 2 — Identidad Visual + Copywriting · $600.000 (antes $1.200.000)
- Logo principal + versiones (horizontal, isotipo, monocromo) y favicon.
- Manual de marca: paleta, tipografías, usos y aplicaciones.
- Plantillas para redes sociales (3).
- Tono de voz + copywriting de inicio y 3 secciones clave.
- 3 rondas de revisión y entrega en Figma/PDF.
- Ideal para: marcas nuevas o negocios que quieren dejar de improvisar su imagen.

### Plan 3 — Web Corporativa 360 · $1.200.000 (antes $2.400.000) ⭐ Más elegido
- Hasta 6 páginas/secciones (Inicio, Servicios, Nosotros, Proyectos, Blog, Contacto).
- Diseño editorial asimétrico a medida + animaciones de scroll.
- SEO técnico y semántico completo + JSON-LD (LocalBusiness, Service, FAQPage).
- Blog administrable, Google Analytics 4 y Search Console.
- Google Maps, WhatsApp, correo corporativo configurado.
- 3 rondas de revisión, capacitación de 1 h y garantía de 30 días.
- Ideal para: empresas, clínicas, inmobiliarias, consultoras.

### Plan 4 — Tienda Online E-commerce · $1.800.000 (antes $3.600.000)
- WooCommerce (o Shopify si el cliente lo prefiere) con hasta 30 productos cargados.
- Pasarelas de pago: Mercado Pago, Wompi y pago contra entrega.
- Configuración de envíos, cupones, inventario y correos transaccionales.
- Ficha de producto optimizada para SEO + medición de conversiones.
- Los cargos de proveedores (suscripción de Shopify, comisiones de pasarela y aplicaciones pagas) pueden cobrarse aparte; confirmar los costos aplicables antes de activar.
- 3 rondas de revisión, capacitación de 1,5 h y garantía de 30 días.
- Ideal para: marcas que quieren vender sin depender de redes sociales.

### Plan 5 — Chatbot + Mantenimiento · $390.000/mes (suscripción mensual, sin descuento)
- Chatbot para WhatsApp/web: 1 flujo principal, hasta 30 respuestas o intenciones y 1 número de WhatsApp Business.
- Hasta 300 conversaciones nuevas al mes incluidas. Una conversación cuenta por persona y ventana de 24 h; el excedente se cotiza **antes** de activarse y nunca se factura sin autorización.
- “Siempre” = el bot responde 24/7 mientras la suscripción esté activa y WhatsApp o la web estén operativos. El monitoreo de uptime es 24/7; el soporte humano y las correcciones son lun–vie 9:00–18:00, con respuesta en máximo 1 día hábil. No cubre caídas globales de WhatsApp/Meta ni respuestas fuera del flujo configurado.
- Proceso mensual: **diagnóstico → configuración inicial (1 flujo y hasta 30 respuestas, sin anticipo ni cobro de proyecto; el primer mes se paga al iniciar el ciclo) → operación mensual → revisión mensual**. No hay “diseño y copy” ni “desarrollo”.
- Derivación a una persona cuando el cliente lo pide.
- Copias de seguridad semanales de archivos y base de datos, retención de 30 días y restauración incluida.
- Actualizaciones y parches de seguridad; monitoreo de uptime 24/7.
- Hasta 2 h mensuales de cambios menores.
- Soporte prioritario por WhatsApp de lunes a viernes, 9:00–18:00 (hora Colombia), respuesta en máximo 1 día hábil.
- La plataforma del chatbot y la API de WhatsApp Business se pagan aparte al proveedor y se cotizan antes de activar.
- Ideal para: negocios con web activa que necesitan tranquilidad técnica.

### Plan 6 — SEO + Google Business · $490.000/mes (suscripción mensual, sin descuento)
- Auditoría técnica inicial y plan de palabras clave.
- Optimización on-page y corrección de errores.
- 4 piezas de contenido al mes: 1 artículo de blog (800–1.200 palabras), 1 página de servicio o producto reescrita y 2 publicaciones para Google Business Profile.
- Google Business Profile: categorías, servicios, horarios, zona y atributos; 4–6 fotos al mes; respuesta a reseñas y preguntas en máximo 3 días hábiles; 2 publicaciones mensuales.
- Reporte mensual con impresiones, clics, CTR, posición media, consultas de cola larga, llamadas, rutas y mensajes del perfil.
- Avances medibles entre el mes 2 y 3: mejora de impresiones, clics y consultas de cola larga, y de llamadas, rutas, mensajes y clics en Google Business. No se garantiza una posición específica.
- Sin permanencia forzosa (se recomienda un mínimo de 3 meses para ver resultados).
- Proceso mensual: **diagnóstico → configuración inicial (accesos y auditoría, sin anticipo ni cobro de proyecto; el primer mes se paga al iniciar el ciclo) → trabajo mensual → reporte y ajuste**. No hay “diseño y copy” ni “desarrollo”.
- Ideal para: negocios que ya tienen web y quieren aparecer en Google y Maps.

> **Dominio y hosting:** se cobran aparte. El dominio se registra o se transfiere a nombre del cliente y se renueva cada año. Recomendamos hosting profesional con SSL incluido, copias de seguridad y soporte; para un sitio crítico para el negocio no se recomienda hosting gratuito. Los respaldos incluidos en la suscripción Chatbot + Mantenimiento son semanales, con retención de 30 días.

## 3. Tabla comparativa (histórico; ya no está en la página)

> Nota: en el rediseño “cálido” la sección de planes se unificó en **una sola sección** con seis tarjetas uniformes (pago único + 3 cuotas + suscripciones); la tabla comparativa se retiró para reducir ruido. Se conserva aquí como referencia histórica.

| Característica | Landing | Identidad | Corporativa | Tienda | Chatbot+Mant. | SEO+GBP |
|---|---|---|---|---|---|---|
| Precio promocional | $450.000 | $600.000 | $1.200.000 | $1.800.000 | $390.000/mes | $490.000/mes |
| Diseño a medida | ✓ | ✓ | ✓ | ✓ | — | — |
| Responsive mobile-first | ✓ | — | ✓ | ✓ | — | — |
| Páginas incluidas | 1 | — | 6 | Catálogo | — | — |
| SEO on-page | Básico | — | Completo | Completo | — | Mensual |
| Google Business | — | — | ✓ | ✓ | — | ✓ |
| Blog / contenidos | — | — | ✓ | — | — | 4/mes |
| Pasarela de pagos | — | — | — | ✓ | — | — |
| Chatbot | — | — | Opcional | Opcional | ✓ | — |
| Mantenimiento | — | — | Opcional | Opcional | ✓ | — |
| Copywriting | — | ✓ | ✓ | ✓ | — | — |
| Garantía 30 días (ajustes) | ✓ | ✓ | ✓ | ✓ | — (correcciones de configuración sin costo) | — (correcciones de configuración sin costo) |
| Soporte por WhatsApp | ✓ | ✓ | ✓ | ✓ | Prioritario | ✓ |
| Entrega | 5–7 días | 8–10 días | 10–15 días | 21–25 días | Mensual | Mensual |

**Comportamiento responsive de la tabla:** scroll horizontal con la primera columna fija (sticky) y aviso visual de deslizamiento en móvil.

## 4. Los 3 conceptos que se marcan explícitamente

Se comunican como chips en el hero y como beneficios junto a los planes (paleta: tinta, hueso y lima del logo):

1. **Pago único o 3 cuotas, sin suscripciones ocultas** — el precio que ves es el precio final. En landing, corporativa, tienda e identidad puedes pagar una vez o dividir el precio de lista en 3 cuotas iguales, sin descuento ni intereses (aplica a los planes 1–4). No es una suscripción: el proyecto termina con la tercera cuota. **El trabajo inicia al confirmar el pago**: el 100 % en pago único o la primera cuota en 3 cuotas; sin pago, no se inicia el trabajo.
2. **Suscripción mensual sin permanencia** — SEO y mantenimiento se pagan mes a mes y se cancelan cuando quieras. No son cuotas de un proyecto. El primer mes se paga al iniciar el ciclo; sin pago, no se inicia el servicio.
3. **Garantía real de 30 días** — ajustes gratis durante 30 días desde la entrega de la primera versión en proyectos de pago único o 3 cuotas (web e identidad visual con copywriting) si la primera versión no cumple lo acordado. No aplica a las suscripciones mensuales.

## 5. Garantía de 30 días (texto base)

> **Garantía VITRAWEB de 30 días.** La garantía dura 30 días calendario desde la entrega de la primera versión. Cubre lo pactado en la propuesta: corregimos sin costo lo que no cumpla. No cubre dominio, hosting, licencias ni pagos a terceros, ni cambios de alcance. Para activarla, el cliente escribe a vitra.webcompany@gmail.com con el punto concreto; respondemos en máximo 2 días hábiles.

> **Alcance:** aplica únicamente a proyectos de pago único y en 3 cuotas. Las suscripciones mensuales (SEO + Google Business y Chatbot + Mantenimiento) no tienen anticipo ni cobro de proyecto, por lo que la garantía de 30 días no les aplica: si la configuración inicial no corresponde a lo acordado, se corrige sin costo y se cancela antes del siguiente ciclo.

## 6. Proceso de trabajo (6 pasos)

> Aplica a los proyectos de pago único y en 3 cuotas. Las suscripciones mensuales siguen otro flujo: **diagnóstico → configuración inicial (sin anticipo ni cobro de proyecto) → trabajo/revisión mensual → reporte o ajustes**.

1. **Diagnóstico** — llamada de 20 min para entender el negocio y los objetivos.
2. **Propuesta y pago** — alcance, precio cerrado, plazo estimado y condiciones por escrito. **El trabajo inicia al confirmar el pago: el 100 % en pago único (o la primera cuota del plan de 3 cuotas); sin pago no se inicia el trabajo.**
3. **Estructura y copy** — arquitectura, textos y referentes visuales.
4. **Diseño** — propuesta a medida y revisión conjunta.
5. **Desarrollo + SEO** — HTML/CSS/JS, velocidad, metadatos y datos estructurados.
6. **Pruebas y publicación** — revisión móvil, analítica, lanzamiento, capacitación y 30 días de garantía desde la entrega de la primera versión en proyectos de pago único o 3 cuotas.

## 7. Las 8 objeciones reales y su respuesta

| Objeción | Respuesta en el sitio |
|---|---|
| “Es muy caro para mi negocio.” | Desde $450.000 con pago único y 50 % de descuento, o 3 cuotas de $300.000 sin descuento; sin cuotas mensuales escondidas. |
| “No tengo tiempo para el proyecto.” | Proceso guiado: tú das el contexto, nosotros hacemos el resto. Plazos de 5–25 días hábiles según el proyecto. |
| “Ya tengo una web y no vende.” | Auditoría inicial gratuita y plan de rediseño enfocado en conversión. |
| “No sé de tecnología.” | Nos encargamos de dominio, hosting, correos y te capacitamos al final. |
| “¿Y si no me gusta el diseño?” | 3 rondas de revisión incluidas + ajustes gratis durante 30 días desde la entrega de la primera versión. |
| “No quiero amarrarme a una suscripción.” | La suscripción de SEO y mantenimiento no tiene permanencia; cancelas cuando quieras. El plan de 3 cuotas no es una suscripción: es el mismo proyecto dividido en tres pagos. |
| “¿Cómo sé que el SEO funciona?” | Reportes mensuales, métricas reales y objetivos definidos antes de empezar. |
| “No confío en agencias por internet.” | Contrato, pago único al 100 % al iniciar o plan de 3 cuotas, atención desde Barranquilla para toda Colombia y contacto directo por WhatsApp. |

## 8. Jerarquía de encabezados

1. **Un solo H1:** “Diseño web en Colombia que convierte visitas en clientes.” (hero)
2. **H2 de planes:** “Los planes, sin letras pequeñas.” (una sola sección con los 6 planes)
3. **H2 de contacto:** “Hablemos de tu proyecto web.”

El resto de encabezados serán H2–H6 con keywords naturales (diseño web, tienda online, SEO local, Google Business, mantenimiento web, etc.). No debe existir más de un H1 por página.

## 9. Estructura de la landing (orden de secciones)

1. Header fijo con logo + navegación + CTA “Cotiza tu web”.
2. Hero con fotografía real (H1, CTAs, chips de pago, pruebas sociales básicas).
3. Carrusel infinito de herramientas (WordPress, Figma, GA4, WhatsApp…).
4. Servicios (6) como lista editorial con numeración.
5. Portafolio (inmobiliaria, corporativa, tienda online) con capturas reales.
6. Planes: **una sola sección en tono carbón** con interruptor **Pago único / 3 cuotas**: en 3 cuotas van los mismos 4 planes divididos en tres pagos iguales; **SEO + Google Business y Chatbot + Mantenimiento van fuera del interruptor** como **suscripción mensual** siempre visible, cancelable sin permanencia.
7. Proceso de trabajo (6 pasos).
8. Garantía de 30 días (banda lima).
9. FAQ (8) + JSON-LD FAQPage.
10. Contacto (H2) con formulario → WhatsApp + honeypot y correo con copia al portapapeles.
11. Footer con legales y palabra gigante VITRAWEB.
12. Banner de cookies + botón flotante de WhatsApp.

## 10. Pendientes operativos (no bloquean el código)

- Confirmar dominio definitivo (para canonical, sitemap y JSON-LD).
- Enlaces reales de redes sociales.
- ¿Los 3 conceptos propuestos son los correctos o el cliente tenía otros tres en mente?

## 11. Páginas de detalle por plan

Cada botón **“Quiero este plan”** de la home abre una página propia en `/planes/`. Todas comparten el diseño del sitio, un solo H1, JSON-LD de `Service` + `Offer` y `FAQPage`.

| Plan | URL | Precio en la página |
|---|---|---|
| Landing Page Express | `/planes/landing-page-express.html` | Promo $450.000 / lista $900.000 / 3 × $300.000 |
| Web Corporativa 360 | `/planes/web-corporativa-360.html` | Promo $1.200.000 / lista $2.400.000 / 3 × $800.000 |
| Tienda Online E-commerce | `/planes/tienda-online-e-commerce.html` | Promo $1.800.000 / lista $3.600.000 / 3 × $1.200.000 |
| Identidad Visual + Copywriting | `/planes/identidad-visual-copywriting.html` | Promo $600.000 / lista $1.200.000 / 3 × $400.000 |
| SEO + Google Business | `/planes/seo-google-business.html` | $490.000/mes |
| Chatbot + Mantenimiento | `/planes/chatbot-mantenimiento.html` | $390.000/mes |

**Estructura de cada página:** hero con breadcrumb + tarjeta de precio + captura de proyecto real → qué incluye → ideal para / no es para ti → proceso en 4 pasos → FAQ del plan → garantía de 30 días → CTA a WhatsApp con mensaje pre-escrito.

**Promoción:** las páginas de pago único respetan el mismo contrato que la home (`data-promo-price`, `data-regular-price`, `data-promo-only`, `data-countdown-ended`). Al vencer el plazo muestran el precio de lista y el aviso de promoción finalizada; las suscripciones no cambian.

**Intención de pago:** los CTA de la vista **3 cuotas** añaden `?pago=3` a la URL. La página del plan detecta ese parámetro, resalta la línea de 3 cuotas, cambia el botón a “Quiero este plan en 3 cuotas” y añade “Quiero pagarlo en 3 cuotas” al mensaje de WhatsApp (Bloque 8 de `js/main.js`).

**Sitemap:** las 6 URLs están incluidas en `sitemap.xml` (prioridad 0.8–0.9) y el `LocalBusiness` de la home publica un `hasOfferCatalog` que las enlaza.

