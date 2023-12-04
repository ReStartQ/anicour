export const handleMinMax = (
  e: any,
  min: number,
  max: number,
  setValueFunction: any,
) => {
  if (e.target.value <= min) {
    setValueFunction(min);
  }
  if (e.target.value >= max) {
    setValueFunction(max);
  }
  if (e.target.value >= min && e.target.value <= max) {
    setValueFunction(e.target.value);
  }
};

export const getEpisodesOrChapters = (data: any) => {
  if (data.type === 'ANIME') {
    return data.episodes;
  }
  return data.chapters;
};

export const getZeroOrNumberValue = (number: any) => {
  if (number === null) {
    return 0;
  }
  return number;
};

export const handleNotNumbersOrBackSpace = (e: any) => {
  if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 9) {
    console.log('number');
  } else {
    e.preventDefault();
  }
};

export const getMaxValueEpisodesOrChapters = (
  type: string,
  episodes: any,
  chapters: any,
) => {
  if (type === 'ANIME') {
    return episodes;
  }

  return chapters;
};
