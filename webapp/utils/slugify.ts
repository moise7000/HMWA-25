export const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD') // Décomposer les caractères Unicode
        .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
        .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
        .replace(/[^\w-]/g, '') // Supprimer les caractères spéciaux sauf les tirets
        .replace(/--+/g, '-') // Remplacer les tirets multiples par un seul
        .replace(/^-+|-+$/g, '') // Supprimer les tirets en début et fin
}

export const unslugify = (slug: string): string => {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}