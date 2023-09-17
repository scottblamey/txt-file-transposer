import fs from "fs/promises";
import * as cheerio from "cheerio";
import chalk from "chalk";
const highVis = chalk.bgYellow;
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

    function objConstructor(page, quote, comment) {
        //constructor f
        this.page = page;
        this.quote = quote;
        this.comment = comment;
    }

    const parsedData = [];

    for (let i = 0; $("div:has(p):eq(" + i + ")").length > 0; i++) {
        let testObj = {};
        let page = "div:has(p):eq(" + i + ") > p:first";
        let quote = "div:has(p):eq(" + i + ")";
        let comment = "div:has(p):eq(" + i + ")";

        testObj = new objConstructor(
            $(page).text(),
            $(quote).children().eq(2).text(),
            $(comment).children().eq(3).text()
        );
        parsedData.push(testObj);

        // console.log(
        //     highVis.bold(`parsedData.page >     ${i}:`) +
        //         `${parsedData[i].page}`
        // );
        // console.log(
        //     highVis(`parsedData.quote >    ${i}:`) + `${parsedData[i].quote}`
        // );
        // console.log(
        //     highVis(`parsedData.comment >  ${i}:`) + `${parsedData[i].comment}`
        // );
    }
    return parsedData;
}

async function execute(newName, newPath, newData) {
    try {
        fs.writeFile(newName, newPath, newData);
    } catch (error) {
        console.log(errVis("'Execute' Function Error") + { error });
    }
}

async function main(inputPath, outputFileName) {
    const outputData = htmlParser(await read(inputPath));

    await execute(outputFileName, outputData);
}

main("Sum Forty Tales from the Afterlives.html", "outputData.md");
