var userID;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        var cuurentUser;
        userID = user.uid;

        console.log(userID);
        firebase.firestore().collection("user").doc(userID).get()
            .then((snapshot) => {

                cuurentUser = snapshot.data();
                userinfo(cuurentUser);
                getCard();


            })

    } else {
        // User is signed out

    }
});





function userinfo(cuurentUser) {
    var username = document.getElementById("username");


    username.innerHTML = cuurentUser.username;


}



let getCard = () => {
    console.log("Working");
    firebase.firestore().collection("cards").get()
        .then((quarrySnapshot) => {
            document.getElementById("addcards").innerHTML = "";
            quarrySnapshot.forEach(doc => {
                console.log("doc", doc.data());
                var dataObj = doc.data();
                // console.log(resUid);
                document.getElementById("addcards").innerHTML += `

                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card">
                            <img src="${dataObj.image}" class="card-img-top" alt="...">
                            <div class="card-body" style="width: 18rem;">
                                <h6 class="card-title fw-bold">Restaurant Name: ${dataObj.resName}</h6>
                                <h6 class="card-title fw-bold">Dish Name: ${dataObj.dishName}</h6>
                                <p class="card-title ">Catorgory: ${dataObj.Catorgory}</p>
                                <p class="card-title ">Price: ${dataObj.price}</p>
                                <a href="#" id =${doc.id} onclick = "order(this.id)" class="btn btn-success w-50">Order</a>
                            </div>
                        </div>
                    </div>


                `
            });
        })
}



// firebase.firestore().collection("cards").get()
//     .then((quarrySnapshot) => {
//         quarrySnapshot.forEach(function(doc) {
//             console.log(" nechai wali doc", doc.id);
//             // console.log(" nechai wali id", doc.id);
//         })
//     })


function order(i) {
    console.log(i);
}