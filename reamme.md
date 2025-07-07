npm i express-session
npm i connect-flash
npm install cookie-parser
npm i joi
npm i passport
npm i passport-local
npm i body-parser


Router
dekho basically hum router isliye banate h take jo humara app.js h jo ki main js file h jise hum run krte h wo bloated na ho. Basically kachra na ho jaaye usme

Cookies 
basically they store data in the computer jo ki banta h web server se jo bhi website hum use krrhe hote h, so basically chote chots data packets hote h to make the website faster for the repeated tasks and many more things, ye save karta h browser ,also known as web cookies and http cookies.

dekho agar maine kisi website pe cookie bhej di aur wo save ho gyi toh wo humesha kaam krti rehti even if we go on different pages of the same site. SAME SITE yaad rakhna ye, and it always works while we're on the site. remeber the cookie is in the for of object a key value pair

jab maine cookie bheji tab wo tab tak kaam nhi ki jab tak maine res.send nhi kiya, yaani bas res.cookie() likh dene bharr see nhi hota h uske aage bhi likhna hota h

directly cookies ko parse nhi kara sakte h , even tho they are part of the request we can't do that. We have to do that through cookie parser, that's an npm package.

well the cookie can also be added in console? because they are nothing but a piece of info , usko hatane ke liye jo humra cookie bhejne wala call tha wo wapas krna padega and all changes will reflect

SIGNED COOKIE 
toh bhayy signed cookie basically ye pakka krne ke liye hota h ki cookie ki tampering na hui ho, warna gud gye churu ho jayega

SESSION
whenever a client interacts with our server, a new session is created. Session is a way to store data on the server side.

Statful protocols require server to save the status and session information eg. ftp
stateless protocols don't require the server to save shit eg.http

Express Session
Express-session is a middleware that allows us to store data on the server side. But save hi kyu karana? kyuki agar humara client page switch krta h toh kyuki http ek stateless prtocol h toh wo last page ki info bhuul jayega jo hi hume nhi bhulni h. Toh isse hume bachna h obv. toh explicitly isiliye hum server-side par session ko save kara lete h. But hum fir client side par kya save kara rhe h? that will be uss client ki ek special client id, in the form of cookie. But ye ho sessions hote h toh database mein save nhi hote kyuki usme permanent chiize save hoti h, na ki kisiki shopping cart ka data. so hum iske kisi dusri jghh save kara rhe hote h.

connect flash is a middleware, it is special area of the session used for storing messages. messages written written in flash diappear after they are shown to the client/user.

res.locals: A way to pass data to all templates rendered during the lifecycle of a request.

why do we need cookies to flash an only once displayed message?
ans : Cookies (or similar client-side storage like localStorage or sessionStorage) are needed to ensure a message is shown only once because they allow the website to remember, across page loads or visits, whether the user has already seen the message. When a message (such as a popup, notification, or "flash message") is supposed to be displayed only once—say, after a successful registration or on a user's first visit—the site needs a way to track that the message has already been shown to that specific user.

what is authentication?  : it's a process of verifiyin who someone is?

what is authorization?  : it's a process of determining what someone can do, or what different apps, files, setting one can access.

What is hashing ? : it's a one-way process of converting data into a fixed-length string of characters, known as a hash value or digest. Hashing is a way to protect data by making it difficult to reverse-engineer the original data from the hash value.

what do we need to know : for every input there is a fixed output, they are one way function means no input fromt the output side. for a different input , there is a different output but the lengths will be same. small changes in input will result in big changes in output. it is not possible to get the original data from the hash value.

one of the best hasing algos are : SHA-256, SHA-512, bcrypt, scrypt, argon2, CRC , MD5.

salting : salting is basically addin 32 more charaters to the password and then hashing them, hence salting. every company has different salts.

Reverse hasing tables are made up by hackers where they just make the tables of most used passwords or any password and then match it with any algos output to the same passwords.

Passport is generally used with node for this purpose, it's a library that helps with authentication. we have to install with npm.
we can read more on " passportjs.org ".

we have to install the passport through " npm i passport "

so we have the passport authentication techniques for so many things, google ,facebook and everything but here we gonna use it's most basic one that is passport local one. Therefor we have to install passport local through " npm i passport-local "

we also need to install " npm i passport-local-mongoose " to help with it's extra functionality with mongodb.

we will use session for passport as for the while session the user won't change the password in between. in passport pdkdf2 hashing algo is used.