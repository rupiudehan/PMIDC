export interface Product {
    image: string,
    uname: string,
    gmail: string,
    consumedFunds: number,
    status: string,
    budget: string
}

export const TopSelling: Product[] = [

    {
        image: 'assets/images/users/user1.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        consumedFunds: 100000,
        status: 'danger',
        budget: '200000'
    },
    {
        image: 'assets/images/users/user2.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        consumedFunds: 100000,
        status: 'info',
        budget: '300000'
    },
    {
        image: 'assets/images/users/user3.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        consumedFunds: 250000,
        status: 'warning',
        budget: '300000'
    },
    {
        image: 'assets/images/users/user4.jpg',
        uname: 'Hanna Gover',
        gmail: 'hgover@gmail.com',
        consumedFunds: 600000,
        status: 'success',
        budget: '700000'
    },

]