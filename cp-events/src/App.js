
import './App.css';

//components
import Header from './components/Header.jsx';
import Tabs from './components/Tabs.jsx'
import SearchProvider from './context/SearchProvider.jsx'
import BwProvider from './context/BwProvider.jsx'


function App() {
  return (
    <div className="App">
      <SearchProvider>
        <Header/>
        <BwProvider>
          <Tabs/>
        </BwProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
