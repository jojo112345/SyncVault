const chokidar = require("chokidar")
const fs = require("fs-extra")
const path = require("path")

function watchFolder(watchPath, backupPath) {
    const watcher = chokidar.watch(watchPath, {
        persistent: true,
        ignoreInitial: true
    })

    watcher.on("change", async (filePath) => {
        const relative = path.basename(filePath)
        const time = Date.now()

        const backupDir = path.join(backupPath, relative)
        const backupFile = path.join(backupDir, time + ".bak")

        await fs.ensureDir(backupDir)
        await fs.copy(filePath, backupFile)

        console.log("Backed up:", relative)
    })
}

module.exports = { watchFolder }
