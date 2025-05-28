export const useEquipment = () => {
    const client = useSupabaseClient()
    const projectRef = 'xyzcompany'  // Remplace par ton project-ref Supabase

    const getAllEquipment = async () => {
        const { data, error } = await client
            .from('equipment')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error

        // Transformer chaque élément pour remplacer image par URL complète
        const transformed = data.map((equip: any) => ({
            ...equip,
            image: equip.image
                ? `https://lmwpuleyzjxgzecypqdk.supabase.co/storage/v1/object/public/${equip.image}`
                : null,
        }))

        return transformed
    }

    return {
        getAllEquipment,
    }
}
