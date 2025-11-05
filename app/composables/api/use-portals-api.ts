import type { Portal } from '~~/types/portal';
import { PORTALS } from '~~/constants/api-paths';

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

export default function usePortalsApi() {
  const getPortals = async (portal: string): Promise<Portal[]> => {
    const { data } = await useFetch<Portal[]>(PORTALS, {
      params: { portal }
    }).then(handleErrorState);

    return data.value;
  };

  return { getPortals };
}
