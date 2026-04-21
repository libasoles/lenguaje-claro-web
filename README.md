# Lenguaje Claro Web

![Lenguaje Claro Banner](assets/banner.png)

Este directorio contiene la **web de la extensión Lenguaje Claro**.

<https://lenguajeclaroweb.netlify.app/>

## Desarrollo

`index.html`, `legal.html` y `support.html` se generan desde páginas JSX en `src/pages/` y componentes compartidos en `src/components/`, usando render estático con Preact.
Los archivos generados se escriben en la carpeta `public/` (no en el directorio raíz).

Para regenerar las páginas:

```bash
npm run build
```

Los archivos generados estarán en `public/`.

Para recompilar automáticamente mientras editás `src/`:

```bash
npm run watch
```

Los archivos generados estarán en `public/`.

## Waitlist Pro

La landing registra la lista de espera de la versión Pro mediante una Netlify
Function en `/api/waitlist`.

### Variables de entorno

Definí estas variables tanto localmente como en Netlify:

```bash
SUPABASE_URL=
SUPABASE_SECRET_KEY=
RESEND_API_KEY=
FROM_EMAIL=
FROM_EMAIL_NAME=
REPLY_TO_EMAIL=
```

`SUPABASE_SECRET_KEY` tiene que ser una key con permisos de escritura sobre las
tablas de la waitlist. Como la migración habilita RLS y no define policies, en
la práctica eso significa usar la `service_role` key de Supabase para la
Netlify Function.

`FROM_EMAIL` tiene que ser un remitente válido para tu cuenta de Resend
(idealmente un dominio verificado). Si lo definís como dirección simple, por
ejemplo `hola@extensionlenguajeclaro.com.ar`, la función lo envía como
`Lenguaje Claro <hola@extensionlenguajeclaro.com.ar>`.

`FROM_EMAIL_NAME` es opcional. Si no se define, el nombre visible del remitente
es `Lenguaje Claro`.

### Base de datos

El esquema de Supabase para la waitlist está en
`supabase/migrations/20260420_waitlist.sql`.

Ese script crea:

- el enum `origen_suscriptor`
- la tabla `suscriptores`
- la tabla `emails`
- RLS habilitado en ambas tablas

### Tests

```bash
npm test
```

## ¿Qué es Lenguaje Claro?

Lenguaje Claro es una extensión que ayuda a mejorar la claridad y comprensión de textos jurídicos en español, identificando arcaísmos, tecnicismos, voz pasiva, vaguedades y otros patrones que dificultan la lectura al ciudadano común.
