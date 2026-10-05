// User can create their own exercises  
// Exercises are saved in localStorage so they stay after closing the app
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function CustomExercises() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState(
    JSON.parse(localStorage.getItem('customExercises')) || []
  );
  const [name, setName] = useState('');
  const [variantOf, setVariantOf] = useState('');

  const handleAdd = () => {
    if (!name.trim()) return; // dont save empty names

    const updated = [
      ...exercises,
      { id: 'custom-' + Date.now(), name: name.trim(), variantOf: variantOf },
    ];
    setExercises(updated);
    localStorage.setItem('customExercises', JSON.stringify(updated));
    setName('');
    setVariantOf('');
  };

  return (
    <div className="home-root">
      <h1 className="neon-title">My Exercises</h1>

      <input
        placeholder="Exercise name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={variantOf} onChange={(e) => setVariantOf(e.target.value)}>
        <option value="">Not a variant</option>
        <option value="Bench Press">Bench Press</option>
        <option value="Squat">Squat</option>
        <option value="Deadlift">Deadlift</option>
        {exercises.map((ex) => (
          <option key={ex.id} value={ex.name}>{ex.name}</option>
        ))}
      </select>

      <button onClick={handleAdd}>Add Exercise</button>

      <ul>
        {exercises.map((ex) => (
          <li key={ex.id}>
            {ex.name} {ex.variantOf && `(variant of ${ex.variantOf})`}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default CustomExercises;