function validation(e){
    if (document.getElementById('password').value != document.getElementById('cpassword').value){
        document.getElementById("out").innerHTML = "<p style='color:red'>Password is not matching!</p>"
        return false
    }
    return true;
}

$(document).ready(()=>{
    $("#signup_model").submit((e)=>{
        e.pereventDefault();
        var flag = validation(e);

        if(flag){
            console.log("posting");
        var  name = $('#name').val();
        var email= $('#email').val();
        var password = $('#password').val();
        var phone = $('#phone').val();;
        $.ajax({
            url:"http://localhost:3000/Users",
            method:"POST",
            data:{
                "name": name, 
                "email": email, 
                "password": password, 
                "phone": phone
            },
            success:(x)=>{
                alert(x.name+" name posted");
            },
            error:(e1)=>{
                alert("error"+e1);
            }
        });

        }
    })
});