import {
  // CheckboxInput,
  // CheckboxLabel,
  // CheckboxWrapper,
  // CheckIcon,
  Container,
} from "./style";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  size?: number;
  number?: number;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  size = 18,
  number,
  label,
  ...props
}) => {
  return (
    <Container $size={size}>
      <div className="checkbox-wrapper">
        <input type="checkbox" id={id} {...props} />
        <label htmlFor={id}>
          <span>
            {number ? (
              <p style={{ fontSize: `${size * 0.5}px` }}>{number}</p>
            ) : (
              <svg viewBox="0 0 12 10" height={size * 0.55} width={size * 0.66}>
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </svg>
            )}
          </span>
          {label && <span>{label}</span>}
        </label>
      </div>
    </Container>
  );
};

export default Checkbox;
