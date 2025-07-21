import { useState } from 'react';

function AddGoalForm({ onAddGoal }) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      name,
      targetAmount: parseFloat(targetAmount),
      savedAmount: 0,
      category,
      deadline,
      createdAt: new Date().toISOString().split('T')[0]
    };
    onAddGoal(newGoal);
    setName('');
    setTargetAmount('');
    setCategory('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-4 space-y-2">
      <h2 className="text-xl font-semibold">Add New Goal</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Goal Name"
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="number"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        placeholder="Target Amount"
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="border p-2 w-full rounded"
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Goal
      </button>
    </form>
  );
}

export default AddGoalForm;
