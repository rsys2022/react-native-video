export function getAllResolutions(player) {
  let list = player.getVariantTracks();
  const listHt = list.map(({ height }) => height);
  const activeEl = list.find((findEl) => findEl.active);
  list = list.filter(
    ({ height }, index) => !listHt.includes(height, index + 1)
  );
  let updatatedList = list.map((element) => {
    return {
      height: element.height,
      active: element.height === activeEl.height,
    };
  });
  return updatatedList;
}

export function getAllLanguages(player) {
  let languageList = player.getAudioLanguagesAndRoles();
  let varientList = player.getVariantTracks();
  const activeElement = varientList.find((findEl) => findEl.active);
  const filteredList = languageList.filter(value => value.label !== "und")
  if(filteredList.length === 0){
    return filteredList;
  }
  let updatatedList = languageList.map((element) => {
    return {
      ...element,
      active: element.language === activeElement.language,
    };
  });
  return updatatedList;
}
