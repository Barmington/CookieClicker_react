export default function Upgrades({ name, cost, increase, handleUpgrades }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{cost}</p>
      <p>{increase}</p>
      <button onClick={() => handleUpgrades(cost, increase)}>Buy {name}</button>
    </div>
  );
}
