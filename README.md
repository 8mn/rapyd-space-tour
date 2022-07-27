
# Rapyd Starliner
Payments Application For the Galaxy’s Next Big Space Tourism Company, Rapyd starliner

# Live demo
[Demo](https://rapyd-starliner.vercel.app/)

# Screenshots
![Frame 13](https://user-images.githubusercontent.com/64839201/181241557-78aac0e0-03e7-4acb-901c-3f31667c49c7.jpg)



![Frame 14](https://user-images.githubusercontent.com/64839201/181241791-9b369c72-3bb8-4234-9a8b-4f9b8211231d.jpg)

# Getting started
- For starting the app in your machine, open the terminal and enter these commands:

- Clone the repo
```
git clone https://github.com/8mn/rapyd-space-tour.git
```

cd into working directory
```
cd rapyd-space-tour
```

Install dependencies
```
npm install
```



You will need to create a [firebase project](https://firebase.google.com/docs/web/setup) and Replace the following with your app's Firebase project configuration in `src/firebase.js`.

```
const firebaseConfig = {
	apiKey: "",

	authDomain: "",

	projectId: "",

	storageBucket: "",

	messagingSenderId: "",

	appId: "",

	measurementId: "",
};


```

> Firebase uses API keys only to identify your app's Firebase project to Firebase services, and not to control access to database or Cloud Storage data, which is done using Firebase Security Rules. For this reason, you do not need to treat API keys for Firebase services as secrets, and you can safely embed them in client code


Run the app on your machine
```
npm run start
```


Open http://localhost:3000 in browser to access the app


# Goals :

- To build Website for an innovative space exploration venture selling tickets for a flight to the stars. The price is $150,000 per seat.

- The Customer is based in Singapore and the company is based in the US. The high price tag makes accepting credit cards and wire transfers expensive for the business and a hassle for the customer.

- To solve this, used Rapyd’s virtual accounts API


# Functionalities:
- Request Virtual Accounts for payments
- See all transactions
- Get a ticket when you complete the payment!


# What's next for Rapyd starliner
- Use multile currencies other than SGD
- Refund payment options

# Links

- [Demo](https://rapyd-starliner.vercel.app/)
- [Backend Relay](https://github.com/8mn/rapyd-backend-relay)


# Credits
- Homepage background Photo by <a href="https://unsplash.com/@actionvance?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">ActionVance</a> on <a href="https://unsplash.com/s/photos/earth?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
- Ticket design by [oliviale on codepen](https://codepen.io/oliviale/pen/MZZYyO) 
- Satoshi font by [Fontshare](https://www.fontshare.com/)
- Space Grotesk font by [Google Fonts](https://fonts.google.com/)

# Contact

If you have any questions/suggestion, Contact me 
- My Email: `hey@mnsh.me`
- Twitter: [@oimanish](https://twitter.com/oimanish)

