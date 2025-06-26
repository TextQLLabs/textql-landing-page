// Wait for page to load
setTimeout(() => {
  // Find the Finance button
  const financeButton = document.querySelector('button:has(.text-white)');
  if (financeButton && financeButton.textContent.includes('Finance')) {
    console.log('Found Finance button, clicking...');
    financeButton.click();
    
    // Check if dropdown opened
    setTimeout(() => {
      const dropdown = document.querySelector('.absolute.top-full');
      if (dropdown) {
        console.log('Dropdown is visible\!');
        console.log('Dropdown position:', dropdown.getBoundingClientRect());
      } else {
        console.log('Dropdown not found after clicking');
      }
    }, 100);
  } else {
    console.log('Finance button not found');
  }
}, 1000);
EOF < /dev/null