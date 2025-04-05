import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtsecret = process.env.secretkey || "ChaveSecreta"

function GerarTokenJwt (DadosUsuario:{id:number; nome:string}):string {
return jwt.sign(DadosUsuario, jwtsecret, {expiresIn: '1h'})
}

function VereficarTokenJWT(token: string): JwtPayload | null {
    try{
        return jwt.verify(token, jwtsecret) as JwtPayload
    } catch (error) {
        console.error("Erro ao verificar token JWT", (error as Error).message);
        return null;
    }
}

const dadosUsuarioAutenticado = {
    id: 123,
    nome: "Usuario Teste"
};

const tokenJWT = GerarTokenJwt(dadosUsuarioAutenticado);

console.log("Token JWT gerado", tokenJWT);

const tokenRecebido = tokenJWT;

const dadosDecodificados = VereficarTokenJWT(tokenRecebido);

if (dadosDecodificados){
    console.log("Token JWT Valido, dados do usuario: ", dadosDecodificados);
} else {
    console.log("Token JWT invalido");
}