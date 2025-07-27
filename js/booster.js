
function setupBoosterInteraction() {
  const booster = document.getElementById('booster-pack');

  booster.addEventListener('click', () => {
    toggleClass(booster, 'open');
  });
}
