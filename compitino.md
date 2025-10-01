parte 1:
- aggiungere la relazione tra post e utenti (aggiorniamo anche i controller)
- aggiungere la relazione tra commenti e utenti (aggiorniamo anche i controller)
- creare un endpoint che dato un utente faccia vedere tutti i suoi post
- fare in modo che la delete del post possa essere fatta solo dal proprietario del post

parte 2:
- middleware che permetta l'accesso all'endpoint solo se l'utente è maggiorenne
- definire gli altri validatori per gli altri modelli
- definire gli altri bouncer per le azioni che lo richiedono

- creare interamente modello/migrazione/controller/validator/bouncer/factory per l'entità messaggio (un messaggio viene scambiato tra solamente due utenti, ed è caratterizzato da un testo. può essere eliminato o aggiornato.)