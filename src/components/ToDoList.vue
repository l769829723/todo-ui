<template>
<v-flex xs12 sm8 md12 style="height: 100%">
<v-dialog v-model="alert" persistent max-width="290" lazy>
  <v-card>
    <v-card-title class="headline">Are you sure?</v-card-title>
    <v-card-text>Keep going after, will be can't cancel.</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" flat @click.native="alert = false; pendingDelete = []">Disagree</v-btn>
      <v-btn color="red darken-1" flat @click.native="deleteTodo">Agree</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

  <v-tabs
    v-model="active"
    light
    right
    slider-color="grey">
    <v-tab ripple>
      Opened
    </v-tab>
    <v-tab-item lazy>
      <v-card flat>
        <v-card-text>
          <template v-if="openedTodoList.length >= 1">
            <v-list two-line>
              <template v-for="(todo, index) in openedTodoList">
                <v-list-tile
                  :key="todo.pusblish_time"
                  avatar>
                  <v-tooltip bottom>
                    <v-btn
                      :color="todo.is_important ? 'red lighten-1 white--text' : 'green lighten-1 white--text'"
                      @click="toogleImportant(todo)"
                      slot="activator"
                      icon
                      large
                      outline>
                      {{index + 1}}
                    </v-btn>
                    <span>
                      {{todo.is_important ? 'Important' : 'Normally'}}
                    </span>
                  </v-tooltip>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ todo.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                      Published at:
                      <timeago :since="todo.publish_time"></timeago>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple @click="doneTodo(todo)">
                      <v-icon color="green lighten-1">
                        done
                      </v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <template v-if="index !== openedTodoList.length - 1">
                  <v-divider :key="index"></v-divider>
                </template>
              </template>
            </v-list>
          </template>
          <template v-else>
            No more data showing.
          </template>
        </v-card-text>
      </v-card>
    </v-tab-item>

    <v-tab ripple>
      Finished
    </v-tab>
    <v-tab-item lazy>
      <v-card flat>
        <v-card-text>
          <template v-if="finishedTodoList.length >= 1">
            <v-list two-line>
              <template v-for="(todo, index) in finishedTodoList">
                <v-list-tile
                  :key="todo.publish_time"
                  avatar>
                  <v-tooltip bottom>
                    <v-btn
                      :color="todo.is_important ? 'red lighten-1 white--text' : 'green lighten-1 white--text'"
                      slot="activator"
                      icon
                      large
                      disabled
                      dark>
                      {{index + 1}}
                    </v-btn>
                    <span>
                      {{todo.is_important ? 'Important' : 'Normally'}}
                    </span>
                  </v-tooltip>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ todo.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                      Published at:
                      <timeago :since="todo.publish_time"></timeago>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple @click="confirmDelete(todo.id)">
                      <v-icon color="red lighten-1 white--text">
                        delete
                      </v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <template v-if="index !== finishedTodoList.length - 1">
                  <v-divider :key="index"></v-divider>
                </template>
              </template>
            </v-list>
          </template>
          <template v-else>
            No more data showing.
          </template>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab>
      Write
    </v-tab>
    <v-tab-item>
      <v-card flat>
        <v-card-text>
          <v-form ref="form" v-model="todoForm.valid" lazy-validation>
            <v-switch
              label="Is important?"
              v-model="todoForm.is_important"
            ></v-switch>
            <v-textarea
              auto-grow
              clearable
              autofocus
              :rules="todoFormRules"
              label="Write a new todo content"
              v-model="todoForm.name"
            ></v-textarea>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="clearForm">Clear</v-btn>
              <v-btn color="primary" @click.stop="saveForm">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>

  <template v-if="active < 2 && (page.total > page.per)">
    <v-card flat>
      <v-card-text>
        <div class="text-xs-center">
          <v-pagination
            v-model="page.current"
            :length="Math.ceil(page.total / page.per)"
            total-visible="6"
          ></v-pagination>
        </div>
      </v-card-text>
    </v-card>
  </template>

</v-flex>

</template>

<script>
export default {
  name: 'ToDoList',
  data () {
    return {
      pageBar: false,
      active: 0,
      todoList: [],
      todoForm: {
        valid: true,
        name: '',
        is_done: false,
        is_important: false
      },
      todoFormRules: [
        v => !!v || 'Has not content and must be more than 5 letters.',
        v => /\S{5,}/.test(v) || 'Has not content and must be more than 5 letters.'
      ],
      alert: false,
      page: {
        total: 120,
        current: 1,
        per: 16
      },
      pendingDelete: []
    }
  },
  watch: {
    'page.current' () {
      this.getTodoList()
    }
  },
  created () {
    this.getTodoList()
  },
  computed: {
    openedTodoList () {
      return this.todoList.filter(todo => todo.is_done !== true)
    },
    finishedTodoList () {
      return this.todoList.filter(todo => todo.is_done === true)
    }
  },
  methods: {
    toogleImportant (todo) {
      todo.is_important = !todo.is_important
      this.$http.put('todos/' + todo.id.toString() + '/', JSON.stringify(todo)).then(response => {
        this.$toasted.success('This todo has been marked as ' + (todo.is_important ? 'important' : 'unimportant') + '.')
      }, response => {
        this.$toasted.error('Update failed, please retry later.')
      })
    },
    doneTodo (todo) {
      if (!todo.is_done) {
        todo.is_done = true
        this.$http.put('todos/' + todo.id.toString() + '/', JSON.stringify(todo)).then(response => {
          this.$toasted.success('The todo has updated, the list will be updated later.')
        }, response => {
          this.$toasted.error('Update failed, please retry later.')
        })
      } else {
        this.$toasted.success('The todo has updated, the list will be updated later.')
      }
    },
    saveForm (todo) {
      if (!this.$refs.form.validate()) {
        this.clearForm()
      } else {
        this.$http.post('todos/', JSON.stringify(this.todoForm)).then(response => {
          this.todoList.unshift(response.body)
          this.clearForm()
          this.$toasted.success('The todo has updated, the list will be updated later.')
        }, response => {
          this.$toasted.error('Added failed, please retry later.')
        })
      }
    },
    clearForm () {
      this.$refs.form.reset()
      this.todoForm = {
        valid: true,
        name: '',
        is_done: false,
        is_important: false
      }
    },
    confirmDelete (todoId) {
      this.alert = true
      this.pendingDelete.unshift(todoId)
    },
    deleteTodo () {
      this.alert = false
      this.pendingDelete.forEach(id => {
        this.$http.delete('todos/' + id + '/').then(response => {
          this.pendingDelete = this.pendingDelete.filter(todo => todo.id !== id)
          this.todoList = this.todoList.filter(todo => todo.id !== id)
          this.$toasted.success('This todo has been deleted.')
        }, response => {
          this.$toasted.error('Delete failed, please try again.')
        })
      })
      this.pendingDelete = []
      if (this.todoList.length <= 0) {
        this.getTodoList()
      }
    },
    getTodoList () {
      this.$http.get('todos/' + '?page=' + this.page.current).then(response => {
        this.todoList = response.body.todos
        this.page = response.body.page
      }, response => {
        if (response.status === 0) {
          this.$toasted.error('Connection timeout, please retry.')
        }
      })
    }
  }
}
</script>
