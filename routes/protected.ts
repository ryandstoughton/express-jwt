import express, { NextFunction, Request, Response } from 'express';
import authenticateJWT from '../helpers/authenticateJWT';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Protected
 *   description: Some protected resource
 */

router.get('/protected', authenticateJWT, (req: Request, res: Response, next: NextFunction) => {
    res.json({ protected: 'resource!' });
});

export default router;
