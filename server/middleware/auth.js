import jwt from 'jsonwebtoken';

const secret = 'test';

const auth = async (req, res, next) => {
    try {
        const credential = req.headers.authorization.split(" ")[1];
        const isCustomAuth = credential.length < 500;

        let decodedData;

        if(credential && isCustomAuth){
            decodedData = jwt.verify(credential, secret);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(credential);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error){
        console.log(error);
    }
}

export default auth;