import { getConnectedUser } from "../api/users";

export async function userLoader() {
    return getConnectedUser();
}