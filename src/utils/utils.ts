
import fs from 'fs';
import { beeper } from '../models/model';

const filePath = "C:\\Users\\1\\Desktop\\Kodkode\\fullStack\\exams\\26_09_24\\data.json";

export const readFromFile = () : beeper[] => {
    const data: string = fs.readFileSync(filePath, 'utf-8'); 
    return JSON.parse(data).beepers; 
};

export const writeToFile = (beepers: beeper[]) => {
    const data: string = JSON.stringify({ beepers }, null, 2);
    fs.writeFileSync(filePath, data, 'utf-8'); 
};
