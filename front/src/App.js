import logo from './logo.svg';
import './App.css';
import HomePage from './Pocetna/HomePage';
import AuthPage from './Auth/AuthPage';
import HistoricalEvents from './ninjasApi/HistoricalEvents';

function App() {
  return (
    <div className="App">
      <HistoricalEvents></HistoricalEvents>
      <AuthPage></AuthPage>
        <HomePage></HomePage>
       
    </div>
  );
}

export default App;
