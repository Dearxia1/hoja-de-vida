const booster = document.querySelector('.booster-pack');
const front = booster.querySelector('.front');
const back = booster.querySelector('.back');

let isDragging = false;
let lastX = 0;
let lastY = 0;
let currentRotateX = 0;
let currentRotateY = 0;



function updateVisibility() {
  // Normaliza el ángulo a [0, 360)
  let normalized = ((currentRotateY % 360) + 360) % 360;
  if (normalized >= 90 && normalized < 270) {
    front.style.visibility = 'hidden';
    back.style.visibility = 'visible';
  } else {
    front.style.visibility = 'visible';
    back.style.visibility = 'hidden';
  }
}

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
  updateVisibility();
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  const nearest = Math.round(currentRotateY / 180) * 180;
  booster.style.transition = 'transform 0.6s cubic-bezier(.23,1.32,.53,.97)';
  currentRotateX = 0;
  currentRotateY = nearest;
  booster.style.transform = `rotateY(${currentRotateY}deg) rotateX(0deg)`;
  updateVisibility();
});

booster.addEventListener('touchstart', (e) => {
  isDragging = true;
  const touch = e.touches[0];
  lastX = touch.clientX;
  lastY = touch.clientY;
  booster.style.transition = 'none';
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const touch = e.touches[0];
  const deltaX = touch.clientX - lastX;
  const deltaY = touch.clientY - lastY;
  lastX = touch.clientX;
  lastY = touch.clientY;
  currentRotateY += deltaX * 0.3;
  currentRotateX -= deltaY * 0.3;
  currentRotateX = Math.max(Math.min(currentRotateX, 45), -45);
  booster.style.transform = `rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`;
  updateVisibility();
}, { passive: true });

document.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  const nearest = Math.round(currentRotateY / 180) * 180;
  booster.style.transition = 'transform 0.6s cubic-bezier(.23,1.32,.53,.97)';
  currentRotateX = 0;
  currentRotateY = nearest;
  booster.style.transform = `rotateY(${currentRotateY}deg) rotateX(0deg)`;
  updateVisibility();
});
