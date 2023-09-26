// //Home Page

window.addEventListener("load", function(){

    view=document.getElementById("VIEWALL")
    view.addEventListener("click",function(){
        location.href ='/Products.html'

    })

    AllProductsBtn=document.getElementById("AllProducts");
    AllProductsBtn.addEventListener("click",function(){
        location.href ='/Products.html'
    })

});

// // //////////////
// // // Details Page 

window.addEventListener("load",function(){

    MainImg=document.getElementById("MainImg");
    SmallImages=document.getElementsByClassName("Small");
   
    SmallImages[0].addEventListener("click",function(){
        MainImg.src=SmallImages[0].src 
    })
    SmallImages[1].addEventListener("click",function(){
        MainImg.src=SmallImages[1].src 
    })
    SmallImages[2].addEventListener("click",function(){
        MainImg.src=SmallImages[2].src 
    })
    SmallImages[3].addEventListener("click",function(){
        MainImg.src=SmallImages[3].src 
    })

})

// // ////////////////////////////
// // Contact us

window.addEventListener("load", function () {

    _Name=document.getElementById("Name")
    _Name.addEventListener("blur",CheckName)
    
    _Mail=document.getElementById("Mail")
    _Mail.addEventListener("blur",CheckMail)

    _Address=document.getElementById("Address")
    _Address.addEventListener("blur",CheckAddress)


    SubmitBtn.addEventListener("click",function(e){
        
        if(!CheckName() || !CheckMail() || !CheckAddress() || !CheckComment()){
            e.preventDefault();
        }
        else{
            alert("Thanks For your FeedBack ")
        }
        
    })
    
})

function CheckName(){
    _Name=document.getElementById("Name").value

    if (_Name == "") {
        // alert("Please Add Your Name ")
        ContName.innerText=" * Please Add Your Name "
        return false;
    }
    else if(_Name.length < 4)
    {
        // alert("Please Add Your Name More than 4 chars ")
        ContName.innerText=" * Please Add Your Name More than 4 chars "

        return false;
    }
    else if(_Name.length > 20)
    {
        // alert("Please Add Your Name less than 20 chars ")
        ContName.innerText=" * Please Add Your Name less than 20 chars "

        return false;
    }
    else{
        ContName.style.color = "green"
        ContName.innerText=" ** Right "
        return true;
    }
}

function CheckMail(){

    _Mail=document.getElementById("Mail").value
    _MailReg=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
        if (_Mail == "") {
            // alert("Please Add Your mail ")
            ContMail.innerText=" *Please Add Your mail "
            return false;
        }
        else if(!_MailReg.test(_Mail)){
            ContMail.innerText=" * plz add Valid Mail";
            return false;
    
        }
        else{
            ContMail.style.color = "green"
            ContMail.innerText=" ** Right "
            return true;
        }
}

function CheckAddress(){

    _Address=document.getElementById("Address").value
            
    if (_Address == "") {
        ContAddress.innerText="Please Add Your Address "
         return false;
    }
    else if (_Address.length < 10){

        ContAddress.innerText="Please Add Your Right Address "


    }
    else{
        ContAddress.style.color = "Green"
        ContAddress.innerText = " ** Right"
        return true;
    }
}

function CheckComment(){

    _Comment=document.getElementById("Comment").value
                
    if (_Comment == "") {
        alert("Please Add Your Comment")
        return false;
    }
    else{
        return true;
    }
}

///////////////////////////
// cart Page



window.addEventListener("load",function (event) {

    displayCartItems()

    _DeletButton=document.getElementsByClassName("DeletBtn");
    for (let i = 0; i < _DeletButton.length; i++) {
    
        _DeletButton[i].addEventListener("click",function (event) {
            
            event.target.parentElement.parentElement.remove()
            
        }) 
        
    }


    _CartButton=document.getElementsByClassName("CartBtn");
    for (let i = 0; i < _CartButton.length; i++) {
        
        _CartButton[i].addEventListener("click",function (event) {

            // if(!StorLogin(event)){
            //     event.preventDefault();
            //     alert("You Should login");
            //     location.href = "/Login.html"
            // }
            // else{

                _Product={
                    _id:i+1,
                    _title:event.target.parentElement.parentElement.getElementsByClassName("ProductTitle")[0].innerText,
                    _Price:event.target.parentElement.parentElement.getElementsByClassName("Price")[0].innerText,
                    _img:event.target.parentElement.parentElement.parentElement.getElementsByClassName("ProductImg")[0].src,
                    _Quentity: 0
            
                }

            SetItems(_Product);
            Totalcost(_Product)
            // }

            
        });
        
    }

})

