import { InputRange } from '../EditableTag';

const Slider = (props) => {
  const {value, onChange, min, max, step } = props
  return (
      <InputRange type="range" value={value} onChange={onChange} min={min} max={max} step={step} />
  );
}

export default Slider;