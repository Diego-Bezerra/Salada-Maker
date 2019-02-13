
function getAdditionalSubTitle(price) {
    return 'R$ ' + price.toFixed(2);
}

export default saladData = [
    {
        step: 0,
        amount: 1,
        description: 'Tamanho',
        validate: true,
        list: [
            { id: 0, title: 'Pequeno', subTitle: 'Pote de 500g' },
            { id: 1, title: 'Grande', subTitle: 'Pote de 1kg' }
        ]
    },
    {
        step: 1,
        amount: 1,
        description: 'Proteína',
        validate: true,
        list: [
            { id: 0, title: 'Atum', subTitle: '', priceSmall: 9.99, priceBig: 17.99 },
            { id: 2, title: 'Camarão', priceSmall: 14.99, priceBig: 27.99 },
            { id: 3, title: 'Frango', priceSmall: 9.99, priceBig: 17.99 },
            { id: 4, title: 'Sardinha', priceSmall: 8.99, priceBig: 16.99 },
            { id: 5, title: 'Soja', priceSmall: 7.99, priceBig: 13.99 },
            { id: 6, title: 'Ovos', priceSmall: 7.99, priceBig: 12.99 }
        ]
    },
    {
        step: 2,
        amount: 4,
        description: 'Ingredientes',
        validate: false,
        list: [
            { id: 0, title: 'Abacaxi' },
            { id: 1, title: 'Abobrinha' },
            { id: 2, title: 'Acelga' },
            { id: 3, title: 'Alface' },
            { id: 4, title: 'Arroz Integral' },
            { id: 5, title: 'Batata Doce' },
            { id: 6, title: 'Beterraba' },
            { id: 7, title: 'Cebola Roxa' },
            { id: 8, title: 'Cenoura' },
            { id: 9, title: 'Couve' },
            { id: 10, title: 'Inhame' },
            { id: 11, title: 'Jerimum' },
            { id: 12, title: 'Maçã' },
            { id: 13, title: 'Macarrão Integral' },
            { id: 14, title: 'Manga' },
            { id: 15, title: 'Melão' },
            { id: 16, title: 'Pepino' },
            { id: 17, title: 'Pimentão' },
            { id: 18, title: 'Repolho Verde' },
            { id: 19, title: 'Repolho Roxo' },
            { id: 20, title: 'Tomate' }
        ]
    },
    {
        step: 3,
        amount: 1,
        description: 'Molho',
        validate: false,
        list: [
            { id: 0, title: 'Molho Balsâmico' },
            { id: 1, title: 'Molho Iogurte' },
            { id: 2, title: 'Molho Mostarda com Mel' },
            { id: 3, title: 'Molho Oriental' },
            { id: 4, title: 'Molho Vinagrete' }
        ]
    },
    {
        step: 4,
        amount: 1,
        description: 'Grão',
        validate: false,
        list: [
            { id: 0, title: 'Ervilha' },
            { id: 1, title: 'Grão de Bico' },
            { id: 2, title: 'Milho Verde' }
        ]
    },
    {
        step: 5,
        amount: 2,
        description: 'Sementes',
        validate: false,
        list: [
            { id: 0, title: 'Amendoim' },
            { id: 1, title: 'Castanha de Cajú' },
            { id: 2, title: 'Chia' },
            { id: 3, title: 'Gergilim' },
            { id: 4, title: 'Granola' },
            { id: 5, title: 'Linhaça' },
            { id: 6, title: 'Passas' }
        ]
    },
    {
        step: 6,
        amount: 2,
        description: 'Cheiro Verde',
        validate: false,
        list: [
            { id: 0, title: 'Cebolinha' },
            { id: 1, title: 'Coentro' },
            { id: 2, title: 'Hortelã Desidratada' },
            { id: 3, title: 'Manjericão Desidratado' },
            { id: 4, title: 'Salsa' }
        ]
    },
    {
        step: 7,
        amount: 7,
        description: 'Adicionais',
        validate: false,
        list: [
            { id: 0, title: 'Azeitonas', price: 1, subTitle: getAdditionalSubTitle(1) },
            { id: 1, title: 'Creme Cheese', price: 2, subTitle: getAdditionalSubTitle(2) },
            { id: 2, title: 'Morango', price: 2, subTitle: getAdditionalSubTitle(2) },
            { id: 3, title: 'Ovo de Codorna', price: 1, subTitle: getAdditionalSubTitle(1) },
            { id: 4, title: 'Ovo Cozido', price: 1, subTitle: getAdditionalSubTitle(1) },
            { id: 5, title: 'Queijo', price: 2, subTitle: getAdditionalSubTitle(2) },
            { id: 6, title: 'Torradinhas', price: 1, subTitle: getAdditionalSubTitle(1) }
        ]
    }
];

export const StepEnum = {
    SIZE: 0,
    PROTEIN: 2,
    INGREDIENTS: 3,
    SAUCE: 4,
    GRAIN: 5,
    SEEDS: 6,
    GREEN_SMELL: 7,
    ADDITIONAL: 8,
}

