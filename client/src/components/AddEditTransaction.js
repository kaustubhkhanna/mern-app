import React, { useState } from "react";
import { Form, Input, Modal, Select, message } from "antd";
import Spinner from "./Spinner";
import axios from "axios";
function AddEditTransaction({ setshowAddEditTransactionModal, showAddEditTransactionModal, getTransactions, selectedItemForEdit, setselectedItemForEdit }) {
    // const onFinish = (values) => {
    //     console.log(values);
    // }
    const [loading, setloading] = useState(false)
    const onFinish = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem("crazymoney-user"))
            setloading(true)
            if (selectedItemForEdit) {
                await axios.post('/api/transactions/edit-transaction', { payload:{...values, userid: user._id}, transactionId: selectedItemForEdit._id })
                getTransactions()
                message.success('Transaction Updation Successful')
            }
            else {
                await axios.post('/api/transactions/add-transaction', { ...values, userid: user._id })
                getTransactions()
                message.success('Transaction Addition Successful')
            }
            setshowAddEditTransactionModal(false)
            setselectedItemForEdit(null)
            setloading(false)
        } catch (error) {
            message.error('Something went wrong')
            setloading(false)
        }
    }
    return (
        <Modal title={selectedItemForEdit ? 'Edit Transaction' : 'Add Transaction'} open={showAddEditTransactionModal} onCancel={() => { setshowAddEditTransactionModal(false) }} footer={false}>
            {loading && <Spinner />}
            <Form layout="vertical" className="transaction-form" onFinish={onFinish} initialValues={selectedItemForEdit}>

                <Form.Item label="Amount" name='amount'>
                    <Input type="text" />
                </Form.Item>

                <Form.Item label="Type" name='type'>
                    <Select>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">expense</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Category" name='category'>
                    <Select>
                        <Select.Option value="salary">Salary</Select.Option>
                        <Select.Option value="freelance">Free-Lance</Select.Option>
                        <Select.Option value="food">Food</Select.Option>
                        <Select.Option value="Entertainment">Entertainment</Select.Option>
                        <Select.Option value="Miscellanous">Miscellanous</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Date" name='date'>
                    <Input type="date" />
                </Form.Item>

                <Form.Item label="Reference" name='reference'>
                    <Input type="text" />
                </Form.Item>

                <Form.Item label="Description" name='description'>
                    <Input type="text" />
                </Form.Item>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="primary">Save</button>
                </div>
            </Form>


        </Modal>
    )
}
export default AddEditTransaction