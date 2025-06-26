// Find and click the Finance button
const button = document.querySelector('[ref="e648"]') || 
               Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Finance'));

if (button) {
  console.log('Found button:', button);
  console.log('Button classes:', button.className);
  
  // Trigger click
  button.click();
  
  // Check for dropdown after a delay
  setTimeout(() => {
    const dropdown = document.querySelector('.absolute.top-full.left-0.right-0.mt-1.z-20');
    if (dropdown) {
      console.log('Dropdown found\!');
      console.log('Dropdown style:', window.getComputedStyle(dropdown));
      console.log('Dropdown bounds:', dropdown.getBoundingClientRect());
      console.log('Dropdown parent overflow:', window.getComputedStyle(dropdown.parentElement).overflow);
    } else {
      console.log('No dropdown found');
      // Check if dropdown exists but might be hidden
      const allDropdowns = document.querySelectorAll('.absolute');
      console.log('All absolute elements:', allDropdowns.length);
    }
  }, 100);
}
EOF < /dev/null