var resUid;
var cuurentUser;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        resUid = user.uid;

        console.log(resUid);
        firebase
            .firestore()
            .collection("restaurant")
            .doc(resUid)
            .get()
            .then((snapshot) => {
                cuurentUser = snapshot.data();
                userinfo(cuurentUser);
                getCard();
            });
    } else {
        // User is signed out
    }
});

function userinfo(cuurentUser) {
    var resName = document.getElementById("resName");
    var rName = document.getElementById("rName");
    var regID = document.getElementById("reg-ID");
    var city = document.getElementById("city");
    var country = document.getElementById("country");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");

    resName.innerHTML = cuurentUser.resName;
    rName.innerHTML = cuurentUser.resName;
    regID.innerHTML = resUid;
    city.innerHTML = cuurentUser.city;
    country.innerHTML = cuurentUser.country;
    phone.innerHTML = cuurentUser.phoneNo;
    email.innerHTML = cuurentUser.email;
}

var storageRef = firebase.storage().ref();

let addDishes = (e) => {
    console.log(e);
    e.preventDefault();

    var dishName = document.getElementById("dishName").value;
    var Catorgory = document.getElementById("Catorgory").value;
    var dishType = document.getElementById("dishType").value;
    var price = document.getElementById("price").value;

    var imageFile = document.getElementById("imageFile");
    var getfile = imageFile.files[0];

    var imagesRef = storageRef.child("images/" + getfile.name);
    var uploadTask = imagesRef.put(getfile)
        .then((snapshot) => {
            console.log("Uploaed file");
        }).then(() => {
            var starsRef = storageRef.child("images/" + getfile.name);

            // Get the download URL
            starsRef.getDownloadURL()
                .then((url) => {
                    console.log("url", url);
                    firebase.firestore().collection("cards").add({
                            resName: cuurentUser.resName,
                            dishName: dishName,
                            Catorgory: Catorgory,
                            dishType: dishType,
                            price: price,
                            uid: resUid,
                            image: url
                        })
                        .then(() => {
                            console.log("Data Added");
                            console.log(resUid);
                            getCard();

                        }).catch((er) => {
                            console.log(er);
                        })

                    // Insert url into an <img> tag to "download"
                })
                .catch((error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case "storage/object-not-found":
                            // File doesn't exist
                            break;
                        case "storage/unauthorized":
                            // User doesn't have permission to access the object
                            break;
                        case "storage/canceled":
                            // User canceled the upload
                            break;

                            // ...

                        case "storage/unknown":
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });

        })

    // firebase



    
};

let getCard = () => {
    console.log("Working");
    firebase
        .firestore()
        .collection("cards")
        .where("uid", "==", resUid)
        .get()
        .then((quarrySnapshot) => {
            document.getElementById("addcards").innerHTML = "";
            quarrySnapshot.forEach((doc) => {
                console.log("doc", doc.data());
                var dataObj = doc.data();
                console.log(resUid);
                document.getElementById("addcards").innerHTML += `

                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card">
                            <img src="${dataObj.image}" class="card-img-top" alt="...">
                            <div class="card-body" style="width: 18rem;">
                                <h6 class="card-title fw-bold">Restaurant Name: ${dataObj.resName}</h6>
                                <h6 class="card-title fw-bold">Dish Name: ${dataObj.dishName}</h6>
                                <p class="card-title ">Catorgory: ${dataObj.Catorgory}</p>
                                <p class="card-title ">Price: ${dataObj.price}</p>
                                <a href="#" class="btn btn-danger w-50">Delete Dish</a>
                            </div>
                        </div>
                    </div>


                `;
            });
        });
};

let signOut = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            location.href = "../../Login/login.html";
        })
        .catch((error) => {
          
            console.log(error);
        });
};