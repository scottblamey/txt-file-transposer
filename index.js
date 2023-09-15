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
function htmlParser(data) {
    const newData = data;
    return newData;
}

//write function - pass in newData
async function execute(newName, newPath, newData) {
    try {
        fs.writeFile(newName, newPath, newData);
    } catch (error) {
        console.log({ error });
    }
}

const x = read("Sum Forty Tales from the Afterlives.html");
const y = await htmlParser(x);

await execute("outputData.md", y);
