//components
import "./App.css";
import Header from "./components/Header.jsx";
import Tabs from "./components/Tabs.jsx";
import SearchProvider from "./context/SearchProvider.jsx";
import BwProvider from "./context/BwProvider.jsx";
import SaveProvider from "./context/SaveProvider.jsx";

const App = () => {

    return (
        <div className="App">
            <SearchProvider>
                <BwProvider>
                    <SaveProvider>
                        <Header />
                        <Tabs />
                    </SaveProvider>
                </BwProvider>
            </SearchProvider>
        </div>
    );
};

export default App;
