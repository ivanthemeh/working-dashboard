import {
  types,
  onSnapshot,
  getSnapshot,
} from "mobx-state-tree";
import r from 'rethinkdb';

const Schedule = types
  .model("Schedule", {
    id: types.string,
    created: types.Date,
    title: types.string,
    done: types.boolean,
    assignee: types.string,
    start: types.Date,
    end: types.Date
  })
  .actions(self => {
    return {
      postProcessSnapshot(snapshot) {
        let newObj = Object.assign(snapshot, {
          created: new Date(snapshot.created),
          start: new Date(snapshot.start),
          end: new Date(snapshot.end)
        });
        return newObj;
      }
    }
  })


const ScheduleStore = types.model("ScheduleStore", {
    name: types.string,
    schedules: types.maybe(types.array(Schedule)),
    changesArr: types.maybe(types.array(types.frozen))
  })
  .views(self => {
    return {
      get allSchedules() {
        if (self.schedules) {
          return self.schedules.filter(s => s);
        } else {
          return null;
        }
      }
    };
  })
  .actions(self => {
    return {
      connectToChangesDB(conn) {
        let arr = [];
        r.table('schedules').changes({
          includeInitial: true,
          includeStates: true,
          includeTypes: true
        }).run(conn, (err, cursor) => {
          if (err) throw err;
          console.log("connection in schedule store")
          cursor.each((err, row) => {
            if (err) throw err;
            console.log("Logging changes in schedule store::", JSON.stringify(row, null, 2));
            switch (row.type) {
              case 'initial':
                arr.push(row.new_val)
                break;
              case 'remove':
                self.removeById(row.old_val.id);
                break;
              case 'change':
                self.update(row.new_val)
                break;
              case 'add':
                self.insert(row.new_val)
                break;
            }
            if (row.state === 'ready') {
              self.setInitialSchedules(arr);
            }
          })
        });
      },
      setInitialSchedules(schedules) {
        self.schedules = schedules;
      },
      insert(schedule) {
        return self.schedules.push(schedule);
      },
      removeById(id) {
        return self.schedules = self.schedules.filter(s => s.id !== id);
      },
      update(schedule) {
        const index = self.schedules.findIndex(s => s.id === schedule.id);
        self.schedules[index] = schedule;
        return self.schedules;
      }
    }
  });



const scheduleStore = ScheduleStore.create({
  name: 'scheduleStore',
  schedules: null,
  changesArr: null
});

// listen to new snapshots
onSnapshot(scheduleStore, (snapshot) => {
  console.log("logging snapshot in schedule store::")
  console.dir(snapshot);
});


export default scheduleStore;