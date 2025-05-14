import React, { useState } from 'react'

const CATEGORIES = { 
  income: ['Salary', 'Bonus', 'Other'], 
  expense: ['Food', 'Housing', 'Transport', 'Other'], 
};

const HomePage = () => {
  const [transactions, setTransactions] = useState([]); 

  const [newTransaction, setNewTransaction] = useState({ type: 'expense', amount: '', category: '', notes: '', }); 
  
  const handleInputChange = (e) => { const { name, value } = e.target; setNewTransaction((prev) => ({ ...prev, [name]: value })); };

  const addTransaction = () => { if (newTransaction.amount && newTransaction.category) { setTransactions([...transactions, { ...newTransaction, id: Date.now() }]); setNewTransaction({ type: 'expense', amount: '', category: '', notes: '' }); } };

  const totalIncome = transactions .filter((t) => t.type === 'income') .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0); 
  
  const totalExpenses = transactions .filter((t) => t.type === 'expense') .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  return (
    <div 
    style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Personal Finance Tracker</h2> 
      <div>
        <h3>Add Transaction</h3> 
        <select name="type" value={newTransaction.type} onChange={handleInputChange}> 
          <option value="expense">Expense</option> 
          <option value="income">Income</option> 
        </select>

        <input type="number" name="amount" placeholder="Amount" value={newTransaction.amount} onChange={handleInputChange} style={{ margin: '5px 0' }} />

        <select name="category" value={newTransaction.category} onChange={handleInputChange}> 
          <option value="">Select Category</option> {CATEGORIES[newTransaction.type].map((cat) => ( <option key={cat} value={cat}>{cat}</option> ))} 
        </select> 
        
        <input type="text" name="notes" placeholder="Notes" value={newTransaction.notes} onChange={handleInputChange} style={{ margin: '5px 0' }} />

        <button onClick={addTransaction} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Add</button> 

      </div>

      <div style={{ marginTop: '20px' }}>
          <h3>Transactions</h3> 
          {
            transactions.length === 0 ? ( <p>No transactions yet.</p> ) : (  <ul> {transactions.map((t) => ( <li key={t.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0', display: 'flex', justifyContent: 'space-between' }}> 
            <div>{t.type}: {t.category} - ${t.amount} {t.notes && `(${t.notes})`}</div> </li> ))} 
            </ul> )
          }
      </div>

      <div style={{ marginTop: '20px' }}>
          <h3>Summary</h3> 
          <p>Total Income: ${totalIncome.toFixed(2)}</p> 
          <p>Total Expenses: ${totalExpenses.toFixed(2)}</p> 
          <p>Net Balance: ${(totalIncome - totalExpenses).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default HomePage