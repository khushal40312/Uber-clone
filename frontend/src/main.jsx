import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from '../context/UserContext.jsx'
import CaptainContext from '../context/CaptainContext.jsx'
import uberStore from './store/index.js'
import { Provider } from 'react-redux'



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={uberStore}>
    <CaptainContext>
    <UserContext>
      
      <BrowserRouter>
        <App />
      </BrowserRouter>
 
    </UserContext>
    </CaptainContext>
    </Provider>
  </StrictMode>
)
