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
        title: '0',
        subtitle: 'Users'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-coin',
        title: '0',
        subtitle: 'Funds Added'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        title: '0',
        subtitle: 'Funds Available'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        title: '0',
        subtitle: 'Funds Assigned'
    },

] 