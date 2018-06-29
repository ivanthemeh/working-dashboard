import { types, onSnapshot } from "mobx-state-tree";
import r from 'rethinkdb';

const User = types
    .model("User", {
        id: types.string,
        created: types.Date,
        name: types.string,
        email: types.string,
        password: types.string,
    })

const UserStore = types.model("UserStore", {
    name: types.string,
    users: types.maybe(types.array(User)),
    changesArr: types.maybe(types.array(types.frozen))
})
.views(self => {
    return {
        get allUsers() {
            return self.users
        }
    };
})
.actions(self => {
   return {
       connectToChangesDB(conn) {
        let arr = [];
        r.table('users').changes({ includeInitial: true, includeStates: true, includeTypes: true }).run(conn, (err, cursor) => {
            if (err) throw err;
            console.log("connection in store")
            cursor.each((err, row) => {
                if (err) throw err;
                console.log("Logging changes in user store::", row);
                switch (row.type) {
                    case 'initial':
                        arr.push(row.new_val)
                        break;
                    case 'remove':
                        // store.removeById(row.old_val.id);
                        break;
                    case 'change':
                        self.update(row.new_val)
                        break;
                    case 'add':
                        self.insert(row.new_val)
                        break;
                }
                if (row.state === 'ready') {
                    self.setInitialUsers(arr);
                }
            })
        });
      },
      setInitialUsers(users) {
        self.users = users;
      },
      insert(user) {
        return self.users.push(user);
      },
      update(user) {
        const index = self.users.findIndex(u => u.id === user.id);
        self.users[index] = user;
        console.log("logging in update",self.users);
        return self.users;
      }
   } 
});



const userStore = UserStore.create({
    name: 'userStore',
    users: null,
    changesArr: null
});


// listen to new snapshots
onSnapshot(userStore, (snapshot) => {
    console.log("logging snapshot in user store::")
    console.dir(snapshot);
});


export default userStore;
