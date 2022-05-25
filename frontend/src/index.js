import React from 'react'
// import ReactDOM from 'react-dom/client'
import {createRoot} from 'react-dom/client'

import './index.css'
import App from './App'

// ReactDOM.createRoot(document.getElementById('root')).render(<App />)

const root = createRoot(document.getElementById('root'))
root.render(<App />)
