let resSignUp = (e) => {
    console.log(e);
    e.preventDefault();

    var resName = document.getElementById("resName").value;
    var email = document.getElementById("email").value;
    var country = document.getElementById("country").value;
    var city = document.getElementById("city").value;
    var phoneNo = document.getElementById("phoneNo").value;
    var password = document.getElementById("password").value;

    var userObj = {
        resName,
        email,
        country,
        city,
        phoneNo,
        password
    }
    console.log(userObj);


    var form = document.getElementById("needs-validation")

    form.classList.add("was-validated")
    if (!form) {
        return
    }

    if (!email || !resName || !country || !password || !city || !phoneNo) {
        swal({
            title: "Empty Fileds",
            text: "Please fill empty input fields",
            icon: "error",
            button: "Try again"
        });
    } else {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;

                firebase.firestore().collection("restaurant").doc(user.uid).set({
                    resName: resName,
                    email: email,
                    country: country,
                    city: city,
                    phoneNo: phoneNo,
                    Ruid: user.uid


                }).then(() => {
                    console.log("Data Added");

                }).catch((er) => {
                    console.log("error", er);
                })

                // ...
                swal({
                        title: "Good Job",
                        text: "Sign in Successfully",
                        icon: "success",
                        button: "click to next"
                    })
                    .then((value) => {
                        location.href = "../../Login/login.html";
                    })

                console.log("User SIgn in");
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
                swal({
                    title: "Bad Job",
                    text: errorMessage,
                    icon: "error",
                    button: "Try again"
                })

            });


    }



}