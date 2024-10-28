

export const API_END_POINTS = {
    user: {
        createGuest: "/auth/register/guest",
        create: "",
        get: (id: number | string) => `/users/guest/${id}`,
    },
    battle: {
        create: "/battles/create",
        connect: "/battles/connect",
        getAll: "/battles",
        getBattle: (id: number | string) => `/battles/${id}`
    }
} as const;