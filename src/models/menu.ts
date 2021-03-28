import type { Effect, Reducer } from 'umi';
import { getMenuData } from '@/services/menu';
import type { MenuDataItem } from '@ant-design/pro-layout';

export interface MenuModelState {
  menuData: MenuDataItem[];
  loading: boolean;
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    fetchMenu: Effect;
  };
  reducers: {
    saveMenuData: Reducer<MenuModelState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',
  state: {
    menuData: [],
    loading: true,
  },
  effects: {
    *fetchMenu(_, { call, put }) {
      const response = yield call(getMenuData);
      yield put({
        type: 'saveMenuData',
        payload: response,
      });
    },
  },
  reducers: {
    saveMenuData(state, action) {
      return {
        ...state,
        menuData: action.payload || [],
        loading: false,
      };
    },
  },
};

export default MenuModel;
