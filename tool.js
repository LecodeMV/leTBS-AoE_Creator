
window.onload = function () {

    var squareSize = 25;

    function createSquare(value) {
        var square = document.createElement("div");
        square.style.width = squareSize + "px";
        square.style.height = squareSize + "px";
        square.style.margin = "2px";
        if (value) {
            square.className = "square-fill";
        } else {
            square.className = "square";
        }
        if (value > 1)
            square.id = "square-center";
        square.onclick = function (e) {
            var element = e.target;
            if (element.className === "square")
                element.className = "square-fill";
            else
                element.className = "square";
        };
        return square;
    }

    function createLineDiv() {
        var lineDiv = document.createElement("div");
        //-- ?
        return lineDiv;
    }

    function initializeSquares() {
        var map = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        var zone = document.getElementById("squares");
        for (var i = 0; i < map.length; i++) {
            var line = map[i];
            var lineDiv = createLineDiv();
            for (var j = 0; j < line.length; j++) {
                var value = line[j];
                var square = createSquare(value);
                lineDiv.appendChild(square);
            }
            zone.appendChild(lineDiv);
        }
    }

    function linesNbr() {
        return document.getElementById("squares").children.length;
    }

    function columnsNbr() {
        return document.getElementById("squares").children[0].children.length;
    }

    var zone = document.getElementById("squares");

    var heightPlus = document.getElementById("h+");
    heightPlus.onclick = function (e) {
        var lineDiv_1 = createLineDiv();
        var lineDiv_2 = createLineDiv();
        var nbr = columnsNbr();
        for (var i = 0; i < nbr; i++) {
            lineDiv_1.appendChild(createSquare(0));
            lineDiv_2.appendChild(createSquare(0));
        }
        zone.insertBefore(lineDiv_1, zone.children[0]);
        zone.insertBefore(lineDiv_2, null);
    };
    var heightMinus = document.getElementById("h-");
    heightMinus.onclick = function (e) {
        if (linesNbr() > 3) {
            zone.children[0].remove();
            zone.children[zone.children.length - 1].remove();
        }
    };

    var widthPlus = document.getElementById("w+");
    widthPlus.onclick = function (e) {
        for (var i = 0; i < zone.children.length; i++) {
            var lineDiv = zone.children[i];
            lineDiv.insertBefore(createSquare(0), lineDiv.children[0]);
            lineDiv.insertBefore(createSquare(0), null);
        }
    };
    var widthMinus = document.getElementById("w-");
    widthMinus.onclick = function (e) {
        if (columnsNbr() > 3) {
            for (var i = 0; i < zone.children.length; i++) {
                var lineDiv = zone.children[i];
                lineDiv.children[0].remove();
                lineDiv.children[lineDiv.children.length - 1].remove();
            }
        }
    };

    var zoomPlus = document.getElementById("z+");
    zoomPlus.onclick = function (e) {
        if (squareSize < 50) {
            squareSize += 5;
            for (var i = 0; i < zone.children.length; i++) {
                var lineDiv = zone.children[i];
                for (var j = 0; j < lineDiv.children.length; j++) {
                    var div = lineDiv.children[j];
                    div.style.width = squareSize + "px";
                    div.style.height = squareSize + "px";
                }
            }
        }
    };
    var zoomMinus = document.getElementById("z-");
    zoomMinus.onclick = function (e) {
        if (squareSize > 10) {
            squareSize -= 5;
            for (var i = 0; i < zone.children.length; i++) {
                var lineDiv = zone.children[i];
                for (var j = 0; j < lineDiv.children.length; j++) {
                    var div = lineDiv.children[j];
                    div.style.width = squareSize + "px";
                    div.style.height = squareSize + "px";
                }
            }
        }
    };

    var clearBtn = document.getElementById("clear");
    clearBtn.onclick = function () {
        while (zone.firstChild) {
            zone.firstChild.remove();
        }
        initializeSquares();
    };

    var txtArea = document.getElementById("txt-area");
    var saveBtn = document.getElementById("save");
    saveBtn.onclick = function () {
        var ox = (columnsNbr() - 1) / 2;
        var oy = (linesNbr() - 1) / 2;
        var result = "\"";
        for (var i = 0; i < zone.children.length; i++) {
            var lineDiv = zone.children[i];
            for (var j = 0; j < lineDiv.children.length; j++) {
                var div = lineDiv.children[j];
                var x = j - ox;
                var y = i - oy;
                if (div.className.match(/fill/i)) {
                    result += "[cx+" + x + ",cy+" + y + "],";
                }
            }
        }
        result += "eof";
        result = result.replace(",eof", "")
            .replace(/\+\-/g, "-")
            .replace(/\+0/g, "");
        result += "\"";
        txtArea.value = result;
        txtArea.select();
    };
    loadBtn = document.getElementById("import");
    loadBtn.onclick = function () {
        var result = txtArea.value.replace(/\"/g, "");
        var cx = (columnsNbr() - 1) / 2;
        var cy = (linesNbr() - 1) / 2;
        var array = eval("[" + result + "]");
        for (var i = 0; i < zone.children.length; i++) {
            var lineDiv = zone.children[i];
            for (var j = 0; j < lineDiv.children.length; j++) {
                var div = lineDiv.children[j];
                div.className = "square";
                for (var k = 0; k < array.length; k++) {
                    var coords = array[k];
                    if (j === coords[0] && i === coords[1]) {
                        div.className = "square-fill";
                    }
                }
            }
        }
    };
    initializeSquares();
};
