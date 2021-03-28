import request from '@/utils/request';

export async function getMenuData(): Promise<any> {
  return request('/proxy/getMenu', {
    method: 'POST',
  });
}
