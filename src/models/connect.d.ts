import type { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { UserModelState } from './user';
import { MenuModelState } from './menu';
import type { StateType } from './login';

export { GlobalModelState, UserModelState };

export type Loading = {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
};

export type ConnectState = {
  global: GlobalModelState;
  loading: Loading;
  settings: ProSettings;
  user: UserModelState;
  login: StateType;
  menu: MenuModelState;
};

export type Route = {
  routes?: Route[];
} & MenuDataItem;
