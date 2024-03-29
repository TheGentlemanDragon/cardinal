import { useAtom } from "jotai";
import { css } from "linaria";
import { h } from "preact";

import { Atoms } from "../../lib/atoms";
import { withEventTargetValue } from "../../lib/utils";

const ScaleSliderCss = css`
  display: flex;
  align-items: center;

  label {
    margin-right: var(--margin-md);
    text-shadow: var(--text-shadow-sm);
  }

  input[type="range"] {
    -webkit-appearance: none;
    background: transparent;
    width: 100%;
  }

  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    background-color: #333;
    border-radius: 2px;
    box-shadow: var(--box-shadow-sm);
    cursor: pointer;
    height: 0.25rem;
    width: 100%;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #ffffff;
    border-radius: 0.5rem;
    box-shadow: var(--box-shadow-sm);
    cursor: pointer;
    height: 1rem;
    margin-top: -6px;
    width: 1rem;
  }
`;

/** List games for the main page */
export function ScaleSlider() {
  const [scale, setScale] = useAtom(Atoms.scale);

  return (
    scale && (
      <div class={ScaleSliderCss}>
        <label>Scale</label>
        <input
          type="range"
          id="cardScale"
          name="cardScale"
          min="0.5"
          max="3"
          step="0.05"
          value={scale}
          onInput={withEventTargetValue(setScale)}
        />
      </div>
    )
  );
}
