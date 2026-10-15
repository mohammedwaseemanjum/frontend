import admin from '@routes/admin'
import { type Role } from '../stores/user';

const routes = {
    admin: admin,
    merchant: admin
}

const currentRoute = (role: Role|undefined) => {
    if (!role) {
        return [];
    }

    return routes[role];
}

export default currentRoute