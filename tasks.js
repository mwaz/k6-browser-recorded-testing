// Creator: k6 Browser Recorder 0.6.0

import { sleep, group, check } from "k6";
import http from "k6/http";

export const options = { vus: 1, duration: "0.5m" };

export default function main() {
  let response;

  group("All tasks", function () {
    response = http.get("https://k6tasks.herokuapp.com/api/v1/tasks", {
      headers: {
        host: "k6tasks.herokuapp.com",
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.5",
        "accept-encoding": "gzip, deflate, br",
        dnt: "1",
        connection: "keep-alive",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
      },
    });
    check(response, {
      "Request is successful": (res) => res.status === 200,
    });
    check(response, {
      "Response body length is always consistent": (r) => r.body.length === 593,
    });
  });
  sleep(8);
  group("Complete and Incomplete tasks", function () {
    response = http.get("https://k6tasks.herokuapp.com/api/v1/tasks", {
      headers: {
        host: "k6tasks.herokuapp.com",
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.5",
        "accept-encoding": "gzip, deflate, br",
        dnt: "1",
        connection: "keep-alive",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
      },
    });

    check(response, {
      "Complete tasks present": (r) => r.body.includes("Wash dishes"),
    });
    sleep(5.4);
    response = http.get("https://k6tasks.herokuapp.com/api/v1/tasks", {
      headers: {
        host: "k6tasks.herokuapp.com",
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.5",
        "accept-encoding": "gzip, deflate, br",
        dnt: "1",
        connection: "keep-alive",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
      },
    });
      check(response, {
        "Incomplete tasks present": (r) => r.body.includes("Do Laundry"),
      });
  });
}
