# Publicación en un hosting Apache

Guía rápida para subir VITRAWEB sin Node.js ni dependencias de servidor. Funciona en cualquier hosting compartido o administrado que soporte Apache, HTTPS y archivos estáticos.

## 1. Antes de subir

1. Ten a mano el dominio `vitraweb.co`, el acceso al panel del hosting y el certificado SSL.
2. El dominio `https://vitraweb.co` ya está aplicado en:
   - `index.html`: canonical, `hreflang`, Open Graph, Twitter Card y los `@id` de los datos estructurados.
   - `planes/*.html`: canonical, `hreflang`, Open Graph y JSON-LD.
   - `legal/aviso-legal.html`, `legal/politica-privacidad.html`, `legal/politica-cookies.html`: canonical y Open Graph.
   - `sitemap.xml`: todas las URLs.
   - `robots.txt`: línea `Sitemap:`.
3. La identificación legal (persona natural, NIT 1042848246 y titular Manuel Ospino Pacheco) está publicada en `legal/aviso-legal.html` y `legal/politica-privacidad.html`, y en el `LocalBusiness` de `index.html` como `legalName` y `taxID`. Confirma la exactitud del nombre con revisión profesional antes de publicar.
4. Verifica que el correo `vitra.webcompany@gmail.com` y el WhatsApp `+57 300 310 0691` sigan siendo los canales oficiales.
5. Confirma con el cliente el dominio, el hosting y el correo. **No prometas un proveedor específico en el sitio**: dominio, hosting, SSL y servicios de terceros se cobran aparte y se eligen con el cliente.

## 2. Subida de archivos

1. Entra al panel del hosting y abre el administrador de archivos (o conéctate por FTP/SFTP).
2. Sube **el contenido** de la carpeta `VITRA.WEB` dentro de la carpeta pública (`public_html`, `htdocs` o equivalente), no la carpeta completa:
   - `index.html`
   - `404.html`
   - `.htaccess`
   - `robots.txt`
   - `sitemap.xml`
   - `css/`, `js/`, `assets/`, `planes/`, `legal/`, `docs/`
3. No subas archivos sueltos que no se usan (por ejemplo las imágenes duplicadas de la raíz). No afectan, pero suman peso.
4. Confirma que `.htaccess` se subió: algunos clientes FTP ocultan archivos que empiezan por punto.

## 3. HTTPS, dominio y hosting

1. Activa el certificado SSL en el panel del hosting y espera a que esté emitido.
2. Si el SSL aún no está activo, comenta el bloque de redirección HTTPS en `.htaccess` para evitar un bucle. Vuelve a activarlo cuando el certificado funcione.
3. Apunta el dominio a los nameservers del hosting y configura el dominio raíz en el panel. El dominio debe quedar a nombre del cliente.
4. El `.htaccess` fuerza HTTPS y quita `www`. Si prefieres `www`, invierte esa regla y actualiza el canonical.
5. Recomienda hosting profesional con SSL incluido, copias de seguridad y soporte si el sitio es crítico para el negocio. No prometas hosting gratuito ni lo uses como argumento de venta.

## 4. Dominio, renovación, respaldos y soporte

- **Dominio:** se registra o se transfiere a nombre del cliente y se renueva cada año. Es un costo aparte, según la extensión.
- **Hosting y SSL:** se contratan aparte. El cliente es el titular de la cuenta o tiene acceso administrativo.
- **Copias de seguridad:** dependen del hosting. La suscripción Chatbot + Mantenimiento añade respaldos semanales, retención de 30 días y restauración.
- **Soporte:** la configuración inicial se corrige sin costo. La suscripción mensual cubre soporte prioritario de lunes a viernes, 9:00–18:00 (hora Colombia), y hasta 2 h de cambios menores.
- **Titularidad de los entregables:** el dominio queda a nombre del cliente desde el registro. El diseño, el código y los archivos se transfieren al completar el pago total: pago completo en la modalidad de pago único o tercera cuota en el plan de 3 cuotas.

