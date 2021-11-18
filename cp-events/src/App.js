
import './App.css';

//components
import Header from './components/Header.jsx';
import Tabs from './components/Tabs.jsx'
import SearchProvider from './context/SearchProvider.jsx'

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <Header/>
        <Tabs/>
      </SearchProvider>
    </div>
  );
}

export default App;
