document.addEventListener('DOMContentLoaded', function () {
    // Reference to DOM elements
    const toggleAutoClaim = document.getElementById('toggle-auto-claim');
    const claimNowButton = document.getElementById('claim-now-button');

    // Load checkbox state when popup opens
    chrome.storage.local.get(['autoClaimEnabled'], function (result) {
        toggleAutoClaim.checked = result.autoClaimEnabled || false;
    });

    // Handling checkbox state change
    toggleAutoClaim.addEventListener('change', function () {
        const isAutoClaimEnabled = toggleAutoClaim.checked;

        // Save checkbox state to the Chrome local storage
        chrome.storage.local.set({ autoClaimEnabled: isAutoClaimEnabled }, function () {
            console.log('The auto-claim status has been updated:', isAutoClaimEnabled);
        });

        // Send a message to the content script to update the status
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggleAutoClaim", enabled: isAutoClaimEnabled });
        });
    });
});
