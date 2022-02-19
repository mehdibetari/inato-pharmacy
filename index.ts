import { writeFile } from "fs";
import { updateBenefitValue } from "./src/pharmacy";
import { drugs } from "./data";

const logs: Array<string> = [];

// todo move to functionnal loop
for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  logs.push(JSON.stringify(updateBenefitValue(drugs)));
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
