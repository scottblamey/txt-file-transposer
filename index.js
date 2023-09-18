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
const parsedData = [];

function htmlParser(data) {
    const $ = cheerio.load(data);

    function objConstruct(page, quote, comment) {
        this.page = page;
        this.quote = quote;
        this.comment = comment;
    }

    for (let i = 0; i < 10; i++) {
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
}

function strConstruct(data) {
    let str = `###Book 1 /n Page: ${parsedData[9].page} /n Quote: ${parsedData[9].quote} /n Comment: ${parsedData[9].comment}`;

    return str;
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

    await execute(outputFileName, ".\\", strConstruct(parsedData));
}

main("Sum Forty Tales from the Afterlives.html", "outputData.md");
