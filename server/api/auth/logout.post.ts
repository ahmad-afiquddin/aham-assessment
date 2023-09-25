export default defineEventHandler((event) => {
  deleteCookie(event, "__session");

  return true;
});
