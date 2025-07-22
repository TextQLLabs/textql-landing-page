// Debug script to toggle navbar borders
// Run this in the browser console to enable debug mode

console.log('🐛 Debug Navbar Script');
console.log('This will toggle debug borders around the navbar component');

// Toggle debug mode in localStorage
const currentDebugMode = localStorage.getItem('debugMode') === 'true';
const newDebugMode = !currentDebugMode;

localStorage.setItem('debugMode', newDebugMode.toString());

console.log(`Debug mode: ${currentDebugMode ? 'OFF' : 'ON'} → ${newDebugMode ? 'ON' : 'OFF'}`);

// Trigger a storage event to update the UI immediately
window.dispatchEvent(new Event('storage'));

// Also dispatch custom debugToggle event for same-tab updates
window.dispatchEvent(new Event('debugToggle'));

// Reload the page to see changes
console.log('Reloading page to show debug borders...');
window.location.reload();