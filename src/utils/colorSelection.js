export const findVoteCountColor = value =>
  value < 100
    ? 'red'
    : value < 200
    ? 'yellow'
    : value < 300
    ? 'green'
    : 'purple';

export const findVoteAvgColor = value =>
  value < 5 ? 'red' : value < 8 ? 'green' : 'purple';

export const findPopularityColor = value =>
  value < 500 ? 'red' : value < 1000 ? 'green' : 'purple';
