// ./app/routers/index.js

import express from 'express';
import { adoptRouter } from './adopts.js';
import { authRouter } from './auth.js';
import { usersRouter } from './users.js';
import { animalsRouter } from './animals.js';
import { tagsRouter } from './tags.js';
import { rolesRouter } from './roles.js';
import { photosRouter } from './photos.js';
import { avatarsRouter } from './avatars.js';

const router = express.Router();

router.use(adoptRouter);
router.use(authRouter);
router.use(usersRouter);
router.use(animalsRouter);
router.use(tagsRouter);
router.use(rolesRouter);
router.use(photosRouter);
router.use(avatarsRouter);

export { router as default, adoptRouter, authRouter, usersRouter, animalsRouter, tagsRouter, rolesRouter, photosRouter, avatarsRouter };