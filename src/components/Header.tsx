import React from 'react'
import logo from '@img/logo.png'

const Header = () => {
  const headerStyle: any = {
    header: {
      position: 'fixed',
      width: '100%',
      top: 0,
      height: '60px',
      zIndex: '1',
      backgroundColor: '#e6e7ee',
      boxShadow: '1px 6px 12px #b8b9be'
    },
    h1: {
      position: 'relative',
      left: '10px'
    }
  }

  return (
    <header style={headerStyle.header} className="d-flex align-center">
      <img src={logo} alt="Logo" className="f-left logo" />
      <a href={`/`}>
        <h1 style={headerStyle.h1} className="text-primary">
          Page Title
        </h1>
      </a>
    </header>
  )
}

export default Header
