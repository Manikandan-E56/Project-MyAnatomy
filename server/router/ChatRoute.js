import express from 'express';
import { getClubMessages, postClubMessage, getAdminClub } from '../controllers/MessageController.js';

const router = express.Router();

// Route to get all messages for a club
// GET /api/messages/:clubId
router.get('/:clubId', getClubMessages);
router.post('/:clubId', postClubMessage);
router.get('/admin/myclub/:clubId', getAdminClub);

export default router;
