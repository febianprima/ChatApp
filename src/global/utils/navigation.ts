import { ParamListBase, RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { StyleProp, ViewStyle } from 'react-native';

import { TAB_BAR_VISIBLE_SCREENS } from '../constants/navigation';

/**
 * Returns the appropriate tab bar style based on the current route.
 * Hides the tab bar for nested screens that are not in TAB_BAR_VISIBLE_SCREENS.
 */
export function getTabBarVisibility<T extends ParamListBase>(
  route: RouteProp<T, keyof T & string>,
): StyleProp<ViewStyle> {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (TAB_BAR_VISIBLE_SCREENS.includes(routeName)) {
    return null;
  }

  return { display: 'none' };
}
