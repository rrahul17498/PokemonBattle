

export const API_END_POINTS = {
    user: {
        createGuest: "/users/guest",
        create: "",
        get: "",
    },
    battle: {
        create: "/battles/create",
        connect: "/battles/connect",
        getAll: "/battles",
    }
} as const;