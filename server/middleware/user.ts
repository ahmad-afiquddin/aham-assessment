import { User } from "@prisma/client";
import { getPortfolio } from "../utils/portfolio";
import { getUserToken } from "../utils/token";

export default defineEventHandler(async (event) => {
  // ...
  const user = getUserToken(event);

  if (user) {
    event.context.user = user;

    const portfolio = await getPortfolio((user as unknown as User)?.id);

    if (portfolio) {
      event.context.portfolio = portfolio;
    } else {
      event.context.portfolio = null;
    }
  } else {
    event.context.user = null;
  }
});
