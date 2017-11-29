import {computed, observable} from 'mobx';

class UserStore {
    @observable currentUser = {
        id: null,
        username: null,
        status: {
            id: null,
            status: null,
            color: null
        }
    };
    @observable users = [];
    @observable statuses = [];
    @observable usernameFilter = '';
    @observable statusFilter = undefined;

    @computed
    get filteredUsers() {
        let usernameFilter = new RegExp(this.usernameFilter, "i");
        return this.users
            .filter(user => !this.usernameFilter || usernameFilter.test(user.username))
            .filter(user => !this.statusFilter || user.status.id === parseInt(this.statusFilter))
    }
}

export default new UserStore;