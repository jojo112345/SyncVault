async function loadFiles() {
    const res = await fetch("/api/files")
    const files = await res.json()

    const container = document.getElementById("files")
    container.innerHTML = ""

    files.forEach(file => {
        const div = document.createElement("div")
        div.className = "item"
        div.innerText = file

        div.onclick = () => loadVersions(file)

        container.appendChild(div)
    })
}

async function loadVersions(file) {
    const res = await fetch(`/api/versions/${file}`)
    const versions = await res.json()

    const container = document.getElementById("versions")
    container.innerHTML = "<h3>Versions of " + file + "</h3>"

    versions.forEach(v => {
        const div = document.createElement("div")
        div.className = "item"
        div.innerText = v

        div.onclick = async () => {
            await fetch("/api/restore", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ file, version: v })
            })

            alert("Restored!")
        }

        container.appendChild(div)
    })
}

loadFiles()
