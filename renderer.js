window.addEventListener('DOMContentLoaded', () => {
  const remote = require('@electron/remote');
  const win = remote.getCurrentWindow();

  document.getElementById('minimize-btn').addEventListener('click', () => {
    win.minimize();
  });

  document.getElementById('close-btn').addEventListener('click', () => {
    win.close();
  });
});