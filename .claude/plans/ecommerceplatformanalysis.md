# Análisis: E-commerce custom vs. SaaS (TiendaNube / Empretienda)

> Documento de decisión generado en mayo 2026 para evaluar la estrategia de e-commerce de Renaciendo en Sol Mayor. Costos y comisiones reflejan tarifas vigentes en mayo 2026 — revisar si pasaron varios meses.

---

## Contexto

El proyecto hoy es una landing pre-MVP en Next.js 16 (Vercel) con un endpoint `/api/subscribe` que guarda emails en memoria (no persiste). El contenido de `content/landing.ts` define tres categorías de producto (cuadernos premium, bitácoras de escritura, arte/decoración) pero **no hay SKUs ni precios definidos** — el copy dice "muy pronto disponibles". No existe ninguna infraestructura de catálogo, carrito, checkout, ni pagos.

La decisión a evaluar: en lugar de seguir invirtiendo desarrollo, ¿conviene contratar TiendaNube o Empretienda, que traen todo integrado? ¿O construir custom con Supabase/Neon + Mercado Pago + Modo + Ualá + Andreani/Correo Argentino?

**Supuestos calibrados:**
- Volumen primer año: **1-30 ventas/mes**.
- Productos: **físicos estándar** (cuadernos, bitácoras, arte) — sin descargas digitales, sin suscripciones recurrentes, sin paywalls.
- Decisión: **balance / tradeoffs** — sin sesgo previo hacia time-to-market o costo absoluto.

Ticket promedio asumido para los cálculos: **$20.000 ARS** (estimación razonable para cuadernos premium / bitácoras en 2026; ajustable).

---

## Las 3 opciones, en una línea

| Opción | Qué es | Esfuerzo de dev | Time-to-launch |
|--------|--------|-----------------|----------------|
| **A. Empretienda** | SaaS, plan único, sin comisión por venta | Cero (config) | Días |
| **B. TiendaNube** | SaaS líder LATAM, planes escalonados | Cero (config) | Días |
| **C. Custom** (Next.js + Supabase + MP/Modo/Ualá + Andreani) | Construir tu propio e-commerce | Alto (semanas) + mantenimiento continuo | Semanas-meses |

---

## Costos fijos mensuales (suscripción / infra)

| Concepto | Empretienda | TiendaNube Esencial | TiendaNube Impulso | Custom (Supabase Pro + Vercel Hobby) | Custom (Neon Launch + Vercel Hobby + auth propia) |
|---|---|---|---|---|---|
| Plataforma / DB | **$8.490 ARS** | **$24.999 ARS** (mensual) — $18.750 con pago anual | **$62.999 ARS** | ~$30.000 ARS (US$25 Supabase Pro) | ~$22.800 ARS (US$19 Neon Launch) |
| Hosting frontend | incluido | incluido | incluido | $0 (Vercel Hobby) o ~US$20 Pro | $0 / US$20 |
| Auth (Google, etc.) | incluido | incluido | incluido | **incluido en Supabase** | hay que armar (NextAuth, etc.) |
| Dominio | ya pago | ya pago | ya pago | ya pago | ya pago |
| Email transaccional | incluido | incluido | incluido | Resend free 3k/mes o ~US$20 | Resend free / US$20 |

**Hidden cost del custom:** tu tiempo. Construir catálogo + carrito + checkout + integraciones de pago + integraciones de envío + panel admin + emails transaccionales son **3-6 semanas full-time**, más mantenimiento continuo (parches de seguridad, cambios de API de MP/Andreani, soporte). Aunque uses Claude Code, hay tiempo de tu lado: diseño, pruebas, manejo de bugs en producción.

---

## Costos variables (comisiones por transacción)

Esto **no se evita en ningún escenario** — la pasarela cobra independientemente de cómo armes la tienda.

### Mercado Pago Checkout (sitio web / link de pago)
- Acreditación **inmediata**: ~6.29% + IVA
- Acreditación **30-35 días**: ~1.49% + IVA (~**1.80% real con IVA**)
- Plazos intermedios proporcionales

### Modo (QR / online)
- ~0.8% + IVA para comercios bancarizados (~0.97% real)

### Ualá Bis (QR / link de pago / ecommerce)
- ~0.6% transferencia, competitiva en tarjetas
- Integración nativa con TiendaNube, Empretienda y vía API propia para custom

### Pago Nube (pasarela propia de TiendaNube)
- 0% de comisión adicional de plataforma — pero la comisión de la pasarela (que enruta a MP) sigue aplicando. No es realmente "gratis", es "no te cobramos el extra encima".

