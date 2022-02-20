let heroes = document.getElementById("characters").children;
for (let i = 0; i < heroes.length; i++) {
    let classAttr = heroes[i].getAttribute("class");
    let data = heroes[i].getAttribute("data-element");
    if (classAttr !== "good" && classAttr !== "evil" || !classAttr)
        heroes[i].className = "unknown";
    if (!data)
        heroes[i].setAttribute("data-element", "none");
    heroes[i].appendChild(document.createElement("br"));
    if (heroes[i].getAttribute("data-element") === "none") {
        let circle = document.createElement("div");
        let line = document.createElement("div");
        circle.setAttribute("class", `elem ${data}`);
        heroes[i].appendChild(circle);
        line.setAttribute("class", "line");
        circle.appendChild(line);
    }
    else {
        data = heroes[i].getAttribute("data-element").split(' ');
        for (let j = 0; j < data.length; j++) {
            let circle = document.createElement("div");

            circle.setAttribute("class", `elem ${data[j]}`);
            heroes[i].appendChild(circle);
        }
    }
}

