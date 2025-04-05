import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Tag, Modal, Form, Select, message, Descriptions } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const { Option } = Select;

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  // 模拟API获取数据
  useEffect(() => {
    const mockUsers = [
      { 
        id: 1, 
        nickname: '小张',
        phone: '13800138000', 
        type: '湿热质', 
        score: 85, 
        gender: '男', 
        age: 32,
        registerTime: '2023-01-15',
        lastLogin: '2023-06-20'
      },
      { 
        id: 2, 
        nickname: '小李',
        phone: '13900139000', 
        type: '阳虚质', 
        score: 72, 
        gender: '女', 
        age: 28,
        registerTime: '2023-02-10',
        lastLogin: '2023-06-18'
      },
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // 搜索功能
  const handleSearch = (value) => {
    const filtered = users.filter(user => 
      user.nickname.includes(value) || 
      user.phone.includes(value) ||
      user.type.includes(value)
    );
    setFilteredUsers(filtered);
  };

  // 导出Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "用户数据");
    XLSX.writeFile(workbook, "用户数据.xlsx");
    message.success('导出成功');
  };

  // 显示详情
  const showDetail = (user) => {
    setCurrentUser(user);
    setIsDetailModalVisible(true);
  };

  // 编辑用户
  const showEditModal = (user) => {
    setCurrentUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleEditSubmit = () => {
    form.validateFields().then(values => {
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? { ...user, ...values } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setIsModalVisible(false);
      message.success('用户信息更新成功');
    });
  };

  // 删除用户
  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除该用户吗？',
      onOk: () => {
        const newUsers = users.filter(user => user.id !== id);
        setUsers(newUsers);
        setFilteredUsers(newUsers);
        message.success('用户删除成功');
      },
    });
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', sorter: (a, b) => a.id - b.id },
    { title: '昵称', dataIndex: 'nickname' },
    { title: '注册时间', dataIndex: 'registerTime', sorter: (a, b) => new Date(a.registerTime) - new Date(b.registerTime) },
    { title: '最近登录', dataIndex: 'lastLogin', sorter: (a, b) => new Date(a.lastLogin) - new Date(b.lastLogin) },
    { 
      title: '体质类型', 
      dataIndex: 'type',
      render: (type) => <Tag color={getConstitutionColor(type)}>{type}</Tag>
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => showDetail(record)}
          />
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showEditModal(record)}
          />
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  // 体质类型颜色映射
  const getConstitutionColor = (type) => {
    const colors = {
      '湿热质': 'volcano',
      '阳虚质': 'geekblue',
      '气虚质': 'orange',
      '痰湿质': 'purple',
      '血瘀质': 'magenta',
      '气郁质': 'cyan',
      '特禀质': 'gold',
      '平和质': 'green',
      '阴虚质': 'blue'
    };
    return colors[type] || 'default';
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input.Search
          placeholder="搜索用户（昵称/手机号/体质类型）"
          allowClear
          enterButton={<SearchOutlined />}
          onSearch={handleSearch}
          style={{ width: 400 }}
        />
        <Button 
          type="primary" 
          icon={<DownloadOutlined />}
          onClick={exportToExcel}
        >
          导出数据
        </Button>
      </div>

      <Table 
        dataSource={filteredUsers} 
        columns={columns} 
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* 编辑弹窗 */}
      <Modal
        title="编辑用户信息"
        visible={isModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nickname" label="昵称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="体质类型" rules={[{ required: true }]}>
            <Select>
              <Option value="湿热质">湿热质</Option>
              <Option value="阳虚质">阳虚质</Option>
              <Option value="气虚质">气虚质</Option>
              <Option value="痰湿质">痰湿质</Option>
              <Option value="血瘀质">血瘀质</Option>
              <Option value="气郁质">气郁质</Option>
              <Option value="特禀质">特禀质</Option>
              <Option value="平和质">平和质</Option>
              <Option value="阴虚质">阴虚质</Option>
            </Select>
          </Form.Item>
          <Form.Item name="score" label="评估得分" rules={[{ required: true }]}>
            <Input type="number" min={0} max={100} />
          </Form.Item>
          <Form.Item name="gender" label="性别">
            <Select>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>
          <Form.Item name="age" label="年龄">
            <Input type="number" min={0} max={120} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 详情弹窗 */}
      <Modal
        title="用户详情"
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={700}
      >
        {currentUser && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="用户ID">{currentUser.id}</Descriptions.Item>
            <Descriptions.Item label="昵称">{currentUser.nickname}</Descriptions.Item>
            <Descriptions.Item label="手机号">{currentUser.phone}</Descriptions.Item>
            <Descriptions.Item label="注册时间">{currentUser.registerTime}</Descriptions.Item>
            <Descriptions.Item label="最近登录">{currentUser.lastLogin}</Descriptions.Item>
            <Descriptions.Item label="体质类型">
              <Tag color={getConstitutionColor(currentUser.type)}>{currentUser.type}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="评估得分">{currentUser.score}</Descriptions.Item>
            <Descriptions.Item label="性别">{currentUser.gender}</Descriptions.Item>
            <Descriptions.Item label="年龄">{currentUser.age}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default UserManage;