### Costos de envío
- Andreani domicilio: ~$13.000 ARS por paquete (lo paga el cliente; tu pagás solo si absorbés costo de envío). Tanto TiendaNube como Empretienda traen Andreani y Correo Argentino integrados out-of-the-box.

---

## Costo total mensual, 3 escenarios de volumen

Asumiendo Mercado Pago a 30 días (1.80% efectivo con IVA) y ticket promedio $20.000.

### Escenario 1: **10 ventas/mes** = $200.000 ARS facturación
| Opción | Fijo | Comisiones MP | **Total** | **% sobre facturación** |
|---|---|---|---|---|
| Empretienda | $8.490 | $3.600 | **$12.090** | **6.0%** |
| TiendaNube Esencial (anual) | $18.750 | $3.600 | $22.350 | 11.2% |
| TiendaNube Esencial (mensual) | $24.999 | $3.600 | $28.599 | 14.3% |
| Custom Supabase Pro | ~$30.000 | $3.600 | $33.600 | 16.8% |
| Custom Supabase free* | $0 | $3.600 | $3.600 | 1.8% |

\* *Supabase free pausa la DB tras 7 días sin actividad; viable con un cron de ping pero frágil para producción.*

### Escenario 2: **20 ventas/mes** = $400.000 ARS facturación
| Opción | Fijo | Comisiones MP | **Total** | **% sobre facturación** |
|---|---|---|---|---|
| **Empretienda** | $8.490 | $7.200 | **$15.690** | **3.9%** |
| TiendaNube Esencial (anual) | $18.750 | $7.200 | $25.950 | 6.5% |
| Custom Supabase Pro | ~$30.000 | $7.200 | $37.200 | 9.3% |

### Escenario 3: **30 ventas/mes** = $600.000 ARS facturación
| Opción | Fijo | Comisiones MP | **Total** | **% sobre facturación** |
|---|---|---|---|---|
| **Empretienda** | $8.490 | $10.800 | **$19.290** | **3.2%** |
| TiendaNube Esencial (anual) | $18.750 | $10.800 | $29.550 | 4.9% |
| Custom Supabase Pro | ~$30.000 | $10.800 | $40.800 | 6.8% |

---

## Cuándo conviene cada opción

### Empretienda — **te conviene ahora**
- Plan único $8.490/mes, **0% de comisión de plataforma**, sin tiers que te obligan a upgradear.
- Integraciones de Mercado Pago, Ualá Bis, Andreani y Correo Argentino out-of-the-box.
- Prueba 30 días gratis — podés validar sin riesgo.
- 30 días free + costo más bajo del mercado para tu volumen.

**Limitaciones reales:** menos templates/branding que TiendaNube, ecosistema de apps más chico, menos opciones avanzadas (multi-idioma, multi-moneda, etc.). Para una marca con identidad fuerte, los themes son básicos.

### TiendaNube — para cuando crezcas o quieras más profesionalización visual
- Themes mejores, ecosistema de apps grande (cross-selling, abandono de carrito, reviews, etc.).
- Pago Nube te ahorra el "costo por transacción" extra de la plataforma.
- A 30 ventas/mes el delta de costo vs. Empretienda es ~$10k/mes — pagable si las apps te suman conversión >2%.
- A < 15 ventas/mes está sobredimensionado.

### Custom (Supabase/Neon + integraciones propias) — **no te conviene hoy**

Razones concretas:
1. **A volumen bajo, el costo fijo de Supabase Pro (~$30k) ya iguala o supera a TiendaNube** y es 3-4× Empretienda. No hay ahorro.
2. **El "ahorro de comisiones de plataforma" no existe** — Empretienda ya es 0% y Pago Nube también. La única comisión real es la pasarela, que **vas a pagar igual**.
3. **El costo oculto de desarrollo y mantenimiento es enorme**: integrar MP (con sus webhooks y conciliación), Modo, Ualá, calcular envíos con API Andreani, panel admin, gestión de stock, reportes, devoluciones, edge cases (refunds, contracargos), seguridad PCI… son semanas de trabajo y bugs en producción que afectan ingresos reales.
4. **Vas a reinventar features de SaaS que ya son commodity** (cupones, abandono de carrito, reviews, integración fiscal AFIP, etc.).
5. **No hay features no-estándar que justifiquen el costo** — productos físicos clásicos.

