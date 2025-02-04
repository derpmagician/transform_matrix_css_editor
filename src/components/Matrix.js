import { Fragment, useState, useMemo, useCallback } from 'react';
import Slider from './Slider';
import { Main, MatrixDiv, Section, Section2, Description, Options, Ranges, OptionTitle, Button, Textarea, DescriptionTitle, Block} from '../EditableTag';

/**
 * Constant ranges for different transformation types
 */
const RANGES = {
  SCALE: { MIN: -3, MAX: 3, STEP: 0.01 },
  SKEW: { MIN: -5, MAX: 5, STEP: 0.01 },
  TRANSLATE: { MIN: -150, MAX: 150, STEP: 0.01 },
  ROTATE: { MIN: -180, MAX: 180, STEP: 1 }
};

/**
 * Preset transformations for quick application
 */
const PRESETS = {
  FLIP_HORIZONTAL: { a: -1, b: 0, c: 0, d: 1, x: 0, y: 0 },
  FLIP_VERTICAL: { a: 1, b: 0, c: 0, d: -1, x: 0, y: 0 },
  ROTATE_45: { a: 0.707, b: 0.707, c: -0.707, d: 0.707, x: 0, y: 0 },
  ROTATE_90: { a: 0, b: 1, c: -1, d: 0, x: 0, y: 0 },
  MIRROR: { a: -1, b: 0, c: 0, d: -1, x: 0, y: 0 },
  SKEW_DIAMOND: { a: 1, b: 1, c: 1, d: 1, x: 0, y: 0 }
};

/**
 * Convert degrees to radians
 */
const degToRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

/**
 * Calculate matrix values for rotation
 */
const calculateRotationMatrix = (degrees) => {
  const rad = degToRad(degrees);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    a: cos.toFixed(3),
    b: sin.toFixed(3),
    c: (-sin).toFixed(3),
    d: cos.toFixed(3),
    x: 0,
    y: 0
  };
};

