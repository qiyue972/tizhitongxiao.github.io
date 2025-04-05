import React, { useState } from 'react';
import { Tabs } from 'antd';
import UserManage from './UserManage';
import SurveyManage from './SurveyManage';
import DataAnalysis from './DataAnalysis';
import Navbar from '../Navbar/Navbar';
import './Data_management.css';

const { TabPane } = Tabs;

const DataManagement = () => {
  // 模拟用户数据（实际应从全局状态获取）
  const userRole = '超级管理员';
  const phoneNumber = '18010582144';

  // 用于存储当前激活的选项卡 key
  const [activeKey, setActiveKey] = useState('1');

  const handleTabChange = (key) => {
    // 当选项卡切换时，更新 activeKey 状态
    setActiveKey(key);
  };

  return (
    <div className="page-container">
      <Navbar userRole={userRole} phoneNumber={phoneNumber} />
      <div className="data-management-container">
        <Tabs 
          activeKey={activeKey} // 使用状态变量设置当前激活的选项卡
          onChange={handleTabChange} // 绑定选项卡切换的回调函数
          defaultActiveKey="1" 
          tabPosition="left"
        >
          <TabPane tab="用户管理" key="1">
            <UserManage />
          </TabPane>
          <TabPane tab="问卷管理" key="2">
            <SurveyManage />
          </TabPane>
          <TabPane tab="数据分析" key="3">
            <DataAnalysis />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default DataManagement;    