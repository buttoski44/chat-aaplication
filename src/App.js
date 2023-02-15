import './App.css';
import { Register } from './pages/register/register.page';
import { Login } from './pages/login/login.page';
import { Home } from './pages/home/home.page';
import { Routes ,Route ,Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/auth.context';


function App() {
  const { currentUser }= useContext(AuthContext)

  const ProtetctedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    }

    return children;
  }
  return (
    <div className="App">
      <Routes>
        <Route path = "/">
          <Route index element={<ProtetctedRoute><Home/></ProtetctedRoute>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
