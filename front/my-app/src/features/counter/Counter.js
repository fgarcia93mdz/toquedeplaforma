import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <small style={{position: 'relative',top:'-2px'}}>Página </small>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(decrement())}
          style={{background: 'none', color: 'white', fontWeight: 'bold', fontSize: '24px', padding: '8px'}}
        >
          {'<'}
        </button>
        <span style={{color: 'white'}}>{count + 1}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(increment())}
          style={{background: 'none', color: 'white', fontWeight: 'bold', fontSize: '24px', padding: '8px'}}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}