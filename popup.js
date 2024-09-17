document.addEventListener('DOMContentLoaded', function () {
    // Referencia a los elementos del DOM
    const toggleAutoClaim = document.getElementById('toggle-auto-claim');
    const claimNowButton = document.getElementById('claim-now-button');

    // Cargar el estado del checkbox al abrir el popup
    chrome.storage.local.get(['autoClaimEnabled'], function (result) {
        toggleAutoClaim.checked = result.autoClaimEnabled || false;
    });

    // Manejar el cambio de estado del checkbox
    toggleAutoClaim.addEventListener('change', function () {
        const isAutoClaimEnabled = toggleAutoClaim.checked;

        // Guardar el estado del checkbox en el almacenamiento local de Chrome
        chrome.storage.local.set({ autoClaimEnabled: isAutoClaimEnabled }, function () {
            console.log('El estado de auto-claim ha sido actualizado:', isAutoClaimEnabled);
        });

        // Enviar un mensaje al content script para actualizar el estado
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggleAutoClaim", enabled: isAutoClaimEnabled });
        });
    });

    // Manejar el evento de clic en el botón "Reclamar puntos ahora"
    claimNowButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "claimPoints" });
        });
    });
});
