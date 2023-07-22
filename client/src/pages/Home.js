import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import Spinner from "../components/Spinner";
import { DatePicker, Select, Table, message } from 'antd';
import { AreaChartOutlined, UnorderedListOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import moment from "moment";
import '../resources/transactions.css'
// import { Form, Input, Modal, Select } from "antd";
import AddEditTransaction from "../components/AddEditTransaction"
import moment from "moment";
import Analitics from "../components/Analatics";
// import FormItem from "antd/es/form/FormItem";
const { RangePicker } = DatePicker;
function Home() {
    const [showAddEditTransactionModal, setshowAddEditTransactionModal] = useState(false)
    const [frequency, setFrequency] = useState('7');
    const [type, setType] = useState('all');
    const [loading, setloading] = useState(false);
    const [transactionsData, settransactionsData] = useState([]);
    const [viewtype, setViewtype] = useState('table');
    const [selectedRange, setselectedRange] = useState([]);
    const user = JSON.parse(localStorage.getItem('crazymoney-user'))
    const [selectedItemForEdit, setselectedItemForEdit] = useState(null)


    const getTransactions = async () => {
        try {
            setloading(true)
            const response = await axios.post('/api/transactions/get-all-transactions', {
                userid: user._id,
                frequency,
                ...(frequency === "custom" && { selectedRange }),
                type
            })
            settransactionsData(response.data)
            setloading(false)
        } catch (error) {
            setloading(false);
            message.error('Something went Wrong')
        }

    }

    const deleteTransaction = async (record) => {
        try {
            setloading(true)
            await axios.post('/api/transactions/delete-transaction', {
                transactionId: record._id
            })
            message.success("Transaction Deleted Successfully")
            getTransactions()
            setloading(false)
        } catch (error) {
            setloading(false);
            message.error('Something went Wrong')
        }

    }
    useEffect(() => {
        getTransactions();
    }, [frequency, selectedRange, type]);


    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => <span>{moment(text).utc().format('YYYY-MM-DD')}</span>

        },
        {
            title: 'Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Type',
            dataIndex: 'type'
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Reference',
            dataIndex: 'reference'
        },
        {
            title: 'Actions',
            dataIndex: "actions",
            render: (text, record) => {
                return <div>
                    <EditOutlined onClick={() => {
                        setselectedItemForEdit(record)
                        setshowAddEditTransactionModal(true)
                        // selectedItemForEdit={selectedItemForEdit}
                    }} />
                    <DeleteOutlined className="mx-3" onClick={() => {
                        deleteTransaction(record)
                    }} />
                </div>
            }
        }

    ]

    return (
        <DefaultLayout>
            {loading && <Spinner />}

            <div className="filter d-flex justify-content-between align-items-center">
                {loading && <Spinner />}

                <div className="d-flex">

                    <div className="d-flex flex-column">

                        <h6>Select Frequency</h6>
                        <Select value={frequency} onChange={(value) => setFrequency(value)}>
                            <Select.Option value="7">Last 1 Week</Select.Option>
                            <Select.Option value="30">Last 1 Month</Select.Option>
                            <Select.Option value="365">Last 1 Year</Select.Option>
                            <Select.Option value="custom">Custom</Select.Option>

                        </Select>

                        <div className="mt-2">
                            {frequency === "custom" && (
                                <RangePicker value={selectedRange} onChange={(values) => setselectedRange(values)} />
                            )}
                        </div>
                    </div>
                    <div className="d-flex flex-column mx-5">

                        <h6>Select Type</h6>
                        <Select value={type} onChange={(value) => setType(value)}>
                            <Select.Option value="all">All</Select.Option>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>

                        </Select>

                    </div>
                </div>

                <div className="d-flex">
                    <div>

                        <div className="view-switch mx-5">
                            <UnorderedListOutlined
                                className={`${viewtype === 'table' ? ' active-icon' : 'inactive-icon'}`}
                                onClick={() => setViewtype('table')}
                                size={30} />
                            <AreaChartOutlined
                                className={`mx-2 ${viewtype === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
                                onClick={() => setViewtype('analytics')}
                                size={30}
                            />
                        </div>

                    </div>
                    <button className="primary" onClick={() => { setshowAddEditTransactionModal(true) }}>ADD NEW</button>
                </div>

            </div>

            <div className="table-analitics mt-4">

                {viewtype === 'table' ? <div>
                    <Table columns={columns} dataSource={transactionsData} />
                </div> : <Analitics transactions={transactionsData} />}
            </div>
            {showAddEditTransactionModal && (
                <AddEditTransaction
                    showAddEditTransactionModal={showAddEditTransactionModal}
                    setshowAddEditTransactionModal={setshowAddEditTransactionModal}
                    getTransactions={getTransactions}
                    selectedItemForEdit={selectedItemForEdit}
                    setselectedItemForEdit={setselectedItemForEdit}

                />)}
        </DefaultLayout>

    )
}

export default Home