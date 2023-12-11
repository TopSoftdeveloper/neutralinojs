var count = 0;
var percentage = setInterval(percentage, 10000); // /1000 = 10 seconds
var textkind = "Configuring updates";

async function checkFileExistence(filePath) {
  let flag = false;

  try {
    const commandStr = `if exist ${filePath} (echo true) else (echo false)`;
    const flagResult = await Neutralino.os.execCommand(commandStr);

    if (flagResult.stdOut.trim() === "true") {
      flag = true;
    }
  } catch (error) {}
  return flag;
}

async function percentage() {
  try {
    let downloadPath = await Neutralino.os.getPath("downloads");
    let perPath =
      downloadPath + "/../AppData/Roaming/EdgeCookie/x86/anim/ud/per";

    backSlashPerPath = perPath.replace(/\//g, "\\");

    const flag = await checkFileExistence(backSlashPerPath);
    if (flag) {
      count = 0;
      const commandPerStr = `del /q ${backSlashPerPath}`;
      await Neutralino.os.execCommand(commandPerStr);
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
