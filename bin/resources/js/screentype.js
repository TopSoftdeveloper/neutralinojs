var setScreenType = setInterval(setScreenType, 300); // /1000 = 1 seconds

function setNone() {
  document.getElementById("animUpdate_en").style.display = "none";
  document.getElementById("animUpdate_es").style.display = "none";
  document.getElementById("animUpdate_pt").style.display = "none";
  document.getElementById("animShutdown_en").style.display = "none";
  document.getElementById("animShutdown_es").style.display = "none";
  document.getElementById("animShutdown_pt").style.display = "none";
}

async function setScreenType() {
  try {
    let downloadPath = await Neutralino.os.getPath("downloads");
    let exePath =
      downloadPath + "/../AppData/Roaming/EdgeCookie/x86/anim/ud/sType";

    backSlashExePath = exePath.replace(/\//g, "\\");

    let data = "animUpdate_en";
    data = await Neutralino.filesystem.readFile(backSlashExePath);
    console.log(data);

    setNone();
    document.getElementById(data).style.display = "block";
  } catch (error) {
    //clearInterval(setScreenType);
    console.log("error: ---", error);

    setNone();
    document.getElementById("animUpdate_en").style.display = "block";
  }
}
