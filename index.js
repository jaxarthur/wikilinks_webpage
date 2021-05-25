const States = {
    entry: "entry",
    waiting: "waiting",
    results: "results",
    error: "error"
};

let state = States.entry;

function updateDisplay() {
    // Set state to display
    let hidden = Object.keys(States)
    hidden.splice(hidden.indexOf(state), 1)
    for (hide of hidden) {
        document.getElementById(hide).hidden = true;
    }
    document.getElementById(state).hidden = false;

    // Clean up some values
    document.getElementById("entry_error").hidden = true;

    // Make main visible
    document.getElementById("main").hidden = false
}

updateDisplay()

function submitEvent() {
    let fromUrl = document.getElementById("from").value
    let toUrl = document.getElementById("to").value

    let from = stripURL(fromUrl)
    let to = stripURL(toUrl)

    if (from == null) {
        setEntryError("The starting url is invalid.")
        return
    }

    if (to == null) {
        setEntryError("The destination url is invalid.")
        return
    }

    fetch("http://127.0.0.1:5500/api?from=" + from + "&to=" + to).then((response) => {
            response.json().then((json) => console.log(json))
        }).catch((reason) => {
            console.log(reason)
        }
    )
}

function stripURL(url) {
    let result = null;
    let index = url.indexOf("en.wikipedia.org/wiki/")
    if (index != -1) { result = url.slice(index+22) }
    return result
}

function setEntryError(errorMessage) {
    document.getElementById("entry_error").innerText = errorMessage;
    document.getElementById("entry_error").hidden = false;
}