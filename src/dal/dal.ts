import {readFromFile, writeToFile} from "../utils/utils";
import {beeper} from "../models/model";



export const getAllBeepersDal = () : beeper[] => {
    const beepers: beeper[] = readFromFile();
    return beepers;
}

export const getBeeperByIdDal = (id: number) => { 
    const beepers: beeper[] = readFromFile();
    const beeper: beeper | undefined = beepers.find((b: beeper) => b.id === id);
    return beeper;
}

export const createBeeperDal = (beeper: beeper) => {
    const beepers: beeper[] = readFromFile();
    console.log(beeper);
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
    const beepers: beeper[] = readFromFile();
    const index: number = beepers.findIndex((b: beeper) => b.id === id);
    beepers.splice(index, 1);
    writeToFile(beepers);
}
