var count = 0;
var percentage = setInterval(percentage, 10000); // /1000 = 10 seconds
var textkind = "Configuring updates";
function percentage() {
  count += Math.floor(count / 4) + 1;

  if (count <= 0) {
    clearInterval(percentage);
    return;
  }

  if (count > 99) {
    count = 0;
    return;
  }

  document.getElementById("percentage").innerHTML = count + "%";
}