function SetItems(theProduct){
    // console.log(theProduct)
    let TheCart=JSON.parse(localStorage.getItem('ProductArray'));
    // console.log(TheCart)
    if(TheCart != null) {
        // console.log(TheCart[theProduct._title])
        if (TheCart[theProduct._title] == undefined)  // diffrent name
        {
            TheCart={ //update the cart
                ...TheCart, 
                [theProduct._title] : theProduct
            }
            
        }
        TheCart[theProduct._title]._Quentity +=1; 
        
    }
    else
    {
        theProduct._Quentity = 1;

        TheCart=
        {
        [theProduct._title] : theProduct
            
        }

    }

    localStorage.setItem('ProductArray', JSON.stringify(TheCart))
    
}

function Totalcost(Prdct){
    // console.log(Prdct._Price)
    let cartCost=localStorage.getItem('Totalcost') ;
    if (cartCost != null) {
        cartCost=parseInt(cartCost)
        localStorage.setItem("Totalcost", cartCost + parseInt (Prdct._Price))
    }
    else {
    localStorage.setItem("Totalcost", parseInt(Prdct._Price)  )
        
    }

}

function displayCartItems(){
    let Items= JSON.parse(localStorage.getItem('ProductArray')) 
    // console.log("hi")
    let CartContainer=document.querySelector(".CartContainer")
    // console.log(CartContainer)
    if (Items && CartContainer ) {
        
        

        Object.values(Items).map(Item =>{
        // console.log("hiiii")

        CartContainer.innerHTML +=`
        <div class="CartProduct">
        <div class="Imags"><img src="${Item._img}">
        </div>
        <div class="Title">${Item._title}</div>
        <div class="ProductPrice">$${Item._Price }</div>
        <div class="ProductQuantity " >${Item._Quentity}</div>
        <div class="ProductPrice">$${Item._Price * Item._Quentity }</div>
        <div class="Delete"><input type="button" value="Delete" class="DeletBtn" ></div>
        </div>
            `
        
            // console.log(CartContainer.innerHTML)
        })
        // CartContainer.innerHTML=``

        
    }
}

/////////////////////////////
 // //login ang Register
window.addEventListener("load",function () {

    FormLog=document.getElementById("FormLog");
    FormReg=document.getElementById("FormReg");

    LogInForm=document.getElementById("FormOfLogin");
    RegInForm=document.getElementById("FormOfReg");


    FormReg.addEventListener("click",function(){
        RegInForm.style.display = "block";
        LogInForm.style.display = "none";
        
    })
   
})
// ///////////////////////
// Login&Register 

window.addEventListener("load",function(){

    
    _LoginBtn=document.getElementById("LoginBtn");

    _LoginBtn.addEventListener("click",function(e){

        if(!CheckUserName() || !CheckUserPassword()){
            e.preventDefault();

        }
        else{
            StorLogin()
        }
           
    })

    _RgBtn=document.getElementById("RegisterBtn");
    _RgBtn.addEventListener("click",function(e){

        if ( !CheckFirstName() || !_CheckUserPassword() || !CheckUserMail() ) {
            
            e.preventDefault();

        }
        else{
            StorReg()
        }
        

    })


 })

function CheckUserName(){
    _Name=document.getElementById("UserName");


    if(_Name.value === ""){
        Restrriction_Name.innerText="  * Plz Enter Your User Name "
        // alert("Plz Enter Your User Name");
        return false;
    }
    else if(_Name.value.length < 4){
        Restrriction_Name.innerText="  * Plz Enter Right User Name"

        // alert("Plz Enter Right User Name");
        return false;
    }
    else{

        return true;
    }

}

function CheckUserPassword(){
    _password=document.getElementById("UserPassword");
    if(_password.value === ""){
        Restrriction_Password.innerText="  *plz add Your password"
        return false;

    }
    else{
        return true;
    }

}
// RgForm

