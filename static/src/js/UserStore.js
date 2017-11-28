import { observable } from 'mobx';

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
}

export default new UserStore;