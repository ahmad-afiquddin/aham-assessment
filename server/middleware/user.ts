import { getUserToken } from "../utils/token";

export default defineEventHandler(async (event) => {
  // ...
  const user = getUserToken(event);

  if (user) {
    event.context.user = user;
  } else {
    event.context.user = null;
  }
});
