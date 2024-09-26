import {readFromFile} from "../utils/utils";
import {beeper} from "../models/model";
import { promises } from "dns";

const users: beeper[] = readFromFile();

console.log(users)

export const getAllBeepersDal = () : beeper[] => {
    return users;
}
