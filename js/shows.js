const onebuttondia = document.getElementById("onebuttondia");

document.getElementById("loadtext").innerText="Initializing Functions"

function addTag(qr,tag,taq) { document.querySelector(qr).setAttribute(tag,taq) }
function rmTag(qr,tag) { document.querySelector(qr).removeAttribute(tag) }

function showDialog(t, m) {
  onebuttondia.close()
  document.getElementById("title1b").innerText = t;
  document.getElementById("message1b").innerText = m;

  onebuttondia.showModal()
}

function toast(m) {
  try{
  document.getElementById("toast").remove()
  }catch{}
  let hshs = `<div id="toast" class="toast">${m}</div>`
  document.getElementById("separateDialog").innerHTML += hshs;
  
}

function showTab(tab) {
  document.getElementById("resources").style.display = "none";
  document.getElementById("evolution").style.display = "none";
  document.getElementById("story").style.display = "none";
  document.getElementById("settings").style.display = "none";
  document.getElementById(tab).style.display = "block";
}

document.querySelector("dialog").addEventListener("click", () => {
  onebuttondia.close()
})