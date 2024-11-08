import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/base/spinner";
import { UserQueryData } from "@/app/query/models";
import { QUERY_KEYS } from "@/app/query/queryKeys";
import { validateTokenAndGetUser } from "./data";
import APP_ROUTES from "../routes";


const ProtectedRoute = () => {
    const navigate = useNavigate();

    const userQuery = useQuery<UserQueryData>({
        queryKey: [QUERY_KEYS.user],
        queryFn: validateTokenAndGetUser,
        staleTime: Infinity
    });

    useEffect(() => {
        if (userQuery.isFetched && !userQuery.data?.isValid) {
            navigate(APP_ROUTES.landing);
        }
    }, [navigate, userQuery]);
    

    if (userQuery.isLoading) {
        return <Spinner message="Loading Session..." />;
    }

    return (
        <Outlet />
    );
};

export default ProtectedRoute;
