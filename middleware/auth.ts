export default defineNuxtRouteMiddleware((to) => {
  const userStorage = useUser();
  const user = userStorage.getUser();
  if (!user && to.name === "portfolio") {
    return navigateTo("/login");
  } else if (user && to.name === "login") {
    return navigateTo("/portfolio");
  }
});
