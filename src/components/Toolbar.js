import React from 'react';
import { useStore } from '../store/store';
import '../styles/Toolbar.css';

const Toolbar = () => {
  const { 
    labels, 
    selectedLabelIndex, 
    setSelectedLabelIndex, 
    currentPage,
    totalPages,
    getLabelsForCurrentPage,
    nextPage,
    previousPage,
    goToPage,
    setLabels 
  } = useStore();

  const currentPageLabels = getLabelsForCurrentPage();

  const handleSaveProject = () => {
    const projectData = JSON.stringify({ labels }, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(projectData));
    element.setAttribute('download', `proyecto_etiquetas_${new Date().getTime()}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleLoadProject = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          setLabels(data.labels);
          alert('Proyecto cargado exitosamente');
        } catch (error) {
          alert('Error al cargar el proyecto: ' + error.message);
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  const handleExportPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;
      
      alert('Exportación a PDF - Función en desarrollo');
    } catch (error) {
      alert('Error al exportar PDF: ' + error.message);
    }
  };

  return (
    <aside className="toolbar">
      <div className="toolbar-section">
        <h3>💾 Proyecto</h3>
        <button onClick={handleSaveProject} className="toolbar-btn save">
          💾 Guardar
        </button>
        <button onClick={handleLoadProject} className="toolbar-btn load">
          📂 Cargar
        </button>
        <button onClick={handleExportPDF} className="toolbar-btn export">
          📄 Exportar PDF
        </button>
      </div>

      <div className="toolbar-section">
        <h3>📄 Páginas</h3>
        <div className="pagination-controls">
          <button 
            onClick={previousPage} 
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ← Anterior
          </button>
          <div className="page-indicator">
            <span>Página {currentPage} de {totalPages}</span>
          </div>
          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Siguiente →
          </button>
        </div>

        {totalPages > 1 && (
          <div className="page-selector">
            <p>Ir a página:</p>
            <div className="page-buttons">
              {Array.from({ length: Math.min(totalPages, 12) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`page-btn ${page === currentPage ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
              {totalPages > 12 && <span style={{ fontSize: '10px', color: '#999', marginTop: '5px' }}>... ({totalPages} páginas)</span>}
            </div>
          </div>
        )}
      </div>

      <div className="toolbar-section">
        <h3>🏷️ Etiquetas</h3>
        <div className="label-navigator">
          <p>Etiquetas en esta página ({currentPageLabels.length}):</p>
          <div className="label-grid">
            {currentPageLabels.map((label, index) => (
              <button
                key={index}
                className={`label-item ${index === selectedLabelIndex ? 'active' : ''}`}
                onClick={() => setSelectedLabelIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Toolbar;
