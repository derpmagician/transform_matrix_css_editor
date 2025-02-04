import styled from 'styled-components';

// Constants for colors
const COLORS = {
  PRIMARY: '#006524',
  SECONDARY: '#454550',
  ACCENT: '#FFFF50',
  DARK: '#1d3330',
  TEXT: '#FFFFFF',
  TEXT_SECONDARY: '#E0E0E0'
};

export const MatrixDiv = styled.div.attrs(props => ({
  style: {
    transform: `matrix(${props.matrixA},${props.matrixB},${props.matrixC},${props.matrixD},${props.matrixValueX},${props.matrixValueY})`,
  },
}))`
  background-color: ${COLORS.ACCENT};
  display: grid;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const Main = styled.main`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  overflow: hidden;
  padding: 20px;
`;

export const Section = styled.section`
  background-color: ${COLORS.PRIMARY};
  display: grid;
  place-items: center;
  width: 350px;
  height: 350px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

export const Section2 = styled.section`
  display: grid;
  place-items: center;
  background-color: ${COLORS.SECONDARY};
  color: ${COLORS.TEXT};
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 150px 250px;
  width: 100%;
  padding: 20px 0;
`;

export const Options = styled.section`
  margin-top: 10px;
  width: 95%;
  display: grid;
  gap: 15px;
`;

export const OptionTitle = styled.section`
  grid-column: 1 / -1;
  padding-bottom: 5px;
  text-align: center;
  font-weight: bold;
  color: ${COLORS.TEXT};
`;

export const Ranges = styled.section`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  background: ${COLORS.DARK};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Textarea = styled.textarea`
  width: 350px;
  height: 5em;
  background: ${COLORS.DARK};
  color: ${COLORS.TEXT};
  resize: none;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${COLORS.TEXT_SECONDARY};
  font-family: monospace;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.ACCENT};
  }
`;

export const Description = styled.div`
  background: ${COLORS.DARK};
  width: 95%;
  display: grid;
  place-items: center;
  grid-template-rows: 1fr 3fr;
  grid-template-columns: 1fr 1fr;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const InputRange = styled.input`
  cursor: pointer;
  width: 100%;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${COLORS.ACCENT};
    cursor: pointer;
    margin-top: -6px;
  }
  
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    background: ${COLORS.TEXT_SECONDARY};
    border-radius: 2px;
  }
`;

export const Button = styled.button`
  background: ${COLORS.DARK};
  border: 1px solid ${COLORS.TEXT};
  height: 50px;
  width: 100%;
  color: ${COLORS.TEXT};
  cursor: pointer;
  grid-column: 1 / -1;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${COLORS.TEXT};
    color: ${COLORS.DARK};
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

export const DescriptionTitle = styled.p`
  grid-column: 1 / -1;
  font-weight: bold;
  font-size: 1.1em;
  margin-bottom: 10px;
`;

export const Block = styled.div`
  grid-row-start: 2;
  text-align: center;
  
  p {
    margin: 5px 0;
    font-family: monospace;
  }
`;