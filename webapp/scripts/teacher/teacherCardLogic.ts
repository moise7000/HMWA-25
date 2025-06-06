
export const createSlug = (name: string): string => {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
        .replace(/\s+/g, '-') // remplace les espaces par des tirets
        .replace(/[^\w-]/g, '') // supprime les caractères spéciaux
}

export const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long'
    })
}
