import {Router} from 'express'
import pool from '../database.js'
import multer from 'multer'
import path from 'path'

const router = Router();

const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
});
const upload = multer({storage});


/* -------------------------- RUTAS PARA PRODUCTOS -------------------------- */
router.get('/add', (req, res) => {
    res.render('personas/add')
});

router.post('/add', upload.single('file'), async (req, res) => {
    try {
        const {producto, descripcion, precio, cantidad} = req.body
        let newPersona = {}

        if (req.file) {
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename

            newPersona = {producto, descripcion, precio, imagen, cantidad}
        } else {
            newPersona = {producto, descripcion, precio, cantidad}
        }
        await pool.query('INSERT INTO personas SET ?', [newPersona]);
        res.redirect('/list');
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/list', async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM personas');
        res.render('personas/list', {personas: result})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM personas WHERE id=?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params
        const [persona] = await pool.query('SELECT * FROM personas WHERE id = ?', [id]);
        const personaEdit = persona[0];
        res.render('personas/edit', {persona: personaEdit})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/edit/:id',  upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params
        const { producto, descripcion, precio, cantidad } = req.body
        let editPersona = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            editPersona = { producto, descripcion, precio, cantidad, imagen }
        }else{
            editPersona = { producto, descripcion, precio, cantidad }
        }
        await pool.query('UPDATE personas SET ? WHERE id = ?', [editPersona, id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/* ------------------------ RUTAS PARA SUSCRIPCIONES ------------------------ */
router.get('/addsuscripcion', (req, res) => {
    res.render('suscripciones/addsuscripcion')
});

router.post('/addsuscripcion', upload.single('file'), async (req, res) => {
    try {
        const {name, lastname, email, age, price, tiempo, certified, state, membership, description} = req.body
        let newPersona = {}

        if (req.file) {
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename

            newPersona = {name, lastname, email, age, imagen, price, tiempo, certified, state,membership, description}
        } else {
            newPersona = {name, lastname, email, age, price, tiempo, certified, state, membership, description}
        }
        await pool.query('INSERT INTO suscriptores SET ?', [newPersona]);
        res.redirect('/listsuscripcion');
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/listsuscripcion', async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM suscriptores');
        res.render('suscripciones/listsuscripcion', {suscriptores: result})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/deletesuscripcion/:id', async(req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM suscriptores WHERE id=?', [id]);
        res.redirect('/listsuscripcion');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/editsuscripcion/:id', async(req, res) => {
    try {
        const {id} = req.params
        const [persona] = await pool.query('SELECT * FROM suscriptores WHERE id = ?', [id]);
        const personaEdit = persona[0];
        res.render('suscripciones/editsuscripcion', {persona: personaEdit})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/editsuscripcion/:id',  upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, email, age, price, tiempo, certified, state, membership, description } = req.body
        let editPersona = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            editPersona = { name, lastname, email, age, price, tiempo, certified, state, membership, description, imagen }
        }else{
            editPersona = { name, lastname, email, age, price, tiempo, certified, state, membership, description }
        }
        await pool.query('UPDATE suscriptores SET ? WHERE id = ?', [editPersona, id]);
        res.redirect('/listsuscripcion');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* -------------------------- RUTA PARA PRODUCTO 1 -------------------------- */
router.get('/producto1', (req, res) => {
    res.render('productos/producto1')
});

router.get('/producto2', (req, res) => {
    res.render('productos/producto2')
});

router.get('/producto3', (req, res) => {
    res.render('productos/producto3')
});

router.get('/producto4', (req, res) => {
    res.render('productos/producto4')
});

router.get('/producto5', (req, res) => {
    res.render('productos/producto5')
});

router.get('/producto6', (req, res) => {
    res.render('productos/producto6')
});

router.get('/producto7', (req, res) => {
    res.render('productos/producto7')
});

router.get('/producto8', (req, res) => {
    res.render('productos/producto8')
});

export default router;  