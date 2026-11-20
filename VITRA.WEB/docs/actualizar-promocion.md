# Cómo actualizar la promoción del 50 %

La promoción tiene una sola fecha real, pero se publica en tres lugares que deben cambiar juntos: el texto visible, el atributo del countdown y el dato estructurado. Este documento es la checklist para moverla sin dejar fechas viejas.

## 1. Fecha vigente

- **Cierre:** 31 de diciembre de 2026, 23:59 (hora de Colombia).
- **Formato para el countdown:** `2026-12-31T23:59:59-05:00`.
- **Formato para JSON-LD:** `2026-12-31`.
- **Texto visible en la home:** `Hasta el 31 de diciembre de 2026 · 23:59 (hora Colombia)`.
- **Texto visible en páginas de plan:** `50 % OFF hasta el 31 de diciembre de 2026 · 23:59 (hora Colombia).`

## 2. Archivos que debes tocar

| Archivo | Qué cambiar |
|---|---|
| `index.html` | `data-deadline` del countdown, texto `.plans__promo-deadline`, `priceValidUntil` del `Service` JSON-LD y cualquier referencia a la fecha en el bloque de planes. |
| `planes/landing-page-express.html` | `data-deadline`, texto visible de la oferta y `priceValidUntil` del `Service` JSON-LD. |
| `planes/web-corporativa-360.html` | Igual que la landing. |
| `planes/tienda-online-e-commerce.html` | Igual que la landing. |
| `planes/identidad-visual-copywriting.html` | Igual que la landing. |
| `legal/aviso-legal.html` | Fecha de vigencia de la promoción y fecha de última actualización. |
| `docs/planes-y-precios.md` | Vigencia y cualquier referencia a la promoción. |
| `Temp/opencode/gen_plans.py` | Si se regeneran las páginas, actualizar la fecha del `price_block`, `promo_countdown` y `offer_schema` antes de ejecutarlo. |

Las páginas de plan se generan con `Temp/opencode/gen_plans.py`. **No edites el HTML generado a mano** si vas a volver a ejecutar el generador: cambia el generador y vuelve a generarlas. Si no vas a regenerar, puedes editar los seis HTML directamente, pero mantén los tres formatos de fecha alineados.

## 3. Checklist de cambio

1. Define la nueva fecha de cierre y conviértela a los tres formatos.
2. Actualiza el texto visible de la home y de las cuatro páginas de pago único.
3. Actualiza `data-deadline` en la home y en las cuatro páginas de plan.
4. Actualiza `priceValidUntil` en el JSON-LD de la home y de las cuatro páginas de plan.
5. Actualiza la fecha de vigencia en `legal/aviso-legal.html`.
6. Actualiza la tabla y la vigencia en `docs/planes-y-precios.md`.
7. Si corresponde, actualiza el generador y vuelve a ejecutarlo.
8. Verifica con una búsqueda global que no quede la fecha anterior:
   - `2026-12-31`
   - `31 de diciembre de 2026`
   - `31/12/2026`
9. Abre la home y las cuatro páginas de pago único y confirma que el texto visible y el JSON-LD muestran la misma fecha.
10. Prueba el estado vencido: cambia temporalmente `data-deadline` a una fecha pasada, recarga y confirma que aparecen los precios de lista y “Promoción finalizada”. Luego restaura la fecha real.

## 4. Reglas que no cambian

- El descuento aplica **solo al pago único**.
- El pago en 3 cuotas se calcula sobre el precio de lista, sin descuento.
- La suscripción mensual de SEO y mantenimiento no tiene descuento ni permanencia.
- Los precios tachados son siempre el valor de lista de referencia.
- La fecha del JavaScript no reemplaza la fecha del HTML: el HTML debe ser correcto incluso con JavaScript desactivado.

## 5. Cierre definitivo

El 31/12/2026 ejecuta una vez `python C:\Users\manue\AppData\Local\Temp\opencode\finalizar_promocion.py` y publica todos los HTML resultantes. El script actualiza en conjunto la fecha, los importes visibles (incluidos el menú de planes, las FAQ y los metadatos), el aviso legal y los datos estructurados; es idempotente, pero conviene verificar con una búsqueda global que no queden `2026-12-31`, `50 % OFF` ni precios promocionales en texto visible. No dependas solo del JavaScript para retirar la oferta.
