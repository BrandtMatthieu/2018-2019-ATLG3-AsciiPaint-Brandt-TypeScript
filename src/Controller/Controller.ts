import ShapeType from "../Model/ShapeType";
import View from "../Model/Viewport";
import * as vue from "./../View/View";

import { NoArgumuments } from "../Model/Error/NoArgumentsError";
import { TooFewArguments } from "../Model/Error/TooFewArguments";
import { TooManyArguments } from "../Model/Error/TooManyArguments";
import { UnknownCommand } from "../Model/Error/UnknownCommandError";
import { UnknownShape } from "../Model/Error/UnknownShapeError";


export let myView: View;
export let inputReponse: string[];
export let inputCommand: string;
export let inputArgs: string[];

export function start(): void {
    myView = new View();
    vue.clearScreen();
    vue.displayHeader();
    vue.displayWelcome();
    vue.rl.prompt();
}

export function onAnswer(answer: string): Promise<void> {
    const args: any[] = answer.toString().trim().split(` `).filter(() => true);
    return new Promise<void>((resolve) => {
        switch (args[0].toLowerCase()) {
            case `add`:
                {
                    // add ?(canvasId) @shape @shapeArgs
                    // TODO
                    if (args[1].toLowerCase() === `canvas`) { // add canvas ?(width) ?(height) ?[default] ?<border> ?<grid>
                        if (this.hasGoodNumberArguments(2, 7, args)) {
                            if (args[2]) {
                                switch (args[2].toLowerCase()) {
                                    case `default`:
                                        args[2] = myView.defaultSizeX;
                                        break;
                                    default:
                                        args[2] = Number.parseInt(args[2] + 1, 10);
                                }
                            } else {
                                args[2] = myView.defaultSizeX;
                            }
                            if (args[3]) {
                                switch (args[3].toLowerCase()) {
                                    case `default`:
                                        args[3] = myView.defaultSizeY;
                                        break;
                                    default:
                                        args[3] = Number.parseInt(args[3] + 1, 10);
                                }
                            } else {
                                args[3] = myView.defaultSizeY;
                            }
                            if (args[4]) {
                                switch (args[4].toLowerCase()) {
                                    case `space`:
                                        args[4] = ` `;
                                        break;
                                    case `null`:
                                        args[4] = null;
                                        break;
                                    case `default`:
                                        args[4] = myView.defaultValue;
                                        break;
                                    default:
                                        args[4] = args[4].toString().substring(0, 1);
                                }
                            } else {
                                args[4] = myView.defaultValue;
                            }
                            if (args[5]) {
                                switch (args[5]) {
                                    case `true`:
                                        args[5] = true;
                                        break;
                                    case `false`:
                                        args[5] = false;
                                        break;
                                    case `default`:
                                        args[5] = myView.defaultBorder;
                                        break;
                                    default:
                                        try {
                                            throw new UnknownCommand();
                                        } catch (error) {
                                            console.error(error.toString());
                                        }
                                }
                            } else {
                                args[5] = myView.defaultBorder;
                            }
                            if (args[6]) {
                                switch (args[6]) {
                                    case `true`:
                                        args[6] = true;
                                        break;
                                    case `false`:
                                        args[6] = false;
                                        break;
                                    case `default`:
                                        args[6] = myView.defaultGrid;
                                        break;
                                    default:
                                        try {
                                            throw new UnknownCommand();
                                        } catch (error) {
                                            console.error(error.toString());
                                        }
                                }
                            } else {
                                args[6] = myView.defaultGrid;
                            }
                            myView.addCanvas(args[2], args[3], args[4], args[5], args[6], (myView.canvasIdCount + 1));
                            vue.display(myView.getCurrentCanvas().render());
                            myView.getCurrentCanvas().addToHistory(args);
                        }
                    } else if (Object.keys(ShapeType).includes(args[1][0].toUpperCase() + args[1].substring(1))) {
                        myView.getCurrentCanvas().addShape(args);
                        vue.display(myView.getCurrentCanvas().render());
                        myView.getCurrentCanvas().addToHistory(args);
                    } else {
                        try {
                            throw new UnknownShape();
                        } catch (error) {
                            console.error(error.toString());
                        }
                    }
                }
                break;
            case `remove`: // remove ?(canvasId) (shapeId)
                {
                    if (hasGoodNumberArguments(2, 3, args)) {
                        if (args.length === 2) {
                            args.splice(1, 0, myView.currentCanvasId);
                        }
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).removeShapeWithId(Number.parseInt(args[2], 10));
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).addToHistory(args);
                        vue.display(myView.getCurrentCanvas().render());
                    }
                }
                break;
            case `move`: // move ?(canvasId) (shapeId) (dx) (dy)
                {
                    if (hasGoodNumberArguments(4, 5, args)) {
                        if (args.length === 4) {
                            args.splice(1, 0, myView.currentCanvasId);
                        }
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).getShapeWithId(Number.parseInt(args[2], 10)).move(
                            Number.parseFloat(args[3]),
                            Number.parseFloat(args[4]));
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).addToHistory(args);
                        vue.display(myView.getCurrentCanvas().render());
                    }
                }
                break;
            case `resize`:
                // TODO
                // resize canvas, viewport or sahape?
                vue.display(myView.getCurrentCanvas().render());
                break;
            case `list`: // list [shapes]/[canvases] ?(canvasId)
                {
                    if (hasGoodNumberArguments(2, 3, args)) {
                        switch (args[1].toLowerCase()) {
                            case `shapes`:
                                if (args.length === 2) {
                                    args.splice(2, 0, myView.currentCanvasId);
                                }
                                myView.getCanvasWithId(Number.parseInt(args[2], 10)).listShapes();
                                myView.getCanvasWithId(Number.parseInt(args[2], 10)).addToHistory(args);
                                break;
                            case `canvases`:
                                myView.listCanvases();
                                break;
                            default:
                                try {
                                    throw new UnknownCommand();
                                } catch (error) {
                                    console.error(error.toString());
                                }
                        }
                    }
                }
                break;
            case `show`: // show ?(canvasId)
                {
                    if (hasGoodNumberArguments(1, 2, args)) {
                        if (args.length === 1) {
                            args.splice(1, 0, myView.currentCanvasId);
                        }
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).addToHistory(args);
                        vue.display(myView.getCanvasWithId(Number.parseInt(args[1], 10)).render());
                    }
                }
                break;
            case `clear`:
                {
                    // clear ?(canvasId)
                    // TODO
                    if (args.length === 1) {
                        args.splice(1, 0, myView.currentCanvasId);
                    }
                    myView.getCanvasWithId(Number.parseInt(args[1], 10)).clearShapes();
                    myView.getCanvasWithId(Number.parseInt(args[1], 10)).addToHistory(args);
                    vue.display(myView.getCurrentCanvas().render());
                }
                break;
            case `canvas`: // canvas (id)
                {
                    if (hasGoodNumberArguments(2, 2, args)) {
                        myView.currentCanvasId = Number.parseInt(args[1], 10);
                        vue.display(myView.getCurrentCanvas().render());
                    }
                }
                break;
            case `fill`: // fill ?(CanvasId) (id) [newFill]
                {
                    if (hasGoodNumberArguments(3, 4, args)) {
                        if (args.length === 3) {
                            args.splice(1, 0, myView.currentCanvasId);
                        }
                        switch (args[3].toLowerCase()) {
                            case `space`:
                                args[3] = ` `;
                                break;
                            case `null`:
                                args[3] = null;
                                break;
                            default:
                                args[3] = args[3].substring(0, 1);
                        }
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).getShapeWithId(Number.parseInt(args[2], 10)).fill = args[3];
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).addToHistory(args);
                        vue.display(myView.getCurrentCanvas().render());
                    }
                }
                break;
            case `outline`: // outline ?(CanvasId) (id) [newOutline]
                {
                    if (hasGoodNumberArguments(3, 4, args)) {
                        if (args.length === 3) {
                            args.splice(1, 0, myView.currentCanvasId);
                        }
                        switch (args[3].toLowerCase()) {
                            case `space`:
                                args[3] = ` `;
                                break;
                            case `null`:
                                args[3] = null;
                                break;
                            default:
                                args[3] = args[3].substring(0, 1);
                        }
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).getShapeWithId(Number.parseInt(args[2], 10)).outline = args[3];
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).addToHistory(args);
                        vue.display(myView.getCurrentCanvas().render());
                    }
                }
                break;
            case `up`: // up ?(canvasId) (shapeId)
                {
                    if (hasGoodNumberArguments(2, 3, args)) {
                        if (args.length === 2) {
                            args.splice(1, 0, myView.currentCanvasId);
                        }
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).moveSahpeWithIdUp(Number.parseInt(args[2], 10));
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).addToHistory(args);
                        vue.display(myView.getCurrentCanvas().render());
                    }
                }
                break;
            case `down`: // down ?(canvasId) (shapeId)
                {
                    if (hasGoodNumberArguments(2, 3, args)) {
                        if (args.length === 2) {
                            args.splice(1, 0, myView.currentCanvasId);
                        }
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).moveSahpeWithIdDown(Number.parseInt(args[2], 10));
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).addToHistory(args);
                        vue.display(myView.getCurrentCanvas().render());
                    }
                }
                break;
            case `front`: // front ?(canvasId) (shapeId)
                {
                    if (hasGoodNumberArguments(2, 3, args)) {
                        if (args.length === 2) {
                            args.splice(1, 0, myView.currentCanvasId);
                        }
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).moveSahpeWithIdFront(Number.parseInt(args[2], 10));
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).addToHistory(args);
                        vue.display(myView.getCurrentCanvas().render());
                    }
                }
                break;
            case `back`: // back ?(canvasId) (shapeId)
                {
                    if (hasGoodNumberArguments(2, 3, args)) {
                        if (args.length === 2) {
                            args.splice(1, 0, myView.currentCanvasId);
                        }
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).moveSahpeWithIdBack(Number.parseInt(args[2], 10));
                        myView.getCanvasWithId(Number.parseInt(args[1], 10)).addToHistory(args);
                        vue.display(myView.getCurrentCanvas().render());
                    }
                }
                break;
            case `history`: // history ?(canvasId)
                {
                    if (hasGoodNumberArguments(1, 2, args)) {
                        if (args.length === 1) {
                            args.splice(1, 0, myView.currentCanvasId);
                        }
                        vue.displayHistory(myView.getCanvasWithId(Number.parseInt(args[1], 10)));
                    }
                }
                break;
            case `help`: // help ?[commande]
                /*
                let command = commands;
                for (const arg of args) {
                    if (command.name === arg) {
                        
                    }
                }
                */
                break;
            case `exit`:
            case `quit`:
                vue.displayExit();
                process.exit();
            default:
                try {
                    throw new UnknownCommand();
                } catch (error) {
                    console.error(error.toString());
                }
        }
        resolve();
    });
}

