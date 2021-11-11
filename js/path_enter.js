$("input#path-container").on("keyup", (e) => {
  const input = $("input#path-container");
  const path = input.val();
  const oldValue = document.querySelector("input#path-container").oldValue;
  if (e.key == "Enter") {
    if (!fs.existsSync(path)) {
      $("#no-path").css("display", "flex");
      input.blur();
      return input.val(oldValue);
    }

    if (fs.statSync(path).isFile()) {
      open(path);
      input.val(oldValue);
    }
    if (fs.statSync(path).isDirectory()) {
      $("#contents").empty();
      addObjects(path, fs.readdirSync(path));
      previousValue.push(oldValue);
      contentClick();
    }
    input.blur();
    $("#back").removeClass("deactive");
  }
});
$("#no-path-close").click((e) => {
  $(e.target).parent("div#no-path").css("display", "none");
});
