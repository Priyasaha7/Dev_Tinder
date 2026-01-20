# DevTinder

## authRouter
-POST /signup
-POST /login
-POST /logout

## profileRouter
-GET /profile/view
-POST /profile/edit
-PATCH /profile/password

## connectionRequestRouter
-POST /request/send/interested/:userID
-POST /request/send/ignored/:userID
-POST /request/review/accepted/:requestedID
-POST /request/review/rejected/:requestedID

## userRouter
-GET /user/requests
-GET /user/connected
-GET /user/feed -> Gets us the profile of other users on platform 


STATUS - ignore , interested 
                   /    \
            accepted  rejected