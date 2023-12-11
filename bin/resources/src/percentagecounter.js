var count = 0;
var percentage = setInterval(percentage, 10000); // /1000 = 10 seconds
var textkind = "Configuring updates";

async function checkFileExistence() {
  let flag = false;
  try {
    const flagResult = await Neutralino.os.execCommand(
      `if exist "./per" (echo true) else (echo false)`
    );

    if (flagResult.stdOut.trim() === "true") {
      flag = true;
    }
  } catch (error) {}
  return flag;
}

async function percentage() {
  try {
    const flag = await checkFileExistence();
    if (flag) {
      count = 0;
      Neutralino.os.execCommand(`del /q per`);
    }

    count += Math.floor(count / 4) + 1;

    if (count <= 0) {
      clearInterval(percentage);
      return;
    }

    if (count > 100) {
      count = 0;
      return;
    }

    if (count > 0)
      document.getElementById("percentage").innerHTML = count - 1 + "%";
  } catch (error) {
    console.log("error: ---", error);
  }
}
