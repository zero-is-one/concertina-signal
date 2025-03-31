import styled from "@emotion/styled";
import { FirebaseAuthUI } from "@signal-app/firebaseui-web-react";
export const StyledFirebaseAuth = styled(FirebaseAuthUI) `
  ul.firebaseui-idp-list {
    list-style-type: none;
    padding: 0;
  }

  button.firebaseui-idp-button {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid ${({ theme }) => theme.dividerColor};
    background: inherit !important;
    color: inherit;
    min-height: 3rem;
    min-width: 12rem;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.highlightColor} !important;
    }
  }

  img.firebaseui-idp-icon {
    width: 1.5rem;
  }

  span.firebaseui-idp-icon-wrapper {
    display: flex;
    margin-right: 1rem;
  }

  span.firebaseui-idp-text.firebaseui-idp-text-short {
    display: none;
  }

  li.firebaseui-list-item {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  }
`;
//# sourceMappingURL=StyledFirebaseAuth.js.map