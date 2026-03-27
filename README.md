# File Explorer

Un'applicazione web mobile-first per esplorare e organizzare file locali direttamente dal browser, senza upload su server.

---

## Funzionalità

- **Esplora i tuoi file** — naviga nelle cartelle del tuo dispositivo
- **Scatta foto** — puoi scattare foto all'interno della directory corrente, il nome sara il nomde della dirctoery seguto da un id
- **Crea cartelle** — organizza i tuoi file creando nuove directory

---

## Come si usa

1. Apri l'app e concedi l'accesso alla cartella che vuoi esplorare
2. Naviga tra le cartelle toccando una directory

> L'app non carica nessun file su internet. Tutto rimane sul tuo dispositivo.

### File System Access API

L'app usa la [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) per accedere ai file locali. Questa API è supportata da Chrome e Edge su desktop e mobile; non è supportata da Firefox e Safari.

## Limitazioni note

- La File System Access API non è supportata da Firefox e Safari