function CheckFirstName(){
    _UserFName=document.getElementById("UserFName")
    if (_UserFName.value == "") {
        Restrriction_FName.innerText=" * plz add your First Name"
        return false;
    }
    else if(_UserFName.value.length < 4)
    {
        Restrriction_FName.innerText=" * plz Name more than 4 characters"
        return false;
    }
    else if(_UserFName.value.length > 20)
    {
        Restrriction_FName.innerText=" * plz Name less than 20 characters"
        return false;
    }
    else{
        Restrriction_FName.style.color = "green"
        Restrriction_FName.innerText=" ** Right "
        return true;
    }
        
        
}

function CheckUserMail(){
   
    _UserMail=document.getElementById("UserMail")
    _MailReg=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


    if(_UserMail.value === ""){

        Restrriction_Mail.innerText=" * plz add your Mail";
        return false;


    }
    else if(!_MailReg.test(_UserMail.value)){
        Restrriction_Mail.innerText=" * plz add Valid Mail";
        return false;

    }
    else {
        Restrriction_Mail.style.color = "green"
        Restrriction_Mail.innerText=" ** Right "
        return true;
    }
         
}
function _CheckUserPassword(){
    
   
    _UserPassword1=document.getElementById("UserPassword1")
    _UserPassword2=document.getElementById("UserPassword2").value


    if(_UserPassword1.value === ""){
        Restrriction_P1.innerText=" * plz add your password";
        return false;

    }
    else if(_UserPassword1.value.length < 4)
    {
        Restrriction_P1.innerText=" * plz Add password more than 4 characters"
        return false;
    }
    else if(_UserPassword1.value.length > 20)
    {
        Restrriction_P1.innerText=" * plz Add password less than 20 characters"
        return false;
    }
    else{
         Restrriction_P1.style.color = "green"
        Restrriction_P1.innerText=" ** Right "
        
        _UserPassword1=document.getElementById("UserPassword1")
        _UserPassword2=document.getElementById("UserPassword2")
        if(_UserPassword2.value === "" ){
        Restrriction_P2.innerText=" * plz Confirm your password";
        return false;

        }
        else if (!(_UserPassword2.value === _UserPassword1.value) ){
        Restrriction_P2.innerText=" * It Does not Match ";
        return false

        }
    
     else {   
        Restrriction_P2.style.color = "green"
        Restrriction_P2.innerText=" ** Matched "  
        return true;
     }

        
    }

   
         
}
// ////////////////////////
//Infotmation at localStorage
function StorReg(){

    let RegisterationDataObject = { 
        _UserFName:document.getElementById("UserFName").value,
        _UserPassword1:document.getElementById("UserPassword1").value,
        _UserMail:document.getElementById("UserMail").value
    }
   
    let RegInFormArray=JSON.parse(localStorage.getItem('RegInFormArray')) || [];

    let _DataReg=RegInFormArray.length && JSON.parse(localStorage.getItem('RegInFormArray')).some( DataREG => 

        DataREG._UserMail == RegisterationDataObject._UserMail 

        
    );

    if (!_DataReg) {
        RegInFormArray.push(RegisterationDataObject)
        localStorage.setItem('RegInFormArray', JSON.stringify(RegInFormArray))
        alert("You sign Up Successfuly You Can Now Log in")
       
    }
    else{

        alert(" You already have an account plz login ")
    }
    // e.preventDefult();      
}

function StorLogin() {
    
    let RegisterationDataObject = {
        LogInName:document.getElementById("UserName").value,
        LogInPassword:document.getElementById("UserPassword").value
    }

    let RegInFormArray=  JSON.parse(localStorage.getItem('RegInFormArray')) || [];

    let _DataReg=RegInFormArray.length && JSON.parse(localStorage.getItem('RegInFormArray')).some( DataREG => 

        DataREG._UserFName == RegisterationDataObject.LogInName &&
        DataREG._UserPassword1 == RegisterationDataObject.LogInPassword
        
    );

    if (_DataReg) {

      location.href = "/Home.html"
        
       alert(" Welcome ")
    //    console.log("hiii")
    }
    else
    {
        alert("Incorrect login");
    }
    // e.preventDefult();

}



