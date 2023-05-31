const safetyDropdown = document.getElementById('safetyDropdown');

safetyDropdown.addEventListener('click', function() {
  const dropdownMenu = safetyDropdown.nextElementSibling;
  dropdownMenu.classList.toggle('show');
});

