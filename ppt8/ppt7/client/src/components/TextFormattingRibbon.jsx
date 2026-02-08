import React, { useState, useEffect } from 'react';
import { usePresentation } from '../contexts/PresentationContext';

const TextFormattingRibbon = ({ selectedElement, onFormatChange, applyFormatToSelection }) => {
  const { slides, currentSlide, updateSlide } = usePresentation();
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('12');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [showListDropdown, setShowListDropdown] = useState(false);
  const [selectedList, setSelectedList] = useState('bullet');
  const [alignment, setAlignment] = useState('left');
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightColorPicker, setShowHighlightColorPicker] = useState(false);

  // Microsoft PowerPoint style color palettes
  const themeTextColors = [
    ['#000000', '#44546A', '#5B9BD5', '#0070C0', '#002060', '#7030A0'],
    ['#FFFFFF', '#D9D9D9', '#FFC000', '#ED7D31', '#A5A5A5', '#3F3F3F'],
    ['#FF0000', '#00B0F0', '#92D050', '#FFFF00', '#E26B0A', '#9BBB59']
  ];

  const standardTextColors = [
    '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
    '#FF0000', '#FF6600', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF',
    '#800000', '#808000', '#008000', '#008080', '#000080', '#800080'
  ];

  const themeHighlightColors = [
    ['#FFFF00', '#FFFC99', '#FFF400', '#FFC000', '#F7D062', '#F39F3A'],
    ['#E2F1A1', '#D5E8A5', '#9BD18B', '#5B9BD5', '#4472C4', '#2E75B6'],
    ['#F2DCDB', '#E7B8B7', '#D9D9D9', '#BFBFBF', '#8EA9DB', '#5C7CA3']
  ];

  const standardHighlightColors = [
    '#FFFFFF', '#000000', '#FF0000', '#FF6600', '#FFFF00', '#00FF00',
    '#00FFFF', '#0000FF', '#800000', '#808000', '#008000', '#008080'
  ];

  const fontFamilies = [
    'Arial', 'Calibri', 'Times New Roman', 'Helvetica', 'Georgia', 
    'Verdana', 'Tahoma', 'Comic Sans MS', 'Impact', 'Trebuchet MS'
  ];

  const fontSizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '72'];

  // Keyboard shortcuts for text formatting
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle Ctrl/Cmd shortcuts, don't interfere with normal typing
      if (!(e.ctrlKey || e.metaKey)) return;
      
      if (['b', 'B'].includes(e.key)) {
        e.preventDefault();
        document.execCommand('bold', false, null);
        setIsBold(document.queryCommandState('bold'));
      } else if (['i', 'I'].includes(e.key)) {
        e.preventDefault();
        document.execCommand('italic', false, null);
        setIsItalic(document.queryCommandState('italic'));
      } else if (['u', 'U'].includes(e.key)) {
        e.preventDefault();
        document.execCommand('underline', false, null);
        setIsUnderline(document.queryCommandState('underline'));
      } else if (['l', 'L'].includes(e.key)) {
        e.preventDefault();
        handleAlignmentChange('left');
      } else if (['e', 'E'].includes(e.key)) {
        e.preventDefault();
        handleAlignmentChange('center');
      } else if (['r', 'R'].includes(e.key)) {
        e.preventDefault();
        handleAlignmentChange('right');
      } else if (['j', 'J'].includes(e.key)) {
        e.preventDefault();
        handleAlignmentChange('justify');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFontFamilyChange = (family) => {
    setFontFamily(family);
    applyFormatToSelection?.('fontName', family);
    onFormatChange?.({ fontFamily: family });
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    applyFormatToSelection?.('fontSize', size);
    onFormatChange?.({ fontSize: `${size}px` });
  };

  const handleUpperCase = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const text = range.toString().toUpperCase();
      const textNode = document.createTextNode(text);
      range.deleteContents();
      range.insertNode(textNode);
      
      // Restore selection
      const newRange = document.createRange();
      newRange.selectNodeContents(textNode);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };

  const handleLowerCase = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const text = range.toString().toLowerCase();
      const textNode = document.createTextNode(text);
      range.deleteContents();
      range.insertNode(textNode);
      
      // Restore selection
      const newRange = document.createRange();
      newRange.selectNodeContents(textNode);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };

  const toggleBold = (e) => {
    e.preventDefault();
    document.execCommand('bold', false, null);
    setIsBold(document.queryCommandState('bold'));
  };

  const toggleItalic = (e) => {
    e.preventDefault();
    document.execCommand('italic', false, null);
    setIsItalic(document.queryCommandState('italic'));
  };

  const toggleUnderline = (e) => {
    e.preventDefault();
    document.execCommand('underline', false, null);
    setIsUnderline(document.queryCommandState('underline'));
  };

  const toggleStrikethrough = (e) => {
    e.preventDefault();
    document.execCommand('strikeThrough', false, null);
    setIsStrikethrough(document.queryCommandState('strikeThrough'));
  };

  const handleListChange = (listType) => {
    setSelectedList(listType);
    setShowListDropdown(false);
    
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    // Find contentEditable element
    let editableElement = selection.focusNode;
    while (editableElement && editableElement.contentEditable !== 'true') {
      editableElement = editableElement.parentElement;
    }
    if (!editableElement) return;

    // Use execCommand for better compatibility
    if (listType === 'bullet') {
      document.execCommand('insertUnorderedList', false, null);
    } else if (listType === 'numeric') {
      document.execCommand('insertOrderedList', false, null);
    } else if (listType === 'alphabetic') {
      document.execCommand('insertOrderedList', false, null);
      // Change to alphabetic
      const lists = editableElement.querySelectorAll('ol');
      lists.forEach(list => list.style.listStyleType = 'upper-alpha');
    } else {
      // Custom list types (stars, arrows)
      const text = selection.toString() || editableElement.textContent;
      const lines = text.split('\n').filter(l => l.trim());
      const symbol = listType === 'stars' ? '★' : '→';
      const formatted = lines.map(l => `${symbol} ${l.replace(/^[•★→\d+A-Z]\.?\s*/, '')}`).join('\n');
      editableElement.textContent = formatted;
    }
  };

  const handleAlignmentChange = (align) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    // Find contentEditable or apply to focused element
    let element = selection.focusNode;
    while (element && element.contentEditable !== 'true' && element.parentElement) {
      element = element.parentElement;
    }

    if (element && element.contentEditable === 'true') {
      // Apply alignment using style for better control
      element.style.textAlign = align;
      setAlignment(align);
    } else {
      // Fallback to execCommand
      const cmd = align === 'left' ? 'justifyLeft' : align === 'center' ? 'justifyCenter' : align === 'right' ? 'justifyRight' : 'justifyFull';
      document.execCommand(cmd, false, null);
      setAlignment(align);
    }
  };

  const handleTextColor = (color) => {
    if (color) {
      applyFormatToSelection?.('foreColor', color);
    }
  };

  const handleHighlightColor = (color) => {
    if (color) {
      applyFormatToSelection?.('backColor', color);
    }
  };

  const handleInsertElement = (elementType) => {
    if (elementType === 'image') {
      handleImageUpload();
      return;
    }
    
    if (elementType === 'chart') {
      handleChartSelection();
      return;
    }
    
    if (elementType === 'table') {
      handleTableCreation();
      return;
    }
    
    const slide = slides[currentSlide];
    const elements = slide.elements || [];
    
    const newElement = {
      id: Date.now(),
      type: elementType,
      x: 100,
      y: 100,
      width: elementType === 'textbox' ? 200 : 250,
      height: elementType === 'textbox' ? 100 : 150,
      content: elementType === 'textbox' ? 'New text' : elementType === 'equation' ? 'E = mc²' : '',
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#000000',
      shapeType: elementType === 'shape' ? 'rectangle' : undefined,
      fill: elementType === 'shape' ? '#3B82F6' : undefined,
      stroke: elementType === 'shape' ? '#1E40AF' : undefined,
      strokeWidth: elementType === 'shape' ? 2 : undefined
    };
    
    const updatedElements = [...elements, newElement];
    updateSlide(currentSlide, { elements: updatedElements });
  };

  const handleTableCreation = () => {
    const rows = prompt('Enter number of rows (1-10):') || '3';
    const cols = prompt('Enter number of columns (1-10):') || '3';
    
    const numRows = Math.min(Math.max(parseInt(rows), 1), 10);
    const numCols = Math.min(Math.max(parseInt(cols), 1), 10);
    
    const slide = slides[currentSlide];
    const elements = slide.elements || [];
    
    const newElement = {
      id: Date.now(),
      type: 'table',
      x: 100,
      y: 100,
      width: numCols * 80,
      height: numRows * 40,
      rows: numRows,
      cols: numCols,
      data: Array(numRows).fill().map(() => Array(numCols).fill('Cell'))
    };
    
    const updatedElements = [...elements, newElement];
    updateSlide(currentSlide, { elements: updatedElements });
  };

  const handleChartSelection = () => {
    const chartType = prompt('Select chart type:\n1. Pie Chart\n2. Doughnut Chart\n3. Bar Chart\n4. Line Chart\n\nEnter 1, 2, 3, or 4:');
    
    const chartTypes = {
      '1': 'pie',
      '2': 'doughnut', 
      '3': 'bar',
      '4': 'line'
    };
    
    const selectedType = chartTypes[chartType] || 'pie';
    
    const slide = slides[currentSlide];
    const elements = slide.elements || [];
    
    const newElement = {
      id: Date.now(),
      type: 'chart',
      chartType: selectedType,
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Sample Data',
          color: '#3B82F6',
          data: [30, 45, 60, 40]
        }]
      },
      options: { legend: true, dataLabels: true },
      x: 100,
      y: 100,
      width: 400,
      height: 300,
      title: 'Sample Chart'
    };
    
    const updatedElements = [...elements, newElement];
    updateSlide(currentSlide, { elements: updatedElements });
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const slide = slides[currentSlide];
          const elements = slide.elements || [];
          
          const newElement = {
            id: Date.now(),
            type: 'image',
            x: 100,
            y: 100,
            width: 300,
            height: 200,
            src: event.target.result,
            alt: file.name
          };
          
          const updatedElements = [...elements, newElement];
          updateSlide(currentSlide, { elements: updatedElements });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const listTypes = [
    { value: 'bullet', label: '• Bullet Points', icon: '•' },
    { value: 'numeric', label: '1. Numeric', icon: '1.' },
    { value: 'alphabetic', label: 'A. Alphabetic', icon: 'A.' },
    { value: 'stars', label: '★ Stars', icon: '★' },
    { value: 'arrows', label: '→ Arrows', icon: '→' }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-3 shadow-sm">
      <div className="flex items-start gap-4">
        
        {/* First Field - Font Controls */}
        <div className="flex flex-col gap-2 px-3 py-2 border-r border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-2">
            {/* Font Family Dropdown */}
            <div className="relative">
              <select
                value={fontFamily}
                onChange={(e) => handleFontFamilyChange(e.target.value)}
                className="w-36 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-400 hover:border-blue-300"
                style={{ fontFamily: fontFamily }}
              >
                {fontFamilies.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size Dropdown */}
            <div className="relative">
              <select
                value={fontSize}
                onChange={(e) => handleFontSizeChange(e.target.value)}
                className="w-14 px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-400 hover:border-blue-300"
              >
                {fontSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Case Controls */}
            <button
              onClick={handleUpperCase}
              className="w-8 h-8 flex items-center justify-center text-sm font-bold border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
              title="Convert to uppercase"
            >
              <span className="flex items-center gap-0.5">
                A
                <span className="text-xs">↑</span>
              </span>
            </button>

            <button
              onClick={handleLowerCase}
              className="w-8 h-8 flex items-center justify-center text-sm font-bold border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
              title="Convert to lowercase"
            >
              <span className="flex items-center gap-0.5">
                A
                <span className="text-xs">↓</span>
              </span>
            </button>
          </div>
          
          {/* Format Buttons Row */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleBold}
              className={`w-7 h-7 flex items-center justify-center text-sm font-bold border-0 rounded-sm transition-colors ${
                isBold 
                  ? 'bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-white' 
                  : 'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
              title="Bold (Ctrl+B)"
            >
              B
            </button>

            <button
              onClick={toggleItalic}
              className={`w-7 h-7 flex items-center justify-center text-sm font-bold italic border-0 rounded-sm transition-colors ${
                isItalic 
                  ? 'bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-white' 
                  : 'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
              title="Italic (Ctrl+I)"
            >
              I
            </button>

            <button
              onClick={toggleUnderline}
              className={`w-7 h-7 flex items-center justify-center text-sm font-bold underline border-0 rounded-sm transition-colors ${
                isUnderline 
                  ? 'bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-white' 
                  : 'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
              title="Underline (Ctrl+U)"
            >
              U
            </button>

            <button
              onClick={toggleStrikethrough}
              className={`w-7 h-7 flex items-center justify-center text-sm font-bold line-through border-0 rounded-sm transition-colors ${
                isStrikethrough 
                  ? 'bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-white' 
                  : 'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
              title="Strikethrough (Ctrl+Shift+S)"
            >
              S
            </button>

            {/* Text Color Picker - PowerPoint Style */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowTextColorPicker(!showTextColorPicker);
                  setShowHighlightColorPicker(false);
                }}
                className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded-sm bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer flex items-center justify-center"
                title="Text Color"
              >
                <span className="w-6 h-6 rounded-sm" style={{ background: 'linear-gradient(135deg, #000000 50%, #FFFFFF 50%)' }}></span>
              </button>
              {showTextColorPicker && (
                <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 p-3">
                  {/* Theme Colors */}
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Theme Colors</div>
                    <div className="grid grid-cols-6 gap-1">
                      {themeTextColors.flat().map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleTextColor(color);
                            setShowTextColorPicker(false);
                          }}
                          className="w-5 h-5 rounded-sm border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Standard Colors */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Standard Colors</div>
                    <div className="grid grid-cols-6 gap-1">
                      {standardTextColors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleTextColor(color);
                            setShowTextColorPicker(false);
                          }}
                          className="w-5 h-5 rounded-sm border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Custom Color */}
                  <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        onChange={(e) => handleTextColor(e.target.value)}
                        className="w-8 h-8 border-0 rounded-sm cursor-pointer"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">More Colors...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Highlight Color Picker - PowerPoint Style */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowHighlightColorPicker(!showHighlightColorPicker);
                  setShowTextColorPicker(false);
                }}
                className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded-sm bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer flex items-center justify-center"
                title="Highlight Color"
              >
                <span className="w-6 h-6 rounded-sm bg-yellow-300"></span>
              </button>
              {showHighlightColorPicker && (
                <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 p-3">
                  {/* No Highlight Option */}
                  <div className="mb-3">
                    <button
                      onClick={() => {
                        handleHighlightColor('transparent');
                        setShowHighlightColorPicker(false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-gray-700 dark:text-gray-300"
                    >
                      No Highlight
                    </button>
                  </div>
                  {/* Theme Highlight Colors */}
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Theme Colors</div>
                    <div className="grid grid-cols-6 gap-1">
                      {themeHighlightColors.flat().map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleHighlightColor(color);
                            setShowHighlightColorPicker(false);
                          }}
                          className="w-5 h-5 rounded-sm border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Standard Highlight Colors */}
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Standard Colors</div>
                    <div className="grid grid-cols-6 gap-1">
                      {standardHighlightColors.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleHighlightColor(color);
                            setShowHighlightColorPicker(false);
                          }}
                          className="w-5 h-5 rounded-sm border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Custom Color */}
                  <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        defaultValue="#ffff00"
                        onChange={(e) => handleHighlightColor(e.target.value)}
                        className="w-8 h-8 border-0 rounded-sm cursor-pointer"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">More Colors...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Second Field - Lists and Alignment */}
        <div className="flex flex-col gap-2 px-3 py-2 border-r border-gray-300 dark:border-gray-600">
          {/* Lists Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowListDropdown(!showListDropdown)}
              className="w-20 px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-400 hover:border-blue-300 flex items-center justify-between"
              title="List Style"
            >
              <span>{listTypes.find(t => t.value === selectedList)?.icon}</span>
              <span className="text-xs">▼</span>
            </button>
            {showListDropdown && (
              <div className="absolute top-full left-0 mt-1 w-32 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-sm shadow-lg z-10">
                {listTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleListChange(type.value)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 flex items-center gap-2"
                  >
                    <span>{type.icon}</span>
                    <span className="text-xs">{type.label.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Alignment Buttons */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAlignmentChange('left');
              }}
              className={`w-7 h-7 flex items-center justify-center text-sm border border-gray-300 dark:border-gray-600 rounded-sm transition-colors ${
                alignment === 'left'
                  ? 'bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-white border-blue-400'
                  : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
              title="Align Left (Ctrl+L)"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 3h12v1H2V3zm0 3h8v1H2V6zm0 3h12v1H2V9zm0 3h8v1H2v-1z"/>
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleAlignmentChange('center');
              }}
              className={`w-7 h-7 flex items-center justify-center text-sm border border-gray-300 dark:border-gray-600 rounded-sm transition-colors ${
                alignment === 'center'
                  ? 'bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-white border-blue-400'
                  : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
              title="Align Center (Ctrl+E)"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 3h12v1H2V3zm2 3h8v1H4V6zm-2 3h12v1H2V9zm2 3h8v1H4v-1z"/>
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleAlignmentChange('right');
              }}
              className={`w-7 h-7 flex items-center justify-center text-sm border border-gray-300 dark:border-gray-600 rounded-sm transition-colors ${
                alignment === 'right'
                  ? 'bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-white border-blue-400'
                  : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
              title="Align Right (Ctrl+R)"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 3h12v1H2V3zm4 3h8v1H6V6zm-4 3h12v1H2V9zm4 3h8v1H6v-1z"/>
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleAlignmentChange('justify');
              }}
              className={`w-7 h-7 flex items-center justify-center text-sm border border-gray-300 dark:border-gray-600 rounded-sm transition-colors ${
                alignment === 'justify'
                  ? 'bg-blue-200 dark:bg-blue-600 text-blue-800 dark:text-white border-blue-400'
                  : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
              title="Justify (Ctrl+J)"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 3h12v1H2V3zm0 3h12v1H2V6zm0 3h12v1H2V9zm0 3h12v1H2v-1z"/>
              </svg>
            </button>
          </div>
        </div>



      </div>
    </div>
  );
};

export default TextFormattingRibbon;