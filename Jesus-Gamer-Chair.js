// ==UserScript==
// @name         Jesus Gamer Chair
// @namespace    https://github.com/jibstack64/ttrockstars-bot
// @version      6.9
// @description  Times Tables Rockstars Jesus Gamer Chair (made by jibstack64, modified by J0BB0T).
// @author       J0BB0T
// @match        https://play.ttrockstars.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mozilla.org
// @grant        GM_log
// ==/UserScript==

(function() {
    'use strict';

    GM_log("on.");

    if(typeof(String.prototype.trim) === "undefined") {
        String.prototype.trim = function() {
            return String(this).replace(/^\s+|\s+$/g, '');
        };
    }

    /*const keyMap = new Map();
    const numbers = "0123456789"
    for (var i = 0; i < 10; i++) {
        keyMap.set(numbers[i], 48+i)
    }*/

    var Reload = true // make true for automated, false for not automated

    var running = false;
    setInterval(() => {
        var equation = document.getElementsByClassName("notranslate height-100 noselect question-id current")[0];
        var input = document.getElementsByClassName("input-holder width-100")[0];
        if (input == undefined || input == null) {
            input = document.getElementsByClassName("input-holder width-100 hint")[0];
        }
        var enter = document.getElementsByClassName("key-ent ng-star-inserted")[0];
        var top = document.getElementsByClassName("next-game-question padding-5")[0];
        var keypad = document.getElementsByClassName("keyboard mat-white-color bg-2")[0];
        var play;


        if (equation != undefined) {
            if (running) {
                return;
            }
            // start running
            running = true;
            // add "hacks enabled" message
            let el = document.createElement("a");
            el.setAttribute("href", "https://github.com/jibstack64/ttrockstars-bot");
            el.setAttribute("target", "_blank");
            for (var i = 0; i < top.children.length; i++) {
                top.children[i].remove()
            }
            el.style = "background-color: black; width: auto; align-items: center; margin-top: 10px; margin-bottom: 10px; padding: 5px; border: 2px 74,41,132; font-size: 20px; font-weight: bold; font-family: monospace; background-image: linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red); -webkit-background-clip: text; color: transparent; text-fill-color: transparent;";
            el.innerHTML = "💰 JESUS GAMER CHAIR ACTIVE 💰";
            top.appendChild(el);

            var id = setInterval(() => {
                if (running) {
                    let raw = equation.innerHTML.replace("×", "*").replace("÷", "/");
                    console.log(raw);
                    while (raw.includes("<!---->")) {
                        raw = raw.replace("<!---->", "");
                    }
                    var num1  = equation.getElementsByClassName("mx-1 ng-star-inserted")[0].innerHTML;
                    var operation = equation.getElementsByClassName("mx-1 ng-star-inserted")[1].innerHTML;
                    var num2 = equation.getElementsByClassName("mx-1 ng-star-inserted")[2].innerHTML;

                    raw = `${num1}${operation.replace("×", "*").replace("÷", "/")}${num2}`;

                    console.log(raw);
                    let answer = String(eval(raw));
                    GM_log("answer: " + answer);

                    // example: 30 <!---->÷<!----><!----> 5 <!----><!----><!----><!---->
                    /*let el = "<span class=\"notranslate ng-star-inserted\">"+String(answer)+"</span>";
                    if (!input.innerHTML.includes(el)) {
                        input.innerHTML = "<span class=\"notranslate ng-star-inserted\">"+String(answer)+"</span>" + input.innerHTML
                    }*/

                    [...answer].forEach(char => {
                        for (var row = 0; row < keypad.children.length; row++) {
                            for (var key = 0; key < keypad.children[row].children.length; key++) {
                                let elem = keypad.children[row].children[key]
                                if (elem.innerHTML.trim() == char) {
                                    elem.click();
                                    return;
                                }
                            }
                        }
                    });
                    enter.click();
                } else {
                    clearInterval(id);
                }
            }, 254);
        } else {
            running = false;
            play = document.getElementsByClassName("mat-focus-indicator margin-5 play-button stamp mat-raised-button mat-button-base mat-accent ng-star-inserted")[0];
            if (play != undefined) {
                play.click();
            }
            var gameOver = document.getElementsByClassName("stamp center mat-white-color")[0];
            if (gameOver != undefined) {
                gameOver.innerHTML = "'WOW. YOU MIGHT BE SMARTER THAN ME!' - Baldi"
                if (window.location.href == "https://play.ttrockstars.com/gamel/play/garage") {
                    if (Reload == true) {
                        window.location.reload(true)
                    }
                }
            }
        }

    }, 100);
})();
