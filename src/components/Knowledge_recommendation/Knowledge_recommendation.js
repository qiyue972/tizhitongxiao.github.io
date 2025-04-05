import React, { useState } from'react';
import './Knowledge_recommendation.css';
import { Link } from'react-router-dom';

// 从知识图谱代码中提取并整理数据
const healthDataMap = {
    '平和体质': {
        healthTips: [
            { category: '饮食调节', content: '饮食有节，三餐有别；注重中庸之道，不可过饱过饥，不可过凉过热；饮食清淡，不宜偏嗜；平衡膳食，多食五谷蔬果少食油腻辛辣；戒烟少酒' },
            { category: '家居环境', content: '劳逸结合，生活规律，坚持锻炼（如太极拳）；顺应四时，保证充足睡眠' },
            { category: '药物调养', content: '可食缓补阴阳，根据自身情况食用益气补血、补肝益肾等药材（或食材）' },
            { category: '经络调节', content: '胆经、肝经、大肠经、小肠经、心包经等（需根据自身情况按摩相关穴位）' }
        ],
        acupoints: [
            { name: '大椎穴', location: '第七颈椎棘突下凹陷中', effect: '通调阳气，平衡阴阳，疏风清热，解表透邪。《素问·骨空论》云：“灸大椎以通诸阳之会。”，《针灸聚英》称其“主热病、头项强痛。”', therapyMethod: '隔姜灸，姜片切厚2 - 3mm，中穿数孔，上置艾炷，每次灸3 - 5壮' },
            { name: '足三里', location: '犊鼻下3寸，胫骨前嵴外一横指', effect: '健脾益气，调和气血，补虚强身，温中散寒。《针灸甲乙经》称其“主虚劳羸瘦，益气力，强志意。”，《千金要方》载：“若要安，三里常不干。”', therapyMethod: '温和灸。距离皮肤3 - 5cm。持续15 - 20分钟，以局部温热、无灼痛感为度' },
            { name: '关元穴', location: '脐下3寸（四横指），前正中线上', effect: '培元固本、温阳补气。《医宗金鉴》载：“关元为元气之根，灸之可延年益寿。“', therapyMethod: '回旋灸。艾条在穴位上方2 - 4cm处左右回旋移动。持续10 - 15分钟' },
            { name: '气海穴', location: '脐下1.5寸，前正中线上', effect: '益气培元、调和气血。《针灸资生经》称其“主脏气虚惫，真气不足。”', therapyMethod: '雀啄灸。距离皮肤2 - 3cm，快速上下摆动。每10秒轻触皮肤1次，持续8 - 10分钟' }
        ],
        therapy: {
            name: '平和体质艾灸疗法',
            base: '清洁穴位区域皮肤，取舒适体位，遵循“先阳后阴、先上后下”原则，议上午7 - 11时施灸，顺应自然规律',
            sequence: '大椎穴（隔姜灸，姜片切厚2 - 3mm，中穿数孔，上置艾炷，每次灸3 - 5壮）→足三里（温和灸。距离皮肤3 - 5cm。持续15 - 20分钟，以局部温热、无灼痛感为度）→关元穴（回旋灸。艾条在穴位上方2 - 4cm处左右回旋移动。持续10 - 15分钟）→气海穴（雀啄灸。距离皮肤2 - 3cm，快速上下摆动。每10秒轻触皮肤1次，持续8 - 10分钟）',
            frequency: '每周1次，连续4周为一疗程，建议每季度1 - 2个疗程'
        }
    },
    '气虚体质': {
        healthTips: [
            { category: '饮食调节', content: '少食多餐，细嚼慢咽；多食甘温补气食物，忌冷抑热；多食易消化食物；多食补气补血食物，食物越细碎越好；宜食用益气健脾食物，不宜过于滋腻；秋季少辛增酸' },
            { category: '家居环境', content: '劳逸结合，避免风寒，避免过度运动、劳作；保证充足睡眠' },
            { category: '药物调养', content: '固表益气，如：四君子汤、归脾汤等' },
            { category: '经络调节', content: '中脘、神阙、气海、足三里、百会、大椎、风门、脾腧、尺泽穴、孔最穴、太渊穴' }
        ],
        acupoints: [
            { name: '足三里', location: '犊鼻下3寸，胫骨前嵴外一横指', effect: '健脾益气，调和气血，补虚强身，温中散寒。《针灸甲乙经》称其“主虚劳羸瘦，益气力，强志意。”，《千金要方》载：“若要安，三里常不干。”', therapyMethod: '温和灸。双侧同步坐位施灸。持续15分钟' },
            { name: '脾俞穴', location: '第11胸椎棘突下旁开1.5寸', effect: '健脾益气、升清化湿。《针灸大成》云：“脾俞主脾虚食少，四肢无力。”', therapyMethod: '回旋灸。俯卧位施灸，距离皮肤3 - 5cm。持续10分钟，以背部温热、皮肤微红为度' },
            { name: '肺俞穴', location: '第3胸椎棘突下旁开1.5寸', effect: '补肺益气，固表止汗，宣肺固表，减少过敏。《针灸聚英》称其“主肺气不足，自汗畏风。”，《针灸大成》载：“肺俞主皮肤瘙痒，鼻塞喘息。”', therapyMethod: '回旋灸。俯卧位施灸，距离皮肤3 - 5cm。持续10分钟，以背部温热、皮肤微红为度' },
            { name: '气海穴', location: '脐下1.5寸，前正中线上', effect: '益气培元、调和气血。《针灸资生经》称其“主脏气虚惫，真气不足。”', therapyMethod: '温和灸。距离皮肤3 - 5cm，仰卧位施灸。持续15分钟，以腹部有肠鸣、温热感透入为度' },
            { name: '关元穴', location: '脐下3寸（四横指），前正中线上', effect: '培元固本、温阳补气。《医宗金鉴》载：“关元为元气之根，灸之可延年益寿。“', therapyMethod: '温和灸。距离皮肤3 - 5cm，仰卧位施灸。持续15分钟，以腹部有肠鸣、温热感透入为度' }
        ],
        therapy: {
            name: '气虚体质艾灸疗法',
            base: '清洁穴位区域皮肤，取舒适体位，遵循“先阳后阴、先上后下”原则，议上午7 - 11时施灸，顺应自然规律',
            sequence: '脾俞穴（回旋灸。俯卧位施灸，距离皮肤3 - 5cm。持续10分钟，以背部温热、皮肤微红为度）→肺俞穴（回旋灸。俯卧位施灸，距离皮肤3 - 5cm。持续10分钟，以背部温热、皮肤微红为度）→气海穴（温和灸。距离皮肤3 - 5cm，仰卧位施灸。持续15分钟，以腹部有肠鸣、温热感透入为度）→关元穴（温和灸。距离皮肤3 - 5cm，仰卧位施灸。持续15分钟，以腹部有肠鸣、温热感透入为度）→足三里（温和灸。双侧同步坐位施灸。持续15分钟）',
            frequency: '每周3次，连续6周为一疗程，建议持续3个疗程以上'
        }
    },
    '阳虚体质': {
        healthTips: [
            { category: '饮食调节', content: '以补温助火为主注意养阴；多吃温热食物，少吃或不吃生冷、冰冻之物；减少盐的摄入；适当调整烹饪方式，如焖、蒸、炖、煮；饮酒适度' },
            { category: '家居环境', content: '室温湿度适宜；日常注意关节、腰腹、颈背部、脚部保暖；少淋浴多泡澡，睡前热水泡脚；适度锻炼（上午适宜阳虚质）' },
            { category: '药物调节', content: '防止燥热，平和补阳；补益良方，如：四君子汤、归脾汤、右归丸、平补养心方' },
            { category: '经络调养', content: '中极、气海、关元、神阙（三伏天/三九天艾条温灸）' }
        ],
        acupoints: [
            { name: '关元穴', location: '脐下3寸（四横指），前正中线上', effect: '培补元气、温肾壮阳。《针灸大成》称其为"男子藏精、女子蓄血之处", 是补益元阳的核心穴位；张景岳《景岳全书》载:"关元为元气之根, 灸之可扶阳固本。"', therapyMethod: '温和灸，艾条距离皮肤4 - 6cm，以局部温热、无灼痛感为度，持续10 - 15分钟，至皮肤微红' },
            { name: '命门穴', location: '第二腰椎棘突下凹陷中', effect: '温肾助阳、强健腰膝。《医宗金鉴》载:"命门火衰, 灸之可生阳";《医门棒喝》载:"命门为真火之源, 灸之能祛沉寒痼冷。"', therapyMethod: '温和悬灸法，艾条距离皮肤2 - 3厘米，以局部温热感为度，持续10 - 15分钟，至皮肤微红' },
            { name: '足三里', location: '犊鼻下3寸，胫骨前嵴外一横指', effect: '健脾益气、温中散寒。《针灸甲乙经》称其为"补虚羸、壮元阳"要穴；《千金要方》载:"若要安, 三里常不干。"', therapyMethod: '雀啄灸，双侧同时施灸，每侧各10分钟，艾条上下摆动，增强热感渗透' },
            { name: '肾俞穴', location: '第二腰椎棘突下旁开1.5寸', effect: '温补肾阳、强健腰脊。《针灸资生经》载:"肾俞主虚劳羸瘦,阳气不足。";《临证指南医案》载:"肾俞灸之,可助命门之火。"', therapyMethod: '雀啄灸，双侧同时施灸，每侧各10分钟，艾条上下摆动，增强热感渗透' }
        ],
        therapy: {
            name: '阳虚体质艾灸疗法',
            base: '清洁穴位区域皮肤，取舒适体位，遵循“先阳后阴、先上后下”原则，议上午7 - 11时施灸，顺应自然规律',
            sequence: '关元穴（温和灸。距离皮肤3 - 5cm。持续10 - 15分钟，以局部温热、皮肤微红为度）→命门穴（温和灸。距离皮肤2 - 3cm。持续10 - 15分钟，以局部温热、皮肤微红为度）→足三里、肾俞穴同时施灸（雀啄灸。距离皮肤2 - 3cm，快速上下摆动，双侧同时施灸。持续10分钟）',
            frequency: '每周3次，连续4周为一疗程，休息1周后进入下一疗程'
        }
    },
    '阴虚体质': {
        healthTips: [
            { category: '饮食调节', content: '保持日常饮水；饭前喝汤慎饮茶；少食温燥食物，适宜食用酸甘食物、精细肉类，烹饪多红烧、炖、煮，少爆炒；多食水果，少食辛辣' },
            { category: '家居环境', content: '不适宜勤锻炼，保持生活调律，勿急躁；虚火旺可艾叶水泡脚' },
            { category: '药物调节', content: '注重滋阴降火，如：酸枣仁汤加柴胡、龙胆泻肝汤、归脾汤等' },
            { category: '经络调养', content: '三阴交穴位、天枢' }
        ],
        acupoints: [
            { name: '涌泉穴', location: '足底前1/3凹陷处', effect: '引火下行，滋阴潜阳。《医学入门》称其“滋阴益肾，灸之可降浮火”', therapyMethod: '温和灸。距离皮肤3 - 5cm。持续10 - 15分钟，以局部温热、皮肤微红为度' },
            { name: '太溪穴', location: '内踝尖与跟腱之间的凹陷中', effect: '滋阴补肾，引火归元。《格致余论》载：“肾水亏则虚火上炎，灸太溪以壮水之主。”', therapyMethod: '回旋灸。距离皮肤3 - 5cm顺时针画圈。持续8分钟，双侧同步进行，以皮肤微红、潮润为度；雀啄灸，距离皮肤2 - 3cm，快速上下摆动。持续5分钟' },
            { name: '照海穴', location: '内踝尖下方凹陷处', effect: '清热养阴，通调阴跷脉。《针灸聚英》载：“照海通阴跷，滋阴降火之要穴。”', therapyMethod: '回旋灸。距离皮肤3 - 5cm顺时针画圈。持续8分钟，双侧同步进行，以皮肤微红、潮润为度；雀啄灸，距离皮肤2 - 3cm，快速上下摆动。持续5分钟' },
            { name: '三阴交', location: '内踝尖上3寸，胫骨内侧缘后方', effect: '滋阴养血，调和肝、脾、肾三经。《针灸大成》称其“主脾胃虚弱，心腹胀满，阴血不足。”', therapyMethod: '回旋灸。坐位施灸。持续10分钟' }
        ],
        therapy: {
            name: '阴虚体质艾灸疗法',
            base: '清洁穴位区域皮肤，取舒适体位，遵循“先阳后阴、先上后下”原则，议上午7 - 11时施灸，顺应自然规律',
            sequence: '涌泉穴（温和灸。距离皮肤3 - 5cm。持续10 - 15分钟，以局部温热、皮肤微红为度）→太溪穴、照海穴双侧同时施灸（回旋灸。距离皮肤3 - 5cm顺时针画圈。持续8分钟，双侧同步进行，以皮肤微红、潮润为度；雀啄灸，距离皮肤2 - 3cm，快速上下摆动。持续5分钟）→三阴交（回旋灸。坐位施灸。持续10分钟）',
            frequency: '每周2次，连续6周为一疗程，休息1周后进入下一疗程'
        }
    },
    '痰湿体质': {
        healthTips: [
            { category: '饮食调节', content: '适食慢不食饱，晚餐素食少食；宜食温燥，少酸、寒凉、腻滞、生涩食物；多食粗，少食细；建议多食豆类，正确饮水' },
            { category: '家居环境', content: '勤晒太阳，多泡热水澡；穿衣宽松' },
            { category: '药物调养', content: '健脾胃，祛痰湿；清热利水，宣肺利气；如：二陈汤、香砂六君子汤、金匮肾气丸、交泰丸（可辅以黄连阿胶汤）' },
            { category: '经络调养', content: '中脘、水分、关元' }
        ],
        acupoints: [
            { name: '脾俞穴', location: '第11胸椎棘突下旁开1.5寸', effect: '健脾益气、升清化湿。《针灸大成》云：“脾俞主脾虚食少，四肢无力。”', therapyMethod: '回旋灸。距离皮肤3 - 5cm顺时针画圈，俯卧位施灸。持续10分钟，以背部温热、皮肤微红为度' },
            { name: '中脘穴', location: '脐上4寸，前正中线上', effect: '健运脾胃、化湿消痰。《针灸大成》称其“主痰湿积聚，中焦不运”', therapyMethod: '温和灸。距离皮肤3 - 5cm。持续15分钟，以腹部有肠鸣、温热感透入为度' },
            { name: '丰隆穴', location: '外踝尖上8寸，胫骨前嵴外两横指', effect: '化痰祛湿、通调脾胃。《针灸甲乙经》载：“丰隆主痰涎壅盛，胸腹胀满。”', therapyMethod: '雀啄灸。距离皮肤2 - 3cm，快速上下摆动，双侧同时施灸。持续10分钟' },
            { name: '阴陵泉穴', location: '胫骨内侧髁下缘凹陷中', effect: '健脾利湿、通调水道。《针灸资生经》载：“阴陵泉主湿痹、水肿。”', therapyMethod: '雀啄灸。距离皮肤2 - 3cm，快速上下摆动，双侧同时施灸。持续10分钟' }
        ],
        therapy: {
            name: '痰湿体质艾灸疗法',
            base: '清洁穴位区域皮肤，取舒适体位，遵循“先阳后阴、先上后下”原则，议上午7 - 11时施灸，顺应自然规律',
            sequence: '脾俞穴（回旋灸。俯卧位施灸，距离皮肤3 - 5cm。持续10分钟，以背部温热、皮肤微红为度）→中脘穴（温和灸。距离皮肤3 - 5cm。持续15分钟，以腹部有肠鸣、温热感透入为度）→丰隆穴、阴陵泉穴同时施灸（雀啄灸。距离皮肤2 - 3cm，快速上下摆动，双侧同时施灸。持续10分钟）',
            frequency: '每周3次，连续6周为一疗程，建议持续2个疗程'
        }
    },
    '湿热体质': {
      healthTips: [
          { category: '饮食调节', content: '宜食清淡、甘寒、甘平食物，如绿豆、赤小豆、芹菜、苦瓜等，少食辛辣、油腻、甜腻食物' },
          { category: '家居环境', content: '居住环境宜干燥、通风，避免居处潮湿，适当增加户外活动' }
      ],
      acupoints: [
          { name: '曲池穴', location: '屈肘成直角，在肘横纹外侧端与肱骨外上髁连线中点', effect: '疏风清热，调和气血', therapyMethod: '毫针浅刺，可配合艾灸' },
          { name: '足三里', location: '犊鼻下3寸，胫骨前嵴外一横指', effect: '健脾和胃，扶正培元', therapyMethod: '温和灸，每次15 - 20分钟' }
      ],
      therapy: {
          name: '湿热体质艾灸疗法',
          base: '清洁穴位区域皮肤，取舒适体位，避免空腹或过饱时施灸',
          sequence: '曲池穴（毫针浅刺，可配合艾灸）→足三里（温和灸，每次15 - 20分钟）',
          frequency: '每周2 - 3次'
      }
  },
  '血瘀体质': {
      healthTips: [
          { category: '饮食调节', content: '多食具有活血化瘀作用的食物，如山楂、醋、玫瑰花等，少食肥甘厚味食物' },
          { category: '家居环境', content: '注意保暖，避免寒冷刺激，可适当进行有氧运动' }
      ],
      acupoints: [
          { name: '血海穴', location: '屈膝，在髌骨内上缘上2寸，当股四头肌内侧头的隆起处', effect: '活血化瘀，养血调经', therapyMethod: '毫针针刺，可配合艾灸' },
          { name: '三阴交', location: '内踝尖上3寸，胫骨内侧缘后方', effect: '调和肝、脾、肾三经气血', therapyMethod: '温和灸，每次15 - 20分钟' }
      ],
      therapy: {
          name: '血瘀体质艾灸疗法',
          base: '清洁穴位区域皮肤，取舒适体位，注意施灸温度和时间',
          sequence: '血海穴（毫针针刺，可配合艾灸）→三阴交（温和灸，每次15 - 20分钟）',
          frequency: '每周2 - 3次'
      }
  },
  '气郁体质': {
      healthTips: [
          { category: '饮食调节', content: '多食具有理气解郁作用的食物，如柑橘、香橼、佛手等，少食收敛酸涩食物' },
          { category: '家居环境', content: '保持心情舒畅，可通过听音乐、散步等方式舒缓情绪' }
      ],
      acupoints: [
          { name: '太冲穴', location: '足背侧，当第1跖骨间隙的后方凹陷处', effect: '疏肝理气，平肝息风', therapyMethod: '毫针针刺，可配合艾灸' },
          { name: '膻中穴', location: '胸部前正中线上，平第4肋间，两乳头连线之中点', effect: '宽胸理气，活血通络', therapyMethod: '温和灸，每次15 - 20分钟' }
      ],
      therapy: {
          name: '气郁体质艾灸疗法',
          base: '清洁穴位区域皮肤，取舒适体位，避免在情绪激动时施灸',
          sequence: '太冲穴（毫针针刺，可配合艾灸）→膻中穴（温和灸，每次15 - 20分钟）',
          frequency: '每周2 - 3次'
      }
  },
  '特禀质': {
      healthTips: [
          { category: '饮食调节', content: '饮食宜清淡、均衡，粗细搭配适当，荤素搭配合理，少食辛辣、腥发食物' },
          { category: '家居环境', content: '保持室内清洁，避免接触过敏原，如花粉、尘螨等' }
      ],
      acupoints: [
          { name: '肺俞穴', location: '第3胸椎棘突下旁开1.5寸', effect: '调节肺气，增强卫外功能', therapyMethod: '温和灸，每次15 - 20分钟' },
          { name: '足三里', location: '犊鼻下3寸，胫骨前嵴外一横指', effect: '健脾益胃，扶正培元', therapyMethod: '温和灸，每次15 - 20分钟' }
      ],
      therapy: {
          name: '特禀质艾灸疗法',
          base: '清洁穴位区域皮肤，取舒适体位，注意观察施灸反应',
          sequence: '肺俞穴（温和灸，每次15 - 20分钟）→足三里（温和灸，每次15 - 20分钟）',
          frequency: '每周2 - 3次'
      }
  }
};

