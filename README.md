# 📋 Label Designer

Una aplicación de escritorio moderna para diseñar y exportar etiquetas a PDF de forma profesional. 

## ✨ Características

- 🎨 **Editor visual intuitivo** con Fabric.js
- 🖼️ **Agregar imágenes** y posicionarlas libremente
- ✏️ **Editar texto** con múltiples fuentes y tamaños
- 🔄 **Rotar, redimensionar y mover** objetos
- 📊 **Grilla de etiquetas** personalizable (filas y columnas)
- 📄 **Exportar a PDF** listo para imprimir
- 💾 **Guardar y cargar proyectos** en JSON
- 🖨️ **Plantillas predefinidas** (Avery, etc.)
- 🎯 **Contador de etiquetas** en tiempo real

## 🛠️ Tecnologías

- **Electron** - Aplicación de escritorio multiplataforma
- **React** - Interfaz de usuario
- **Fabric.js** - Editor de canvas avanzado
- **Zustand** - Gestión de estado
- **jsPDF** - Exportación a PDF
- **HTML5 Canvas** - Renderizado gráfico

## 📦 Instalación

### Requisitos previos
- Node.js 14+ instalado
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/OTO7706/label.git
cd label
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Instalar dependencias adicionales**
```bash
npm install wait-on concurrently electron-is-dev
```

## 🚀 Uso

### Modo desarrollo
```bash
npm start
```

Esto abrirá:
- React dev server en `http://localhost:3000`
- Aplicación Electron automáticamente

### Compilar distribución
```bash
npm run build
```

## 📖 Guía de uso

### 1. Crear una grilla de etiquetas
- Haz clic en "⚙️ Configuración"
- Configura filas, columnas y tamaño
- Selecciona una plantilla predefinida o personaliza
- Haz clic en "✨ Crear Grilla"

### 2. Editar etiquetas
- Selecciona una etiqueta de la grilla en el sidebar izquierdo
- Usa los botones del canvas para:
  - **📝 Texto**: Agregar texto editable
  - **🖼️ Imagen**: Cargar una imagen
  - **📋 Duplicar**: Duplicar el objeto seleccionado
  - **🗑️ Eliminar**: Eliminar el objeto seleccionado

### 3. Manipular objetos
- **Mover**: Arrastra los objetos
- **Redimensionar**: Arrastra las esquinas
- **Rotar**: Usa los controles de rotación
- **Editar texto**: Haz doble clic en el texto

### 4. Guardar proyecto
- Haz clic en "💾 Guardar"
- Se descargará un archivo `.json` con tu proyecto

### 5. Exportar a PDF
- Haz clic en "📄 Exportar PDF"
- Selecciona ubicación y nombre del archivo
- ¡Listo para imprimir!

## 📐 Plantillas predefinidas

- **Avery 5160**: 3 columnas, 10 filas, 250x80px
- **Avery 8160**: 3 columnas, 10 filas, 270x100px
- **Personalizado**: Tu propia configuración

## 📝 Estructura del proyecto

```
label/
├── public/
│   ├── electron.js          # Proceso principal de Electron
│   ├── preload.js           # Scripts de preload
│   └── index.html           # HTML base
├── src/
│   ├── components/
│   │   ├── CanvasEditor.js  # Editor de canvas principal
│   │   ├── Toolbar.js       # Barra de herramientas
│   │   └── Settings.js      # Modal de configuración
│   ├── store/
│   │   └── store.js         # Zustand store
│   ├── styles/
│   │   ├── global.css
│   │   ├── App.css
│   │   ├── CanvasEditor.css
│   │   ├── Toolbar.css
│   │   └── Settings.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🐛 Problemas comunes

### La aplicación no abre
```bash
rm -rf node_modules package-lock.json
npm install
```

### El canvas no funciona
- Asegúrate de tener la última versión de Fabric.js
- Verifica que tu navegador soporte HTML5 Canvas

### PDF no se exporta
```bash
npm install jspdf html2canvas
```

## 📄 Licencia

MIT © 2024 OTO7706

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**¡Disfruta diseñando tus etiquetas! 🎨**
