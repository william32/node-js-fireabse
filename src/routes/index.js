const { async } = require('@firebase/util');
const {Router}= require('express');
const {db} = require('../firebase');
const router = Router();

router.get('/', async (req, res) => {
    const querySnapshot = await db.collection('contacts').get();
    
    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        
    }))
    console.log(contacts);
    res.render('index', {contacts});
})

router.post('/new-contact' , async (req, res) => {
   const { firstname , lastname , email , phone } = req.body
   await db.collection('contacts').add({
       firstname,
       lastname,
       email,
       phone

   })
   res.redirect('/'); 
})

router.get('/edit-contact/:id', async (req, res) =>{
    const doc = await db.collection('contacts').doc(req.params.id).get();
    res.render('index', {contact: {id: doc.id , ...doc.data()}}); 
})

router.get('/delete-contact/:id', async (req, res) => {
    await db.collection('contacts').doc(req.params.id).delete();
    res.redirect('/'); 
})

router.post('/update-contact/:id' , async (req, res) =>{
    await db.collection('contacts').doc(req.params.id).update(req.body);
    res.redirect('/');
})

module.exports = router;