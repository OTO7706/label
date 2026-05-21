import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useStore } from '../store/store';
import '../styles/CanvasEditor.css';

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const { 
    labels, 
    selectedLabelIndex, 
    labelWidth, 
    labelHeight, 
    updateLabel,
    getLabelsForCurrentPage,
    currentPage,
    totalPages,
  } = useStore();

  const currentPageLabels = getLabelsForCurrentPage();
  const selectedLabel = currentPageLabels[selectedLabelIndex];

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: labelWidth,
      height: labelHeight,
      backgroundColor: '#ffffff',
      border: '1px solid #ccc',
    });

    fabricCanvasRef.current = fabricCanvas;

    if (selectedLabel && selectedLabel.objects && selectedLabel.objects.length > 0) {
      fabricCanvas.loadFromJSON({ objects: selectedLabel.objects }, () => {
        fabricCanvas.renderAll();
      });
    } else {
      fabricCanvas.clear();
    }

    const handleObjectModified = () => {
      if (!selectedLabel) return;
      const canvasJSON = fabricCanvas.toJSON();
      const updatedLabel = {
        ...selectedLabel,
        objects: canvasJSON.objects,
      };
      updateLabel(selectedLabelIndex, updatedLabel);
    };

    fabricCanvas.on('object:modified', handleObjectModified);
    fabricCanvas.on('object:added', handleObjectModified);
    fabricCanvas.on('object:removed', handleObjectModified);

    return () => {
      fabricCanvas.dispose();
    };
  }, [selectedLabelIndex, labelWidth, labelHeight, selectedLabel, updateLabel]);

  const addText = () => {
    if (!fabricCanvasRef.current) return;
    
    const text = new fabric.Text('Nuevo Texto', {
      left: 50,
      top: 50,
      fontSize: 20,
      fill: '#000000',
      fontFamily: 'Arial',
      editable: true,
    });
    
    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();
  };

  const addImage = () => {
    if (!fabricCanvasRef.current) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        fabric.Image.fromURL(event.target.result, (img) => {
          img.set({
            left: 50,
            top: 50,
            width: 100,
            height: 100,
          });
          img.scaleToWidth(100);
          fabricCanvasRef.current.add(img);
          fabricCanvasRef.current.setActiveObject(img);
          fabricCanvasRef.current.renderAll();
        });
      };
      
      reader.readAsDataURL(file);
    };
    
    input.click();
  };

  const addBarcode = () => {
    if (!fabricCanvasRef.current) return;

    const barcodeValue = prompt('Ingresa el valor para el código de barras:', '123456789');
    if (!barcodeValue) return;

    try {
      import('jsbarcode').then((JsBarcode) => {
        const barcodeCanvas = document.createElement('canvas');
        JsBarcode.default(barcodeCanvas, barcodeValue, {
          format: 'CODE128',
          width: 2,
          height: 50,
          displayValue: true,
        });

        const barcodeImage = new fabric.Image(barcodeCanvas, {
          left: 50,
          top: 50,
          scaleX: 0.5,
          scaleY: 0.5,
        });

        fabricCanvasRef.current.add(barcodeImage);
        fabricCanvasRef.current.setActiveObject(barcodeImage);
        fabricCanvasRef.current.renderAll();
      });
    } catch (error) {
      alert('Error al generar código de barras. Instala: npm install jsbarcode');
    }
  };

  const addQRCode = () => {
    if (!fabricCanvasRef.current) return;

    const qrValue = prompt('Ingresa el valor para el código QR:', 'https://example.com');
    if (!qrValue) return;

    try {
      import('qrcode').then((QRCode) => {
        const qrCanvas = document.createElement('canvas');
        
        QRCode.toCanvas(qrCanvas, qrValue, { width: 150 }, (err) => {
          if (err) {
            alert('Error: ' + err);
            return;
          }

          const qrImage = new fabric.Image(qrCanvas, {
            left: 50,
            top: 50,
            scaleX: 0.5,
            scaleY: 0.5,
          });

          fabricCanvasRef.current.add(qrImage);
          fabricCanvasRef.current.setActiveObject(qrImage);
          fabricCanvasRef.current.renderAll();
        });
      });
    } catch (error) {
      alert('Error: Instala QR con: npm install qrcode');
    }
  };

  const deleteSelected = () => {
    if (!fabricCanvasRef.current) return;
    const activeObject = fabricCanvasRef.current.getActiveObject();
    if (activeObject) {
      fabricCanvasRef.current.remove(activeObject);
      fabricCanvasRef.current.renderAll();
    }
  };

  const duplicateSelected = () => {
    if (!fabricCanvasRef.current) return;
    const activeObject = fabricCanvasRef.current.getActiveObject();
    if (activeObject) {
      const clonedObject = fabric.util.object.clone(activeObject);
      clonedObject.set({
        left: activeObject.left + 10,
        top: activeObject.top + 10,
      });
      fabricCanvasRef.current.add(clonedObject);
      fabricCanvasRef.current.renderAll();
    }
  };

  return (
    <div className="canvas-editor">
      <div className="canvas-toolbar">
        <button onClick={addText} className="tool-btn" title="Agregar Texto">
          📝 Texto
        </button>
        <button onClick={addImage} className="tool-btn" title="Agregar Imagen">
          🖼️ Imagen
        </button>
        <button onClick={addBarcode} className="tool-btn" title="Agregar Código de Barras">
          📊 Código Barras
        </button>
        <button onClick={addQRCode} className="tool-btn" title="Agregar QR">
          📲 QR
        </button>
        <button onClick={duplicateSelected} className="tool-btn" title="Duplicar">
          📋 Duplicar
        </button>
        <button onClick={deleteSelected} className="tool-btn delete-btn" title="Eliminar">
          🗑️ Eliminar
        </button>
      </div>
      
      <div className="canvas-container">
        <canvas ref={canvasRef} id="fabric-canvas" />
      </div>
      
      <div className="canvas-info">
        <p>Página {currentPage} de {totalPages}</p>
        <p>Etiqueta {selectedLabelIndex + 1} de {currentPageLabels.length}</p>
        <p>Tamaño: {labelWidth}x{labelHeight}px</p>
      </div>
    </div>
  );
};

export default CanvasEditor;
