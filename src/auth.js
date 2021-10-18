const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
 
//http://bcrypt-generator.com/
 
const users =[{
    _id: 1,
    username: 'adm',
    password:'$2a$12$3JZ8K9Ob/x1i8MLjkO8In.Wub5ooISRg3VUd7mUR9igm/BZZgFYH6', // 123
    email:'adm@gmail.com'
 
}];
 
function findUser(username){
    return users.find(item => item.username === username);
}
 
function findUserById(ID) {
    return users.find(item =>  item._id === id);
}
 
module.exports = (passport) => {
 
    // Uma vez autenticado ele salva um cookie no front e uma sessão no back
    passport.serializeUser((user, done)=> {
     done(null, user._id);
    });
 
   // Uma vez que as informações estão gravadas, posso recuperá-las
    passport.deserializeUser((id, done)=>{
   try {
 
    const user = findUserById(ID);
    done(null, user);
 
   }catch (error) {
     console.log(error);
     return done(error, null);
 }
 
    });
 
passport.use(new LocalStrategy({
    username: 'username',
    password: 'password'
}, (username, password, done)=>{
    try{
        const user = findUser(username);
        if(!user) return done(null, false);
 
        const isValid = bcrypt.compareSync(password, user.password);
        if(!isValid) return done(null, false);
        return (done(null, user));
    } catch (error){
        console.log(error);
        return done(error, false);
    }
 
 }))
 
}