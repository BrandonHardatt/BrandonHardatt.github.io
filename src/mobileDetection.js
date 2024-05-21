const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export const isMobile = () => mobileRegex.test(navigator.userAgent);

export const handleMobileView = () => {
    if (isMobile()) {
        document.getElementById('mobile-message').style.display = 'block'; // Show the mobile message
        document.querySelector('#bg').style.display = 'none';              // Hide the canvas
        throw new Error('Mobile viewing error');                           // Stop code execution
    }
};
