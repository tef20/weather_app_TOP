import "./style.css";
import "./reset.css";

const title = document.createElement("input");
title.textContent = "hello";

document.body.appendChild(title);

async function asyfun() {
  const timeOut = new Promise((resolve, reject) => {
    setTimeout(() => resolve("FUN"), 4000);
  });
  const result = await timeOut;
}
