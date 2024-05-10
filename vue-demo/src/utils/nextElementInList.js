const nextElementInList = (list, value) => {
  const currentKeyword = list.indexOf(value);
  const nextKeyword = (currentKeyword + 1) % list.length;
  const finalKeyword = list[nextKeyword];
  return finalKeyword;
};

export default nextElementInList;
