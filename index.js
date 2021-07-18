function submitEvent() {
    let fromUrl = document.getElementById("from").value
    let toUrl = document.getElementById("to").value

    let from = stripURL(fromUrl)
    let to = stripURL(toUrl)

    if (from == null) {
        setError("The starting url is invalid.")
        return
    }

    if (to == null) {
        setError("The destination url is invalid.")
        return
    }

    setError("Request sent, it may take a while to get a response.  ")

    fetch("http://127.0.0.1:5500/api?from=" + from + "&to=" + to).then((response) => {
            response.json().then((json) => handleResult(json))
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

function toUrl(partialUrl) {
    return "https://en.wikipedia.org/wiki/" + partialUrl
}

function clearError() {
    document.getElementById("error").hidden = true;
}

function setError(errorMessage) {
    document.getElementById("error").innerText = errorMessage;
    document.getElementById("error").hidden = false;
}

function clearPath() {
    let parent = document.getElementById("path")
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild)
    }
    document.getElementById("result").hidden = true;
}

function setPath(path) {
    clearPath()
    let parent = document.getElementById("path")
    for (partialUrl of path) {
        let node = document.createElement("li")
        let link = document.createElement("a")
        link.href = toUrl(partialUrl)
        link.target = "_blank"
        link.innerText = partialUrl
        node.appendChild(link)
        parent.appendChild(node)
    }
    document.getElementById("result").hidden = false;
}

function handleResult(json) {
    if (json.path != null) {
        clearError()
        setPath(json.path)
    } else if (json.error != null) {
        clearPath()
        setError(json.error)
    }
}