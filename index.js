"use strict";
import fs from "fs/promises";
import * as cheerio from "cheerio";
import chalk from "chalk";
const highVis = chalk.bgYellow;
const errVis = chalk.white.bgRed;

async function read(source) {
    try {
        const data = await fs.readFile(source, { encoding: "utf8" });
        return data;
    } catch (error) {
        console.log(errVis("'Read' Error") + "\n" + error);
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

function strConstruct(bookTitle, data) {
    let str = bookTitle;
    for (let i = 0; i < data.length; i++) {
        let x = `\n\n **Page:** ${data[i].page} \n **Quote:** ${
            data[i].quote !== "" ? "\n >" : ""
        } ${data[i].quote} \n\n **Comment:** \n ${data[i].comment} \n\n`;

        str = str + x;
    }
    return str;
}

async function execute(newFile, newData, encoding) {
    try {
        fs.writeFile(newFile, newData, encoding);
    } catch (error) {
        console.log(errVis("'Execute' Error") + "\n" + error);
    }
}

async function main(source, outputPath, bookTitle) {
    try {
        const parsedData = htmlParser(await read(source));
        const outputData = strConstruct(bookTitle, parsedData);

        await execute(outputPath, outputData, "utf-8");
        console.log(chalk.yellow("Success!"));
    } catch (error) {
        console.log(chalk.yellow("Failure!"));
    }
}

main(".\\test-file-2.html", ".\\test-output-2.md", "Frankenstein"); //source, outputPath, bookTitle
