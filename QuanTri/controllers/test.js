const bcrypt = require('bcrypt')
let saltRounds = 10
let myString = 'Qwerty123'
bcrypt.hash(myString, saltRounds, (err, hash)=>{
	if(!err){
		console.log(hash)
	}else{
		console.log('Error', err)
	}
})