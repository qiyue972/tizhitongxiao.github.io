import React, { useState } from 'react';
import { Table, Button, Tag, Space, Modal, Form, Input, InputNumber, message, Descriptions } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';

const SurveyManage = () => {
  // 问卷数据 - 只保留体质问卷
  const [survey, setSurvey] = useState({
    id: 1,
    title: '中医体质辨识问卷',
    count: 70,
    status: 'active',
    description: '根据王琦院士体质推荐量表设计的体质评估问卷',
    createdTime: '2023-01-01',
    updatedTime: '2023-06-15'
  });

  // 答卷记录数据
  const [records, setRecords] = useState([
    {
      id: '1001',
      userId: 'user001',
      username: '张三',
      submitTime: '2023-06-10 14:30',
      score: 85,
      constitution: '湿热质',
      details: '详细答卷数据...'
    },
    {
      id: '1002',
      userId: 'user002',
      username: '李四',
      submitTime: '2023-06-12 09:15',
      score: 72,
      constitution: '气虚质',
      details: '详细答卷数据...'
    },
    {
      id: '1003',
      userId: 'user003',
      username: '王五',
      submitTime: '2023-06-15 16:45',
      score: 68,
      constitution: '阳虚质',
      details: '详细答卷数据...'
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRecordModalVisible, setIsRecordModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('survey'); // 'survey' 或 'records'
  const [form] = Form.useForm();

  const handleStatusChange = () => {
    setSurvey({
      ...survey,
      status: survey.status === 'active' ? 'inactive' : 'active'
    });
    message.success(`问卷已${survey.status === 'active' ? '停用' : '启用'}`);
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      setSurvey({
        ...survey,
        ...values,
        updatedTime: new Date().toLocaleDateString()
      });
      message.success('问卷更新成功');
      setIsModalVisible(false);
    });
  };

  const showRecordDetail = (record) => {
    setCurrentRecord(record);
    setIsRecordModalVisible(true);
  };

  const recordColumns = [
    { title: '答卷ID', dataIndex: 'id' },
    { title: '用户ID', dataIndex: 'userId' },
    { title: '用户名', dataIndex: 'username' },
    { title: '提交时间', dataIndex: 'submitTime' },
    { 
      title: '得分', 
      dataIndex: 'score',
      render: score => (
        <Tag color={
          score >= 80 ? 'green' : 
          score >= 60 ? 'orange' : 'red'
        }>
          {score}
        </Tag>
      )
    },
    { 
      title: '体质类型', 
      dataIndex: 'constitution',
      render: type => <Tag color="#3CC684">{type}</Tag>
    },
    {
      title: '操作',
      render: (_, record) => (
        <Button 
          type="link" 
          icon={<EyeOutlined />}
          onClick={() => showRecordDetail(record)}
        >
          查看答卷
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Button 
          type={activeTab === 'survey' ? 'primary' : 'default'} 
          onClick={() => setActiveTab('survey')}
          style={{ marginRight: 8 }}
        >
          问卷管理
        </Button>
        <Button 
          type={activeTab === 'records' ? 'primary' : 'default'} 
          onClick={() => setActiveTab('records')}
        >
          答卷记录
        </Button>
      </div>

      {activeTab === 'survey' ? (
        <div>
          <Descriptions 
            title="体质问卷信息" 
            bordered 
            column={1}
            extra={
              <Space>
                <Button 
                  type={survey.status === 'active' ? 'default' : 'primary'} 
                  onClick={handleStatusChange}
                >
                  {survey.status === 'active' ? '停用问卷' : '启用问卷'}
                </Button>
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  onClick={() => {
                    form.setFieldsValue(survey);
                    setIsModalVisible(true);
                  }}
                >
                  编辑问卷
                </Button>
              </Space>
            }
          >
            <Descriptions.Item label="问卷标题">{survey.title}</Descriptions.Item>
            <Descriptions.Item label="问卷描述">{survey.description}</Descriptions.Item>
            <Descriptions.Item label="问题数量">{survey.count}</Descriptions.Item>
            <Descriptions.Item label="当前状态">
              <Tag color={survey.status === 'active' ? 'green' : 'red'}>
                {survey.status === 'active' ? '启用中' : '已停用'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">{survey.createdTime}</Descriptions.Item>
            <Descriptions.Item label="最后更新时间">{survey.updatedTime}</Descriptions.Item>
          </Descriptions>
        </div>
      ) : (
        <Table 
          dataSource={records} 
          columns={recordColumns} 
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}

      {/* 问卷编辑弹窗 */}
      <Modal
        title="编辑问卷"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="问卷标题" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="问卷描述">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="count" label="问题数量" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 答卷详情弹窗 */}
      <Modal
        title={`答卷详情 (ID: ${currentRecord?.id})`}
        visible={isRecordModalVisible}
        onCancel={() => setIsRecordModalVisible(false)}
        footer={null}
        width={800}
      >
        {currentRecord && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="用户ID">{currentRecord.userId}</Descriptions.Item>
            <Descriptions.Item label="用户名">{currentRecord.username}</Descriptions.Item>
            <Descriptions.Item label="提交时间">{currentRecord.submitTime}</Descriptions.Item>
            <Descriptions.Item label="得分">
              <Tag color={
                currentRecord.score >= 80 ? 'green' : 
                currentRecord.score >= 60 ? 'orange' : 'red'
              }>
                {currentRecord.score}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="体质类型" span={2}> 
              <Tag color="#3CC684">{currentRecord.constitution}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="详细答卷" span={2}>
              <div style={{ 
                background: '#f0f0f0', 
                padding: 16, 
                borderRadius: 4,
                maxHeight: 300,
                overflow: 'auto'
              }}>
                {currentRecord.details}
              </div>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default SurveyManage;