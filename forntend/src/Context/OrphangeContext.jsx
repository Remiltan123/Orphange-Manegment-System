import React, { createContext, useState } from 'react'


export const DetailsContext = createContext();

export const OrphangeContext = ({children}) => {

  const [details, setDetails] = useState({});

  return (
    <DetailsContext.Provider value={{ details, setDetails }}>
      {children}
    </DetailsContext.Provider>
  )
}
