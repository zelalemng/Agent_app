import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DefaultLayout from "../components/DefaultLayout";

const { Option } = Select;
const { TextArea } = Input;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [popupModal, setPopupModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOrders();
    fetchCategories();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      message.error("Failed to load orders");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      message.error("Failed to load categories");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });
      setOrders(orders.filter(order => order._id !== orderId));
      message.success("Order deleted successfully");
    } catch (error) {
      message.error("Failed to delete order");
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    form.setFieldsValue(order);
    setPopupModal(true);
  };

  const handleFinish = async (values) => {
    if (editingOrder) {
      try {
        const response = await fetch(`/api/orders/${editingOrder._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const updatedOrder = await response.json();
        setOrders(orders.map(order => (order._id === editingOrder._id ? updatedOrder : order)));
        message.success("Order updated successfully");
      } catch (error) {
        message.error("Failed to update order");
      }
    } else {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const newOrder = await response.json();
        setOrders([...orders, newOrder]);
        message.success("Order added successfully");
      } catch (error) {
        message.error("Failed to add order");
      }
    }
    setPopupModal(false);
    form.resetFields();
    setEditingOrder(null);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Category Type",
      dataIndex: "category_type",
      key: "category_type",
    },
    {
      title: "Order Description",
      dataIndex: "order_description",
      key: "order_description",
    },
    {
      title: "Order Status",
      dataIndex: "order_status",
      key: "order_status",
      render: (status) => (
        <span style={{ color: status === "completed" ? "green" : status === "pending" ? "orange" : status === "started" ? "blue" : "red" }}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: "Order Created At",
      dataIndex: "order_createdAt",
      key: "order_createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Order Completed At",
      dataIndex: "order_completedAt",
      key: "order_completedAt",
      render: (text) => text ? new Date(text).toLocaleDateString() : "N/A",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer", marginRight: 10 }}
            onClick={() => handleEditOrder(record)}
          />
          <DeleteOutlined
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteOrder(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between align-items-center">
        <h4>Ordered Lists</h4>

      </div>

      <Table columns={columns} dataSource={orders} rowKey="_id" bordered />

      
    </DefaultLayout>
  );
};

export default OrderList;
