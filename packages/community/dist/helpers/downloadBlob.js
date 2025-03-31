function download(url, name = "noname") {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
}
// http://stackoverflow.com/a/33622881/1567777
export function downloadBlob(blob, fileName) {
    const url = window.URL.createObjectURL(blob);
    download(url, fileName);
    setTimeout(() => {
        return window.URL.revokeObjectURL(url);
    }, 1000);
}
//# sourceMappingURL=downloadBlob.js.map