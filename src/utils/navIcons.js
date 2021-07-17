import Icons from 'react-native-vector-icons/MaterialIcons';
import theme from '../config/theme';

const preloadIcons = {
  home: [30, theme.$navBarButtonColor],
  favorite: [30, theme.$navBarButtonColor],
  person: [30, theme.$navBarButtonColor],
  'shopping-cart': [30, theme.$navBarButtonColor],
  menu: [30, theme.$navBarButtonColor],
  search: [30, theme.$navBarButtonColor],
  share: [30, theme.$navBarButtonColor],
  close: [30, theme.$navBarButtonColor],
  delete: [30, theme.$navBarButtonColor],
  create: [30, theme.$navBarButtonColor],
  'more-horiz': [30, theme.$navBarButtonColor],
  add: [30, theme.$navBarButtonColor],
  'keyboard-arrow-right': [40, theme.$navBarButtonColor],
};

const iconsMap = {};

async function prepareIcons() {
  const icons = await Promise.all(
    Object.keys(preloadIcons).map((iconName) =>
      Icons.getImageSource(
        iconName,
        preloadIcons[iconName][0],
        preloadIcons[iconName][1],
      ),
    ),
  );

  Object.keys(preloadIcons).forEach((iconName, idx) => {
    iconsMap[iconName] = icons[idx];
  });

  return iconsMap;
}

export { iconsMap, prepareIcons };
