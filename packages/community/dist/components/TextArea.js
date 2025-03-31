import styled from "@emotion/styled";
export const TextArea = styled.textarea `
  display: block;
  appearance: none;
  border: none;
  background: inherit;
  border: 1px solid ${({ theme }) => theme.dividerColor};
  border-radius: 0.25rem;
  min-height: 8em;
  padding: 1rem 1rem;
  align-items: center;
  justify-content: center;
  color: inherit;
  font-size: 1rem;
  font-family: inherit;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.themeColor};
  }
`;
//# sourceMappingURL=TextArea.js.map