//imports
import Header from './components/Header'
import Dashboard from './views/dashboard'
import Landing from './views/landing'
import SignUp from './views/signup'
import LogIn from './views/login'
import ProjectViewer from './views/projectviewer'
import CurrentUserProvider from './contexts/currentUser'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React, {UseState} from 'react'

//App
function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <Router>
          <Header/>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<LogIn/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='projects' element={<ProjectViewer/>}/>
          </Routes>
        </Router>
      </CurrentUserProvider>
      
    </div>
  );
}

export default App;
