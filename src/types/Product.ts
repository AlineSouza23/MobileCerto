export type Product = {
    idProduto: string;
    nome: string;
    preco: number;
    imagem: string;
    categoria: {
        categoria:string;
    }[];

}