**Cuándo sí conviene custom (señales de migrar más adelante):**
- Productos digitales con paywall y comunidad cerrada (cursos, bitácoras descargables, contenido premium).
- Suscripciones recurrentes con lógica propia (ej: caja mensual con elección curada).
- Necesidad de UX/animaciones únicas que un template de SaaS no logra (improbable que sea decisivo a este volumen).
- Volumen >300 ventas/mes donde 1% de comisión = mucho dinero y un ingeniero dedicado se paga solo.

---

## Recomendación

**Empezar con Empretienda.** Es la opción dominada en el escenario actual:
- Costo total más bajo en los 3 escenarios de volumen.
- Sin esfuerzo de desarrollo — se puede lanzar en días.
- Sin lock-in significativo (los productos se exportan en CSV; migrar a TiendaNube o custom después es factible).

**Mantener la landing actual en Next.js/Vercel** (es el home, blog futuro e identidad de marca). El subdominio `tienda.renaciendoensolmayor.com.ar` (o un link en el navbar) apunta a Empretienda. Lo mejor de los dos mundos: identidad y SEO en la landing propia, tienda en SaaS sin reinventar la rueda.

**Cuándo reconsiderar (triggers concretos de migración):**

| Trigger | Acción sugerida |
|---|---|
| Ventas > 50/mes sostenidas y necesitás apps avanzadas (reviews, abandono de carrito, etc.) | Migrar a TiendaNube Esencial |
| Lanzás productos digitales / suscripción / membresía | Evaluar custom con Supabase (Auth + DB + Storage + RLS encajan perfecto) |
| Querés integrar profundo con blog/IG/newsletter y diferenciar UX | Evaluar custom o headless commerce |

---

## Próximos pasos sugeridos

1. **Empretienda:** crear cuenta, activar trial 30 días, cargar 3-5 SKUs reales con precios definitivos, configurar MP + Andreani + Correo Argentino.
2. **Landing actual:** agregar CTA "Tienda" en el `Navbar` (`components/Navbar.tsx`) que apunte al subdominio o URL de Empretienda. Mantener el Subscribe como funnel de email.
3. **Subscribe endpoint:** completar el TODO de `app/api/subscribe/route.ts:40` migrando a Supabase free (sólo para emails, no para e-commerce) o a la lista de Empretienda directamente.
4. **Métrica de revisión:** a los 6 meses, evaluar si las ventas/mes + necesidades de feature justifican migrar.

## Verificación operacional (al activar Empretienda)

- Dar de alta cuenta de prueba en Empretienda, configurar 1 producto de prueba y completar un checkout end-to-end con Mercado Pago en sandbox.
- Confirmar que las integraciones nativas de Andreani y Correo Argentino cubren la zona de despacho.
- Validar facturación: que Empretienda emita facturas A/B/C según corresponda a la condición fiscal (monotributo / RI).

---

## Fuentes consultadas

- TiendaNube planes y comisiones 2026: [tiendanube.com/planes-y-precios](https://www.tiendanube.com/planes-y-precios), [mktmarketingdigital.com](https://mktmarketingdigital.com/planes-costos-tienda-nube-argentina-2026/)
- Empretienda planes 2026: [empretienda.com](https://www.empretienda.com/), comparativas [tiendanube.com/blog](https://www.tiendanube.com/blog/empretienda-o-tiendanube/)
- Mercado Pago Checkout: [mercadopago.com.ar/ayuda/33403](https://www.mercadopago.com.ar/ayuda/33403), [/33399](https://www.mercadopago.com.ar/ayuda/33399)
- Comparativa MP / Modo / Ualá: [iproup.com](https://www.iproup.com/finanzas/64002-mercado-pago-uala-modo-cual-es-mas-barato-para-cobrar-en-comercios-y-emprendimientos), [jonatanalmeira.com](https://www.jonatanalmeira.com/como-cobrar-con-qr-argentina/), [cobrocontarjeta.com.ar](https://cobrocontarjeta.com.ar/)
- Andreani / Correo Argentino integración: [andreani.com/precios-productos](https://www.andreani.com/precios-productos), [developers.andreani.com](https://developers.andreani.com/), [correoargentinopro.com](https://correoargentinopro.com/blog/envios-correo-argentino-tienda-online.html)
- Supabase pricing: [supabase.com/pricing](https://supabase.com/pricing)
- Neon pricing: comparativas [designrevision.com](https://designrevision.com/blog/supabase-vs-neon), [agentdeals.dev](https://agentdeals.dev/neon-vs-supabase)
