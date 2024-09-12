const express = require('express');
const router = express.Router();
const Entry = require('../Entry');
const { connectToDatabase, disconnectFromDatabase } = require('../db');

/**
 * @swagger
 * components:
 *   schemas:
 *     Entry:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto generated post ID
 *           example: "60d5f84f6c73b4d9a8e82c32"
 *         title:
 *           type: string
 *           description: Entry Title
 *           example: "Entry Title"
 *         body:
 *           type: string
 *           description: Entry content
 *           example: "This is the body of the post."
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Date of post creation
 *           example: "2024-09-09T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: Date of last post update
 *           example: "2024-09-09T00:00:00.000Z"
 *       required:
 *         - title
 *         - body
 */

/**
 * @swagger
 * /entry:
 *   get:
 *     summary: Get all entry
 *     tags: [Entry]
 *     responses:
 *       200:
 *         description: List of all entry
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entry'
 */
router.get('/', async (req, res) => {
    try {
        await connectToDatabase();
        const entry = await Entry.find();
        res.json(entry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await disconnectFromDatabase();
    }
});


/**
 * @swagger
 * /entry/title/{title}:
 *   get:
 *     summary: Getting entry by title
 *     tags: [Entry]
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Entry Title
 *     responses:
 *       200:
 *         description: List of entry with the specified title
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entry'
 *       500:
 *         description: Server error
 */
router.get('/title/:title', async (req, res) => {
    try {
        await connectToDatabase();
        const entry = await Entry.find({ title: req.params.title });
        res.json(entry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await disconnectFromDatabase();
    }
});

// GET: Getting a entry by ID
/**
 * @swagger
 * /entry/{id}:
 *   get:
 *     summary: Getting a entry by ID
 *     tags: [Entry]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Entry ID to retrieve
 *     responses:
 *       200:
 *         description: Entry found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entry'
 *       404:
 *         description: Entry not found
 */
router.get('/:id', async (req, res) => {
    try {
        await connectToDatabase();
        const entry = await Entry.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.json(entry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await disconnectFromDatabase();
    }
});


// POST: Create a new entry
/**
 * @swagger
 * /entry:
 *   post:
 *     summary: Create a new entry
 *     tags: [Entry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Entry'
 *     responses:
 *       201:
 *         description: Entry successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entry'
 *       400:
 *         description: Data validation error
 */
router.post('/', async (req, res) => {
    const { title, body } = req.body;

    const entry = new Entry({
        title,
        body,
        createdAt: Date.now(),
        updatedAt: Date.now()
    });

    try {
        await connectToDatabase();
        const newEntry = await entry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await disconnectFromDatabase();
    }
});


/**
 * @swagger
 * /entry/{id}:
 *   put:
 *     summary: Entry update
 *     tags: [Entry]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Entry ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Entry'
 *     responses:
 *       200:
 *         description: Entry successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entry'
 *       404:
 *         description: Entry not found
 */
router.put('/:id', async (req, res) => {
    try {
        await connectToDatabase();
        const entry = await Entry.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        entry.title = req.body.title || entry.title;
        entry.body = req.body.body || entry.body;
        entry.updatedAt = Date.now();

        const updatedEntry = await entry.save();
        res.json(updatedEntry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await disconnectFromDatabase();
    }
});

/**
 * @swagger
 * /entry/{id}:
 *   delete:
 *     summary: Deleting a entry
 *     tags: [Entry]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Entry ID to delete
 *     responses:
 *       200:
 *         description: Entry successfully deleted
 *       404:
 *         description: Entry not found
 */
router.delete('/:id', async (req, res) => {
    try {
        await connectToDatabase();
        const entry = await Entry.findByIdAndDelete(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.json({ message: "Entry deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    } finally {
        await disconnectFromDatabase();
    }
});

module.exports = router;
