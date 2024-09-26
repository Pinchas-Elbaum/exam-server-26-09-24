
import fs from 'fs';

const filePath = "C:\\Users\\1\\Desktop\\Kodkode\\fullStack\\exams\\26_09_24\\data.json";

export const readFromFile = () => {
    const data: string = fs.readFileSync(filePath, 'utf-8'); 
    return JSON.parse(data); 
};