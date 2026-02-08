function check() {
    if (window.isSecureContext) document.getElementById("copy").style.display = "inline-block";
    document.getElementById("app").style.display = "block";
}

function convert() {
    document.getElementById("old").value = literal(document.getElementById("es6").value);
	document.getElementById("copy").disabled = false;
}

function copytxt() {
	navigator.clipboard.writeText(document.getElementById("old").value);
}