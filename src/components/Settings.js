import React, { useState } from 'react';
import { useStore } from '../store/store';
import '../styles/Settings.css';

const Settings = ({ onClose }) => {
  const { 
    gridRows, 
    gridCols,
    paperSize,
    paperWidth,
    paperHeight,
    paperMargin,
    totalLabelsNeeded,
    labelsPerPage,
    totalPages,
    setGridRows,
    setGridCols,
    setPaperSize,
    setPaperWidth,
    setPaperHeight,
    setPaperMargin,
    setTotalLabelsNeeded,
    generateAllLabels,
  } = useStore();

  const [localRows, setLocalRows] = useState(gridRows);
  const [localCols, setLocalCols] = useState(gridCols);
  const [localPaperSize, setLocalPaperSize] = useState(paperSize);
  const [localPaperWidth, setLocalPaperWidth] = useState(paperWidth);
  const [localPaperHeight, setLocalPaperHeight] = useState(paperHeight);
  const [localMargin, setLocalMargin] = useState(paperMargin);
  const [localTotalLabels, setLocalTotalLabels] = useState(totalLabelsNeeded);

  const paperSizes = {
    a4: { width: 210, height: 297, name: 'A4 (210x297mm)' },
    letter: { width: 216, height: 279, name: 'Carta (216x279mm)' },
    a5: { width: 148, height: 210, name: 'A5 (148x210mm)' },
    custom: { width: localPaperWidth, height: localPaperHeight, name: 'Personalizado' },
  };

  const handlePaperSizeChange = (size) => {
    setLocalPaperSize(size);
    if (size !== 'custom' && paperSizes[size]) {
      setLocalPaperWidth(paperSizes[size].width);
      setLocalPaperHeight(paperSizes[size].height);
    }
  };

  const handleApply = () => {
    setGridRows(localRows);
    setGridCols(localCols);
    setPaperSize(localPaperSize);
    setPaperWidth(localPaperWidth);
    setPaperHeight(localPaperHeight);
    setPaperMargin(localMargin);
    setTotalLabelsNeeded(localTotalLabels);
    generateAllLabels();
    onClose();
  };

  const presets = [
    { name: 'Avery 5160', cols: 3, rows: 10, paperSize: 'letter', labels: 30 },
    { name: 'Avery 8160', cols: 3, rows: 10, paperSize: 'letter', labels: 30 },
    { name: 'A4 Standard', cols: 2, rows: 7, paperSize: 'a4', labels: 14 },
  ];

  const applyPreset = (preset) => {
    setLocalRows(preset.rows);
    setLocalCols(preset.cols);
    setLocalPaperSize(preset.paperSize);
    if (paperSizes[preset.paperSize]) {
      setLocalPaperWidth(paperSizes[preset.paperSize].width);
      setLocalPaperHeight(paperSizes[preset.paperSize].height);
    }
    setLocalTotalLabels(preset.labels);
  };

  const calculateLabelsPerPage = () => {
    return localRows * localCols;
  };

  const calculateTotalPages = () => {
    return Math.ceil(localTotalLabels / calculateLabelsPerPage());
  };

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <h2>⚙️ Configuración de Proyecto</h2>
        
        <div className="settings-section">
          <h3>📋 Plantillas Predefinidas</h3>
          <div className="preset-buttons">
            {presets.map((preset, idx) => (
              <button 
                key={idx}
                onClick={() => applyPreset(preset)}
                className="preset-btn"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <h3>📄 Tamaño de Hoja</h3>
          <div className="paper-size-selector">
            {Object.entries(paperSizes).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handlePaperSizeChange(key)}
                className={`paper-btn ${localPaperSize === key ? 'active' : ''}`}
              >
                {value.name}
              </button>
            ))}
          </div>

          {localPaperSize === 'custom' && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <div className="setting-group">
                <label>Ancho (mm):</label>
                <input 
                  type="number" 
                  min="50" 
                  max="500" 
                  value={localPaperWidth}
                  onChange={(e) => setLocalPaperWidth(parseInt(e.target.value))}
                />
              </div>
              <div className="setting-group">
                <label>Alto (mm):</label>
                <input 
                  type="number" 
                  min="50" 
                  max="500" 
                  value={localPaperHeight}
                  onChange={(e) => setLocalPaperHeight(parseInt(e.target.value))}
                />
              </div>
            </div>
          )}

          <div className="setting-group">
            <label>Margen de Hoja (mm):</label>
            <input 
              type="number" 
              min="0" 
              max="50" 
              value={localMargin}
              onChange={(e) => setLocalMargin(parseInt(e.target.value))}
            />
            <span className="value-display">{localMargin}mm</span>
          </div>
        </div>

        <div className="settings-section">
          <h3>📊 Grilla de Etiquetas</h3>
          <div className="setting-group">
            <label>Filas (Verticales):</label>
            <input 
              type="number" 
              min="1" 
              max="20" 
              value={localRows}
              onChange={(e) => setLocalRows(parseInt(e.target.value))}
            />
            <span className="value-display">{localRows}</span>
          </div>

          <div className="setting-group">
            <label>Columnas (Horizontales):</label>
            <input 
              type="number" 
              min="1" 
              max="10" 
              value={localCols}
              onChange={(e) => setLocalCols(parseInt(e.target.value))}
            />
            <span className="value-display">{localCols}</span>
          </div>
        </div>

        <div className="settings-section">
          <h3>🏷️ Cantidad de Etiquetas</h3>
          <div className="setting-group">
            <label>Total de Etiquetas Necesarias:</label>
            <input 
              type="number" 
              min="1" 
              max="1000" 
              value={localTotalLabels}
              onChange={(e) => setLocalTotalLabels(parseInt(e.target.value))}
            />
            <span className="value-display">{localTotalLabels}</span>
          </div>
        </div>

        <div className="settings-info">
          <p>📊 Etiquetas por página: <strong>{calculateLabelsPerPage()}</strong></p>
          <p>📄 Páginas necesarias: <strong>{calculateTotalPages()}</strong></p>
          <p>📋 Hoja: <strong>{localPaperWidth}x{localPaperHeight}mm</strong></p>
          <p>↔️ Disposición: <strong>{localCols} × {localRows}</strong></p>
          {localTotalLabels > calculateLabelsPerPage() && (
            <p style={{ color: '#e67e22', marginTop: '10px' }}>
              ⚠️ Se generarán <strong>{calculateTotalPages()}</strong> página{calculateTotalPages() > 1 ? 's' : ''} para imprimir
            </p>
          )}
        </div>

        <div className="settings-buttons">
          <button onClick={handleApply} className="btn-apply">
            ✅ Aplicar Configuración
          </button>
          <button onClick={onClose} className="btn-cancel">
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
