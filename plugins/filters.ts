import dayjs from "dayjs";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      filters: {
        toDateTime: (dateString: string, format?: string): string => {
          try {
            return dayjs(dateString).format(format || "DD/MM/YY");
          } catch (err) {
            console.error(err);
            return "N/A";
          }
        },
      },
    },
  };
});