const KnowledgeRecommendation = () => {
  const [selectedConstitution, setSelectedConstitution] = useState('平和体质');
  const currentData = healthDataMap[selectedConstitution];

  return (
      <div className="page-container">
          <div className="navbar">
              <div className="nav-links">
                  <Link to="/" className="nav-link">体质评估</Link>
                  <Link to="/knowledge" className="nav-link">知识推荐</Link>
                  <Link to="/data - management" className="nav-link">数据管理</Link>
                  <Link to="/knowledge - graph - management" className="nav-link">知识图谱管理</Link>
                  <Link to="/personal - center" className="nav-link">个人中心</Link>
              </div>
              <div className="user-info">
                  <div className="avatar">
                      <img src="https://via.placeholder.com/50" alt="用户头像" />
                  </div>
              </div>
          </div>
          <div className="content">
              <div className="selector-container">
                  <label htmlFor="体质选择">选择体质类型:</label>
                  <select
                      id="体质选择"
                      className="体质选择下拉框"
                      value={selectedConstitution}
                      onChange={(e) => setSelectedConstitution(e.target.value)}
                  >
                      {Object.keys(healthDataMap).map((constitution) => (
                          <option key={constitution} value={constitution}>
                              {constitution}
                          </option>
                      ))}
                  </select>
              </div>
              <div className="recommendation-content">
                  <div className="section">
                      <h3>养生知识推荐</h3>
                      {currentData.healthTips.map((tip, index) => (
                          <div key={index} className="tip-item">
                              <p><strong>{tip.category}:</strong> {tip.content}</p>
                          </div>
                      ))}
                  </div>
                  <div className="section">
                      <h3>艾灸穴位推荐</h3>
                      {currentData.acupoints.map((acupoint, index) => (
                          <div key={index} className="acupoint-item">
                              <h4>{acupoint.name}</h4>
                              <p><strong>位置:</strong> {acupoint.location}</p>
                              <p><strong>功效:</strong> {acupoint.effect}</p>
                              <p><strong>疗法:</strong> {acupoint.therapyMethod}</p>
                          </div>
                      ))}
                  </div>
                  <div className="section">
                      <h3>{currentData.therapy.name}</h3>
                      <p><strong>疗法基础:</strong> {currentData.therapy.base}</p>
                      <p><strong>疗法顺序:</strong> {currentData.therapy.sequence}</p>
                      <p><strong>疗法频率:</strong> {currentData.therapy.frequency}</p>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default KnowledgeRecommendation;