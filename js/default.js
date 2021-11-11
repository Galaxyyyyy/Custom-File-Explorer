const fs = require("fs");
const os = require("os");
const $ = require("jquery");
const open = require("open");
const { ipcRenderer } = require("electron");
const paths = {
  main: `${os.homedir}/Desktop`,
};
let previousValue = [];
let nextValue = [];
$("input#path-container").val(paths.main);
addObjects(paths.main, fs.readdirSync(paths.main));

function addObjects(path, arr) {
  arr.forEach((read) => {
    const folder = fs.statSync(`${path}/${read}`).isDirectory();
    const div = $("<div class='content-item'></div>");
    const h1 = $("<h1 class='content-text'></h1>").text(read);
    const icon = folder
      ? $("<h1><i class='far fa-folder content-icon'></i></h1>")
      : $("<h1><i class='far fa-file-code content-icon'></i></h1>");
    div.append(icon);
    div.append(h1);
    $("#contents").append(div);
  });
}
function removeDuplicates(array) {
  return Array.from(new Set(array));
}
