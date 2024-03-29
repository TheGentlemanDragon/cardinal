import { h } from "preact";
// import PropTypes from 'proptypes'
// import { css } from 'linaria'

import { CardTable } from "../features/CardTable";
import { DataMenu } from "../features/DataMenu";

import { Stores, useCollectionQuery, useItemQuery } from "../hooks/data";
import { getUniqueName, newField } from "../lib/models";
import { PageCss } from "../lib/styles";
import { cls, getParams, sortByKey } from "../lib/utils";

DataPage.propTypes = {};

/**
 * Some documented component
 *
 * @component
 * @param {object} props
 * @param {string} props.templateId ID of template to load
 * @example
 * const templateId = 'ILSUMGQVg80sjZ18T6Xl'
 * return (
 *   <DataPage templateId={templateId} />
 * )
 */
function DataPage() {
  const [templateId] = getParams(["template"]);

  const { data: cards } = useCollectionQuery(Stores.Cards, { templateId });
  const { data: template } = useItemQuery(Stores.Templates, templateId);

  const fields = template?.fields?.sort(sortByKey("order"));
  const fieldNames = fields?.map((field) => field.name);

  const primeAddRow = (id) => () => {}; // Cards.add({ templateId, [id]: "New card" });

  // Add a new field with optional suffix to ensure uniqueness
  const addField = () => {
    const index = fields.length;
    const name = getUniqueName(fieldNames, "newField");

    Templates.setItem(templateId, {
      fields: [...template.fields, newField(name, index)],
    });
  };

  const save = (value, row, id) => {
    const field = fields.find((item) => item.id === id);

    if (row === "h") {
      // Exit if value has not changed
      if (value === field.name) {
        return;
      }

      if (fieldNames.includes(value)) {
        alert("The field name is already in use");
        return;
      }

      Templates.setItem(templateId, {
        fields: fields.map((item) =>
          item.id === id ? { ...item, name: value } : item
        ),
      });
    } else {
      const card = cards[row];

      // Exit if value has not changed
      if (value === card[id]) {
        return;
      }

      // Cards.setItem(card.$id, { ...card, [id]: value });
    }
  };

  const addRow = primeAddRow(fields?.[0]?.id);

  return (
    <>
      <DataMenu addField={addField} addRow={addRow} />

      <div class={cls(PageCss)}>
        {cards && template && (
          <CardTable
            addRow={addRow}
            cards={cards}
            save={save}
            template={template}
          />
        )}
      </div>
    </>
  );
}

export { DataPage };
