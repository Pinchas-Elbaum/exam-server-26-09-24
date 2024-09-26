"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFromFile = void 0;
const fs_1 = __importDefault(require("fs"));
const filePath = "C:\\Users\\1\\Desktop\\Kodkode\\fullStack\\exams\\26_09_24\\data.json";
const readFromFile = () => {
    const data = fs_1.default.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};
exports.readFromFile = readFromFile;
