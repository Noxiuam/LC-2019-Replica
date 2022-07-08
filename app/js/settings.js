const fs = require('fs');
const getAppDataPath = require('appdata-path');

slider = document.getElementById("settings-memory");
label = document.getElementById("settings-memory-value");

slider.oninput = function() {
  label.innerHTML = (parseFloat(this.value) / 1024).toFixed(1) + " GB";

  let ramdata = {"ram":"" + slider.value + ""};
   
  let data = JSON.stringify(ramdata);
  fs.writeFileSync(getAppDataPath('.minecraft') + '/lunarsettings.json', data);

}

document.addEventListener("keydown", e => {
  if(e.key == "SHIFT") e.preventDefault();
});

document.addEventListener("keydown", e => {
  if(e.ctrlKey) {
    e.preventDefault();
  }
});