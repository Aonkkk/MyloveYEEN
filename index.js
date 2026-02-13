function checkPass() {
  const correct = "010126"; // 🔐 เปลี่ยนรหัสตรงนี้
  const input = document.getElementById("pass").value;

  if (input === correct) {
    music.volume = 0.25;
    music.play();   // 🔥 เล่นตรงนี้
    window.location.href = "home.html";
  } else {
    document.getElementById("errorPopup").classList.add("show");
    document.getElementById("pass").value = "";
 }
}

function closeError() {
  document.getElementById("errorPopup").classList.remove("show");
}


function addNum(num) {
  const input = document.getElementById("pass");
  if (input.value.length < 6) {
    input.value += num;
  }
}

function delNum() {
  const input = document.getElementById("pass");
  input.value = input.value.slice(0, -1);
}
