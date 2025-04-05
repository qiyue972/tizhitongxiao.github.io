// Knowledge_graph_data.js
const knowledgeGraphData = [];

// 创建体质类型节点数据
const physiqueTypes = [
    '平和体质', '气虚体质', '阳虚体质', '阴虚体质', '痰湿体质', '湿热体质', '瘀血体质', '气郁体质', '特禀体质'
];
physiqueTypes.forEach(type => {
    knowledgeGraphData.push({
        id: knowledgeGraphData.length + 1,
        type: 'node-red',
        left: `${Math.floor(Math.random() * 500)}px`,
        top: `${Math.floor(Math.random() * 500)}px`,
        label: type,
        category: '体质类',
        relations: []
    });
});

// 创建艾灸穴位节点数据
const acupuncturePoints = [
    { name: '大椎穴', location: '第七颈椎棘突下凹陷中', effect: '通调阳气，平衡阴阳，疏风清热，解表透邪。《素问·骨空论》云：“灸大椎以通诸阳之会。”，《针灸聚英》称其“主热病、头项强痛。”' },
    { name: '气海穴', location: '脐下1.5寸，前正中线上', effect: '益气培元、调和气血。《针灸资生经》称其“主脏气虚惫，真气不足。”' },
    //... 其他艾灸穴位数据
];
acupuncturePoints.forEach((point, index) => {
    knowledgeGraphData.push({
        id: knowledgeGraphData.length + 1,
        type: 'node-blue',
        left: `${Math.floor(Math.random() * 500)}px`,
        top: `${Math.floor(Math.random() * 500)}px`,
        label: point.name,
        category: '穴位类',
        relations: []
    });
});

// 创建疗法过程节点数据
const therapyProcesses = [
    { name: '平和体质艾灸疗法', base: '清洁穴位区域皮肤，取舒适体位，遵循“先阳后阴、先上后下”原则，议上午7 - 11时施灸，顺应自然规律', sequence: '大椎穴（隔姜灸，姜片切厚 ​2 - 3mm，中穿数孔，上置艾炷，每次灸 ​3 - 5壮）→足三里（温和灸。距离皮肤3 - 5cm。持续15 - 20分钟，以局部温热、无灼痛感为度）→关元穴（回旋灸。艾条在穴位上方2 - 4cm 处左右回旋移动。持续 ​10 - 15分钟）→气海穴（雀啄灸。距离皮肤2 - 3cm，快速上下摆动。每10秒轻触皮肤1次，持续8 - 10分钟）', frequency: '每周1次，连续4周为一疗程，建议每季度1 - 2个疗程' },
    //... 其他疗法过程数据
];
therapyProcesses.forEach((process, index) => {
    knowledgeGraphData.push({
        id: knowledgeGraphData.length + 1,
        type: 'node-green',
        left: `${Math.floor(Math.random() * 500)}px`,
        top: `${Math.floor(Math.random() * 500)}px`,
        label: process.name,
        category: '疗法类',
        relations: []
    });
});

// 创建养生知识节点数据
const healthKnowledge = [
    { type: '阳虚体质', category: '饮食调节', content: '以补温助火为主注意养阴；多吃温热食物，少吃或不吃生冷、冰冻之物；减少盐的摄入；适当调整烹饪方式，如焖、蒸、炖、煮；饮酒适度' },
    //... 其他养生知识数据
];
healthKnowledge.forEach((knowledge, index) => {
    knowledgeGraphData.push({
        id: knowledgeGraphData.length + 1,
        type: 'node-yellow',
        left: `${Math.floor(Math.random() * 500)}px`,
        top: `${Math.floor(Math.random() * 500)}px`,
        label: knowledge.category,
        category: '养生知识类',
        relations: []
    });
});

// 建立属性关联数据
const physiqueRelations = [
    { source: '平和体质', target: '大椎穴', relation: '对应艾灸穴位' },
    { source: '平和体质', target: '足三里', relation: '对应艾灸穴位' },
    //... 其他体质关联数据
];
physiqueRelations.forEach(relation => {
    const sourceNode = knowledgeGraphData.find(node => node.label === relation.source);
    const targetNode = knowledgeGraphData.find(node => node.label === relation.target);
    if (sourceNode && targetNode) {
        sourceNode.relations.push({ target: targetNode.label, relation: relation.relation });
        targetNode.relations.push({ target: sourceNode.label, relation: relation.relation.split(' ')[0] + '反向' });
    }
});

export { knowledgeGraphData };// JavaScript source code
