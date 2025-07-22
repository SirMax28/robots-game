#!/bin/bash

echo "🚀 Preparando deployment de Robots de Combate..."

# Verificar que estamos en un repo git
if [ ! -d ".git" ]; then
    echo "❌ Error: No estás en un repositorio Git"
    echo "Ejecuta: git init"
    exit 1
fi

# Verificar estado del proyecto
echo "📋 Verificando archivos..."
if [ ! -f "index.html" ]; then
    echo "❌ Error: No se encuentra index.html"
    exit 1
fi

if [ ! -f "js/main.js" ]; then
    echo "❌ Error: No se encuentra js/main.js"
    exit 1
fi

if [ ! -d "backend" ]; then
    echo "❌ Error: No se encuentra la carpeta backend"
    exit 1
fi

echo "✅ Todos los archivos están presentes"

# Preguntar URL del backend
echo ""
echo "🔧 ¿Ya tienes la URL de Railway para el backend?"
echo "   Si no, primero deploya en Railway y luego ejecuta este script"
echo ""
read -p "Ingresa la URL de tu backend de Railway (sin https://): " backend_url

if [ -z "$backend_url" ]; then
    echo "⚠️  Continuando sin actualizar la URL del backend"
    echo "   Recuerda actualizarla en js/main.js después"
else
    # Actualizar URL en main.js
    echo "🔄 Actualizando URL del backend en js/main.js..."
    sed -i "s|const BASE_URL = '.*';|const BASE_URL = 'https://$backend_url';|" js/main.js
    echo "✅ URL actualizada a: https://$backend_url"
fi

# Hacer commit y push
echo ""
echo "📤 Subiendo a GitHub..."
git add .
git commit -m "🎮 Robots de Combate - Juego multijugador listo para deployment

✨ Características:
- 🤖 3 robots únicos con habilidades diferentes
- ⚔️ Sistema de combate estratégico (Láser/Misiles/Escudo)
- 🗺️ Mapa interactivo multijugador
- 👥 Tiempo real con múltiples jugadores
- 📱 Compatible móvil y desktop
- 🎨 Interfaz moderna con animaciones

🛠️ Stack técnico:
- Frontend: HTML5 + CSS3 + JavaScript ES6 + Canvas
- Backend: Node.js + Express + CORS
- Deployment: GitHub Pages + Railway

🚀 Listo para jugar en línea!"

echo ""
echo "🌐 Haciendo push a GitHub..."
git push

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ¡Deployment exitoso!"
    echo ""
    echo "📋 Próximos pasos:"
    echo "   1. Ve a tu repositorio en GitHub"
    echo "   2. Settings → Pages → Source: main branch"
    echo "   3. Tu juego estará en: https://TU_USUARIO.github.io/REPO_NAME/"
    echo ""
    echo "🚀 Para el backend:"
    echo "   1. Ve a railway.app"
    echo "   2. Deploy from GitHub repo"
    echo "   3. Selecciona tu repositorio"
    echo "   4. Railway detectará automáticamente Node.js"
    echo ""
    echo "📖 Consulta DEPLOYMENT.md para instrucciones detalladas"
else
    echo "❌ Error al hacer push a GitHub"
    echo "   Verifica tu conexión y credenciales de Git"
fi
