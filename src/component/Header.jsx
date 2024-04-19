import React from 'react'
import { useTheme } from "../hooks/useTheme"

const Header = () => {
  const [isDark, setIsDark] =  useTheme()
  return (
    <header class={`header-container ${isDark? 'dark': ''}`}>
    <div class="header-content">
      <h2 class="title">Where in the world?</h2>
      <p onClick={()=>{
        setIsDark(!isDark)
        localStorage.setItem('isDarkMode', !isDark)
      }}><i class={`fa-solid fa-${isDark ? 'sun': 'moon'}` }></i>&nbsp;&nbsp;{isDark? 'Light': 'Dark'} Mode</p>
    </div>
  </header>
  )
}

export default Header
