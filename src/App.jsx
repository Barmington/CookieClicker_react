import { useState, useEffect } from 'react';
import Upgrades from './Upgrades.jsx';
import Reset from './Reset.jsx';
import GetCookies from './GetCookies.jsx';
import Title from './Title.jsx';

let isActiveUpgrade = true;

export default function App() {
  const [cookies, setCookies] = useState(
    Number(localStorage.getItem('cookies')) || 0
  );
  const [cps, setCps] = useState(0);
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    async function getUpgrade() {
      const response = await fetch(
        'https://cookie-upgrade-api.vercel.app/api/upgrades'
      );
      const data = await response.json();
      setUpgrades(data);
    }
    getUpgrade();

    const interval = setInterval(() => {
      setCookies(current => current + cps);
    }, 1000);

    return () => clearInterval(interval);
  }, [cps]);

  useEffect(() => {
    localStorage.setItem('cookies', JSON.stringify(cookies));
    // localStorage.clear('cookies');
  }, [cookies]);

  useEffect(() => {
    localStorage.setItem('cps', JSON.stringify(cps));
    // localStorage.clear('cps');
  }, [cps]);
  function addCookies() {
    setCookies(cookies + 1);
  }

  function handleUpgrades(cost, increase) {
    console.log(increase, cost);

    if (cookies >= cost && cps < increase) {
      setCps(cps + increase);
      setCookies(cookies - cost);
    }
    isActiveUpgrade
      ? { backgroundColor: 'Green' }
      : { backgroundColor: 'gray' };
  }
  function resetGame() {
    setCookies(0);
    setCps(0);
    localStorage.setItem('cookies', JSON.stringify(0));
    localStorage.setItem('cps', JSON.stringify(0));
  }

  return (
    <>
      <div className="container">
        <Title />

        <div className="info">
          <p>COOKIES: {cookies}</p>
          <p>CPS: {cps}</p>
        </div>
        <div className="func_but">
          <GetCookies addCookies={addCookies} />
          <Reset resetGame={resetGame} />
        </div>
        <div className="grid">
          {upgrades.map(upgrade => (
            <Upgrades
              key={upgrade.name}
              name={upgrade.name}
              cost={upgrade.cost}
              increase={upgrade.increase}
              handleUpgrades={handleUpgrades}
            />
          ))}
        </div>
      </div>
    </>
  );
}
