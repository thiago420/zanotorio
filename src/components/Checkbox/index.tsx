import {
  // CheckboxInput,
  // CheckboxLabel,
  // CheckboxWrapper,
  // CheckIcon,
  Container,
} from "./style";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, ...props }) => {
  return (
    <Container>
      <div className="checkbox-wrapper">
        <input type="checkbox" id={id} {...props} />
        <label htmlFor={id}>
          <span>
            <svg viewBox="0 0 12 10" height="10px" width="12px">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          </span>
          {label && <span>{label}</span>}
        </label>
      </div>
    </Container>
  );
};

export default Checkbox;
