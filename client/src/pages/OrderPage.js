
import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Button, Table, Form, Input, Select, message } from "antd";

const Order = ({ onSubmit, initialOrders }) => {
  const [editingOrder, setEditingOrder] = useState(null);
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [orders, setOrders] = useState(initialOrders);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories'); // Replace with your API endpoint
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        message.error('Failed to load categories');
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle delete order
  const handleDeleteOrder = async (orderId) => {
    try {
      // Make an API call to delete the order
      await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      message.success('Order deleted successfully');
    } catch (error) {
      message.error('Failed to delete order');
    }
  };

  // Handle edit order
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    form.setFieldsValue(order);
    setPopupModal(true);
  };

  // Define columns for the table
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'Category Type',
      dataIndex: 'category_type',
      key: 'category_type',
    },
    {
      title: 'Order Description',
      dataIndex: 'order_description',
      key: 'order_description',
    },
    {
      title: 'Order Status',
      dataIndex: 'order_status',
      key: 'order_status',
    },
    {
      title: 'Order Created',
      dataIndex: 'order_createdAt',
      key: 'order_createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Order Completed',
      dataIndex: 'order_completedAt',
      key: 'order_completedAt',
      render: (text) => text ? new Date(text).toLocaleDateString() : 'N/A',
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (_, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer", marginRight: 10 }}
            onClick={() => handleEditOrder(record)}
          />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => handleDeleteOrder(record._id)}
          />
        </div>
      ),
    },
  ];

  // Handle order form submission
  const handleOrderSubmit = async (orderData) => {
    if (editingOrder) {
      // Handle order update
      try {
        const response = await fetch(`/api/orders/${editingOrder._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
        const updatedOrder = await response.json();
        setOrders(prevOrders =>
          prevOrders.map(order => (order._id === editingOrder._id ? updatedOrder : order))
        );
        message.success('Order updated successfully');
      } catch (error) {
        message.error('Failed to update order');
      }
    } else {
      // Handle new order creation
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
        const newOrder = await response.json();
        setOrders(prevOrders => [...prevOrders, newOrder]);
        message.success('Order created successfully');
      } catch (error) {
        message.error('Failed to create order');
      }
    }

    form.resetFields();
    setPopupModal(false);
    setEditingOrder(null);
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Order page</h1>
        <Button type="primary" onClick={() => setPopupModal(true)}>
          Create
        </Button>
      </div>

      <Table columns={columns} dataSource={orders} pagination={false} bordered />

      {popupModal && (
        <Modal
          title={`${editingOrder ? "Edit Order " : "Add New Order"}`}
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
            setEditingOrder(null);
          }}
          footer={false}
        >
          <Form
            form={form}
            onFinish={handleOrderSubmit}
            layout="vertical"
          >
            <Form.Item
              label="Order ID"
              name="order_id"
              rules={[{ required: true, message: 'Please input the Order ID!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category_id"
              rules={[{ required: true, message: 'Please select a Category!' }]}
            >
              <Select>
                {categories.map((cat) => (
                  <Select.Option key={cat._id} value={cat._id}>
                    {cat.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Category Type"
              name="category_type"
              rules={[{ required: true, message: 'Please input the Category Type!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Order Description"
              name="order_description"
              rules={[{ required: true, message: 'Please input the Order Description!' }]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Order Status"
              name="order_status"
              rules={[{ required: true, message: 'Please select an Order Status!' }]}
            >
              <Select>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="started">Started</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
                <Select.Option value="rejected">Rejected</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingOrder ? 'Update Order' : 'Add Order'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Order;
