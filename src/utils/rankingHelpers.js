const RANKING_KEY = 'snake_premium_arcade_ranking';

export const getRanking = () => {
  const data = localStorage.getItem(RANKING_KEY);
  const ranking = data ? JSON.parse(data) : [];

  return ranking.map((entry) => ({
    ...entry,
    name: typeof entry.name === 'string' && entry.name.trim() ? entry.name : 'PLAYER',
  }));
};

export const saveScore = (scoreData) => {
  const ranking = getRanking();
  const newRanking = [...ranking, { ...scoreData, id: Date.now() }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  
  localStorage.setItem(RANKING_KEY, JSON.stringify(newRanking));
  return newRanking;
};

export const clearRanking = () => {
  localStorage.removeItem(RANKING_KEY);
};

export const getBestScore = () => {
  const ranking = getRanking();
  return ranking.length > 0 ? ranking[0].score : 0;
};
