import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, Row, Col, DatePicker, Select, Button } from 'antd';
import { BarChartOutlined, PieChartOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

const DataAnalysis = () => {
  const [chartType, setChartType] = useState('pie');
  const [timeRange, setTimeRange] = useState([]);
  const [dataType, setDataType] = useState('user');

  // 定义单位常量
  const UNITS = {
    user: '人',
    survey: '份', 
    knowledge: '次'
  };

  const [chartData] = useState({
    user: {
      types: [
        { value: 35, name: '湿热质' },
        { value: 30, name: '阳虚质' },
        { value: 25, name: '阴虚质' },
        { value: 20, name: '气虚质' },
        { value: 18, name: '痰湿质' },
        { value: 15, name: '血瘀质' },
        { value: 12, name: '气郁质' },
        { value: 10, name: '特禀质' },
        { value: 8, name: '平和质' }
      ],
      trends: [120, 200, 150, 80, 70, 110]
    },
    survey: {
      trends: [80, 120, 90, 60, 110, 100]
    },
    knowledge: {
      types: [
        { value: 45, name: '湿热质知识' },
        { value: 40, name: '阳虚质知识' },
        { value: 35, name: '阴虚质知识' },
        { value: 30, name: '气虚质知识' },
        { value: 25, name: '痰湿质知识' },
        { value: 20, name: '血瘀质知识' },
        { value: 18, name: '气郁质知识' },
        { value: 15, name: '特禀质知识' },
        { value: 12, name: '平和质知识' }
      ],
      trends: [150, 220, 180, 200, 240, 300]
    }
  });

  const getTotal = (type) => {
    if (type === 'user') return chartData.user.types.reduce((sum, item) => sum + item.value, 0);
    if (type === 'knowledge') return chartData.knowledge.types.reduce((sum, item) => sum + item.value, 0);
    if (type === 'survey') return chartData.survey.trends.reduce((sum, item) => sum + item, 0);
    return 0;
  };

  const getOption = () => {
    const { unit, title } = {
      user: { unit: UNITS.user, title: '用户问卷提交趋势' },
      survey: { unit: UNITS.survey, title: '问卷提交趋势' },
      knowledge: { unit: UNITS.knowledge, title: '知识点击趋势' }
    }[dataType];
    
    if (dataType === 'survey' || chartType === 'bar') {
      return {
        title: { 
          text: title, 
          left: 'center' 
        },
        xAxis: { 
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: { 
          type: 'value',
          name: `单位: ${unit}`,
          nameLocation: 'end',
          nameTextStyle: {
            padding: [0, 0, 10, 0]
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            return `${params[0].axisValue}<br/>${params[0].seriesName}: ${params[0].data}${unit}`;
          }
        },
        series: [{
          name: title,
          data: chartData[dataType].trends,
          type: 'bar',
          showBackground: true,
          itemStyle: { 
            color: '#3CC684',
            borderRadius: [4, 4, 0, 0]
          },
          label: {
            show: true,
            position: 'top',
            formatter: `{c}${unit}`
          }
        }]
      };
    }

    // 饼图部分
    const data = chartData[dataType];
    const total = getTotal(dataType);
    const titleMap = {
      user: `用户体质分布 (总计: ${total}${UNITS.user})`,
      knowledge: `知识点击分布 (总计: ${total}${UNITS.knowledge})`
    };

    return {
      title: { 
        text: titleMap[dataType], 
        left: 'center' 
      },
      tooltip: { 
        trigger: 'item',
        formatter: `{a} <br/>{b}: {c}${unit} ({d}%)`
      },
      legend: { 
        orient: 'vertical', 
        left: 'left',
        data: data.types.map(item => item.name)
      },
      series: [{
        name: '分布比例',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          formatter: '{b}: {d}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        data: data.types
      }]
    };
  };

  return (
    <div>
      <Card>
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col span={8}>
            <Select
              value={dataType}
              onChange={(value) => {
                setDataType(value);
                if (value === 'survey') setChartType('bar');
              }}
              style={{ width: '100%' }}
            >
              <Option value="user">用户数据</Option>
              <Option value="survey">问卷数据</Option>
              <Option value="knowledge">知识点击数据</Option>
            </Select>
          </Col>
          <Col span={8}>
            <RangePicker 
              style={{ width: '100%' }}
              onChange={setTimeRange}
            />
          </Col>
          <Col span={8}>
            <Button.Group style={{ width: '100%' }}>
              <Button 
                type={chartType === 'pie' ? 'primary' : 'default'}
                icon={<PieChartOutlined />}
                onClick={() => setChartType('pie')}
                disabled={dataType === 'survey'}
              >
                饼图
              </Button>
              <Button 
                type={chartType === 'bar' ? 'primary' : 'default'}
                icon={<BarChartOutlined />}
                onClick={() => setChartType('bar')}
              >
                柱状图
              </Button>
            </Button.Group>
          </Col>
        </Row>

        <ReactECharts
          option={getOption()}
          style={{ height: 500 }}
        />
      </Card>

      {/* 修改了下方三栏数字的字体大小 */}
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={8}>
          <Card title="总用户数" bordered={false}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#3CC684' }}>
                {getTotal('user')}
              </span>
              <span style={{ fontSize: '16px', marginLeft: '4px', color: '#3CC684' }}>
                {UNITS.user}
              </span>
            </div>
            <p style={{ marginTop: '8px' }}>
              较上月增长 {Math.round((chartData.user.trends[5] - chartData.user.trends[4]) / chartData.user.trends[4] * 100)}%
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="问卷提交数" bordered={false}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#3CC684' }}>
                {getTotal('survey')}
              </span>
              <span style={{ fontSize: '16px', marginLeft: '4px', color: '#3CC684' }}>
                {UNITS.survey}
              </span>
            </div>
            <p style={{ marginTop: '8px' }}>
              较上月增长 {Math.round((chartData.survey.trends[5] - chartData.survey.trends[4]) / chartData.survey.trends[4] * 100)}%
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="知识点击量" bordered={false}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#3CC684' }}>
                {getTotal('knowledge')}
              </span>
              <span style={{ fontSize: '16px', marginLeft: '4px', color: '#3CC684' }}>
                {UNITS.knowledge}
              </span>
            </div>
            <p style={{ marginTop: '8px' }}>
              较上月增长 {Math.round((chartData.knowledge.trends[5] - chartData.knowledge.trends[4]) / chartData.knowledge.trends[4] * 100)}%
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataAnalysis;