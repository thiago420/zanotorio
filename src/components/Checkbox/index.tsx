import {
  // CheckboxInput,
  // CheckboxLabel,
  // CheckboxWrapper,
  // CheckIcon,
  Container,
} from "./style";

const Checkbox = () => {
  return (
    <Container>
      <div className="checkbox-wrapper-46">
        <input type="checkbox" id="cbx-46" className="inp-cbx" />
        <label htmlFor="cbx-46" className="cbx">
          <span>
            <svg viewBox="0 0 12 10" height="10px" width="12px">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          </span>
          <span>Checkbox</span>
        </label>
      </div>
    </Container>
    // <CheckboxWrapper>
    //   <CheckboxInput type="checkbox" id="cbx-46" />
    //   <CheckboxLabel htmlFor="cbx-46">
    //     <CheckIcon>
    //       <svg viewBox="0 0 12 10" height="10px" width="12px">
    //         <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
    //       </svg>
    //     </CheckIcon>
    //     <span>Checkbox</span>
    //   </CheckboxLabel>
    // </CheckboxWrapper>
  );
};

export default Checkbox;
