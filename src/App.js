import React from 'react';
import Pages from './Pages/Pages';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/WebContext';
export default function App() {
  return (
 <h1 className="App">
<BrowserRouter>
<AuthProvider>

<Pages></Pages>
</AuthProvider>
</BrowserRouter>

 </h1>
  )
}
