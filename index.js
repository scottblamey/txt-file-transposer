import fs from "fs/promises";
import * as cheerio from "cheerio";
import chalk from "chalk";
const highVis = chalk.red.bold.bgWhite;

//read function - pass in file path - returns str

async function read(path) {
    try {
        const data = await fs.readFile(path, { encoding: "utf8" });
        //console.log(highVis(`data: ${data}`));
        return data;
    } catch (error) {
        console.log({ error });
    }
}

//HTML parser
async function htmlParser(data) {
    const newData = await data;
    return newData;
}

//write function - pass in newData
async function execute(newName, newPath, newData) {
    try {
        fs.writeFile(newName, newPath, newData);
    } catch (error) {
        console.log({ error });
    }
    console.log(highVis(`newData: ${newData}`));
}

const x = read("Sum Forty Tales from the Afterlives.html");

const y = htmlParser(x);

execute("outputData.md", newData);

/* read function succesfully reads file and saves it to the data variable. however the html parser is returning undefined. i think this means the parser needs to wait for read function's promise to be forfilled before assigning the 'data' var to 'newData' - unsure how to do this... */
