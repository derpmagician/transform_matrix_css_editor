import { Fragment, useState } from 'react';
import Slider from './Slider';
import { Main, MatrixDiv, Section, Section2, Description, Options, Ranges, OptionTitle, Button, Textarea, DescriptionTitle, Block} from '../EditableTag';

const Sliders = () => {
  const defaultValues = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    x: 0,
    y: 0,
    r: 0,
    sx: 0,
    sy: 0,
  }

  const [matrixValueA, setMatrixValueA] = useState(defaultValues.a);
  const [matrixValueB, setMatrixValueB] = useState(defaultValues.b);
  const [matrixValueC, setMatrixValueC] = useState(defaultValues.c);
  const [matrixValueD, setMatrixValueD] = useState(defaultValues.d);
  const [matrixValueX, setMatrixValueX] = useState(defaultValues.x);
  const [matrixValueY, setMatrixValueY] = useState(defaultValues.y);

  // const fixedVal = 2;
  // const degToRad = (deg) => {
  //   return (deg * (Math.PI) / 180.0)
  // };

  // const radToDeg = (rad) => {
  //   return rad * (180 / Math.PI);
  // };

  const handleMatrixRangeA = (e) => {
    setMatrixValueA(e.target.value);
  };
  const handleMatrixRangeB = (e) => {
    setMatrixValueB(e.target.value);
  };
  const handleMatrixRangeC = (e) => {
    setMatrixValueC(e.target.value);
  };
  const handleMatrixRangeD = (e) => {
    setMatrixValueD(e.target.value);
  };
  const handleMatrixRangeX = (e) => {
    setMatrixValueX(e.target.value);
  };
  const handleMatrixRangeY = (e) => {
    setMatrixValueY(e.target.value);
  };
  


  const resetToDefault = () => {
    setMatrixValueA(defaultValues.a);
    setMatrixValueB(defaultValues.b);
    setMatrixValueC(defaultValues.c);
    setMatrixValueD(defaultValues.d);
    setMatrixValueX(defaultValues.x);
    setMatrixValueY(defaultValues.y);

  }
  return (
    <Fragment>
      <Main>
        <Section >
          <MatrixDiv
            matrixA={Number(matrixValueA)}
            matrixB={Number(matrixValueB)}
            matrixC={Number(matrixValueC)}
            matrixD={Number(matrixValueD)}
            matrixValueX={matrixValueX}
            matrixValueY={matrixValueY}
            >
            Sliders Bellow
          </MatrixDiv>
        </Section >
        
      </Main>
      <Section2 >
        <Options>
          <Ranges>
            <OptionTitle>Scale:</OptionTitle>
            <div>
              <div>X: {matrixValueA}</div>
              <Slider type="range" value={matrixValueA} onChange={handleMatrixRangeA} min="-3" max="3" step="0.01"/>
            </div>
            <div>
              <div>Y: {matrixValueD}</div>
              <Slider type="range" value={matrixValueD} onChange={handleMatrixRangeD} min="-3" max="3" step="0.01" />
            </div>
          </Ranges>
          <Ranges>
            <OptionTitle>Skew:</OptionTitle>
            <div>
              <div>X: {matrixValueC}</div>
              <Slider type="range" value={matrixValueC} onChange={handleMatrixRangeC} min="-5" max="5" step="0.01" />
            </div>
            <div>
              <div>Y: {matrixValueB}</div>
              <Slider type="range" value={matrixValueB} onChange={handleMatrixRangeB} min="-5" max="5" step="0.01"/>
            </div>
          </Ranges>
          <Ranges>
            <OptionTitle>Translation:</OptionTitle>
            <div>
              <div>X: {matrixValueX}</div>
              <Slider type="range" value={matrixValueX} onChange={handleMatrixRangeX} min="-150" max="150" step="0.01" />
            </div>
            <div>
              <div>Y: {matrixValueY}</div>
              <Slider type="range" value={matrixValueY} onChange={handleMatrixRangeY} min="-150" max="150" step="0.01" />
            </div>
          </Ranges>
          <Button onClick={resetToDefault} >Reset Default</Button>
        </Options>
        <Textarea
          disabled
          value={
            `transform:matrix(${matrixValueA}, ${matrixValueB}, ${matrixValueC}, ${matrixValueD}, ${matrixValueX},${matrixValueY});
    -ms-transform:matrix(${matrixValueA}, ${matrixValueB}, ${matrixValueC}, ${matrixValueD}, ${matrixValueX},${matrixValueY});
    -webkit-transform:matrix(${matrixValueA}, ${matrixValueB}, ${matrixValueC}, ${matrixValueD}, ${matrixValueX},${matrixValueY});
            `
          }
        />
        <Description>
          <DescriptionTitle>Trasform matrix(a,b,c,d,tx,ty)</DescriptionTitle>
          <Block>
            <p>Position of the values on a matrix</p>
            <p>a c tx</p>
            <p>b d ty</p>
            <p>0 0 1</p>
          </Block>
          <Block>
            <p>Default values</p>
            <p>{matrixValueA} {matrixValueC} {matrixValueX}</p>
            <p>{matrixValueB} {matrixValueD} {matrixValueY}</p>
            <p>0 0 1</p>
          </Block>

        </Description>
      </Section2>
      
    </Fragment>

  )
};

export default Sliders;