import fs from "fs/promises";
import * as cheerio from "cheerio";
import chalk from "chalk";
const highVis = chalk.red.bold.bgWhite;
const errVis = chalk.white.bold.bgRed;

async function read(path) {
    try {
        const data = await fs.readFile(path, { encoding: "utf8" });
        return data;
    } catch (error) {
        console.log(errVis("'Read' Function Error") + { error });
    }
}

function htmlParser(data) {
    const $ = cheerio.load(data);

    function noteCreate(quote, comment) {
        this.quote = quote;
        this.comment = comment;
    }

    $("div p").each(function (i, element) {
        console.log(`Key: ${i} Element: ${element}`);
    });
    // console.log(highVis("CHEERIO TEST") + $p);
}

async function execute(newName, newPath, newData) {
    try {
        fs.writeFile(newName, newPath, newData);
    } catch (error) {
        console.log(errVis("'Execute' Function Error") + { error });
    }
}

async function main() {
    const x = await read("Sum Forty Tales from the Afterlives.html");
    const y = htmlParser(x);
    // await execute("outputData.md", y);
}

main();