const Sliders = () => {
  const defaultValues = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    x: 0,
    y: 0,
    rotation: 0
  };

  const [matrixValues, setMatrixValues] = useState(defaultValues);
  const [history, setHistory] = useState([defaultValues]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const matrixCSS = useMemo(() => {
    const { a, b, c, d, x, y } = matrixValues;
    return `transform:matrix(${a}, ${b}, ${c}, ${d}, ${x},${y});
-ms-transform:matrix(${a}, ${b}, ${c}, ${d}, ${x},${y});
-webkit-transform:matrix(${a}, ${b}, ${c}, ${d}, ${x},${y});`;
  }, [matrixValues]);

  /**
   * Add current state to history
   */
  const addToHistory = useCallback((newValues) => {
    setHistory(prev => {
      const newHistory = [...prev.slice(0, historyIndex + 1), newValues];
      if (newHistory.length > 10) newHistory.shift(); // Keep last 10 states
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 9));
  }, [historyIndex]);

  const handleMatrixChange = useCallback((key) => (e) => {
    const newValues = {
      ...matrixValues,
      [key]: Number(e.target.value)
    };
    setMatrixValues(newValues);
    addToHistory(newValues);
  }, [matrixValues, addToHistory]);

  /**
   * Handle rotation changes
   */
  const handleRotation = useCallback((e) => {
    const degrees = Number(e.target.value);
    const rotationMatrix = calculateRotationMatrix(degrees);
    const newValues = {
      ...rotationMatrix,
      x: matrixValues.x,
      y: matrixValues.y,
      rotation: degrees
    };
    setMatrixValues(newValues);
    addToHistory(newValues);
  }, [matrixValues, addToHistory]);

  /**
   * Apply preset transformation
   */
  const applyPreset = useCallback((preset) => {
    const newValues = {
      ...PRESETS[preset],
      rotation: 0
    };
    setMatrixValues(newValues);
    addToHistory(newValues);
  }, [addToHistory]);

  /**
   * Undo last transformation
   */
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setMatrixValues(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  /**
   * Redo last undone transformation
   */
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setMatrixValues(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const resetToDefault = useCallback(() => {
    setMatrixValues(defaultValues);
    setHistory([defaultValues]);
    setHistoryIndex(0);
  }, []);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(matrixCSS)
      .then(() => alert('CSS copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err));
  }, [matrixCSS]);

  return (
    <Fragment>
      <Main>
        <Section>
          <MatrixDiv {...matrixValues}>
            Sliders Below
          </MatrixDiv>
        </Section>
      </Main>
      <Section2>
        <Options>
          {/* Rotation Control */}
          <Ranges>
            <OptionTitle>Rotation:</OptionTitle>
            <div title="Rotate the element (in degrees)">
              <div>Degrees: {matrixValues.rotation || 0}°</div>
              <Slider
                type="range"
                value={matrixValues.rotation || 0}
                onChange={handleRotation}
                min={RANGES.ROTATE.MIN}
                max={RANGES.ROTATE.MAX}
                step={RANGES.ROTATE.STEP}
              />
            </div>
          </Ranges>

          {/* Scale Controls */}
          <Ranges>
            <OptionTitle>Scale:</OptionTitle>
            <div title="Scale horizontally - Affects width">
              <div>X: {matrixValues.a}</div>
              <Slider
                type="range"
                value={matrixValues.a}
                onChange={handleMatrixChange('a')}
                min={RANGES.SCALE.MIN}
                max={RANGES.SCALE.MAX}
                step={RANGES.SCALE.STEP}
              />
            </div>
            <div title="Scale vertically - Affects height">
              <div>Y: {matrixValues.d}</div>
              <Slider
                type="range"
                value={matrixValues.d}
                onChange={handleMatrixChange('d')}
                min={RANGES.SCALE.MIN}
                max={RANGES.SCALE.MAX}
                step={RANGES.SCALE.STEP}
              />
            </div>
          </Ranges>

          {/* Skew Controls */}
          <Ranges>
            <OptionTitle>Skew:</OptionTitle>
            <div title="Skew horizontally - Tilts the element left/right">
              <div>X: {matrixValues.c}</div>
              <Slider
                type="range"
                value={matrixValues.c}
                onChange={handleMatrixChange('c')}
                min={RANGES.SKEW.MIN}
                max={RANGES.SKEW.MAX}
                step={RANGES.SKEW.STEP}
              />
            </div>
            <div title="Skew vertically - Tilts the element up/down">
              <div>Y: {matrixValues.b}</div>
              <Slider
                type="range"
                value={matrixValues.b}
                onChange={handleMatrixChange('b')}
                min={RANGES.SKEW.MIN}
                max={RANGES.SKEW.MAX}
                step={RANGES.SKEW.STEP}
              />
            </div>
          </Ranges>

          {/* Translation Controls */}
          <Ranges>
            <OptionTitle>Translation:</OptionTitle>
            <div title="Move horizontally - Shifts left/right">
              <div>X: {matrixValues.x}</div>
              <Slider
                type="range"
                value={matrixValues.x}
                onChange={handleMatrixChange('x')}
                min={RANGES.TRANSLATE.MIN}
                max={RANGES.TRANSLATE.MAX}
                step={RANGES.TRANSLATE.STEP}
              />
            </div>
            <div title="Move vertically - Shifts up/down">
              <div>Y: {matrixValues.y}</div>
              <Slider
                type="range"
                value={matrixValues.y}
                onChange={handleMatrixChange('y')}
                min={RANGES.TRANSLATE.MIN}
                max={RANGES.TRANSLATE.MAX}
                step={RANGES.TRANSLATE.STEP}
              />
            </div>
          </Ranges>

          {/* Preset Buttons - In separate columns */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '10px',
            marginBottom: '10px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              <Button onClick={() => applyPreset('FLIP_HORIZONTAL')}>Flip H</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              <Button onClick={() => applyPreset('FLIP_VERTICAL')}>Flip V</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              <Button onClick={() => applyPreset('ROTATE_45')}>Rotate 45°</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              <Button onClick={() => applyPreset('ROTATE_90')}>Rotate 90°</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              <Button onClick={() => applyPreset('MIRROR')}>Mirror</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              <Button onClick={() => applyPreset('SKEW_DIAMOND')}>Diamond</Button>
            </div>
          </div>

          {/* History Controls - In a separate row */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '10px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              <Button onClick={undo} disabled={historyIndex === 0}>Undo</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              <Button onClick={resetToDefault}>Reset</Button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              <Button onClick={redo} disabled={historyIndex === history.length - 1}>Redo</Button>
            </div>
          </div>
        </Options>

        {/* CSS Output Section */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Textarea
            disabled
            value={matrixCSS}
          />
          <Button onClick={copyToClipboard} style={{ width: '350px' }}>Copy CSS</Button>
        </div>

        {/* Matrix Description */}
        <Description>
          <DescriptionTitle>Transform matrix(a,b,c,d,tx,ty)</DescriptionTitle>
          <Block>
            <p>Position of the values on a matrix</p>
            <p>a c tx</p>
            <p>b d ty</p>
            <p>0 0 1</p>
          </Block>
          <Block>
            <p>Current values</p>
            <p>{matrixValues.a} {matrixValues.c} {matrixValues.x}</p>
            <p>{matrixValues.b} {matrixValues.d} {matrixValues.y}</p>
            <p>0 0 1</p>
          </Block>
        </Description>
      </Section2>
    </Fragment>
  );
};

export default Sliders;