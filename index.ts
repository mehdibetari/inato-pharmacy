import { Pharmacy } from "./src/pharmacy";
import { drugs } from "./data";

import { writeFile } from "fs";

const trial = new Pharmacy(drugs);
const logs: Array<string> = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  logs.push(JSON.stringify(trial.updateBenefitValue()));
}

const output = logs.toString();

/* eslint-disable no-console */
writeFile("output.txt", output, (err) => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
