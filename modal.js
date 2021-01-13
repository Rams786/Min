

$(document).ready(() => {

    var arr = new Array();


    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",

        success: function (data, status, xhr) {

            arr = JSON.parse(data);
            console.log(arr);

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
    $('#signup_model').submit((a) => {
        a.preventDefault();
        let name = $('#name').val();
        let email = $('#email').val();
        let password = $('#password').val();

        let phone = $('#phone').val();


        var user = {
            "name": name, "email": email, "password": password, "phone": phone
        };


        $.ajax({
            type: "POST",
            url: "http://localhost:3000/users",
            data: JSON.stringify(user),
            success: function (data, status, xhr) {

                alert('Done');

            },

            error: function (jqXhr, textStatus, errorMessage) {
                console.log('error' + errorMessage);
            },
            dataType: "text",
            contentType: "application/json",

        });



    })


    $('.ank').on('click', function () {
        let type = $(this).attr('data-filter');
        if (type == 'home') {
            console.log('reach');
            $('#login_model').css('display', 'none');
            $('#signup_model').css('display', 'none');
            $('#contain1').css('display', 'none');
            $('#home').css('display', 'block');
            // $('#myModal').attr('display', 'block');
            // $('footer').removeClass('foot2');

        }
        else if (type == 'login') {
            console.log('reach');
            $('#home').css('display', 'none');
            $('#contain1').css('display', 'block');
            $('#signup_model').css('display', 'none');
            $('#login_model').css('display', 'block');
            // $('footer').addClass('foot2');
        }
        else if (type == 'register') {
            console.log('reach');
            $('#home').css('display', 'none');
            $('#contain1').css('display', 'block');
            $('#login_model').css('display', 'none');
            $('#signup_model').css('display', 'block');
            // $('footer').removeClass('foot2');
        }


    })


    //login form submission
    $('#login_model').submit((a) => {
        a.preventDefault();
        let email = $('#email1').val();

        let password = $('#password1').val();



        if (email == "" && password == "" || email == "" || password == "") {
            alert("name and password is incorrect")
        }
        else {
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/users",
                data: { "email": email, "password": password },
                success: function (data, status, xhr) {
                    console.log(data);
                    alert(data);
                    if (data !== '[]') {
                        sessionStorage.setItem('user', data);
                        window.location.replace('#');
                    }
                    else {
                        $('.text-muted').html('Wrong Email Id or Password');
                        $('.text-muted').css('color', 'red');
                        alert('error');
                    }
                },

                error: function (jqXhr, textStatus, errorMessage) {
                    console.log('error' + errorMessage);
                },
                dataType: "text",
                contentType: "application/json",

            });
        }



    })


    //email validation

    $('#email').on('keyup', function () {

        var email = $('#email').val();
        console.log(email);
        var flag = 0;
        for (var i = 0; i < arr.length; i++) {
            if (email == arr[i].email) {
                $('#inval').html("Already registered user");
                $('#inval').css('color', 'red');
                $('#but').attr("disabled", "true");
                flag = 1;
                break;

            }

        }
        if (flag == 0) {
            $('#but').removeAttr("disabled");
            $('#inval').html("Ready to go");
            $('#inval').css('color', 'green');

        }
        if (email == "") {
            $('#but').attr("disabled", "true");
            $('#inval').html("enter your email");
            $('#inval').css('color', 'red');
        }


    })
})