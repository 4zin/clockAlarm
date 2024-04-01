"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.SPOTIFY_REDIRECT_URI,
    credentials: true
}));
app.use(body_parser_1.default.json());
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control_Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
const PORT = Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3002);
const spotifyApi = new spotify_web_api_node_1.default({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});
app.post('/login', (req, res) => {
    const { code } = req.body;
    spotifyApi.authorizationCodeGrant(code)
        .then(data => {
        const { access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn } = data.body;
        res.cookie('accessToken', accessToken, { httpOnly: false, sameSite: 'none', secure: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: false, sameSite: 'none', secure: true });
        res.json({ accessToken, refreshToken, expiresIn });
    })
        .catch(() => {
        res.sendStatus(400);
    });
});
app.post('/refresh', (_req, res) => {
    spotifyApi.refreshAccessToken()
        .then(data => {
        const { access_token: accessToken, expires_in: expiresIn } = data.body;
        res.json({ accessToken, expiresIn });
    })
        .catch(() => {
        res.sendStatus(400);
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
