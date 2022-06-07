import styled from 'styled-components';


export const MatrixDiv = styled.div.attrs(props => ({
  style: {
    transform:
      `matrix(
        ${props.matrixA},
        ${props.matrixB},
        ${props.matrixC},
        ${props.matrixD},
        ${props.matrixValueX},
        ${props.matrixValueY}
        )`,
  },
}))`
  background-color: #FFFF50;
  display: grid;
  padding: 25px;
`

export const Main = styled.main`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  overflow: hidden;
`
export const Section  = styled.section`
  background-color: #006524;
  display: grid;
  place-items: center;
  width: 350px;
  height: 350px;
`
export const Section2  = styled.section`
  display: grid;
  place-items: center;
  background-color: #454550;
  color: white;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 150px 250px;
  width: 100%;
`
export const Options  = styled.section`
  margin-top: 10px;
  width: 95%;
`

export const OptionTitle  = styled.section`
  grid-column: 1 / -1;
  padding-bottom: 5px;
  text-align: center;
`

export const Ranges  = styled.section`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  background: #1d3330;
  padding: 10px;
`
export const Textarea  = styled.textarea`
  width: 300px;
  height: 5em;
  background: #1d3330;
  color: white;
  resize: none;
  padding: 10px;
`

export const Description  = styled.div`
  background: #1d3330;
  width: 95%;
  display: grid;
  place-items: center;
  grid-template-rows: 1fr 3fr;
  grid-template-columns: 1fr 1fr;
`

export const InputRange  = styled.input`
  cursor: pointer;
`

export const Button  = styled.button`
  background: #1d3330;
  border: 1px solid white;
  height: 50px;
  width: 100%;
  color: white;
  cursor: pointer;
  grid-column: 1 / -1;
`
export const DescriptionTitle  = styled.p`
  grid-column: 1 / -1;
`

export const Block  = styled.div`
  grid-row-start: 2;
`