import { Fragment, useState, useMemo, useCallback } from 'react';
import Slider from './Slider';
import { Main, MatrixDiv, Section, Section2, Description, Options, Ranges, OptionTitle, Button, Textarea, DescriptionTitle, Block} from '../EditableTag';

/**
 * Constant ranges for different transformation types
 * These define the minimum, maximum, and step values for each slider
 */
const RANGES = {
  SCALE: { MIN: -3, MAX: 3, STEP: 0.01 },     // Scale range: -3x to 3x
  SKEW: { MIN: -5, MAX: 5, STEP: 0.01 },      // Skew range: -5 to 5 degrees
  TRANSLATE: { MIN: -150, MAX: 150, STEP: 0.01 } // Translation range: -150px to 150px
};

/**
 * Sliders Component
 * A component that provides an interactive interface for manipulating CSS matrix transformations.
 * Allows users to adjust scale, skew, and translation values through sliders and displays
 * the resulting CSS transform matrix.
 * 
 * @returns {JSX.Element} The rendered Sliders component
 */
const Sliders = () => {
  // Initial default values for the transformation matrix
  const defaultValues = {
    a: 1, // scale x - Horizontal scaling
    b: 0, // skew y - Vertical skewing
    c: 0, // skew x - Horizontal skewing
    d: 1, // scale y - Vertical scaling
    x: 0, // translate x - Horizontal translation
    y: 0  // translate y - Vertical translation
  };

  // State to manage all matrix values in a single object
  const [matrixValues, setMatrixValues] = useState(defaultValues);

  /**
   * Memoized CSS matrix string generation
   * Generates the CSS transform matrix string including vendor prefixes
   * Only recalculates when matrixValues changes
   */
  const matrixCSS = useMemo(() => {
    const { a, b, c, d, x, y } = matrixValues;
    return `transform:matrix(${a}, ${b}, ${c}, ${d}, ${x},${y});
-ms-transform:matrix(${a}, ${b}, ${c}, ${d}, ${x},${y});
-webkit-transform:matrix(${a}, ${b}, ${c}, ${d}, ${x},${y});`;
  }, [matrixValues]);

  /**
   * Generic handler for matrix value changes
   * @param {string} key - The matrix property to update (a, b, c, d, x, or y)
   * @returns {Function} Event handler function that updates the specified matrix value
   */
  const handleMatrixChange = useCallback((key) => (e) => {
    setMatrixValues(prev => ({
      ...prev,
      [key]: Number(e.target.value)
    }));
  }, []);

  /**
   * Resets all matrix values to their defaults
   */
  const resetToDefault = useCallback(() => {
    setMatrixValues(defaultValues);
  }, []);

  /**
   * Copies the current CSS matrix string to the clipboard
   * Shows a success alert or logs error if copy fails
   */
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(matrixCSS)
      .then(() => alert('CSS copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err));
  }, [matrixCSS]);

  return (
    <Fragment>
      <Main>
        <Section>
          <MatrixDiv
            matrixA={matrixValues.a}
            matrixB={matrixValues.b}
            matrixC={matrixValues.c}
            matrixD={matrixValues.d}
            matrixValueX={matrixValues.x}
            matrixValueY={matrixValues.y}
          >
            Sliders Below
          </MatrixDiv>
        </Section>
      </Main>
      <Section2>
        <Options>
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
          <Button onClick={resetToDefault}>Reset Default</Button>
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