export const commands = {
    name: "help",
    description: "displays all avaliable commands with help",
    accepted: [
        {
            name: "add",
            description: "adds a shape to a canvas",
            accepted: [
                {
                    name: "canvas",
                    description: "adds a new canvas",
                    arguments: [
                        {
                            name: "(width)",
                            description: "the width of the canvas",
                            accepted: [
                                {
                                    name: "positive number (>=0)",
                                    description: "the width of the canvas in characters",
                                },
                                {
                                    name: "\"default\"",
                                    description: "a default width for the canvas (80)",
                                },
                            ],
                            required: false,
                        },
                        {
                            name: "(height)",
                            description: "the height of the canvas",
                            accepted: [
                                {
                                    name: "positive number (>=0)",
                                    description: "the height of the canvas in characters",
                                },
                                {
                                    name: "\"default\"",
                                    description: "a default height for the canvas (50)",
                                },
                            ],
                            required: false,
                        },
                        {
                            name: "\"background\"",
                            description: "the background of the canvas",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the background",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the background",
                                },
                                {
                                    name: "\"default\"",
                                    description: "the default character for the background (period)",
                                },
                            ],
                            required: false,
                        },
                        {
                            name: "<border>",
                            description: "wether or not display the border of the canvas",
                            accepted: [
                                {
                                    name: "true",
                                    description: "displays the border of the canvas",
                                },
                                {
                                    name: "false",
                                    description: "does not display the border of the canvas",
                                },
                                {
                                    name: "default",
                                    description: "sets the default value to display the border of the canvas (true)",
                                },
                            ],
                            required: false,
                        },
                        {
                            name: "<grid>",
                            description: "wether or not display the grid next to the canvas",
                            accepted: [
                                {
                                    name: "true",
                                    description: "displays the grid next to the canvas",
                                },
                                {
                                    name: "false",
                                    description: "does not display the grid next to the canvas",
                                },
                                {
                                    name: "default",
                                    description: "sets the default value to display the grid of the canvas (false)",
                                },
                            ],
                            required: false,
                        },
                    ],
                },
                {
                    name: "ellipse",
                    description: "adds an ellipse to a canvas",
                    arguments: [
                        {
                            name: "(x)",
                            description: "the x position of the ellipse (center)",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the x position of the ellipse (center)",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(y)",
                            description: "the y position of the ellipse",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the y position of the ellipse (center)",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(radiusX)",
                            description: "the x radius of the ellipse",
                            accepted: [
                                {
                                    name: "positive number (>=0)",
                                    description: "the x radius of the ellipse",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(radiusY)",
                            description: "the y radius of the ellipse",
                            accepted: [
                                {
                                    name: "positive number (>=0)",
                                    description: "the y radius of the ellipse",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "\"fill\"",
                            description: "the fill of the ellipse",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the fill of the ellipse",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the fill of the ellipse",
                                },
                            ],
                            required: false,
                        },
                        {
                            name: "\"outline\"",
                            description: "the outline of the ellipse",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the outline of the ellipse",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the outline of the ellipse",
                                },
                            ],
                            required: false,
                        },
                    ],
                },
                {
                    name: "circle",
                    description: "adds a circle to a canvas",
                    arguments: [
                        {
                            name: "(x)",
                            description: "the x position of the circle (center)",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the x position of the circle (center)",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(y)",
                            description: "the y position of the circle",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the y position of the circle (center)",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(radius)",
                            description: "the radius of the circle",
                            accepted: [
                                {
                                    name: "positive number (>=0)",
                                    description: "the radius of the circle",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "\"fill\"",
                            description: "the fill of the circle",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the fill of the circle",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the fill of the circle",
                                },
                            ],
                            required: false,
                        },
                        {
                            name: "\"outline\"",
                            description: "the outline of the circle",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the outline of the circle",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the outline of the circle",
                                },
                            ],
                            required: false,
                        },
                    ],
                },
                {
                    name: "rectangle",
                    description: "adds a rectangle to a canvas",
                    arguments: [
                        {
                            name: "(x)",
                            description: "the x position of the rectangle (center)",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the x position of the rectangle (center)",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(y)",
                            description: "the y position of the rectangle",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the y position of the rectangle (center)",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(width)",
                            description: "the width of the rectangle",
                            accepted: [
                                {
                                    name: "positive number (>=0)",
                                    description: "the width of the rectangle",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(height)",
                            description: "the height of the rectangle",
                            accepted: [
                                {
                                    name: "positive number (>=0)",
                                    description: "the height of the rectangle",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "\"fill\"",
                            description: "the fill of the rectangle",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the fill of the rectangle",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the fill of the rectangle",
                                },
                            ],
                            required: false,
                        },
                        {
                            name: "\"outline\"",
                            description: "the outline of the rectangle",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the outline of the rectangle",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the outline of the rectangle",
                                },
                            ],
                            required: false,
                        },
                    ],
                },
                {
                    name: "square",
                    description: "adds a square to a canvas",
                    arguments: [
                        {
                            name: "(x)",
                            description: "the x position of the square (center)",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the x position of the square (center)",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(y)",
                            description: "the y position of the square",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the y position of the square (center)",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(size)",
                            description: "the size of the square",
                            accepted: [
                                {
                                    name: "positive number (>=0)",
                                    description: "the size of the square",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "\"fill\"",
                            description: "the fill of the square",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the fill of the square",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the fill of the square",
                                },
                            ],
                            required: false,
                        },
                        {
                            name: "\"outline\"",
                            description: "the outline of the square",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the outline of the square",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the outline of the square",
                                },
                            ],
                            required: false,
                        },
                    ],
                },
                {
                    name: "line",
                    description: "adds a line to a canvas",
                    arguments: [
                        {
                            name: "(x point 1)",
                            description: "the x position on the first point",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the x position of the first point of the line",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(y point 1)",
                            description: "the y position on the first point",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the y position of the first point of the line",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(x point 2)",
                            description: "the x position on the second point",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the x position of the second point of the line",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(y point 2)",
                            description: "the y position on the second point",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the y position of the second point of the line",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "\"fill\"",
                            description: "the fill of the line",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the fill of the line",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the fill of the line",
                                },
                            ],
                            required: false,
                        },
                        {
                            name: "\"outline\"",
                            description: "the outline of the line",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the outline of the line",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the outline of the line",
                                },
                            ],
                            required: false,
                        },
                    ],
                },
                {
                    name: "point",
                    description: "adds a point to a canvas",
                    arguments: [
                        {
                            name: "(x)",
                            description: "the x position on the point",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the x position of the point",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "(y)",
                            description: "the y position on the point",
                            accepted: [
                                {
                                    name: "any number",
                                    description: "the y position of the point",
                                },
                            ],
                            required: true,
                        },
                        {
                            name: "\"fill\"",
                            description: "the fill of the point",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the fill of the point",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the fill of the point",
                                },
                            ],
                            required: false,
                        },
                        {
                            name: "\"outline\"",
                            description: "the outline of the point",
                            accepted: [
                                {
                                    name: "any character (except space)",
                                    description: "the character that will be used for the outline of the point",
                                },
                                {
                                    name: "\"space\"",
                                    description: "a space character that will be used for the outline of the point",
                                },
                            ],
                            required: false,
                        },
                    ],
                },
            ],
        },
        {
            name: "remove",
            description: "removes a shape of a canvas",
            arguments: [
                {
                    name: "(canvas id)",
                    description: "the id of the canvas you want to remove a shape from",
                    accepted: [
                        {
                            name: "positive integer",
                            description: "the id of the canvas you want to remove a shape from",
                        },
                    ],
                    required: false,
                },
                {
                    name: "(shape id)",
                    description: "the id of the shape you want to remove",
                    accepted: [
                        {
                            name: "positive integer",
                            description: "the id of the shape you want to remove",
                        },
                    ],
                    required: true,
                },
            ],
        },
        {
            name: "move",
            description: "moves a shape in a canvas",
            arguments: [
                {
                    name: "(canvas id)",
                    description: "the id of the canvas you want to remove a shape from",
                    accepted: [
                        {
                            name: "positive integer",
                            description: "the id of the canvas you want to remove a shape from",
                        },
                    ],
                    required: false,
                },
                {
                    name: "(shape id)",
                    description: "the id of the shape you want to remove",
                    accepted: [
                        {
                            name: "positive integer",
                            description: "the id of the shape you want to remove",
                        },
                    ],
                    required: true,
                },
            ],
        },
        {
            // TODO
            name: "resize",
            description: "resizes a shape in a canvas",
            arguments: [],
        },
        {
            name: "list",
            description: "lists the shapes in a canvas or lists all canvases",
            accepted: [
                {
                    name: "shapes",
                    description: "lists all the shapes in a canvas",
                    arguments: [
                        {
                            name: "(canvas id)",
                            description: "the id of the canvas you want to list the shapes of",
                            required: false,
                        },
                    ],
                },
                {
                    name: "canvases",
                    description: "lists all canvases",
                },
            ],
        },
        {
            name: "show",
            description: "show a canvas",
            arguments: [
                {
                    name: "(canvas id)",
                    description: "the if of thr canvas you want to show",
                    required: false,
                },
            ],
        },
    ],
};
export function hasGoodNumberArguments(min: number, max: number, args: string[]): boolean {
    if (args.length === 0) {
        try {
            throw new NoArgumuments(min);
        } catch (error) {
            console.error(error.toString());
        }
        return false;
    } else if (args.length < min) {
        try {
            throw new TooFewArguments(min, args.length);
        } catch (error) {
            console.error(error.toString());
        }
        return false;
    } else if (args.length > max) {
        try {
            throw new TooManyArguments(max, args.length);
        } catch (error) {
            console.error(error.toString());
        }
        return false;
    } else {
        return true;
    }
}
