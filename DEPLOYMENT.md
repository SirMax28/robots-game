# 🚀 Guía de Deployment - Robots de Combate

## 📋 Paso a Paso para Publicar tu Juego

### 🎯 Objetivo
- **Frontend**: GitHub Pages (gratis)
- **Backend**: Railway (gratis)
- **Resultado**: Juego accesible desde cualquier navegador

---

## 🔥 PASO 1: Subir a GitHub

### 1.1 Crear repositorio en GitHub
```bash
1. Ir a github.com
2. Hacer clic en "New repository"
3. Nombre: "ping-pong-game" o "robots-de-combate"
4. ✅ Public
5. ✅ Add README
6. Create repository
```

### 1.2 Conectar y subir código
```bash
# En tu terminal (dentro del proyecto):
git add .
git commit -m "🎮 Robots de Combate - Juego multijugador completo"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/ping-pong-game.git
git push -u origin main
```

---

## 🌐 PASO 2: Activar GitHub Pages

### 2.1 Configurar GitHub Pages
```bash
1. Ir a tu repositorio en GitHub
2. Settings → Pages (en el menú izquierdo)
3. Source: "Deploy from a branch"
4. Branch: "main" / "/ (root)"
5. Save
```

### 2.2 Esperar deployment (2-5 minutos)
```
✅ Tu juego estará en: https://TU_USUARIO.github.io/ping-pong-game/
```

---

## 🚀 PASO 3: Deploar Backend en Railway

### 3.1 Crear cuenta en Railway
```bash
1. Ir a railway.app
2. Sign up with GitHub
3. Autorizar acceso
```

### 3.2 Crear nuevo proyecto
```bash
1. "New Project"
2. "Deploy from GitHub repo"
3. Seleccionar tu repositorio "ping-pong-game"
4. Railway detectará automáticamente Node.js
```

### 3.3 Configurar el deployment
```bash
1. En Railway: Settings → Environment
2. No necesitas variables (Railway asigna PORT automáticamente)
3. Deploy automático se ejecutará
```

### 3.4 Obtener URL del backend
```bash
1. En Railway: Settings → Domains
2. Generate Domain
3. Copiar la URL (ej: ping-pong-robots-backend.up.railway.app)
```

---

## 🔧 PASO 4: Conectar Frontend con Backend

### 4.1 Actualizar URL del servidor
En `js/main.js`, línea 2, cambiar:
```javascript
// DE ESTO:
const BASE_URL = 'https://ping-pong-robots-backend.up.railway.app';

// A TU URL REAL DE RAILWAY:
const BASE_URL = 'https://TU-APP-RAILWAY.up.railway.app';
```

### 4.2 Subir cambios
```bash
git add .
git commit -m "🔗 Conectar frontend con backend de Railway"
git push
```

GitHub Pages se actualizará automáticamente en 1-2 minutos.

---

## ✅ PASO 5: Verificar que Todo Funciona

### 5.1 Testear el juego
1. Ir a tu GitHub Pages: `https://TU_USUARIO.github.io/ping-pong-game/`
2. Abrir en 2 pestañas diferentes
3. Seleccionar robots en ambas
4. Verificar que se ven en el mapa
5. Hacer que colisionen y peleen

### 5.2 Verificar backend
1. Ir a tu URL de Railway
2. Deberías ver: "Cannot GET /" (normal, es una API)
3. Probar: `TU-URL-RAILWAY.up.railway.app/unirse`
4. Debería devolver un ID único

---

## 🎉 ¡LISTO! Tu juego está online

- **🌐 Juego**: https://TU_USUARIO.github.io/ping-pong-game/
- **🔧 Código**: https://github.com/TU_USUARIO/ping-pong-game
- **🚀 Backend**: https://TU-APP.up.railway.app

---

## 📱 Compartir tu Juego

Copia este mensaje para compartir:

```
🤖 ¡Acabo de crear un juego multijugador de Robots de Combate! 

🎮 Jugar: https://TU_USUARIO.github.io/ping-pong-game/
👨‍💻 Código: https://github.com/TU_USUARIO/ping-pong-game

Características:
✅ Multijugador en tiempo real
✅ 3 robots únicos con habilidades diferentes  
✅ Sistema de combate estratégico
✅ Mapa interactivo
✅ Compatible móvil y desktop

¡Probalo y contame qué tal! 🚀
```

---

## 🛠️ Mantenimiento

### Updates al juego:
```bash
# Hacer cambios en el código
git add .
git commit -m "Descripción del cambio"
git push
# GitHub Pages y Railway se actualizan automáticamente
```

### Ver logs del servidor:
1. Railway Dashboard → Tu proyecto → Deployments
2. View Logs para ver actividad en tiempo real

---

## 🆘 Troubleshooting

### Si el frontend no carga:
- Verificar que GitHub Pages esté activado
- Revisar que `index.html` esté en el root del repositorio

### Si no se conecta al backend:
- Verificar que la URL en `js/main.js` sea correcta
- Revisar logs en Railway Dashboard

### Si el backend no funciona:
- Verificar que Railway haya detectado Node.js
- Revisar que `package.json` tenga el script start
