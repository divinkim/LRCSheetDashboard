const https = require("https");
const fs = require("fs");
const next = require("next");

const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/vps101055.serveur-vps.net/privkey.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/vps101055.serveur-vps.net/fullchain.pem', 'utf8'),
};

app.prepare().then(() => {
  https.createServer(httpsOptions, (req, res) => {
    // Rediriger la racine vers le dashboard
    if (req.url === "/") {
      res.writeHead(302, { Location: "/home" });
      res.end();
      return;
    }
    handle(req, res);
  }).listen(8501, "0.0.0.0", () => {
    console.log("Next.js dev HTTPS running on https://vps101055.serveur-vps.net:8501");
  });
});
