import { useState, useEffect } from 'react';
import AddGoalForm from './components/AddGoalForm';
import GoalList from './components/GoalList';
import Overview from './components/Overview';

function App() {
  const [goals, setGoals] = useState([]);

  // Fetch goals on load
  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then(res => res.json())
      .then(data => setGoals(data))
      .catch(err => console.error('Error fetching goals:', err));
  }, []);

  // Add new goal
  const addGoal = (goalData) => {
    fetch('http://localhost:3001/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goalData),
    })
      .then(res => res.json())
      .then(newGoal => setGoals(prevGoals => [...prevGoals, newGoal]))
      .catch(err => console.error('Error adding goal:', err));
  };

  // Update goal
  const updateGoal = (id, updates) => {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
      .then(res => res.json())
      .then(updatedGoal => {
        setGoals(prevGoals =>
          prevGoals.map(goal => (goal.id === id ? updatedGoal : goal))
        );
      })
      .catch(err => console.error('Error updating goal:', err));
  };

  // Delete goal
  const deleteGoal = (id) => {
    fetch(`http://localhost:3001/goals/${id}`, { method: 'DELETE' })
      .then(() => {
        setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
      })
      .catch(err => console.error('Error deleting goal:', err));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Smart Goal Planner</h1>
      <AddGoalForm onAddGoal={addGoal} />
      <Overview goals={goals} />
      <GoalList goals={goals} onUpdateGoal={updateGoal} onDeleteGoal={deleteGoal} />
    </div>
  );
}

export default App;

