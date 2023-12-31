import React from "react";
import '../resources/analatics.css'
import { Progress } from "antd";
function Analitics({ transactions }) {

    const totalTransactions = transactions.length
    const totalIncomeTransactions = transactions.filter(transaction => transaction.type === 'income')
    const totalExpenseTransactions = transactions.filter(transaction => transaction.type === 'expense')
    const totalIncomeTransactionspercentage = (totalIncomeTransactions.length / totalTransactions) * 100
    const totalExpenseTransactionspercentage = (totalExpenseTransactions.length / totalTransactions) * 100

    const totalTurnover = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnover = transactions.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalExpenseTurnover = transactions.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnoverperecentage = (totalIncomeTurnover / totalTurnover) * 100
    const totalExpenseTurnoverperecentage = (totalExpenseTurnover / totalTurnover) * 100

    const categories = ['salary', 'freelance', 'food', 'Entertainment', 'Miscellanous']

    return (
        <div className="analytics">
            <div className="row">
                <div className="col-md-4 mt-3">
                    <div className="transactions-count">
                        <h4>Total Transactions: {totalTransactions}</h4>
                        <hr />
                        <h5>Income: {totalIncomeTransactions.length}</h5>
                        <h5>Expense: {totalExpenseTransactions.length}</h5>

                        <div className="progress-bars ">
                            <Progress className="mx-5" strokeColor='green' type="circle" percent={totalIncomeTransactionspercentage.toFixed(0)} />
                            <Progress strokeColor='red' type="circle" percent={totalExpenseTransactionspercentage.toFixed(0)} />

                        </div>
                    </div>
                </div>


                <div className="col-md-4 mt-3">
                    <div className="transactions-count mx-5">
                        <h4>Total Turnover: {totalTurnover}</h4>
                        <hr />
                        <h5>Income: {totalIncomeTurnover}</h5>
                        <h5>Expense: {totalExpenseTurnover}</h5>

                        <div className="progress-bars ">
                            <Progress className="mx-5" strokeColor='green' type="circle" percent={totalIncomeTurnoverperecentage.toFixed(0)} />
                            <Progress strokeColor='red' type="circle" percent={totalExpenseTurnoverperecentage.toFixed(0)} />

                        </div>
                    </div>
                </div>
            </div>


            <div className="row mt-5">
                <div className="col-md-6">
                    <div className="income-category-analysis">
                        <h3>Income Category-wise</h3>
                        {categories.map((category)=>{
                            const amount=transactions.filter(t=>t.type==='income' && t.category===category).reduce((acc,t)=>acc+t.amount,0)
                            return(
                                amount>0 && <div className="category-card">
                                    <h5>{category}</h5>
                                    <Progress percent={((amount/totalIncomeTurnover)*100).toFixed(0)}/>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="expense-category-analysis">
                        <h3>Expense Category-wise</h3>
                        {categories.map((category)=>{
                            const amount=transactions.filter(t=>t.type==='expense' && t.category===category).reduce((acc,t)=>acc+t.amount,0)
                            return(
                                amount>0 && <div className="category-card">
                                    <h5>{category}</h5>
                                    <Progress percent={((amount/totalExpenseTurnover)*100).toFixed(0)}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analitics