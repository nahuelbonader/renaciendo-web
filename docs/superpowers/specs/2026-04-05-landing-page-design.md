# Renaciendo en Sol Mayor — Landing Page Design Spec

## Proyecto

**Renaciendo en Sol Mayor** fusiona naturaleza y escritura. Busca despertar el amor por la vida y la naturaleza, reconectar a las personas consigo mismas a través de la expresión escrita. Es un proyecto de dos personas; la autora de los escritos es Sol María Comas, que firma como "Renaciendo en Sol Mayor".

Instagram: https://www.instagram.com/renaciendoensolmayor/

## Objetivo de la Landing

- Presentar la marca, su identidad y valores (quiénes son, qué hacen, por qué)
- Generar expectativa sobre los productos que se van a vender
- Capturar emails de personas interesadas antes del lanzamiento de la tienda

No es una tienda todavía. No hay venta directa.

## Identidad Visual

- **Paleta de colores**: `#FFDE59` (sol/amarillo), `#E2A9F1` (lavanda), `#6FE5CC` (menta), blanco, gris oscuro para texto
- **Tipografía**: [Gowun Dodum](https://fonts.google.com/specimen/Gowun+Dodum) — redondeada, suave, artesanal
- **Logo**: Sol naciente con hoja de helecho/palma y rayos de luz. Disponible en PNG transparente y sobre cada color de marca
- **Tono visual**: Orgánico / Cálido — fondos con texturas suaves (papel, acuarela), los tres colores de marca presentes, ilustraciones botánicas sutiles, sensación artesanal y terrenal

## Stack Técnico

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS 4**
- **Supabase** (segunda iteración) — base de datos PostgreSQL para persistir emails de suscripción. En la primera iteración el endpoint de suscripción solo valida datos sin persistir.
- **Google Fonts** — Gowun Dodum
- **Deploy**: Vercel

## Estructura de la Landing

Single page con scroll suave entre secciones:

### 1. Hero
- Logo centrado
- Frase poética de la marca (ej: "Dejarse atravesar por la vida")
- Fondo con gradiente suave entre los colores de marca
- Sensación de apertura, de amanecer

### 2. Qué es Renaciendo en Sol Mayor
- Texto breve explicando la esencia: la fusión de naturaleza y escritura
- Tono cálido, invitación a reconectar

### 3. Qué estamos creando
- Preview de las 3 líneas de producto:
  - **Cuadernos premium** para escritura — experiencia de escribir única y de conexión
  - **Bitácoras de escritura reflexiva** con ejes temáticos basados en procesos de la naturaleza — reconectar al ser humano con la naturaleza
  - **Objetos de decoración** — cuadros con ilustraciones y frases de la autora, stickers
- Sin precios ni botón de compra. Solo imágenes/ilustraciones + descripción breve

### 4. Quiénes somos
- Sección sobre las dos personas detrás del proyecto
- Breve, humano, cercano

### 5. Suscripción
- CTA para dejar el email
- Copy tipo: "Sé parte del renacer — enterate antes que nadie cuando abramos la tienda"
- Formulario: nombre + email

### 6. Footer
- Link a Instagram (@renaciendoensolmayor)
- Créditos
- Frase de cierre

### Navbar
- Menú simple fijo con anclas a cada sección
- Logo pequeño a la izquierda

## Arquitectura del Proyecto

```
renaciendo-web/
├── app/
│   ├── layout.tsx          # Layout global (fonts, metadata)
│   ├── page.tsx            # Landing page (compone las secciones)
│   └── api/
│       └── subscribe/
│           └── route.ts    # POST endpoint para guardar emails
├── components/
│   ├── Hero.tsx
│   ├── About.tsx           # Qué es Renaciendo
│   ├── Products.tsx        # Qué estamos creando
│   ├── Team.tsx            # Quiénes somos
│   ├── Subscribe.tsx       # Formulario de suscripción
│   ├── Footer.tsx
│   └── Navbar.tsx          # Menú simple con anclas
├── lib/
│   └── supabase.ts         # Cliente Supabase
├── public/
│   └── images/             # Logo, fotos de producto
├── tailwind.config.ts      # Colores de marca, font
└── .env.local              # Claves de Supabase (no se commitea)
```

## API de Suscripción

**Endpoint**: `POST /api/subscribe`

**Request body**:
```json
{
  "name": "string",
  "email": "string"
}
```

**Validación server-side**:
- Email con formato válido
- Email no duplicado
- Nombre no vacío

**Respuestas**:
- `201` — Suscripción exitosa
- `400` — Datos inválidos
- `409` — Email ya registrado
- `500` — Error interno

**Base de datos (Supabase)**:
- Tabla `subscribers`: `id` (uuid, PK), `name` (text), `email` (text, unique), `created_at` (timestamptz)

## Productos Futuros (fuera de scope, pero informan decisiones)

- Tienda online de productos
- Blog
- Libros de la autora
- Talleres de escritura
- Café propio para jams de lectura

Estas necesidades futuras justifican la elección de Next.js como framework.
