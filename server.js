const express = require("express")
const path = require("path")
const fs = require("fs-extra")
const { watchFolder } = require("./watcher")

const app = express()

const WATCH_PATH = path.join(__dirname, "watched")
const BACKUP_PATH = path.join(__dirname, "data/backups")

fs.ensureDirSync(WATCH_PATH)
fs.ensureDirSync(BACKUP_PATH)

app.use(express.json())
app.use(express.static("public"))

// list backups
app.get("/api/files", async (req, res) => {
    const files = await fs.readdir(BACKUP_PATH)
    res.json(files)
})

// get versions of a file
app.get("/api/versions/:file", async (req, res) => {
    const fileDir = path.join(BACKUP_PATH, req.params.file)

    if (!fs.existsSync(fileDir)) return res.json([])

    const versions = await fs.readdir(fileDir)
    res.json(versions)
})

// restore file
app.post("/api/restore", async (req, res) => {
    const { file, version } = req.body

    const source = path.join(BACKUP_PATH, file, version)
    const target = path.join(WATCH_PATH, file)

    if (!fs.existsSync(source)) {
        return res.status(404).send("Not found")
    }

    await fs.copy(source, target)

    res.send("Restored")
})

watchFolder(WATCH_PATH, BACKUP_PATH)

app.listen(3000, () => {
    console.log("SyncVault running on http://localhost:3000")
})
