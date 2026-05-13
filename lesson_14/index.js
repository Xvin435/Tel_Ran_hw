function main() {

    let d1Elements = Array.from(document.getElementsByClassName("d1"));
    d1Elements.forEach(element => {
        element.style.backgroundColor = "black";
        element.style.width = "200px";
        element.style.height = "200px";
    });

    let paragraphs = Array.from(document.getElementsByTagName("p"));
    paragraphs.forEach(element => {
        element.style.color = "red";
        element.style.fontSize = "20px";
    }); 

    let p1 = document.getElementById("p1");
    p1.innerHTML = "<b> BSvin </b>"

    let p2 = document.getElementById("p2");
    p2.textContent = "svin";

    let beahviorText = document.getElementById("behaviorText");
    let behaviorBtn = document.getElementById("behaviorButton");
    behaviorBtn.addEventListener("click", () => {
        beahviorText.style.color = getRndColor();
    });
}

function getRndColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

main();