"use strict";
import fs from "fs/promises";
import * as cheerio from "cheerio";
import chalk from "chalk";
const highVis = chalk.bgYellow;
const errVis = chalk.white.bold.bgRed;

async function read(inputPath) {
    try {
        const data = await fs.readFile(inputPath, { encoding: "utf8" });
        return data;
    } catch (error) {
        console.log(errVis("'Read' Function Error") + { error });
    }
}

function htmlParser(data) {
    const $ = cheerio.load(data);
    const parsedData = [];

    function objConstruct(page, quote, comment) {
        this.page = page;
        this.quote = quote;
        this.comment = comment;
    }

    for (
        let i = 0;
        $("div.bookmark:eq(" + i + ") > .bm-page").length !== 0;
        i++
    ) {
        let obj = {};
        let $page = "div.bookmark:eq(" + i + ") > .bm-page";
        let $quote = "div.bookmark:eq(" + i + ") > .bm-text > p";
        let $comment = "div.bookmark:eq(" + i + ") > .bm-note > p";

        obj = new objConstruct(
            $($page).text(),
            $($quote).text(),
            $($comment).text()
        );
        parsedData.push(obj);
    }
    return parsedData;
}

function strConstruct(data) {
    console.log(`bla bla ${data[8].page}`);
    //return `bla bla ${data[1].quote}`;
    //console.log(data[9].page);
    let str = `### Book 1 \n\n Page: ${data[3].page} \n Quote: ${data[3].quote} \n Comment: ${data[3].comment}`;
    return str;
}

async function execute(newFile, newData, encoding) {
    try {
        fs.writeFile(newFile, newData, encoding);
    } catch (error) {
        console.log(errVis("'Execute' Function Error") + { error });
    }
}

async function main() {
    const parsedData = htmlParser(
        await read(".\\Sum Forty Tales from the Afterlives.html")
    );
    const outputData = strConstruct(parsedData);

    console.log(chalk.yellow(parsedData[1].quote));

    await execute(".\\outputData.md", outputData, "utf-8");
}

main();
