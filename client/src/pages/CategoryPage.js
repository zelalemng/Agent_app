/**import React, { useState, useEffect } from "react";
//import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
//import { useSelector, useDispatch } from "react-redux";
//import {
  //DeleteOutlined,
  //PlusCircleOutlined,
  //MinusCircleOutlined,
//} from "@ant-design/icons";
//import { Table, Button, Modal, message, Form, Input, Select } from "antd";
//import TextArea from "antd/lib/input/TextArea";
/**const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [category_id, setCategoryId] = useState('');
  const [category_Name, setCategoryName] = useState('');
  const [category_description, setCategoryDescription] = useState('');
  const [category_status, setCategoryStatus] = useState('active');
  const [category_createdAt] = useState(new Date().toISOString());
  const [newPopup, setNewPopup] = useState(false);

 // const { TextArea } = Input;
  
  const [categories, setCategories] = useState([]);
  
  const handleCategorySubmit = (categoryData) => {
    setCategories(prevCategories => [...prevCategories, { ...categoryData, _id: Date.now() }]);
  };
  const columns = [
    {
      title: 'Category ID',
      dataIndex: 'category_id',
      key: 'category_id',
    },
    {
      title: 'Category Name',
      dataIndex: 'category_Name',
      key: 'category_Name',
    },
    {
      title: 'Description',
      dataIndex: 'category_description',
      key: 'category_description',
    },
    {
      title: 'Status',
      dataIndex: 'category_status',
      key: 'category_status',
    },
    {
      title: 'Created At',
      dataIndex: 'category_createdAt',
      key: 'category_createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },

  ];
  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: Number(((subTotal / 100) * 10).toFixed(2)),
        totalAmount: Number(
          Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
        ),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };
      // console.log(newObject);
      await axios.post("/api/bills/add-bills", newObject);
      message.success("Bill Generated");
      navigate("/bills");
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };
  function CategoryForm({ onSubmit }) {
    const [form] = Form.useForm();
    
    const handleFinish = (values) => {
      onSubmit({
        ...values,
        category_createdAt: new Date().toISOString(),
        
      });
      form.resetFields();
    };
    
      

    return (
      <DefaultLayout>
        <h1>Category Page</h1>
        <Table columns={columns} dataSource={cartItems} bordered />
        <div className="d-flex flex-column align-items-end">
          <hr />
          
          <Button type="primary" onClick={() => setNewPopup(true)}>
          <CategoryForm onSubmit={handleCategorySubmit} /> 
            Create category
          </Button>
        </div>
        <Modal
          title="New category"
          visible={newPopup}
          onCancel={() => setNewPopup(false)}
          footer={false}
        >
        <Form onFinish={handleFinish} className="space-y-4">
            <Form.Item 
            label="Category ID"
            name="category_id"
            rules={[{ required: true, message: 'Please input the Category ID!' }]}
            >
              <Input
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              />
            </Form.Item>

            <Form.Item
              label="Category Name"
              name="category_Name"
              rules={[{ required: true, message: 'Please input the Category Name!' }]}
            >
              <Input
              value={category_Name}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              />
            </Form.Item>

            <Form.Item
              label="Category Description"
              name="category_description"
            >
              <TextArea>
                value={category_description}
                onChange={(e) => setCategoryDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 p-2 rounded"
              </TextArea>
            </Form.Item>

            <Form.Item
              label="Category Status"
              name="category_status"
              rules={[{ required: true, message: 'Please select a status!' }]}
            >
              <Select
                value={category_status}
                onChange={(value) => setCategoryStatus(value)}
                className="mt-1 block w-full border border-gray-300 p-2 rounded"
              >
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Add Category
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </DefaultLayout>
    );
  };
};

export default CartPage;
import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Table, Button, Modal, message, Form, Input, Select } from "antd";
const Category = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [category_id, setCategoryId] = useState('');
  const [category_Name, setCategoryName] = useState('');
  const [category_description, setCategoryDescription] = useState('');
  const [category_status, setCategoryStatus] = useState('active');
  const [category_createdAt] = useState(new Date().toISOString());
  const [newPopup, setNewPopup] = useState(false);
  const [popupModal, setPopupModal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editItem, setEditItem] = useState(null);
  const { cartItems } = useSelector((state) => state.rootReducer);
  //handle increament
  const handleIncreament = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  const handleDecreament = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };
  const columns = [
    {
      title: 'Category ID',
      dataIndex: 'category_id',
      key: 'category_id',
    },
    {
      title: 'Category Name',
      dataIndex: 'category_Name',
      key: 'category_Name',
    },
    {
      title: 'Description',
      dataIndex: 'category_description',
      key: 'category_description',
    },
    {
      title: 'Status',
      dataIndex: 'category_status',
      key: 'category_status',
    },
    {
      title: 'Created At',
      dataIndex: 'category_createdAt',
      key: 'category_createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
    },
  ];

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
    setSubTotal(temp);
  }, [cartItems]);

  //handleSubmit
  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: Number(((subTotal / 100) * 10).toFixed(2)),
        totalAmount: Number(
          Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))
        ),
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };
      // console.log(newObject);
      await axios.post("/api/bills/add-bills", newObject);
      message.success("Bill Generated");
      navigate("/bills");
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };
  
  
    return (
      <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h1>Category</h1>
          <Button type="primary" onClick={() => setPopupModal(true)}>
            Add Category
          </Button>
        </div>
        <Table columns={columns} dataSource={cartItems} bordered />
       
        {popupModal && (  
          <Modal
          title={`${editItem !== null ? "Edit Item " : "Add New Category"}`}
          visible={popupModal}
          onCancel={() => {
            setEditItem(null);
            setPopupModal(false);
          }}
          footer={false}
          >
          <Form onFinish={handleSubmit} className="space-y-4">
              <Form.Item 
              label="Category ID"
              name="category_id"
              rules={[{ required: true, message: 'Please input the Category ID!' }]}
              >
                <Input
                value={category_id}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mt-1 block w-full border border-gray-300 p-2 rounded"
                />
              </Form.Item>

              <Form.Item
                label="Category Name"
                name="category_Name"
                rules={[{ required: true, message: 'Please input the Category Name!' }]}
              >
                <Input
                value={category_Name}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 p-2 rounded"
                />
              </Form.Item>

              <Form.Item
                label="Category Description"
                name="category_description"
              >
                <TextArea>
                  value={category_description}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 p-2 rounded"
                </TextArea>
              </Form.Item>

              <Form.Item
                label="Category Status"
                name="category_status"
                rules={[{ required: true, message: 'Please select a status!' }]}
              >
                <Select
                  value={category_status}
                  onChange={(value) => setCategoryStatus(value)}
                  className="mt-1 block w-full border border-gray-300 p-2 rounded"
                >
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  Add Category
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        )}
      </DefaultLayout>
    
    );
  
  
};

export default Category;**/
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DefaultLayout from "../components/DefaultLayout";

