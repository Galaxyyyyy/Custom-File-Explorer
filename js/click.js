function contentClick() {
  $("div.content-item").click((e) => {
    $("div.content-item").removeClass("selected");
    $(e.currentTarget).addClass("selected");
    $("#delete").removeClass("disabled");
  });
  $("div.content-item").dblclick((e) => {
    const path = `${$("input#path-container").val()}/${
      e.currentTarget.textContent
    }`;
    if (fs.statSync(path).isFile()) return open(path);
    $("#contents").empty();
    addObjects(path, fs.readdirSync(path));
    previousValue.push($("input#path-container").val());
    $("input#path-container").val(path);
    contentClick();
    $("#delete").addClass("disabled");
    $("#back").removeClass("deactive");
  });
}
$(document).click((e) => {
  const target = $(e.target);
  if (
    target.hasClass("content-item") ||
    target.parent().hasClass("content-item") ||
    target.is("i")
  )
    return;
  $(".content-item").removeClass("selected");
  $("#delete").addClass("disabled");
});
contentClick();
