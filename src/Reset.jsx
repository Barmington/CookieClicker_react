export default function Reset({ resetGame }) {
  function resetSound() {
    const resetAudio = new Audio('../src/assests/reset.mp3');
    resetAudio.play();
  }

  return <button onClick={resetGame}>Reset Game</button>;
}
