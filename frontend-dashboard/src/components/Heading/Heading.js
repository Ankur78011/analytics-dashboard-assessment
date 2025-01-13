import React from 'react'

const Heading = ({text}) => {
  return (
    <h2
        style={{
          background: 'linear-gradient(45deg, #6a5acd, #4b0082)',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          fontSize: '2em',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginTop: '30px',
          transition: 'background 0.5s, transform 0.3s',
        }}
      >
      {text}
      </h2>
  )
}

export default Heading
