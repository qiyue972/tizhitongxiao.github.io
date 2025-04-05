import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PhysicalFitnessAssessment from './components/Physical_fitness_assessment/Physical_fitness_assessment';
import DataManagement from './components/Data_management/Data_management';
import KnowledgeRecommendation from './components/Knowledge_recommendation/Knowledge_recommendation';
import KnowledgeGraphManagement from './components/Knowledge_graph_management/Knowledge_graph_management';
import PersonalCenter from './components/Personal_center/Personal_center';

// Custom theme configuration
const theme = {
  token: {
    colorPrimary: '#3CC684',
    borderRadius: 4,
    colorLink: '#3CC684',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorTextBase: '#333',
    fontSize: 14,
    sizeUnit: 4,
    sizeStep: 4,
  },
  components: {
    Button: {
      colorPrimary: '#3CC684',
      algorithm: true,
    },
    Menu: {
      colorItemBgSelected: 'rgba(60, 198, 132, 0.1)',
      colorItemTextSelected: '#3CC684',
    },
    Card: {
      borderRadius: 8,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    },
    Tabs: {
      colorPrimary: '#3CC684',
      inkBarColor: '#3CC684',
    },
  },
};

function App() {
  const [isLoginOrRegister, setIsLoginOrRegister] = useState(false);

  const bgImageStyle = {
    '--bg-image': isLoginOrRegister? 'url(../../../public/images/background.png)' : 'none'
  };

  return (
    <ConfigProvider theme={theme}>
      <Router>
        <div className="app-container" style={{ minHeight: '100vh', background: '#f0f2f5',...bgImageStyle }}>
          <Routes>
            <Route path="/login" element={<Login setIsLoginOrRegister={setIsLoginOrRegister} />} />
            <Route path="/register" element={<Register setIsLoginOrRegister={setIsLoginOrRegister} />} />
            <Route path="/physical-fitness-assessment" element={<PhysicalFitnessAssessment setIsLoginOrRegister={setIsLoginOrRegister} />} />
            <Route path="/knowledge-recommendation" element={<KnowledgeRecommendation setIsLoginOrRegister={setIsLoginOrRegister} />} />
            <Route path="/data-management" element={<DataManagement setIsLoginOrRegister={setIsLoginOrRegister} />} />
            <Route path="/knowledge-graph-management" element={<KnowledgeGraphManagement setIsLoginOrRegister={setIsLoginOrRegister} />} />
            <Route path="/personal-center" element={<PersonalCenter setIsLoginOrRegister={setIsLoginOrRegister} />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;    