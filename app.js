const express = require("express");
const bodyParser=require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app= express();
const PORT = process.env.PORT || 3000;
mongoose.set("strictQuery",false);
mongoose.connect("mongodb+srv://admin-kishore:Test123@cluster0.yhnco9i.mongodb.net/registrationDB");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
const registerSchema = new mongoose.Schema({
	name:String,
	phno:Number,
	yoe:Number
})
const Register = mongoose.model("Register",registerSchema);

app.get("/",(req,res)=>{
	res.render("index");
	
})
app.get("/table",(req,res)=>{

	Register.find((err,foundRegisters)=>{
		if(!err){
			res.render("register",{regname:foundRegisters,phno:foundRegisters,yoe:foundRegisters});
		}else{
			console.log(err);
		}
	})
	

	
})
app.get("/delete",(req,res)=>{
	res.render("delete");
})
app.get("/update",(req,res)=>{
	res.render("update");
})
app.get("/error",(req,res)=>{
	res.render("error");
})

app.post("/",(req,res)=>{
	let regname = req.body.regname;
	let phoneno = req.body.phno;
	let yearsOfExp = req.body.years;
	const register = new Register({
		name:regname,
		phno:phoneno,
		yoe:yearsOfExp
	})
	register.save((err)=>{
		if (!err) {
			console.log("Saved Successfully");
		} else {
			console.log(err);
		}
		res.redirect("/");
	});

})
app.post("/delete",(req,res)=>{
	let deletedname = req.body.deletename;
	Register.deleteOne({_id:deletedname},(err)=>{
		if(!err){
			console.log("Deleted Succesfully");
			res.redirect("/table");
		}else{
			res.redirect("/error");
		}
		
	})
	
})

app.post("/update",(req,res)=>{
	let idno = req.body.idno;
	let reph = req.body.reph;
	let reyoe = req.body.reyoe;
	let rename = req.body.rename;
	Register.updateOne({_id:idno},{name:rename,phno:reph,yoe:reyoe},(err)=>{
		if (!err) {
			console.log("Updated Successfully");
			res.redirect("/table");
		} else {
			res.redirect("/error");
		}
	})

})
app.get("/table/deleteall",(req,res)=>{
	Register.deleteMany((err)=>{
		if(!err){
			res.redirect("/table");
		}else{
			res.redirect("/error");
		}
	})
})
app.listen(PORT,()=>{
	console.log("server started @ port : 3000");
})