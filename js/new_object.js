const regexValid = /'"*?{\}\//;

ipcRenderer.on("new:file", () => {
  $("#new").css("display", "flex");
});
ipcRenderer.on("new:folder", () => {
  $("#new-folder").css("display", "flex");
});
$("#file-add").click(() => {
  $("#new").css("display", "flex");
});
$("#folder-add").click(() => {
  $("#new-folder").css("display", "flex");
});

function newFile(name) {
  const path = $("#path-container").val();
  fs.writeFileSync(`${path}/${name}`, "");
  addObjects(`${path}`, [name]);
  contentClick();
}
function newFolder(name) {
  const path = $("#path-container").val();
  fs.mkdirSync(`${path}/${name}`);
  addObjects(`${path}`, [name]);
  contentClick();
}
$("#new-close").click(() => {
  if (!$("#new-input").val()) return $("#new").css("display", "none");
  if (regexValid.test($("#new-input").val()))
    return $("#new").children("h1").css("display", "block");
  $("#new").css("display", "none");
  const path = $("#path-container").val();
  const list = fs.readdirSync(path);
  if (list.includes($("#new-input").val())) return;
  newFile($("#new-input").val());
  $("#new-input").val("");
});
$("#new-folder-close").click(() => {
  if (!$("#new-folder-input").val())
    return $("#new-folder").css("display", "none");
  if (regexValid.test($("#new-folder-input").val()))
    return $("#new-folder").children("h1").css("display", "block");
  $("#new-folder").css("display", "none");
  const path = $("#path-container").val();
  const list = fs.readdirSync(path);
  if (list.includes($("#new-folder-input").val())) return;
  newFolder($("#new-folder-input").val());
  $("#new-folder-input").val("");
});
