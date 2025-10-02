export default function useMenuApi() {
  const getMenu = async (menuName: string) => {
    const menu = await useFetch("/api/menu", {
      method: "GET",
      params: {
        menu: menuName,
      },
    });

    return menu;
  };

  return { getMenu };
}
