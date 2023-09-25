import { getUserToken } from "../utils/token";

export default defineEventHandler((event) => {
  // ...
  const user = getUserToken(event);

  if (user) {
    event.context.user = user;
  } else {
    event.context.user = null;
  }
});
