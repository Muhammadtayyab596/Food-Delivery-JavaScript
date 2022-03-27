let login = (e) => {
    console.log(e);
    e.preventDefault();

    var email = document.getElementById("email").value;
    var userType = document.getElementById("userType").value;
    var password = document.getElementById("password").value;

    console.log(password);
    console.log(userType);
    console.log(email);


    var form = document.getElementById("needs-validation")

    form.classList.add("was-validated")
    if (!form) {
        return
    }

    if (!email || !userType || !password) {
        swal({
            title: "Empty Fileds",
            text: "Please fill empty input fields",
            icon: "error",
            button: "Try again"
        });
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log("Login Suucessfuly");
                // ...
                swal({
                        title: "Good Job",
                        text: "Login Successfully",
                        icon: "success",
                        button: "click next"
                    })
                    .then((value) => {

                        if (userType == 'User') {

                            location.href = "../User/U-Dasboard/u-DAsboard.html";

                        } else if (userType == "Restaurant") {

                            location.href = "../Restaurant/R-Dasboard/r-DAsboard.html";

                        }
                    })
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }


}