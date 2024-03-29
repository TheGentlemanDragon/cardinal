import { h } from "preact";
import { useEffect } from "preact/hooks";
// import PropTypes from 'proptypes'
import { css } from "linaria";

import { TemplatesMenu } from "../features/TemplatesMenu";
import { Stores, useCollectionQuery } from "../hooks/data";
import { PageCss } from "../lib/styles";
import { getParams, sortByKey } from "../lib/utils";

const listCss = css`
  display: flex;
`;

const templateItemCss = css`
  /* Item */
  -webkit-user-select: none;
  box-shadow: var(--box-shadow-sm);
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s;

  /* Item link and hover */
  color: black;
  text-decoration-line: none;

  &:hover {
    box-shadow: var(--box-shadow-md);
  }

  /* Template Item */
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  border: 3px dashed rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(150px * 0.71429);
  height: 150px;
  justify-content: center;
  max-width: calc(150px * 0.71429);
  padding: 0 0.8rem;

  & + & {
    margin-left: 1rem;
  }

  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

TemplatesPage.propTypes = {};

/**
 * Some documented component
 *
 * @component
 * @param {object} props
 * @param {string} props.gameId ID of game to load
 * @example
 * const gameId = 'lCSYutJmUDI5qqgPYadC'
 * return (
 *   <TemplatesPage gameId={gameId} />
 * )
 */
export function TemplatesPage() {
  const [gameId] = getParams(["game"]);
  const { data: templates } = useCollectionQuery(Stores.Templates, { gameId });

  return (
    <>
      <TemplatesMenu gameId={gameId} />

      <div class={PageCss}>
        <h2>Templates</h2>

        {/* Templates List */}
        <div class={listCss}>
          {templates.sort(sortByKey("name")).map((template) => (
            <a
              key={`templates-list-${template.$id}`}
              class={`template ${templateItemCss}`}
              href={`/editor?game=${gameId}&template=${template.$id}`}
            >
              {template.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
