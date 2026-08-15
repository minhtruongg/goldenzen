'use client'
import { createContext, useContext, useState } from 'react'

const LangCtx = createContext({ lang: 'cs', setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLang] = useState('cs')
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>
}

export function useLang() {
  return useContext(LangCtx)
}
