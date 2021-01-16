

$(document).ready(() => {

    var arr = new Array();


    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",

        success: function (data, status, xhr) {

            arr = JSON.parse(data);
            // console.log(arr);

        },

        error: function (jqXhr, textStatus, errorMessage) {
            console.log('error' + errorMessage);
        },
        dataType: "text",
        contentType: "application/json",

    });

    //password checking
    $('#password,#cpassword').on('keyup', function () {
        if ($('#password').val() === $('#cpassword').val()) {
            $('#out').html("Matching");
            $('#out').css('color', 'green');
            $('#but').removeAttr("disabled");
        }
        else {
            $('#out').html("Not Matching");
            $('#out').css('color', 'red');
            $('#but').attr("disabled", "true");
        }
    });

    //registration form submission
    $('#but').click((a) => {
        
        let name = $('#name').val();
        let email = $('#email').val();
        let password = $('#password').val();

        let phone = $('#phone').val();

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users",
           data: {
                "name": name,
                "email": email,
                "password": password,
                "phone": phone,
                "category": "{}"
           },
            success: function (data, status, xhr) {
                alert('Registration Successful!!!');
            },

            error: function (jqXhr, textStatus, errorMessage) {
                console.log('error' + errorMessage);
            },
           

        });


        a.preventDefault();
    });

    //login form submission
    $("#but1").click((a) => {
        a.preventDefault();
        if (email === "" && password === "") {
            alert("name and password is incorrect")
        }
        else {
            $.ajax({
                method: "GET",
                url: "http://localhost:3000/admin",
                success: function(result) {
                    var $flag = 0;
                    result.forEach(function(element) {
                        if($('#email1').val() === element.email && $('#password1').val() === element.password){
                            sessionStorage.setItem('userid',email);
                            sessionStorage.setItem('admin',"true");
                            window.location.replace('admin_homepage.html');
                            $flag = 1;
                        }
                    });
                    if ($flag === 0) {
                        $.ajax({
                            method: "GET",
                            url: "http://localhost:3000/users",
                            success: function(result1) {
                                var $flag1 = 0;
                                result1.forEach(function(element) {
                                    if($('#email1').val() === element.email && $('#password1').val() === element.password){
                                        sessionStorage.setItem('userid',email);
                                        sessionStorage.setItem('admin',"false");
                                        window.location.replace('user_homepage.html');
                                        $flag1 = 1;
                                    }
                                });
                                if ($flag1 === 0) {
                                    $('#wro').html("Please Enter Correct Username & Password");
                                    $('#wro').css('color', 'red');
                                }
                            }
                        });
                    }
                }
            });   
        }
    });

    

    //email validation

    $('#email').on('keyup', function () {

        var email = $('#email').val();
        console.log(email);
        var flag = 0;
        for (var i = 0; i < arr.length; i++) {
            if (email === arr[i].email) {
                $('#inval').html("Already registered user");
                $('#inval').css('color', 'red');
                $('#but').attr("disabled", "true");
                flag = 1;
                break;

            }

        }
        if (flag === 0) {
            $('#but').removeAttr("disabled");
            $('#inval').html("Ready to go");
            $('#inval').css('color', 'green');

        }
        if (email === "") {
            $('#but').attr("disabled", "true");
            $('#inval').html("enter your email");
            $('#inval').css('color', 'red');
        }
       
           


    });
});
