import create from 'zustand';

export const useStore = create((set, get) => ({
  // Grid settings
  gridRows: 4,
  gridCols: 3,
  labelWidth: 300,
  labelHeight: 250,
  
  // Paper settings
  paperSize: 'a4', // 'a4', 'letter', 'custom'
  paperWidth: 210, // mm
  paperHeight: 297, // mm
  paperMargin: 10, // mm
  labelsPerPage: 0, // Auto-calculated
  
  // Labels data
  labels: [],
  selectedLabelIndex: 0,
  totalLabelsNeeded: 12, // Total de etiquetas que el usuario necesita
  currentPageLabels: [], // Etiquetas de la página actual
  totalPages: 1,
  currentPage: 1,
  
  // Canvas settings
  canvasScale: 1,
  
  // Actions for grid
  setGridRows: (rows) => set({ gridRows: rows }),
  setGridCols: (cols) => set({ gridCols: cols }),
  setLabelWidth: (width) => set({ labelWidth: width }),
  setLabelHeight: (height) => set({ labelHeight: height }),
  
  // Actions for paper
  setPaperSize: (size) => set({ paperSize: size }),
  setPaperWidth: (width) => set({ paperWidth: width }),
  setPaperHeight: (height) => set({ paperHeight: height }),
  setPaperMargin: (margin) => set({ paperMargin: margin }),
  
  // Actions for labels quantity
  setTotalLabelsNeeded: (total) => {
    set({ totalLabelsNeeded: total });
    get().calculatePages();
  },
  
  // Calculate pages based on labels per page and total needed
  calculatePages: () => {
    const { gridRows, gridCols, totalLabelsNeeded } = get();
    const labelsPerPage = gridRows * gridCols;
    const pages = Math.ceil(totalLabelsNeeded / labelsPerPage);
    
    set({
      labelsPerPage,
      totalPages: pages,
      currentPage: 1,
    });
  },
  
  // Generate all labels for all pages
  generateAllLabels: () => {
    const { gridRows, gridCols, totalLabelsNeeded } = get();
    const labelsPerPage = gridRows * gridCols;
    const totalPages = Math.ceil(totalLabelsNeeded / labelsPerPage);
    
    // Crear todas las etiquetas necesarias
    const allLabels = Array(totalLabelsNeeded).fill(null).map((_, i) => ({
      id: i,
      objects: [],
      pageNumber: Math.floor(i / labelsPerPage) + 1,
      positionInPage: (i % labelsPerPage) + 1,
    }));
    
    set({
      labels: allLabels,
      labelsPerPage,
      totalPages,
      currentPage: 1,
    });
  },
  
  // Get labels for current page
  getLabelsForCurrentPage: () => {
    const { labels, currentPage, labelsPerPage } = get();
    const startIndex = (currentPage - 1) * labelsPerPage;
    const endIndex = startIndex + labelsPerPage;
    return labels.slice(startIndex, endIndex);
  },
  
  // Move to next page
  nextPage: () => {
    const { currentPage, totalPages } = get();
    if (currentPage < totalPages) {
      set({ currentPage: currentPage + 1, selectedLabelIndex: 0 });
    }
  },
  
  // Move to previous page
  previousPage: () => {
    const { currentPage } = get();
    if (currentPage > 1) {
      set({ currentPage: currentPage - 1, selectedLabelIndex: 0 });
    }
  },
  
  // Go to specific page
  goToPage: (page) => {
    const { totalPages } = get();
    if (page >= 1 && page <= totalPages) {
      set({ currentPage: page, selectedLabelIndex: 0 });
    }
  },
  
  // Actions for labels
  setLabels: (labelsData) => set({ labels: labelsData }),
  
  updateLabel: (index, labelData) => {
    const { labels, currentPage, labelsPerPage } = get();
    const actualIndex = (currentPage - 1) * labelsPerPage + index;
    const updatedLabels = [...labels];
    updatedLabels[actualIndex] = labelData;
    set({ labels: updatedLabels });
  },
  
  setSelectedLabelIndex: (index) => set({ selectedLabelIndex: index }),
  
  // Actions for canvas
  setCanvasScale: (scale) => set({ canvasScale: scale }),
  
  // Reset
  resetLabels: () => set({
    labels: [],
    selectedLabelIndex: 0,
    gridRows: 4,
    gridCols: 3,
    totalLabelsNeeded: 12,
    currentPage: 1,
    totalPages: 1,
  }),
}));
