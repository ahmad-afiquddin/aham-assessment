export default function () {
  return {
    storeUser(user?: Record<string, any>) {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    },
    getUser(): Record<string, any> | null {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user") as unknown as string);
      } else {
        return null;
      }
    },
  };
}
