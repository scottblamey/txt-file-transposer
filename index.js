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

/*
<div id="0268C394-D6DC-5AAA-843C-E7199A3A9550" class="bookmark bm-color-none">
      <p class="bm-page">22</p>
      <div class="bm-text">
            <p>To understand the meaning of this afterlife, you must remember that everyone is multifaceted. And since you always lived inside your own head, you were much better at seeing the truth about others than you ever were at seeing yourself. So you navigated your life with the help of others who held up mirrors for you. People praised your good qualities and criticized your bad habits, and these perspectives—often surprising to you—helped you to guide your life. So poorly did you know yourself that you were always surprised at how you looked in photographs or how you sounded on voice mail</p>
      </div>
      <div class="bm-note">
            <p>tour perception of yourself is entirely a reflection of others perceptions of you. if this is true then what are you other than the perceptions others have of you and if others hold no perceptions of you then what are you? do you exist?</p>
      </div>
    </div>
<div>

<div>
    <p>page Number<p>
    <div>
        <p>qutoe<p>
    <div>
    <div>
        <p>comment<p>
    <div>
<div>
            $("div:has(p):eq(19) > p:first").text(),
            $("div:has(p):eq(19)").children().eq(2).text(),
            $("div:has(p):eq(19)").children().eq(3).text()
*/

function htmlParser(data) {
    const $ = cheerio.load(data);

    function objConstructor(page, quote, comment) {
        //constructor f
        this.page = page;
        this.quote = quote;
        this.comment = comment;
    }

    const newData = [];

    for (let i = 0; $("div:has(p):eq(" + i + ")").length > 0; i++) {
        let page = `"div:has(p):eq(${i}) > p:first"`;
        let quote = `"div:has(p):eq(${i})"`;
        let comment = `"div:has(p):eq(${i})"`;

        testObj = new objConstructor( //calling constructor function
            $(page).text(),
            $(quote).children().eq(2).text(),
            $(comment).children().eq(3).text()
        );
        newData.push(testObj);
    }
    console.log(newData);

    // console.log(chalk.bgGray.yellow("TESTOBJ.PAGE: ") + testObj.page);
    // console.log(
    //     chalk.bgGray.yellow("EXISTS?: ") + $("div:has(p):eq(40)").length
}

async function execute(newName, newPath, newData) {
    try {
        fs.writeFile(newName, newPath, newData);
    } catch (error) {
        console.log(errVis("'Execute' Function Error") + { error });
    }
}

async function main(inputPath /*outputFileName*/) {
    const outputData = htmlParser(await read(inputPath));

    //await execute(outputFileName, outputData);
}

main("Sum Forty Tales from the Afterlives.html", "outputData.md");
