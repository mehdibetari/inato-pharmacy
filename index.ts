import { writeFile } from "fs";
import { DrugProps } from './types';
import { updateBenefitValue } from "./pharmacy";

const drugs: Array<DrugProps> = [
  {
    name: "Doliprane",
    expiresIn: 20,
    benefit: 30,
  },
  {
    name: "Herbal Tea",
    expiresIn: 10,
    benefit: 5,
  },
  {
    name: "Fervex",
    expiresIn: 5,
    benefit: 40,
  },
  {
    name: "Magic Pill",
    expiresIn: 15,
    benefit: 40,
  },
  {
    name: "Dafalgan",
    expiresIn: 15,
    benefit: 40,
  },
];

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
