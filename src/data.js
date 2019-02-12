
function getAdditionalSubTitle(price) {
    return 'R$ ' + price.toFixed(2);
}

export default saladData = {
    size: {
        step: 0,
        amount: 1,
        description: 'Tamanho',
        list: [
            { title: 'Pequeno', subTitle: 'Pote de 500g' },
            { title: 'Grande', subTitle: 'Pote de 1kg' }
        ]
    },
    protein: {
        step: 1,
        amount: 1,
        description: 'Proteína',
        list: [
            { title: 'Atum', priceSmall: 9.99, priceBig: 17.99 },
            { title: 'Camarão', priceSmall: 14.99, priceBig: 27.99 },
            { title: 'Frango', priceSmall: 9.99, priceBig: 17.99 },
            { title: 'Sardinha', priceSmall: 8.99, priceBig: 16.99 },
            { title: 'Soja', priceSmall: 7.99, priceBig: 13.99 },
            { title: 'Ovos', priceSmall: 7.99, priceBig: 12.99 }
        ]
    },
    ingredients: {
        step: 2,
        amount: 4,
        description: 'Ingredientes',
        list: [
            { title: 'Abacaxi' },
            { title: 'Abobrinha' },
            { title: 'Acelga' },
            { title: 'Alface' },
            { title: 'Arroz Integral' },
            { title: 'Batata Doce' },
            { title: 'Beterraba' },
            { title: 'Cebola Roxa' },
            { title: 'Cenoura' },
            { title: 'Couve' },
            { title: 'Inhame' },
            { title: 'Jerimum' },
            { title: 'Maçã' },
            { title: 'Macarrão Integral' },
            { title: 'Manga' },
            { title: 'Melão' },
            { title: 'Pepino' },
            { title: 'Pimentão' },
            { title: 'Repolho Verde' },
            { title: 'Repolho Roxo' },
            { title: 'Tomate' }
        ]
    },
    sauce: {
        step: 3,
        amount: 1,
        description: 'Molho',
        list: [
            { title: 'Molho Balsâmico' },
            { title: 'Molho Iogurte' },
            { title: 'Molho Mostarda com Mel' },
            { title: 'Molho Oriental' },
            { title: 'Molho Vinagrete' }
        ]
    },
    grain: {
        step: 4,
        amount: 1,
        description: 'Grão',
        list: [
            { title: 'Ervilha' },
            { title: 'Grão de Bico' },
            { title: 'Milho Verde' }
        ]
    },
    seeds: {
        step: 5,
        amount: 2,
        description: 'Sementes',
        list: [
            { title: 'Amendoim' },
            { title: 'Castanha de Cajú' },
            { title: 'Chia' },
            { title: 'Gergilim' },
            { title: 'Granola' },
            { title: 'Linhaça' },
            { title: 'Passas' }
        ]
    },
    greenSmell: {
        step: 6,
        amount: 2,
        description: 'Cheiro Verde',
        list: [
            { title: 'Cebolinha' },
            { title: 'Coentro' },
            { title: 'Hortelã Desidratada' },
            { title: 'Manjericão Desidratado' },
            { title: 'Salsa' }
        ]
    },
    additional: {
        step: 7,
        amount: 7,
        description: 'Adicionais',
        list: [
            { title: 'Azeitonas', price: 1, subTitle: getAdditionalSubTitle(1) }, 
            { title: 'Creme Cheese', price: 2, subTitle: getAdditionalSubTitle(2) },
            { title: 'Morango', price: 2, subTitle: getAdditionalSubTitle(2) }, 
            { title: 'Ovo de Codorna', price: 1, subTitle: getAdditionalSubTitle(1) },
            { title: 'Ovo Cozido', price: 1, subTitle: getAdditionalSubTitle(1) }, 
            { title: 'Queijo', price: 2, subTitle: getAdditionalSubTitle(2) },
            { title: 'Torradinhas', price: 1, subTitle: getAdditionalSubTitle(1) }]
    }
}

