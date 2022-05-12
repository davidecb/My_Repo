const { Router } = require('express');

module.exports = ({ NoteController }) => {
    const router = Router();
    
    router.post('/', NoteController.create);
    router.get('/', NoteController.getNotes);
    router.get('/duplicated', NoteController.getDuplicated);

    return router;
};
