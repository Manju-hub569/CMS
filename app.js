const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser')

require('./db/conn.js');
const Sregister = require('./model/sregister');
const Fregister = require('./model/fregister');
const Notify = require('./model/notify');
const Log = require('./model/log');
const Authenticate = require('./Authentication/authenticate');

const port = process.env.PORT || 5000;
const locate = path.join(__dirname, './template/views');
const partial = path.join(__dirname, './template/views/partials');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(locate));
app.use(cookieParser());
hbs.registerPartials(partial);

app.set('views', locate);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login', async (req, res) => {
    try {
        const {name, password} = req.body;
        const getdata = await Log.findOne({name:name});

        if(password === getdata.password) {
            res.status(201).render('register');
        }
        res.cookie('name', getdata.name);
    } catch (e) {
        const style = `Invalid Entries`;
        res.status(401).render('index', {'exception':style});
    }
});

app.post('/register', async (req, res)=> {
    try{
        const reg = new Sregister({
            name: req.body.name,
            roll: req.body.roll,
            dob:req.body.dob,
            address:req.body.address,
            phone:req.body.phone,
            email:req.body.email
        })

        const result = await reg.save();
        res.status(201).render('register', {'reg':'register successfull'});
    }catch(e){
        res.send(e);
    }
});

app.post('/fregister', async (req, res)=> {
    try{
        const freg = new Fregister({
            name: req.body.name,
            reg: req.body.reg,
            dob:req.body.dob,
            address:req.body.address,
            phone:req.body.phone,
            email:req.body.email
        });

        const resul = await freg.save();
        res.status(201).render('freg', {'reg':'register successfull'});
    }catch(e){
        res.send(e);
    }
});

app.post('/slogin', async (req, res) => {
    try {
        const {name, roll} = req.body;
        const getd = await Sregister.findOne({name:name});
        if(roll === getd.roll) {
            res.status(201).render('sprofile', {
                'name':getd.name,
                'roll':getd.roll,
                'dob':getd.dob,
                'address':getd.address,
                'phone':getd.phone,
                'email':getd.email,
            });
            res.cookie('name', getd.name);
        }
    } catch (e) {
        res.status(401).render('index', {'exception':'Invalid Entries'});
    }
});

app.post('/flogin', async (req, res) => {
    try {
        const {name, reg} = req.body;
        const getdata = await Fregister.findOne({name:name});
        if(reg === getdata.reg) {
            res.status(201).render('fprofile', {
                'name':getdata.name,
                'reg':getdata.reg,
                'dob':getdata.dob,
                'address':getdata.address,
                'phone':getdata.phone,
                'email':getdata.email,
            });
            res.cookie('name', getdata.name);
        }
    } catch (e) {
        res.status(401).render('index', {'exception':'Invalid Entries'});
    }
});

app.get('/freg',Authenticate, (req, res) => {
    if(req.tokens === undefined) {
        res.render('index');
    } else {
        res.render('freg');
    }
});

app.get('/sreg',Authenticate, (req, res) => {
    if(req.tokens === undefined) {
        res.render('index');
    } else {
        res.render('register');
    }
});

app.get('/sdata',Authenticate, async (req, res) => {
    if(req.tokens === undefined) {
        res.render('index');
    } else {
        const data = await Sregister.find();
        res.render('sdata', {data});   
    }
});

app.get('/fdata',Authenticate, async (req, res) => {
    if(req.tokens === undefined) {
        res.render('index');
    } else {
        const dat = await Fregister.find();
        res.render('fdata', {dat});
    }
});

app.get('/notify',Authenticate, (req, res) =>{
    if(req.tokens === undefined) {
        res.render('index');
    } else {
        res.render('notify');
    }
})

app.post('/notify', async (req, res) => {
    try {
        const notice = new Notify({
            notification:req.body.notification
        });
        const reslt = await notice.save();
        res.render('notify', {'msg':'sent successfully'})
    } catch(e) {
        console.log(e);
    }
});

app.get('/sprfle',Authenticate, async (req, res) => {
    if(req.tokens === undefined) {
        res.render('index');
    } else {
        const data = await Sregister.find();
        res.render('sprofile', {data});
    }
});

app.get('/snotify',Authenticate, async (req, res) => {
    if(req.tokens === undefined) {
        res.render('index');
    } else {
        const not = await Notify.find();
        res.render('snotify', {not});
    }
});

app.get('/delete/:_id', async (req, res) => {
const _id = req.params._id;
const del = await Sregister.findByIdAndDelete({_id});
if(del) {
    const data = await Sregister.find();
    res.render('deldata', {data});
}else {
    console.log('not deleted');
}
});

app.get('/delet/:_id', async (req, res) => {
    const _id = req.params._id;
    const del = await Fregister.findByIdAndDelete({_id});
    if(del) {
        const dat = await Fregister.find();
        res.render('fdeldata', {dat});
    }else {
        console.log('not deleted');
    }
    });

    app.get('/logout', async (req, res) => {
        res.clearCookie('name', {path:'/'});
        res.render('index');
    });

app.listen(port, () => {
    console.log(`listening at ${port}`);
});