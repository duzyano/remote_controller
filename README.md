# remote_controller
voor module 7.2 
I’m finding the computer’s local IP address so I can tell you the exact URL for your iPhone.

Ran terminal command: ipconfig | Select-String 'IPv4 Address|IPv4-adres|Wireless LAN adapter|Ethernet adapter'

Je lokale IP is: `10.16.31.124`

Gebruik op je iPhone deze URL voor de controller:
- `http://10.16.31.124:3000/controller.html`

Voor de display op de laptop kun je:
- `http://localhost:3000/display.html`
of dezelfde IP gebruiken:
- `http://10.16.31.124:3000/display.html`

Belangrijk:
- server.js moet draaien
- iPhone en laptop moeten op hetzelfde Wi-Fi-netwerk zitten
- niet `localhost` op de telefoon gebruiken

Created 2 todos

Je lokale IP is: `10.16.31.124`

Gebruik op je iPhone deze URL voor de controller:
- `http://10.16.31.124:3000/controller.html`

Voor de display op de laptop kun je:
- `http://localhost:3000/display.html`