## 5. Pruebas después de publicar

- Abre la home en móvil y escritorio: hero, planes, comparativa, FAQ, formulario y footer.
- Envía el formulario de prueba: debe abrir WhatsApp con el mensaje completo y el plan elegido, incluida la opción “Plan 3 cuotas”.
- Revisa el aviso de cookies, acepta y recarga: no debe volver a aparecer.
- Prueba los enlaces legales y el botón flotante de WhatsApp.
- Haz clic en el correo del footer y en el de contacto: debe copiarse la dirección y aparecer el aviso emergente (toast). Si el portapapeles está bloqueado, se muestra igualmente la dirección para copiarla a mano.
- Abre una URL inexistente (por ejemplo `/prueba-404`) y confirma que se sirve `404.html` con el diseño del sitio y código de estado 404.
- Recorre las 6 páginas de `/planes/` y confirma que el CTA abre WhatsApp con el mensaje del plan correcto.
- Comprueba que cada página de plan tiene un solo H1 y que su enlace “Ver todos los planes” vuelve a `/#planes`.
- Comprueba `https://vitraweb.co/sitemap.xml` y `https://vitraweb.co/robots.txt`: el sitemap debe listar la home, las 6 páginas de plan y las 3 legales.
- Envía el sitemap a Google Search Console y solicita indexación.
- Valida los datos estructurados en el validador de resultados enriquecidos de Google (LocalBusiness + OfferCatalog, Service y FAQPage en la home; Service y FAQPage en cada página de plan). Comprueba además que título y metadescripción sean únicos y no se corten en Google (~60 y ~155 caracteres).

## 6. Promoción del 50 % y plan de 3 cuotas

- El panel de promoción y el countdown están **dentro de la sección de planes**, en `.plans__promo`.
- La fecha límite está en el HTML (`data-deadline`), en el texto visible de la home y de cada página de plan, y en el `priceValidUntil` del JSON-LD. **Los tres deben cambiar juntos.** El JavaScript solo oculta la oferta cuando vence; no debe ser la única fuente de la fecha.
- Al vencer, el JavaScript oculta los precios promocionales, muestra los de lista, cambia el aviso a “Promoción finalizada” y actualiza el `Service` JSON-LD.
- El **plan de 3 cuotas** se calcula sobre el precio de lista y no se ve afectado por la promoción: vive en el interruptor **Pago único / 3 cuotas** y en cada página de plan, y permanece visible antes y después del vencimiento.
- Para cambiar la promoción, sigue la checklist de `docs/actualizar-promocion.md` y regenera las páginas de plan si usas el generador.

## 7. Página 404

- El archivo `404.html` está en la raíz y reutiliza `css/style.css`, el header y el footer del sitio, con `meta robots="noindex, follow"`.
- `.htaccess` incluye `ErrorDocument 404 /404.html`. Si publicas en un subdirectorio, ajusta esa ruta.
- Algunos paneles muestran primero su propia página de error; comprueba en el navegador que aparece la de VITRAWEB.

## 8. Mantenimiento

- Reemplaza el contenido de `docs/planes-y-precios.md` si cambian precios o alcances y actualiza el HTML en consecuencia.
- Las fuentes son **Archivo** (texto, interfaz y titulares) y **Newsreader** (cursivas editoriales), servidas desde Google Fonts; si el hosting o la región bloquea esa conexión, descarga las fuentes y sírvelas localmente.
- No hay base de datos ni panel: cualquier cambio se hace en los archivos y se vuelve a subir.
- Todos los archivos estáticos (CSS, JS, imágenes, iconos y fuentes) se sirven con `max-age=0, must-revalidate`: el navegador revalida en cada visita (304 si no cambiaron). Así se puede reemplazar una imagen conservando su nombre sin que los visitantes vean la versión anterior; no hace falta versionar los nombres.
