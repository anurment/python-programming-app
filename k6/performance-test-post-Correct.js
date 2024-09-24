//get assignment page

import http from "k6/http";

export const options = {
  duration: "10s",
  vus: 10,
  summaryTrendStats: ["med", "p(99)"],
  summaryTimeUnit: 'us',
};

export default function () {
  http.post(
    "http://localhost:7800/api/programming-assingment/1/user/1",
    JSON.stringify({ code: `def hello(): return "Hello"` })
  );
};