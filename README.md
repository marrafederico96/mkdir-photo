# File Explorer

Un'applicazione web mobile-first per esplorare e organizzare file locali direttamente dal browser, senza upload su server.

---

## Funzionalità

- **Esplora i tuoi file** — naviga nelle cartelle del tuo dispositivo
- **Anteprima immagini** — le immagini mostrano una miniatura direttamente nella lista
- **Crea cartelle** — organizza i tuoi file creando nuove directory
- **Navigazione avanti/indietro** — torna alle cartelle precedenti con il tasto indietro o il gesto del browser

---

## Come si usa

1. Apri l'app e concedi l'accesso alla cartella che vuoi esplorare
2. Naviga tra le cartelle toccando una directory
3. Le immagini mostrano un'anteprima direttamente nella lista
4. Usa il tasto **Indietro** per tornare alla cartella precedente
5. Per creare una nuova cartella, usa l'apposita funzione e inserisci il nome

> L'app non carica nessun file su internet. Tutto rimane sul tuo dispositivo.

---

## Stack tecnico

| Tecnologia             | Versione     |
| ---------------------- | ------------ |
| Angular                | 19+          |
| Angular Material       | 19+          |
| File System Access API | Web standard |

### Architettura

L'app è costruita attorno a `FileSystemService`, un servizio Angular singleton che gestisce:

- lo stato della directory corrente tramite **signals**
- lo stack di navigazione per il tasto indietro
- la cache delle thumbnail con `URL.createObjectURL`

```
src/
├── app/
│   ├── services/
│   │   └── file-system.service.ts   # logica principale
│   └── components/
│       └── dashboard/
│           ├── dashboard.component.ts
│           ├── dashboard.component.html
│           └── dashboard.component.scss
```

### File System Access API

L'app usa la [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) per accedere ai file locali. Questa API è supportata da Chrome e Edge su desktop e mobile; non è supportata da Firefox e Safari.

### Thumbnail

Le anteprime vengono generate con `URL.createObjectURL` e messe in cache in un signal (`Map<string, string>`). Vengono revocate con `URL.revokeObjectURL` alla distruzione del component per evitare memory leak.

---

## Installazione e avvio

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
ng serve

# Build di produzione
ng build
```

---

## Requisiti

- Node.js 18+
- Browser basato su Chromium (Chrome, Edge, Opera)

---

## Limitazioni note

- La File System Access API non è supportata da Firefox e Safari
- Le thumbnail sono generate solo per immagini nei formati `jpg`, `jpeg`, `png`, `gif`, `webp`, `avif`
