// utils.js - NEW FILE ✨
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    // ... (rest of the function code is the same) ...
    document.body.appendChild(notification);
    // Automatically remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}