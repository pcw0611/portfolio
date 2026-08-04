const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");
const toast = document.getElementById("toast");

tabs.forEach((tab) => tab.addEventListener("click", () => {
  tabs.forEach((item) => item.classList.toggle("active", item === tab));
  panels.forEach((panel) => panel.classList.toggle("active", panel.id === tab.dataset.panel));
}));

document.querySelectorAll(".demo-action").forEach((button) => button.addEventListener("click", () => {
  toast.textContent = "샘플 화면입니다. 실제 배포나 데이터 변경은 실행되지 않습니다.";
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2700);
}));
