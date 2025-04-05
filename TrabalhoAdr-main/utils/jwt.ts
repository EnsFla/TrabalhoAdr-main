import jwt from "jsonwebtoken";

const ACESS_SECRET = process.env.chaveultrasecreta || "ChaveSecreta";
const REFRESH_SECRET = process.env.secretkey || "ChaveSecreta";

export function gerarAcessToken(payload:any){
    return jwt.sign(payload, ACESS_SECRET, {expiresIn: '1h'});
}

export function gerarRefreshToken(payload:any){
    return jwt.sign(payload, REFRESH_SECRET, {expiresIn: '1h'});
}

export function verificarAcessToken(token:string){
    return jwt.verify(token, ACESS_SECRET);
}

export function verificarRefreshToken(token:string){
    return jwt.verify(token, REFRESH_SECRET);
}