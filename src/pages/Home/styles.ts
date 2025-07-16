import { between } from "polished";
import styled from "styled-components";

export const Title = styled.h1`
  font-size: ${between('24px', '56px', '320px', '768px')};
  font-size: ${between('24px', '56px')};
`;
