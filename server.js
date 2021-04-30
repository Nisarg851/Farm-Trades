//################################## Configurations for Mongoose-Mongo DB ####################################################
//External Modules
const express = require('express');
const bodyParser = require('body-parser');  
const path = require('path');

// Router Modules
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// Controller Modules
const errorController = require('./controllers/error');

// MongoDb modules
const mongoose = require('mongoose');

// MongoDB Models;
const User = require('./models/User');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views/ejs files');

app.use((req, res, next) => {
    User.findById('606f483dc2bc5f08cc314c5e') 
        .then( user => {
            req.user = user; 
            next();
        })
        .catch( err => console.log(err));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes); 

app.use(errorController.get404);

mongoose.connect('mongodb+srv://Nisarg851:sarg12ni34@cluster0.vjesx.mongodb.net/shop?retryWrites=true&w=majority'
                ,{ useUnifiedTopology:true, useNewUrlParser:true})
        .then(()=>{
            User.findOne()
                .then(user => {
                    if(!user){
                        const user = new User({
                            userName : 'Nisarg851',
                            email : 'nisargmahyavanshi@gmail.com',
                            cart : {
                                items : []
                            }
                        });
                        user.save();
                    }
                })
            console.log("Starting Server....");
            app.listen(3000);
        })
        .catch(err => console.log(err));