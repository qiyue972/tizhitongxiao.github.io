import React, { useState } from 'react';
import './Knowledge_graph_management.css';
import { Link } from 'react-router-dom';
import { knowledgeGraphData } from './Knowledge_graph_data';

const KnowledgeGraphManagement = () => {
    const phoneNumber = '18010582144';
    const userRole = phoneNumber === '18010582144' ? '超级管理员' : '普通用户';
    const [showAddEntity, setShowAddEntity] = useState(false);
    const [showAddRelation, setShowAddRelation] = useState(false);
    const [showImportData, setShowImportData] = useState(false);
    const [activeNavLink, setActiveNavLink] = useState('/knowledge-graph-management');
    const [selectedNode, setSelectedNode] = useState(null);
    const [displayData, setDisplayData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});

    const handleCategoryClick = (category) => {
        const relevantData = knowledgeGraphData.filter(item => item.category === category);
        setDisplayData(relevantData);
    };

    const handleNodeDoubleClick = (node) => {
        const relatedRelations = knowledgeGraphData.filter(item =>
            (item.source === node.label || item.target === node.label) && item.relation
        );
        setSelectedNode(node);
        setDisplayData(relatedRelations);
        setEditMode(true);
        setEditedData({ ...node });
    };

    const handleDeleteNode = () => {
        if (selectedNode) {
            console.log(`删除节点: ${selectedNode.label}`);
            setSelectedNode(null);
            setDisplayData(null);
            setEditMode(false);
        }
    };

    const handleSaveChanges = () => {
        if (selectedNode && editMode) {
            console.log(`保存修改: ${JSON.stringify(editedData)}`);
            setEditMode(false);
        }
    };

    return (
        <div className="page-container">
            <nav className="navbar">
                <div className="nav-links">
                    <Link
                        to="/physical-fitness-assessment"
                        className={`nav-link ${activeNavLink === '/physical-fitness-assessment' ? 'active' : ''}`}
                        onClick={() => setActiveNavLink('/physical-fitness-assessment')}
                    >体质评估</Link>
                    <Link
                        to="/knowledge-recommendation"
                        className={`nav-link ${activeNavLink === '/knowledge-recommendation' ? 'active' : ''}`}
                        onClick={() => setActiveNavLink('/knowledge-recommendation')}
                    >知识推荐</Link>
                    <Link
                        to="/data-management"
                        className={`nav-link ${activeNavLink === '/data-management' ? 'active' : ''}`}
                        onClick={() => setActiveNavLink('/data-management')}
                    >数据管理</Link>
                    <Link
                        to="/knowledge-graph-management"
                        className={`nav-link ${activeNavLink === '/knowledge-graph-management' ? 'active' : ''}`}
                        onClick={() => setActiveNavLink('/knowledge-graph-management')}
                    >知识图谱管理</Link>
                    <Link
                        to="/personal-center"
                        className={`nav-link ${activeNavLink === '/personal-center' ? 'active' : ''}`}
                        onClick={() => setActiveNavLink('/personal-center')}
                    >个人中心</Link>
                </div>
                <div className="user-info">
                    <span>身份: {userRole}</span>
                    <div className="avatar" onClick={() => window.location.href = '/personal-center'}>
                        <img src="https://via.placeholder.com/50" alt="Avatar" />
                    </div>
                </div>
            </nav>
            <div className="column left-column">
                {/* 修改为标题 */}
                <div className="statistics-card">实体管理</div>
                <input type="text" className="search-box" placeholder="按名称/类型搜索实体" />
                <ul className="entity-category-list">
                    <li onClick={() => handleCategoryClick('体质类')}>体质类（30）</li>
                    <li onClick={() => handleCategoryClick('食材类')}>食材类（100）</li>
                    <li onClick={() => handleCategoryClick('穴位类')}>穴位类（20）</li>
                </ul>
                <div className="buttons">
                    <button onClick={() => setShowAddEntity(!showAddEntity)}>新增实体</button>
                    <button onClick={() => setShowAddRelation(!showAddRelation)}>新增关系</button>
                    <button onClick={() => setShowImportData(!showImportData)}>导入数据</button>
                </div>
                {showAddEntity && (
                    <div className="interaction-modal">
                        <h3>新增实体</h3>
                        <div className="property-field">
                            <label>名称：</label>
                            <input type="text" />
                        </div>
                        <div className="property-field">
                            <label>类型：</label>
                            <input type="text" />
                        </div>
                        <div className="property-field">
                            <label>描述：</label>
                            <textarea rows="3"></textarea>
                        </div>
                        <button onClick={() => setShowAddEntity(false)}>关闭</button>
                    </div>
                )}
                {showAddRelation && (
                    <div className="interaction-modal">
                        <h3>新增关系</h3>
                        <div className="property-field">
                            <label>起始实体：</label>
                            <input type="text" />
                        </div>
                        <div className="property-field">
                            <label>关系类型：</label>
                            <input type="text" />
                        </div>
                        <div className="property-field">
                            <label>结束实体：</label>
                            <input type="text" />
                        </div>
                        <button onClick={() => setShowAddRelation(false)}>关闭</button>
                    </div>
                )}
                {showImportData && (
                    <div className="interaction-modal">
                        <h3>导入数据</h3>
                        <input type="file" />
                        <button onClick={() => setShowImportData(false)}>关闭</button>
                    </div>
                )}
            </div>
            <div className="column middle-column">
                <div className="graph-visualization">
                    {knowledgeGraphData.map(node => (
                        <div
                            key={node.id}
                            className={`node ${node.type}`}
                            style={{ left: node.left, top: node.top }}
                            onDoubleClick={() => handleNodeDoubleClick(node)}
                        >
                            {node.label}
                        </div>
                    ))}
                </div>
                {/* 添加提示文字 */}
                <div className="graph-tip">双击编辑节点。</div>
            </div>
            <div className="column right-column">
                <div className="right-column-title">
                    {selectedNode ? `选中节点: ${selectedNode.label}` : '选中实体/关系名称'}
                </div>
                {editMode && selectedNode && (
                    <div>
                        <div className="property-field">
                            <label>名称：</label>
                            <input type="text" value={editedData.label} onChange={(e) => setEditedData({ ...editedData, label: e.target.value })} />
                        </div>
                        <div className="property-field">
                            <label>类型：</label>
                            <input type="text" value={editedData.type} onChange={(e) => setEditedData({ ...editedData, type: e.target.value })} />
                        </div>
                        <div className="property-field">
                            <label>描述：</label>
                            <textarea rows="3" value={editedData.description || ''} onChange={(e) => setEditedData({ ...editedData, description: e.target.value })} />
                        </div>
                    </div>
                )}
                {displayData && (
                    <ul className="relationship-list">
                        {displayData.map((item, index) => (
                            <li key={index}>
                                {item.relation ? `${item.relation}: ${item.target}` : item.content}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="right-buttons">
                    <button className="delete-button" onClick={handleDeleteNode}>删除按钮</button>
                    <button className="save-button" onClick={handleSaveChanges}>保存修改</button>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeGraphManagement;