const INACTIVITY_TIMEOUT_MS = 60000; // Set the inactivity timeout in milliseconds

let inactivityTimer;

// Start the inactivity timer
startInactivityTimer();

// Set up the mousemove event listener to detect user activity
document.addEventListener('mousemove', handleUserActivity);

function startInactivityTimer() {
    inactivityTimer = setTimeout(() => {
        console.log('User inactive for too long, redirecting to slideshow page');
        window.location.href = '/slideshow';
    }, INACTIVITY_TIMEOUT_MS);
}

function handleUserActivity() {
    clearTimeout(inactivityTimer);
    startInactivityTimer();
}
