// src/components/Physical_fitness_assessment/Questionnaire.jsx
import React, { useState } from 'react';
import ResultModal from './ResultModal';
import './Questionnaire.css';

const Questionnaire = ({ onSaveRecord }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    heightWeight: '',
    occupation: '',
    // 初始化所有问题答案为1（"没有"）
    ...Array.from({ length: 68 }, (_, i) => [`q${i+1}`, 1]).reduce((acc, [key, val]) => {
      acc[key] = val;
      return acc;
    }, {})
  });
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.startsWith('q') ? parseInt(value, 10) : value
    }));
  };

  const calculateResult = () => {
    const answers = formData;
    const constitutionTypes = {
      '平和体质': {
        questions: ['q60', 'q61', 'q62', 'q63', 'q64', 'q65', 'q66', 'q67'],
        reverse: [false, true, true, true, true, false, true, true]
      },
      '阳虚体质': {
        questions: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'],
        reverse: [false, false, false, false, false, false]
      },
      '阴虚体质': {
        questions: ['q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14'],
        reverse: [false, false, false, false, false, false, false, false]
      },
      '气虚体质': {
        questions: ['q15', 'q16', 'q17', 'q18', 'q19', 'q20', 'q21', 'q22'],
        reverse: [false, false, false, false, false, false, false, false]
      },
      '痰湿体质': {
        questions: ['q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q30', 'q31'],
        reverse: [false, false, false, false, false, false, false, false]
      },
      '湿热体质': {
        questions: ['q32', 'q33', 'q34', 'q35', 'q36', 'q37', 'q38'],
        reverse: [false, false, false, false, false, false, false]
      },
      '瘀血体质': {
        questions: ['q39', 'q40', 'q41', 'q42', 'q43', 'q44', 'q45'],
        reverse: [false, false, false, false, false, false, false]
      },
      '气郁体质': {
        questions: ['q53', 'q54', 'q55', 'q56', 'q57', 'q58', 'q59'],
        reverse: [false, false, false, false, false, false, false]
      },
      '特禀体质': {
        questions: ['q46', 'q47', 'q48', 'q49', 'q50', 'q51', 'q52'],
        reverse: [false, false, false, false, false, false, false]
      }
    };

    const results = {};
    for (const [type, config] of Object.entries(constitutionTypes)) {
      let rawScore = 0;
      let questionCount = 0;
      
      config.questions.forEach((q, index) => {
        if (answers[q] !== undefined) {
          const score = config.reverse[index] ? (6 - answers[q]) : answers[q];
          rawScore += score;
          questionCount++;
        }
      });
      
      const transformedScore = questionCount > 0 
        ? Math.round(((rawScore - questionCount) / (questionCount * 4)) * 100)
        : 0;
      
      results[type] = { rawScore, transformedScore };
    }

    let primaryType = '无';
    let secondaryType = '无';
    
    const pinghe = results['平和体质'];
    const otherTypes = Object.entries(results).filter(([type]) => type !== '平和体质');
    
    if (pinghe.transformedScore >= 60 && 
        otherTypes.every(([_, result]) => result.transformedScore < 30)) {
      primaryType = '平和体质';
    } else if (pinghe.transformedScore >= 60 && 
               otherTypes.every(([_, result]) => result.transformedScore < 40)) {
      primaryType = '基本是平和体质';
    }
    
    if (primaryType === '无' || primaryType === '基本是平和体质') {
      const biasedTypes = otherTypes
        .filter(([_, result]) => result.transformedScore >= 40)
        .sort((a, b) => b[1].transformedScore - a[1].transformedScore);
      
      if (biasedTypes.length > 0) {
        if (primaryType === '基本是平和体质') {
          secondaryType = biasedTypes[0][0];
        } else {
          primaryType = biasedTypes[0][0];
        }
      } else {
        const tendencyTypes = otherTypes
          .filter(([_, result]) => result.transformedScore >= 30 && result.transformedScore < 40)
          .sort((a, b) => b[1].transformedScore - a[1].transformedScore);
        
        if (tendencyTypes.length > 0) {
          if (primaryType === '基本是平和体质') {
            secondaryType = tendencyTypes[0][0] + '倾向';
          } else {
            primaryType = tendencyTypes[0][0] + '倾向';
          }
        }
      }
    }

    const adviceMap = {
      '平和体质': {
        symptoms: '身体健康，精力充沛，适应能力强',
        advice: '保持良好生活习惯，饮食均衡，适量运动'
      },
      '阳虚体质': {
        symptoms: '怕冷，手脚发凉，易感冒，易腹泻',
        advice: '注意保暖，避免生冷食物，适量食用温补食物如姜、羊肉'
      },
      '阴虚体质': {
        symptoms: '手脚心发热，口干咽燥，易便秘',
        advice: '避免辛辣燥热食物，多喝水，食用滋阴食物如梨、银耳'
      },
      '气虚体质': {
        symptoms: '易疲乏，气短，易感冒，声音低弱',
        advice: '避免过度劳累，适量运动，食用补气食物如山药、红枣'
      },
      '痰湿体质': {
        symptoms: '胸闷，身体沉重，舌苔厚腻',
        advice: '饮食清淡，避免油腻甜食，适量运动排湿'
      },
      '湿热体质': {
        symptoms: '面部油腻，易生痤疮，口苦，小便黄',
        advice: '饮食清淡，避免辛辣油腻，多喝水，保持皮肤清洁'
      },
      '瘀血体质': {
        symptoms: '面色晦暗，易有黑眼圈，皮肤易出现瘀斑',
        advice: '适量运动促进血液循环，避免久坐，食用活血食物如山楂'
      },
      '气郁体质': {
        symptoms: '情绪低落，易紧张焦虑，胁肋胀痛',
        advice: '保持心情舒畅，适量运动，可尝试冥想或瑜伽'
      },
      '特禀体质': {
        symptoms: '易过敏，易打喷嚏，皮肤敏感',
        advice: '避免接触过敏原，保持环境清洁，增强免疫力'
      }
    };

    const baseType = primaryType.replace('倾向', '').replace('基本是', '');
    const symptoms = adviceMap[baseType]?.symptoms || '';
    
    let secondaryAdvice = '';
    if (secondaryType !== '无') {
      const secBaseType = secondaryType.replace('倾向', '');
      if (adviceMap[secBaseType]) {
        secondaryAdvice = `\n同时有${secondaryType}的倾向，${adviceMap[secBaseType].advice}`;
      }
    }

    const resultData = {
      primaryType,
      secondaryType,
      symptoms,
      advice: (adviceMap[baseType]?.advice || '') + secondaryAdvice,
      detailedScores: results,
      formData,
      date: new Date().toLocaleString()
    };

    return resultData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultData = calculateResult();
    setResult(resultData);
    setShowResult(true);
  };

  const saveRecord = () => {
    if (result) {
      onSaveRecord(result);
      setShowResult(false);
    }
  };

  const questions = [
    { id: 1, text: "您手脚发凉吗？" },
    { id: 2, text: "您胃脘部、背部或腰膝部怕冷吗？" },
    { id: 3, text: "您受凉或吃喝(凉)的东西后容易腹泻(拉肚子吗)？" },
    { id: 4, text: "您比一般人耐受不了寒冷吗(冬天的寒冷，夏天的冷空调、电扇等)？" },
    { id: 5, text: "您比别人容易患感冒吗？" },
    { id: 6, text: "您吃(喝)凉的东西会感到不舒服或者怕吃(喝)凉东西吗？" },
    { id: 7, text: "你受凉或吃(喝)凉的东西后，容易腹泻(拉肚子)吗？" },
    { id: 8, text: "你感到手脚心发热吗？" },
    { id: 9, text: "你感觉身上、脸上发热吗？" },
    { id: 10, text: "你皮肤或口唇干吗？" },
    { id: 11, text: "你口唇颜色比一般人红吗？" },
    { id: 12, text: "你容易便秘吗？" },
    { id: 13, text: "你面部潮红或者偏红吗？" },
    { id: 14, text: "你感到眼睛干涩吗？" },
    { id: 15, text: "你感到口干咽燥，总想喝水吗？" },
    { id: 16, text: "你容易疲乏吗？" },
    { id: 17, text: "你容易气短（呼吸短促、接不上气）吗？" },
    { id: 18, text: "你容易心慌吗？" },
    { id: 19, text: "你容易头晕或者站起时眩晕吗？" },
    { id: 20, text: "你比别人更容易感冒吗？" },
    { id: 21, text: "你喜欢安静、懒得说话吗？" },
    { id: 22, text: "你说话声音低弱无力吗？" },
    { id: 23, text: "你活动量稍大就容易出虚汗吗？" },
    { id: 24, text: "你感到胸闷或腹部胀满吗？" },
    { id: 25, text: "你感到身体沉重不轻松、不爽快吗？" },
    { id: 26, text: "你腹部肥满松软吗？" },
    { id: 27, text: "你有额部油脂分泌多的现象吗？" },
    { id: 28, text: "你上眼睑比别人肿（上眼睑有轻微隆起）吗？" },
    { id: 29, text: "你嘴里有黏黏的感觉吗？" },
    { id: 30, text: "你平时痰多、特别是咽喉部总感觉有痰堵着吗？" },
    { id: 31, text: "你舌苔厚腻或有舌苔厚厚的感觉吗？" },
    { id: 32, text: "你面部或鼻部有油腻感或油光发亮吗？" },
    { id: 33, text: "你容易生痤疮或疮疖吗？" },
    { id: 34, text: "你感到口苦或嘴里有异味吗？" },
    { id: 35, text: "你大便黏滞不爽、有解不尽的感觉吗？" },
    { id: 36, text: "你小便时尿道有发热感、尿色浓(深)吗？" },
    { id: 37, text: "你带下色黄吗(白带颜色发黄)(限女性回答)？" },
    { id: 38, text: "你的阴囊部位潮湿吗(限男性回答)？" },
    { id: 39, text: "你的皮肤在不知不觉中会出现青紫瘀斑吗(皮下出血)？" },
    { id: 40, text: "你两颧部有细微红丝吗？" },
    { id: 41, text: "你身体上有哪里疼痛吗？" },
    { id: 42, text: "你面色晦黯或容易出现褐斑吗？" },
    { id: 43, text: "你容易有黑眼圈吗？" },
    { id: 44, text: "你容易忘事吗（健忘）？" },
    { id: 45, text: "你口唇颜色偏黯吗？" },
    { id: 46, text: "你没有感冒时也会打喷嚏吗？" },
    { id: 47, text: "你没有感冒时也会鼻塞、流鼻涕吗？" },
    { id: 48, text: "你有因季节变化、温度变化或异味等原因而咳喘的现象吗？" },
    { id: 49, text: "你容易过敏吗(对药物、食物、气味、花粉或在季节交替、气候变化时)？" },
    { id: 50, text: "你的皮肤容易起荨麻疹吗(风团、风疹块、风疙瘩)？" },
    { id: 51, text: "你的皮肤因过敏出现过紫癜吗(紫红色瘀点、瘀斑)？" },
    { id: 52, text: "你的皮肤一抓就红，并出现抓痕？" },
    { id: 53, text: "你感到闷闷不乐、情绪低沉吗？" },
    { id: 54, text: "你容易精神紧张、焦虑不安吗？" },
    { id: 55, text: "你多愁善感、感情脆弱吗？" },
    { id: 56, text: "你容易感到害怕或受到惊吓吗？" },
    { id: 57, text: "你胁肋部或乳房胀痛吗吗？" },
    { id: 58, text: "你无缘无故叹气吗？" },
    { id: 59, text: "你咽喉部有异物感，且吐之不出、咽之不下吗？" },
    { id: 60, text: "你精力充沛吗？" },
    { id: 61, text: "你容易疲乏吗？" },
    { id: 62, text: "你说话声音低弱无力吗？" },
    { id: 63, text: "你感到闷闷不乐、情绪低沉吗？" },
    { id: 64, text: "你比一般人耐受不了寒冷吗(冬天的寒冷，夏天的冷空调、电扇等)？" },
    { id: 65, text: "你能适应外界自然和社会环境的变化吗？" },
    { id: 66, text: "你容易失眠吗？" },
    { id: 67, text: "你容易忘事（健忘）吗？" },
    { id: 68, text: "你能适应外界自然和社会环境的变化吗？" }
  ];
  return (
    <div className="questionnaire-container">
      <h1>王琦九种中医体质量表</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="basic-info">
          <h2>基本信息</h2>
          <div className="form-group">
            <label>1. 您的姓名：</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>2. 您的性别：</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">请选择</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>3. 请输入您的年龄：</label>
            <input 
              type="number" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>4. 您的身高/体重：</label>
            <input 
              type="text" 
              name="heightWeight" 
              value={formData.heightWeight} 
              onChange={handleChange} 
              placeholder="例如：170cm/65kg" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>5. 您的职业：</label>
            <input 
              type="text" 
              name="occupation" 
              value={formData.occupation} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>
        
        <div className="questions-section">
          <h2>体质相关问题</h2>
          {questions.map((q) => (
            <div key={q.id} className="question-group">
              <label>{q.id + 5}. {q.text}</label>
              <select 
                name={`q${q.id}`} 
                value={formData[`q${q.id}`]} 
                onChange={handleChange}
              >
                <option value="1">没有（根本不）</option>
                <option value="2">偶尔（有一点）</option>
                <option value="3">有时（有些）</option>
                <option value="4">经常（相当）</option>
                <option value="5">总是（非常）</option>
              </select>
            </div>
          ))}
        </div>
        
        <button type="submit" className="submit-btn">提交</button>
      </form>
      
      {showResult && result && (
        <ResultModal 
          result={result} 
          onClose={() => setShowResult(false)}
          onSave={saveRecord}
        />
      )}
    </div>
  );
};

export default Questionnaire;