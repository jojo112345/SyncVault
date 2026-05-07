# SyncVault

A local-first file backup and versioning system built with Node.js.

SyncVault automatically watches folders, stores file versions, and allows restoring previous states through a simple web dashboard.

---

# Features

- Folder watching in real time
- Automatic file version backups
- Local storage of history
- Simple web dashboard
- Restore previous versions of files

---

# Project Structure

```txt
syncvault/
│
├── server.js
├── watcher.js
├── storage.js
├── package.json
│
├── data/
│   └── backups/
│
└── public/
    ├── index.html
    ├── style.css
    └── client.js
```

---

# Installation

## 1. Initialize project

```bash
npm init -y
```

## 2. Install dependencies

```bash
npm install express chokidar fs-extra
```

---

# Running the project

Start the server:

```bash
node server.js
```

Open in browser:

```txt
http://localhost:3000
```

---

# How it works

## File watching

The system monitors a target folder using a filesystem watcher. When a file changes, it triggers a backup.

## Versioning

Each change creates a timestamped copy of the file stored in a backup directory.

## Restore system

The user can select a previous version and restore it, replacing the current file.

## Dashboard

The web interface allows:
- viewing tracked files
- browsing version history
- restoring older versions

---

# API Endpoints

## Get files

```
GET /api/files
```

Returns all files with stored backups.

## Get versions

```
GET /api/versions/:file
```

Returns all saved versions of a file.

## Restore file

```
POST /api/restore
```

Body:
```json
{
  "file": "example.txt",
  "version": "timestamp.bak"
}
```

---

# Folder Watching

The watcher automatically tracks changes in the `watched` directory and creates backups inside:

```
data/backups/
```

Each file has its own folder with timestamped versions.

---

# Use cases

- Prevent accidental file loss
- Recover overwritten files
- Track document history
- Lightweight local backup system
- Simple Git-like versioning for files

---

# Future improvements

- SQLite metadata storage
- File diff viewer
- Compression of backups
- Cloud sync support
- Encryption of stored files
- Multi-device LAN sync
- User authentication
- Backup scheduling system
- Graph-based version timeline

---

# License

MIT License

Free to use and modify.
