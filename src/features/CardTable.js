import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { css } from 'linaria'

import { EmptyState } from './EmptyStates/EmptyState'

import { cls, sortByFieldOrder } from '../lib/utils'

const CardTableCss = css`
  display: flex;
  flex-direction: column;

  .CardTable-ModalHeader {
    display: flex;
  }

  .CardTable-Title {
    flex-grow: 1;
  }

  .CardTable-List {
    border-collapse: collapse;
    border-radius: var(--radius-md);
    box-shadow: var(--box-shadow-lg);
    font-size: 0.9rem;
    margin: 10% auto 0;
    min-width: 10rem;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    thead tr {
      background-color: var(--clr-blue);
      color: #ffffff;
      text-align: left;
    }

    th,
    td {
      cursor: pointer;
      min-width: 5rem;
      padding: 12px 15px;

      &:focus {
        cursor: unset;
      }

      &.activeCell {
        padding: 7px 9px;

        input {
          font-size: 0.9rem;
          padding: 3px 4px;
          width: 100%;
        }
      }
    }

    tr {
      color: var(--clr-black-70);
    }

    tbody tr {
      background-color: #ffffff;
    }

    tbody tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }

    /* tbody tr.active-row {
      font-weight: bold;
      background-color: var(--clr-input-bg-hover);
    } */
  }
`

export function CardTable({ addRow, cards, template, save, Selected }) {
  const [cell, setCell] = Selected
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState('')

  const fields = template.fields
  const fieldKeys = fields
    ? Object.keys(fields).sort(sortByFieldOrder(fields))
    : []

  fieldKeys.unshift('name')

  const hasData = cards.length > 0

  // Focus changed cell
  useEffect(() => {
    if (!cards.length) return

    const target = isEditing ? `#activeCell` : `#r${cell.row}-c${cell.col}`
    console.log(target)
    document.querySelector(target).focus()
  }, [cards, isEditing, cell])

  const moveCursor = (row, col) => event => {
    if (isEditing) return

    const targetCell = { row, col }

    const atTop = row === 'h'
    const atBottom = row === cards.length - 1
    const atLeft = col === 0
    const atRight = col === fieldKeys.length - 1

    switch (event.key) {
      case 'Enter':
        setIsEditing(true)
        setTempValue(event.target.textContent)
        break

      case 'ArrowDown':
        if (atBottom) return

        targetCell.row = atTop ? 0 : row + 1
        break

      case 'ArrowUp':
        if (atTop) return

        targetCell.row = row === 0 ? 'h' : row - 1
        break

      case 'ArrowRight':
        if (atRight) return

        targetCell.col += 1
        break

      case 'ArrowLeft':
        if (atLeft) return

        targetCell.col -= 1
        break

      default:
        return
    }

    setCell(targetCell)
  }

  const checkInput = (row, col) => event => {
    switch (event.key) {
      case 'Escape':
        setIsEditing(false)
        return

      case 'Enter':
        // Don't allow line break
        event.preventDefault()
        event.cancelBubble = true

        setIsEditing(false)

        const key = fieldKeys[col]
        const original = (row === 'h' ? key : cards[row][key]) ?? ''

        // Only save if value changed
        if (tempValue.trim() !== original) {
          save(tempValue.trim())
        }
    }
  }

  const isActiveCell = (row, col) =>
    isEditing && row === cell.row && col === cell.col

  return (
    <div class={CardTableCss}>
      <div class="CardTable-ModalHeader">
        <h1>Card Data</h1>
      </div>

      {hasData ? (
        <table class="CardTable-List">
          <thead>
            <tr>
              {fieldKeys.map((key, col) => {
                const isNotName = key !== 'name'
                const isActive = isActiveCell('h', col)
                return (
                  <th
                    key={`rh-c${col}`}
                    id={`rh-c${col}`}
                    class={cls(isActive && 'activeCell')}
                    tabindex="0"
                    onKeyDown={moveCursor('h', col)}
                  >
                    {isActive && isNotName ? (
                      <input
                        id="activeCell"
                        value={tempValue}
                        size="1"
                        onKeyDown={checkInput('h', col)}
                        onChange={event => setTempValue(event.target.value)}
                      />
                    ) : (
                      key
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {cards.map((card, row) => (
              <tr
                key={`row-${row}`}
                class={cls(cell.row === row && 'active-row')}
              >
                {fieldKeys.map((key, col) => {
                  const isActive = isActiveCell(row, col)
                  return (
                    <td
                      key={`r${row}-c${col}`}
                      id={`r${row}-c${col}`}
                      class={cls(isActive && 'activeCell')}
                      tabindex="0"
                      onKeyDown={moveCursor(row, col)}
                    >
                      {isActive ? (
                        <input
                          id="activeCell"
                          value={tempValue}
                          size="1"
                          onKeyDown={checkInput(row, col)}
                          onChange={event => setTempValue(event.target.value)}
                        />
                      ) : (
                        card[key]
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState
          image="data"
          title="No card data found"
          content={
            <>
              <p>You have not created any card data yet.</p>

              <p>
                Each row of card data generates a card that can populate this
                template and be added to a deck.
              </p>

              <button onClick={addRow}>Add a row</button>
            </>
          }
        />
      )}
    </div>
  )
}
