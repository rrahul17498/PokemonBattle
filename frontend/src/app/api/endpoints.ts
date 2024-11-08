

export const API_END_POINTS = {
    user: {
        createGuest: "/auth/register/guest",
        create: "",
        get: (id: number | string) => `/users/guest/${id}`,
    },
} as const;