import {readFromFile, writeToFile} from "../utils/utils";
import {beeper} from "../models/model";



export const getAllBeepersDal = () : beeper[] => {
    const beepers: beeper[] = readFromFile();
    return beepers;
}

export const getBeeperByIdDal = (id: number) => { 
    try {
        const beepers: beeper[] = readFromFile();
        const beeper: beeper | undefined = beepers.find((b: beeper) => b.id === id);
        if (!beeper) {
            throw new Error('beeper not found');
        }
        return beeper;
    }
    catch (error) {
        console.log(error);
    }
}
   


export const createBeeperDal = (beeper: beeper) => {
    const beepers: beeper[] = readFromFile();
    beepers.push(beeper);
    writeToFile(beepers);
    return beepers;
}

export const updateBeeperStatusDal = (beeper: beeper) : void => {
    const beepers: beeper[] = readFromFile();
    const index: number = beepers.findIndex((b: beeper) => b.id === beeper.id);
    beepers[index] = beeper;
    writeToFile(beepers);
}



export const deleteBeeperDal = (id: number) : void => {
    try {
        const beepers: beeper[] = readFromFile();
        const index: number = beepers.findIndex((b: beeper) => b.id === id);
        if (index === -1) {
            throw new Error('beeper not found');
        }
        beepers.splice(index, 1);
        writeToFile(beepers);
    } catch (error) {
        console.log(error);
    }
    
}
