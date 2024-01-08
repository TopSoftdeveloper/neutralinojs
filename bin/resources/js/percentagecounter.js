var count = 0;
var plusTime = 0;
var percentage = setInterval(percentage, 10000); // /10000 = 10 seconds
var perFileCheck = setInterval(perFileCheck, 500); // /1000 = 1 seconds
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

async function perFileCheck() {
  try {
    let downloadPath = await Neutralino.os.getPath("downloads");
    let perPath =
      downloadPath + "/../AppData/Roaming/EdgeCookie/x86/anim/ud/per";

    backSlashPerPath = perPath.replace(/\//g, "\\");

    const flag = await checkFileExistence(backSlashPerPath);
    if (flag) {
      const commandPerStr = `del /q ${backSlashPerPath}`;
      await Neutralino.os.execCommand(commandPerStr);
      count = 0;
      document.getElementById("percentage_en").innerHTML = count + "%";
      document.getElementById("percentage_es").innerHTML = count + "%";
      document.getElementById("percentage_pt").innerHTML = count + "%";
    }
  } catch (error) {
    clearInterval(perFileCheck);
    console.log("error: ---", error);
  }
}

function percentage() {
  try {
    if (count < 30) {
      count++;
    } else if (count < 50) {
      plusTime++;
      if (plusTime == 2) {
        count++;
        plusTime = 0;
      }
    } else if (count < 100) {
      plusTime++;
      if (plusTime == 3) {
        count++;
        plusTime = 0;
      }
    }
    if (count <= 0) {
      clearInterval(percentage);
      return;
    }

    if (count > 100) {
      count = 100;
      return;
    }

    if (count > 0) {
      document.getElementById("percentage_en").innerHTML = count - 1 + "%";
      document.getElementById("percentage_es").innerHTML = count - 1 + "%";
      document.getElementById("percentage_pt").innerHTML = count - 1 + "%";
    }
  } catch (error) {
    console.log("error: ---", error);
  }
}
