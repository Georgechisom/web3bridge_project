import React, { useState, useEffect } from 'react';
import "../../src/component/home.css"; 

const CATEGORIES = { 
    income: ['Salary', 'Bonus', 'Other'], 
    expense: ['Food', 'Housing', 'Transport', 'Other'],
}; 

function App() {
    
    const [newTransaction, setNewTransaction] = useState({ 
    type: 'expense',
    amount: '',
    category: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
    });

    const [transactions, setTransactions] = useState(() => { 
        if (typeof window !== 'undefined') { 
            const savedTransactions = localStorage.getItem('financeTransactions'); 
            try { return savedTransactions ? JSON.parse(savedTransactions) : []; } 
            catch (error) { 
                console.error("Error parsing transactions from localStorage:", error); return []; 
            } 
        } return [];
    });
    
    useEffect(() => { 
            if (typeof window !== 'undefined') { 
                localStorage.setItem('financeTransactions', JSON.stringify(transactions)); 
            } 
        }, [transactions]
    ); 
            
    const handleInputChange = (e) => { 
        const { name, value } = e.target;
        setNewTransaction((prev) => ({ ...prev, [name]: value })); 
    }; 

    const addTransaction = () => { 
        if (newTransaction.amount && newTransaction.category && newTransaction.date) { 
            setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
            setNewTransaction({ type: 'expense', amount: '', category: '', notes: '', date: new Date().toISOString().split('T')[0],}); 
        }
    };
        
    const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0); 

    const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount || 0), 0); 
    

    const [showDiv, setShowDiv] = useState(true);
    const [showTest, setTest] = useState(false);

    const myDisplay = () => {
        setShowDiv(false)
        setTest(!showTest)
    };

    const goBack = () => {
        setShowDiv(true)
        setTest(false)
    };
        
    return ( 
    
    <div 
        style={{ fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '50px auto', padding: '20px', borderRadius: '5px' }}
        className='new'
    > 
        <h1 className='firstheader'>Personal Finance Tracker</h1>
        <div className={showDiv ? "write" : "unwrite"}>
            <p style={{ padding: "5% 0", margin: "5% 0", }}>
                This app serves as a simple and intuitive resource for managing your personal finances. It enables you to monitor your income and expenses, organize them into categories, and provide an overview of your financial situation. <br /> <br/>

                The design focuses on user friendliness, allowing you to easily understand your income sources and spending patterns, while also informing you if your expenses exceed your income, which serves as a valuable insight for saving.
            </p>
            <button 
                onClick={myDisplay} 
                style={{ color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                className='btn2'
            >
                Test
            </button> 
        </div> 
        <div className={showTest ? "write" : "unwrite"}>
            <h2 className='secondheader'>Calculate your financial records</h2>
            <div className='firstdiv'> 
                <div className='seconddiv'>
                    <h3 className='thirdheader given'>Add Transaction</h3> 
                    
                    <select 
                        name="type" 
                        value={newTransaction.type} 
                        onChange={handleInputChange}
                        className='inp'
                    > 
                        <option value="expense">Expense</option> 
                        <option value="income">Income</option> 
                    </select> 
                    
                    <input 
                        type="number" 
                        name="amount" 
                        placeholder="Amount" 
                        value={newTransaction.amount} 
                        onChange={handleInputChange} 
                        className='inp'
                    /> 
                    
                    <input 
                        type="date" 
                        name="date" 
                        value={newTransaction.date} 
                        onChange={handleInputChange} 
                        className='inp'
                    /> 
                    
                    <select 
                        name="category" 
                        value={newTransaction.category} 
                        onChange={handleInputChange}
                        className='inp'
                    > 
                        <option value="">Select Category</option> 
                        {
                            CATEGORIES[newTransaction.type].map((cat) => ( <option key={cat} value={cat}>{cat}</option> ))
                        } 
                    </select> 
                    
                    <input 
                        type="text" name="notes" 
                        placeholder="Notes" 
                        value={newTransaction.notes} 
                        onChange={handleInputChange} 
                        className='inp'
                    />
                    
                    <button 
                        onClick={addTransaction} 
                        style={{ color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        className='btn'
                    >
                        Add
                    </button> 
                </div>
            
                <div className='thirddiv'>
                    <div style={{ marginTop: '20px' }}> 
                        <h3 className='given'>Transactions</h3> 
                        {
                            transactions.length === 0 ? ( <p>No transactions yet.</p> ) : ( 
                                <ul> {transactions.map((t) => ( 
                                    <li key={t.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0', display: 'flex', justifyContent: 'space-between' }}> 
                                    <div>
                                        {t.type}: {t.category} - ${t.amount} ({t.date}) {t.notes && `(${t.notes})`}
                                    </div> 
                                    </li> ))} 
                                </ul> 
                            )
                        } 
                    </div> 
                
                    <div style={{ marginTop: '20px' }}> 
                        <h3 className='given'>Summary</h3> 
                        <p>
                            <span style={{ fontWeight: "bold" }}>
                                Total Income: 
                            </span> #{totalIncome.toFixed(2)}
                        </p> 
                        <p>
                            <span style={{ fontWeight: "bold" }}>
                                Total Expenses:
                            </span> #{totalExpenses.toFixed(2)}
                        </p> 
                        <p>
                            <span style={{ fontWeight: "bold" }}>
                                Net Balance:
                            </span> #{(totalIncome - totalExpenses).toFixed(2)}
                        </p> 
                    </div> 
                </div>
            </div>
            <button 
                onClick={goBack} 
                style={{ color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                className='btn3'
            >
                Go Back
            </button> 
        </div>
    </div> 
    ); 
} 

export default App;
