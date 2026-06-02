// 综合分 = 出现频率×30% + 成交影响×30% + AI适合度×25% + 描述准确性×15%
export function calcWeightedScore(freq, deal, ai, acc) {
  return +(freq * 0.3 + deal * 0.3 + ai * 0.25 + acc * 0.15).toFixed(2);
}

export function calcSceneStats(allResults) {
  const sceneMap = new Map();

  allResults.forEach(r => {
    (r.scenarioScores || []).forEach(s => {
      if (!sceneMap.has(s.id)) sceneMap.set(s.id, { id:s.id, name:s.name, stage:s.stage, scores:[], frequencies:[], dealImpacts:[], aiFits:[], accuracies:[], mustHaveCount:0 });
      const entry = sceneMap.get(s.id);
      entry.scores.push(s.weightedScore || calcWeightedScore(s.frequency, s.dealImpact, s.aiFit, s.accuracy));
      entry.frequencies.push(s.frequency);
      entry.dealImpacts.push(s.dealImpact);
      entry.aiFits.push(s.aiFit);
      entry.accuracies.push(s.accuracy);
      if (s.phaseOnePriority === '第一期必须做') entry.mustHaveCount++;
    });
  });

  const stats = [];
  sceneMap.forEach((v, k) => {
    const avg = arr => +(arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(2);
    stats.push({
      id: v.id, name: v.name, stage: v.stage,
      avgScore: avg(v.scores),
      avgFrequency: avg(v.frequencies),
      avgDealImpact: avg(v.dealImpacts),
      avgAiFit: avg(v.aiFits),
      avgAccuracy: avg(v.accuracies),
      mustHaveCount: v.mustHaveCount,
      total: v.scores.length,
    });
  });

  stats.sort((a,b) => b.avgScore - a.avgScore);
  return stats;
}

export function getMustHaveTop5(stats) {
  return [...stats].sort((a,b) => b.mustHaveCount - a.mustHaveCount).slice(0, 5);
}

export function getControversial(stats) {
  return stats.filter(s => s.avgScore >= 4.0 && s.avgAccuracy < 3.5);
}
