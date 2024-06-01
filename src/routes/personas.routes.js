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
    res.render('productos/add')
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
        await pool.query('INSERT INTO productos SET ?', [newPersona]);
        res.redirect('/list');
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/list', async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM productos');
        res.render('productos/list', {productos: result})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM productos WHERE id=?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/edit/:id', async(req, res) => {
    try {
        const {id} = req.params
        const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        const productoEdit = producto[0];
        res.render('productos/edit', {producto: productoEdit})
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
        await pool.query('UPDATE productos SET ? WHERE id = ?', [editPersona, id]);
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
        const [suscripcion] = await pool.query('SELECT * FROM suscriptores WHERE id = ?', [id]);
        const editSuscripcion = suscripcion[0];
        res.render('suscripciones/editsuscripcion', {suscripcion: editSuscripcion})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/editsuscripcion/:id',  upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, email, age, price, tiempo, certified, state, membership, description } = req.body
        let editSuscripcion = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            editSuscripcion = { name, lastname, email, age, price, tiempo, certified, state, membership, description, imagen }
        }else{
            editSuscripcion = { name, lastname, email, age, price, tiempo, certified, state, membership, description }
        }
        await pool.query('UPDATE suscriptores SET ? WHERE id = ?', [editSuscripcion, id]);
        res.redirect('/listsuscripcion');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* -------------------------- RUTA PARA PRODUCTO 1 -------------------------- */
router.get('/producto1', (req, res) => {
    res.render('productosind/producto1')
});

router.get('/producto2', (req, res) => {
    res.render('productosind/producto2')
});

router.get('/producto3', (req, res) => {
    res.render('productosind/producto3')
});

router.get('/producto4', (req, res) => {
    res.render('productosind/producto4')
});

router.get('/producto5', (req, res) => {
    res.render('productosind/producto5')
});

router.get('/producto6', (req, res) => {
    res.render('productosind/producto6')
});

router.get('/producto7', (req, res) => {
    res.render('productosind/producto7')
});

router.get('/producto8', (req, res) => {
    res.render('productosind/producto8')
});


/* ---------------------------- RUTA CONTACTANOS ---------------------------- */

router.get('/confirmation', (req, res) => {
    res.render('confirmacion/confirmation')
});

router.post('/sendform', upload.single('file'), async (req, res) => {
    try {
        const {name, email, asunto, mensaje} = req.body
        let newPersona = {}

        if (req.file) {
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename

            newPersona = {name, email, asunto, mensaje, imagen}
        } else {
            newPersona = {name, email, asunto, mensaje}
        }
        await pool.query('INSERT INTO emails SET ?', [newPersona]);
        res.redirect('/confirmation');
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});



export default router;  