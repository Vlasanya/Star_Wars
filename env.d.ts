type EpisodeType = {
    id: string
    name: string
    air_date: string
    episode: string
    characters: string[]
    url: string
    created: string
}

type LocationType = {
    id: string
    name: string
    type: string
    dimension: string
    residents: string[]
    url: string
    created: string
}
type InfoType = {
    count: number
    pages: number
    next: string | null
    prev: string | null
}

type CharacterType = {
    id: string
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: {
        name: string
        url: string
    }
    location: {
        name: string
        url: string
    }
    image: string
    episode: string[]
    url: string
    created: string
}

type CharacterFilterType = {
    name?: string
    status?: 'alive' | 'dead' | 'unknown'
    species?: string
    type?: string
    gender?: 'female' | 'male' | 'genderless' | 'unknown'
}
