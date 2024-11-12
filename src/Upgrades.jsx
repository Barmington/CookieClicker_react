export default function Upgrades({ name, cost, increase, handleUpgrades }) {
  return (
    <div className="upgrades">
      <h2>{name}</h2>
      <p>CPS: {increase}</p>
      <button onClick={() => handleUpgrades(cost, increase)}>
        Buy at {cost}
      </button>
    </div>
  );
}
