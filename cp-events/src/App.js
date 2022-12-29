import { useState, useEffect } from "react";
//components
import "./App.css";
import Header from "./components/Header.jsx";
import Tabs from "./components/Tabs.jsx";
import SearchProvider from "./context/SearchProvider.jsx";
import BwProvider from "./context/BwProvider.jsx";
import SaveProvider from "./context/SaveProvider.jsx";
import { getContestData } from "./api/api.js";
import Logo from "./images/CE.png";

const App = () => {
  const [error, setError] = useState(-1);
  const [contestData, setContestData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContestData();
      // console.log(data);
      setContestData(data.data);
      if (!data.error) {
        setError(0);
      } else {
        setError(1);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <SearchProvider>
        <BwProvider>
          <SaveProvider>
            {error === 0 && (
              <>
                <Header />
                <Tabs contestData={contestData} />
              </>
            )}
            {error === 1 && (
              <div className="error">
                <img src={Logo} alt="No Preview" />
                <h2>Something went wrong ):</h2>
                <h2>Try again!!!</h2>
              </div>
            )}
          </SaveProvider>
        </BwProvider>
      </SearchProvider>
    </div>
  );
};

export default App;
