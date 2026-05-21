# 📋 Label Designer - Pro Edition

Una aplicación de escritorio profesional para diseñar y exportar etiquetas a PDF con soporte completo para códigos de barras, QR, y gestión automática de múltiples páginas.

## ✨ Características Principales

### 🎨 Diseño Avanzado
- **Editor visual intuitivo** con Fabric.js
- **Agregar elementos**: Texto, Imágenes, Códigos de Barras, QR
- **Manipulación total**: Rotar, redimensionar, mover objetos
- **Edición de propiedades**: Fuentes, tamaños, colores

### 📊 Códigos (NEW!)
- **📊 Códigos de Barras**: CODE128 dinámicos y personalizables
- **📲 Códigos QR**: Genera QR desde texto o URLs

### 📄 Gestión de Páginas (NEW!)
- **Tamaño de hoja configurable**: A4, Carta, A5, o personalizado
- **Márgenes ajustables**: Configura espacios de seguridad
- **Cantidad de etiquetas**: Define cuántas necesitas (ej: 30)
- **Generación automática**: Si necesitas 30 y caben 20 por hoja, genera 2 automáticamente
- **Navegación intuitiva**: Botones anterior/siguiente y selector de páginas

### 📌 Características Base
- 📊 **Grilla personalizable** - Filas y columnas
- 💾 **Guardar/cargar proyectos** - En formato JSON
- 📄 **Exportar a PDF** - Listo para imprimir
- 🖨️ **Plantillas predefinidas** - Avery, A4 Standard, etc.
- 🎯 **Contador en tiempo real** - Total de etiquetas y páginas

## 🛠️ Tecnologías

- **Electron** - Aplicación de escritorio multiplataforma
- **React** - Interfaz de usuario moderna
- **Fabric.js** - Editor de canvas avanzado
- **Zustand** - Gestión de estado
- **jsPDF** - Exportación a PDF
- **JSBarcode** - Generación de códigos de barras
- **QRCode** - Generación de códigos QR

## 📦 Instalación

### Requisitos
- Node.js 14+ 
- npm o yarn

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/OTO7706/label.git
cd label

# 2. Instalar dependencias
npm install

# 3. Instalar librerías adicionales
npm install wait-on concurrently electron-is-dev jsbarcode qrcode
```

## 🚀 Uso

### Modo Desarrollo
```bash
npm start
```

Abre automáticamente:
- React dev server: `http://localhost:3000`
- Aplicación Electron

### Construir Distribución
```bash
npm run build
```

## 📖 Guía de Uso

### 1️⃣ Configuración Inicial
1. Haz clic en "⚙️ Configuración"
2. Selecciona **Tamaño de Hoja** (A4, Carta, A5, personalizado)
3. Configura **Márgenes** (mm)
4. Establece **Filas y Columnas** (2×7, 3×10, etc.)
5. Define **Cantidad de Etiquetas** que necesitas
6. Haz clic en "✅ Aplicar Configuración"

**Ejemplo práctico:**
- Necesitas 30 etiquetas
- Hoja A4 con 3 columnas × 10 filas = 30 etiquetas por página
- Se genera 1 página con todas tus etiquetas
- Si necesitaras 50, se generarían 2 páginas automáticamente

### 2️⃣ Editar Etiquetas
- Selecciona etiqueta del grid izquierdo
- Usa botones en la barra superior:
  - **📝 Texto** - Añade texto editable
  - **🖼️ Imagen** - Carga una imagen
  - **📊 Código Barras** - Genera código de barras
  - **📲 QR** - Crea código QR
  - **📋 Duplicar** - Clona elemento seleccionado
  - **🗑️ Eliminar** - Elimina elemento

### 3️⃣ Manipular Objetos
- **Mover**: Arrastra con el mouse
- **Redimensionar**: Arrastra desde las esquinas
- **Rotar**: Usa controles de rotación
- **Editar texto**: Doble clic en el texto

### 4️⃣ Navegar por Páginas
- Usa **"← Anterior"** y **"Siguiente →"** para cambiar página
- Haz clic en número de página para ir directo
- Indicador muestra "Página X de Y"

### 5️⃣ Guardar Proyecto
```
💾 Guardar → proyecto_etiquetas_[timestamp].json
```

### 6️⃣ Exportar a PDF
```
📄 Exportar PDF → Selecciona ubicación y archivo
```

## 📐 Configuraciones Preestablecidas

| Plantilla | Columnas | Filas | Tamaño | Etiquetas |
|-----------|----------|-------|--------|-----------|
| Avery 5160 | 3 | 10 | Carta | 30 |
| Avery 8160 | 3 | 10 | Carta | 30 |
| A4 Standard | 2 | 7 | A4 | 14 |

## 📊 Ejemplo de Caso de Uso

**Escenario:** Necesitas 100 etiquetas personalizadas

1. Configuración: 3×10 etiquetas (30 por página)
2. Especificas: 100 etiquetas totales
3. **Resultado:** Sistema genera automáticamente 4 páginas
   - Página 1: 30 etiquetas
   - Página 2: 30 etiquetas
   - Página 3: 30 etiquetas
   - Página 4: 10 etiquetas
4. Editas el diseño una vez
5. Se aplica automáticamente a todas las páginas
6. Exportas todo a PDF de 4 páginas

## 🔧 Estructura del Proyecto

```
label/
├── public/
│   ├── electron.js      # Proceso principal Electron
│   ├── preload.js       # Scripts preload
│   └── index.html       # HTML base
├── src/
│   ├── components/
│   │   ├── CanvasEditor.js    # Editor canvas
│   │   ├── Toolbar.js         # Barra con paginación
│   │   └── Settings.js        # Configuración avanzada
│   ├── store/
│   │   └── store.js           # Zustand store
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

## 🎥 Funcionalidades por Hacer

- [ ] Undo/Redo completo
- [ ] Capas y agrupación de objetos
- [ ] Más formatos de código de barras (UPC, EAN, etc.)
- [ ] Tema oscuro/claro
- [ ] Exportación SVG y PNG
- [ ] Historial de cambios
- [ ] Colaboración en tiempo real
- [ ] Plantillas de diseño prediseñadas

## 🐛 Solución de Problemas

### La app no inicia
```bash
rm -rf node_modules package-lock.json
npm install
npm install wait-on concurrently electron-is-dev
npm start
```

### Canvas no funciona
- Verifica que Fabric.js esté actualizado
- Comprueba soporte HTML5 Canvas en tu navegador

### Códigos de barras no aparecen
```bash
npm install jsbarcode
```

### QR no funciona
```bash
npm install qrcode
```

### PDF no se exporta
```bash
npm install jspdf html2canvas
```

## 📄 Licencia

MIT © 2024 OTO7706

## 🤝 Contribuciones

¡Bienvenidas! Por favor:
1. Fork el proyecto
2. Crea rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push rama (`git push origin feature/AmazingFeature`)
5. Abre Pull Request

## 📧 Soporte

Para bugs o sugerencias: Abre un issue en GitHub

---

**¡Diseña y imprime etiquetas profesionales con facilidad! 🎨🖨️**
