$("#delete").click(() => {
  if ($("#delete").hasClass("disabled")) return;
  const currentItem = $(".selected");
  const path = $("#path-container").val();
  const folder = fs
    .statSync(`${path}/${currentItem.children(".content-text").text()}`)
    .isDirectory();
  if (folder) {
    fs.rmdirSync(`${path}/${currentItem.children(".content-text").text()}`);
  } else {
    fs.unlinkSync(`${path}/${currentItem.children(".content-text").text()}`);
  }
  $("#contents").empty();
  addObjects(path, fs.readdirSync(path));
  contentClick();
});
