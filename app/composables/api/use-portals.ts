import { handleError, internalServerError } from 'api-client/api-error';
import type { Menu as Portal } from '~~/types/menu';
import { MENUS as PORTALS } from '~~/constants/api-paths';

const handleErrorState = ({
  error,
  ...rest
}: {
  [key: string]: any;
  error: any;
}) => {
  if (error.value) throw error.value;
  return rest;
};

export default function useMeetingsApi() {
  const getPortals = async (menu: string): Promise<Portal[]> => {
    const { data } = await useFetch<Portal[]>(PORTALS, {
      params: { menu }
    }).then(handleErrorState);

    return data.value;
  };

  return { getPortals };
}
