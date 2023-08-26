const onebuttondia = document.getElementById("onebuttondia");

function showDialog(t, m) {
  document.getElementById("title1b").innerText = t;
  document.getElementById("message1b").innerText = m;

  onebuttondia.showModal()
}

function showTab(tab) {
  document.getElementById("resources").style.display = "none";
  document.getElementById("evolution").style.display = "none";
  document.getElementById("story").style.display = "none";
  document.getElementById(tab).style.display = "block";
}

document.querySelector("dialog").addEventListener("click", () => {
  onebuttondia.close()
})