import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authenticateJWT from '../helpers/authenticateJWT';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth management
 */

const users = [
    {
        username: 'ryandstoughton',
        password: 'password',
        role: 'admin',
    },
    {
        username: 'guest',
        password: 'shhh',
        role: 'member',
    },
];

const accessTokenSecret = 'wowyouguessedit';
const refreshTokenSecret = 'yourrefreshtokensecrethere';

let refreshTokens: string[] = [];

/**
 * @swagger
 * path:
 *   /login:
 *     post:
 *       summary: Login as a user
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - username
 *                 - password
 *               properties:
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 */
router.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        const tokenPayload = { username: user.username, role: user.role };
        const accessToken = jwt.sign(tokenPayload, accessTokenSecret, {
            expiresIn: '20m',
        });
        const refreshToken = jwt.sign(tokenPayload, refreshTokenSecret);
        refreshTokens.push(refreshToken);

        res.json({ accessToken, refreshToken });
    } else {
        res.send('Username or password incorrect');
    }
});

router.post('/token', (req: Request, res: Response) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, {
            expiresIn: '20m',
        });

        res.json({ accessToken });
    });
});

router.post('/logout', (req: Request, res: Response) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter((t) => t !== token);

    res.send('Logout successful');
});

router.get('/user', authenticateJWT, (req: Request, res: Response) => {
    res.json(req.user);
});

export default router;
