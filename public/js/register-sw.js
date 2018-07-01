if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
        scope: '/'
    }).then(function() {
        // success
        console.log("SW SUCCESS");
    }).catch(function(e) {
        // failed
        console.log("SW FAILED");
    });
}
