import Navbar from './components/Navbar'
import Home from './pages/Home';
import Blockchain from './pages/Blockchain'
import Crypto from './pages/Crypto'
import './sass/App.scss'


function App() {
  return (
    <div>
      <Navbar />
     <Home />
     <Blockchain />
     <Crypto />
    </div>
  );
}

export default App;
