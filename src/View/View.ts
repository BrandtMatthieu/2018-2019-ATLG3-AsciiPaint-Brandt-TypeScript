import * as ReadLine from "readline";
import * as Controller from "../Controller/Controller";
import Canvas from "../Model/Canvas";
import Pixel from "../Model/Pixel";

export const rl = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt(`\n\nEnter a command :\n> `);

rl.on(`line`, (commande: string) => {
    Controller.onAnswer(commande);
    rl.prompt();
});

export function clearScreen(): void {
    process.stdout.write(`\x1Bc`);
}

export function question(query): Promise<string> {
    return new Promise<string>(async (resolve) => {
        await rl.question(`${query} :\n> `, (value) => {
            rl.close();
            resolve(value);
        });
    });
}

export function display(canvas: Canvas): void {
    this.clearScreen();
    displayHeader();
    if (canvas.id === Controller.myView.currentCanvasId) {
        console.log(`You are working in the current canvas`);
    } else {
        console.log(`Warning, you are working in your current canvas`);
    }
    console.log(` ↓ Canvas id: ${canvas.id}`);
    let line = ``;
    if (canvas.border) {
        for (let i = 1; i < canvas.sizeX + 2; i++) {
            line += `-`;
        }
        console.log(line);
    }
    for (let j = 1; j < canvas.sizeY; j++) {
        console.log(`${canvas.border ? `|` : ``}` +
        replaceLine(canvas.canvas[j], canvas.defaultValue) + `${canvas.border ? `|` : ``}`);
    }
    if (canvas.border) {
        console.log(line);
    }
    console.log(`\n`);
}

export function replaceLine(line: Pixel[], defaultValue: string): string {
    let lineStr = ``;
    for (let j = 1; j < line.length; j++) {
        if (line[j].value == null) {
            lineStr += defaultValue;
        } else {
            lineStr += line[j].value;
        }
    }
    return lineStr;
}

export function displayWelcome(): void {
    console.log(`Welcome in AsciiArt.\nType "help" to get a list of all commands.`);
}

export function displayHeader(): void {
    console.log(
"     ______    ______    ______   ______  ______   ______              __     \n" +
"    /      \\  /      \\  /      \\ |      \\|      \\ /      \\            |  \\    \n" +
"    |  $$$$$$\\|  $$$$$$\\|  $$$$$$\\ \\$$$$$$ \\$$$$$$|  $$$$$$\\  ______  _| $$_   \n" +
"    | $$__| $$| $$___\\$$| $$   \\$$  | $$    | $$  | $$__| $$ /      \\|   $$ \\  \n" +
"    | $$    $$ \\$$    \\ | $$        | $$    | $$  | $$    $$|  $$$$$$\\\\$$$$$$  \n" +
"    | $$$$$$$$ _\\$$$$$$\\| $$   __   | $$    | $$  | $$$$$$$$| $$   \\$$ | $$ __ \n" +
"    | $$  | $$|  \\__| $$| $$__/  \\ _| $$_  _| $$_ | $$  | $$| $$       | $$|  \\\n" +
"    | $$  | $$ \\$$    $$ \\$$    $$|   $$ \\|   $$ \\| $$  | $$| $$        \\$$  $$\n" +
"     \\$$   \\$$  \\$$$$$$   \\$$$$$$  \\$$$$$$ \\$$$$$$ \\$$   \\$$ \\$$         \\$$$$\n\n");
}

export function displayHistory(canvas: Canvas) {
    if (canvas.history.length === 0) {
        console.log(`No history found for this canvas.`);
    } else {
        console.log(`History for canvas id: ${canvas.id}`);
        canvas.history.forEach((element, index) => {
            console.log(`\t${index + 1}. ${element}`);
        });
    }
}

export function displayExit(): void {
    console.log(`Exiting AsciiArt.\nThanks for using it.`);
}

