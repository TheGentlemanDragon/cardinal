import { css } from "linaria";

export const ElementBaseCss = css`
  align-items: center;
  color: #aaa;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  justify-content: center;
  position: absolute;
  user-select: none;

  svg {
    fill: #aaa;
    flex: 0 0 14px;
    height: 14px;
    width: 14px;
    margin-right: 0.25rem;
  }
`;

export const MenuCss = css`
  background-color: var(--clr-menu-bg);
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex: 0 0 210px;

  .Menu-Panel {
    align-items: stretch;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: var(--margin-md) var(--padding-y);
  }
`;

export const MenuPanelCss = css`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
`;

export const PageCss = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  padding: var(--padding-page);
`;

export const SearchInputCss = css`
  background-color: var(--clr-black-10);
  border: none;
  border-bottom: var(--border-dark);
  font-size: large;
  outline: none;
  padding: var(--input-padding-y) var(--input-padding-x);
`;