const { Option } = Select;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [popupModal, setPopupModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      message.error("Failed to load categories");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      setCategories(categories.filter(category => category._id !== categoryId));
      message.success("Category deleted successfully");
    } catch (error) {
      message.error("Failed to delete category");
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setPopupModal(true);
  };

  const handleFinish = async (values) => {
    if (editingCategory) {
      try {
        const response = await fetch(`/api/categories/${editingCategory._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const updatedCategory = await response.json();
        setCategories(categories.map(cat => (cat._id === editingCategory._id ? updatedCategory : cat)));
        message.success("Category updated successfully");
      } catch (error) {
        message.error("Failed to update category");
      }
    } else {
      try {
        const response = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const newCategory = await response.json();
        setCategories([...categories, newCategory]);
        message.success("Category added successfully");
      } catch (error) {
        message.error("Failed to add category");
      }
    }
    setPopupModal(false);
    form.resetFields();
    setEditingCategory(null);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "category_Name",
      key: "category_Name",
    },
    {
      title: "Category Description",
      dataIndex: "category_description",
      key: "category_description",
    },
    {
      title: "Category Status",
      dataIndex: "category_status",
      key: "category_status",
      render: (status) => (
        <span style={{ color: status === "active" ? "green" : "red" }}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => (
        <div>
          <EditOutlined
            style={{ cursor: "pointer", marginRight: 10 }}
            onClick={() => handleEditCategory(record)}
          />
          <DeleteOutlined
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleDeleteCategory(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Categories</h1>
        <Button type="primary" onClick={() => setPopupModal(true)}>
          Add Category
        </Button>
      </div>

      <Table columns={columns} dataSource={categories} rowKey="_id" bordered />

      {popupModal && (
        <Modal
          title={`${editingCategory ? "Edit Category" : "Add Category"}`}
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
            setEditingCategory(null);
            form.resetFields();
          }}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleFinish}
            layout="vertical"
            initialValues={editingCategory}
          >
            <Form.Item
              label="Category Name"
              name="category_Name"
              rules={[{ required: true, message: "Please input the category name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Category Description"
              name="category_description"
              rules={[{ required: true, message: "Please input the category description!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Category Status"
              name="category_status"
              rules={[{ required: true, message: "Please select the category status!" }]}
            >
              <Select>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingCategory ? "Update Category" : "Add Category"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default Category;

