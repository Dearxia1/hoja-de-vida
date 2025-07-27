const booster = document.querySelector('.booster-pack');

let isDragging = false;
let lastX = 0;
let lastY = 0;
let currentRotateX = 0;
let currentRotateY = 0; // acumulado en grados

booster.addEventListener('mousedown', (e) => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
  e.preventDefault();
  booster.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - lastX;
  const deltaY = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;
  currentRotateY += deltaX * 0.3;
  currentRotateX -= deltaY * 0.3;
  currentRotateX = Math.max(Math.min(currentRotateX, 45), -45);
  booster.style.transform = `rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`;
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;

  // Ajusta al múltiplo de 180° más cercano
  const nearest = Math.round(currentRotateY / 180) * 180;
  booster.style.transition = 'transform 0.6s cubic-bezier(.23,1.32,.53,.97)';
  currentRotateX = 0;
  currentRotateY = nearest;
  booster.style.transform = `rotateY(${currentRotateY}deg) rotateX(0deg)`;
});

