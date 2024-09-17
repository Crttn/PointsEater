// Variable para almacenar el intervalo de auto-claim
let autoClaimInterval = null;

// Cargar el estado de auto-claim desde el almacenamiento local de Chrome al iniciar
chrome.storage.local.get(['autoClaimEnabled'], function (result) {
    if (result.autoClaimEnabled) {
        startAutoClaim();
    }
});

// Escuchar mensajes del popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "claimPoints") {
        claimPoints();
    } else if (request.action === "toggleAutoClaim") {
        if (request.enabled) {
            startAutoClaim();
        } else {
            stopAutoClaim();
        }
    }
});

// Función para reclamar puntos manualmente
function claimPoints() {
    const claimButton = document.querySelector(".claimable-bonus__icon");
    if (claimButton) {
        claimButton.click();
        console.log("Puntos reclamados");
    }
}

// Función para iniciar el auto-claim
function startAutoClaim() {
    if (!autoClaimInterval) {
        autoClaimInterval = setInterval(claimPoints, 5000); // Reclamando cada 60 segundos
        console.log("Auto-claim iniciado");
    }
}

// Función para detener el auto-claim
function stopAutoClaim() {
    if (autoClaimInterval) {
        clearInterval(autoClaimInterval);
        autoClaimInterval = null;
        console.log("Auto-claim detenido");
    }
}
