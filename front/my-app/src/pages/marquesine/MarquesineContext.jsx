import React, { createContext, useContext } from 'react'

const MarquesineContext = createContext();
const MarquesineUpdateContext = createContext();

export function useMarquesine() {
    return useContext(MarquesineContext);
}

export function useMarquesineUpdate() {
    return useContext(MarquesineUpdateContext);
}

export function MarquesineProvider({ children }) {

  const MARQUESINE = {
    update: true
  }

  function updateMarquesineTable(value) {
    // console.log('SE UPDATEO EL ESTADO=====', value)
    MARQUESINE.update = value
  }

  return (
    <MarquesineContext.Provider value={MARQUESINE}>
        <MarquesineUpdateContext.Provider value={updateMarquesineTable}>
            {children}
        </MarquesineUpdateContext.Provider>
    </MarquesineContext.Provider>
  );
}