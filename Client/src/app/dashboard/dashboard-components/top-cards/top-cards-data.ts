export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'success',
        icon: 'bi bi-wallet',
        title: '$21k',
        subtitle: 'Users'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-coin',
        title: '$1k',
        subtitle: 'Funds Added'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        title: '456',
        subtitle: 'Funds Available'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        title: '210',
        subtitle: 'Funds Used'
    },

] 