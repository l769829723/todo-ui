<style scoped>
.blank {
  padding: 90px 0 20px 0;
}
</style>

<template>
  <div>
    <div class="blank">
      <mu-card>
      <mu-card-text>
        <mu-flex class="flex-wrapper" justify-content="start">
          <mu-flex class="flex-demo" justify-content="center" fill>
            <mu-text-field
              autofocus
              full-width
              v-model="search"
              placeholder="Enter string and press enter key to search."
              label="Search:"
              :help-text="searchHelp"
              action-icon="search"
            ></mu-text-field>
          </mu-flex>
        </mu-flex>
        <mu-flex class="flex-wrapper" justify-content="end">
          <mu-flex class="flex-demo" justify-content="center" >
            <mu-button flat color="primary" @click="openWriteDialog = true">
              Write
              <mu-icon right value="edit"></mu-icon>
            </mu-button>
          </mu-flex>
        </mu-flex>
      </mu-card-text>
    </mu-card>
    </div>

    <div v-if="showList">
      <ToDoItem
        v-if="showList"
        v-for="todo in todoList"
        :key="todo.id"
        :panel="panel === todo.id.toString()"
        :id="todo.id"
        :name="todo.name"
        :isDone="todo.is_done"
        :isImportant="todo.is_important"
        :publishTime="todo.publish_time"
        @todo-delete="removeTodo(todo.id)"
        @todo-done="doneTodo(todo)"
        @todo-important="importantTodo(todo)"
        @todo-expand="expandTodo(todo.id)"
      ></ToDoItem>
      <div style="padding: 20px 0">
        <mu-container>
          <mu-flex justify-content="center">
            <mu-pagination :total="page.total" :current.sync="page.current" :page-size="page.per" @change="getTodoList"></mu-pagination>
          </mu-flex>
        </mu-container>
      </div>
    </div>
    <div v-else>
      <div style="text-align: center">
        <mu-circular-progress :size="48"></mu-circular-progress>
      </div>
    </div>
    <mu-dialog :title="alert.title" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="alert.open">
        {{ alert.content }}
      <mu-button slot="actions" flat color="secondary" @click="$emit('confirm-delete')">Yes</mu-button>
      <mu-button slot="actions" flat color="primary" @click="alert.open = false">No</mu-button>
    </mu-dialog>
    <WriteToDo
      :open.sync="openWriteDialog"
      @update:todo="saveToDo"
    ></WriteToDo>
  </div>
</template>

<script>
import { URI, HTTPCONFIG } from '@/global.js'
import ToDoItem from '@/components/ToDoItem'
import WriteToDo from '@/components/WriteToDo'
export default {
  name: 'ToDoList',
  data () {
    return {
      panel: '',
      search: '',
      searchHelp: 'Input your wanna search content.',
      openWriteDialog: false,
      showAlert: false,
      showList: false,
      todoList: [],
      alert: {
        open: false,
        title: 'Are you sure?',
        content: 'This action can\'t be rollback.'
      },
      page: {
        prev: false,
        next: true,
        per: 10,
        current: 1,
        total: 13,
        show: false
      }
    }
  },
  created () {
    this.getTodoList()
  },
  watch: {
    search () {
      var searchString = this.search
      this.todoList = this.tempTodoList
      this.todoList = this.todoList.filter(todo => todo.name.toLowerCase().search(searchString.toLowerCase()) !== -1)
      this.sortedTodoList()
      this.searchHelp = searchString.length ? 'Found ' + this.todoList.length.toString() + ' results, on the current page.' : 'Input your wanna search content.'
    }
  },
  components: {
    ToDoItem,
    WriteToDo
  },
  methods: {
    sortedTodoList () {
      var pieceOfA = this.todoList.filter(important => important.is_important)
      pieceOfA = pieceOfA.sort((a, b) => Date.parse(a.publish_time) < Date.parse(b.publish_time))
      var pieceOfB = this.todoList.filter(important => !important.is_important)
      pieceOfB = pieceOfB.sort((a, b) => Date.parse(a.publish_time) < Date.parse(b.publish_time))
      this.todoList = pieceOfA.concat(pieceOfB)
      this.panel = this.todoList.length ? this.todoList[0].id.toString() : ''
      this.page.total = this.todoList.length
    },
    importantTodo (todo) {
      todo.is_important = !todo.is_important
      this.$http.put(URI + '/' + todo.id.toString() + '/', JSON.stringify(todo), HTTPCONFIG).then(response => {
        this.todoList = this.todoList.sort((a, b) => a.is_important === true || b.is_important === true)
        this.sortedTodoList()
      })
    },
    doneTodo (todo) {
      if (!todo.is_done) {
        todo.is_done = true
        this.$http.put(URI + '/' + todo.id.toString() + '/', JSON.stringify(todo), HTTPCONFIG).then(response => {
          this.$toast.success('The todo has updated, the list will be updated later.')
        }, response => {
          this.$toast.error('Update failed, please retry later.')
        })
      } else {
        this.$toast.success('The todo has updated, the list will be updated later.')
      }
    },
    saveToDo (todo) {
      this.openWriteDialog = false
      this.$http.post(URI + '/', JSON.stringify({'name': todo.name, 'is_done': todo.isDone, 'is_important': todo.isImportant}), HTTPCONFIG).then(response => {
        this.todoList.unshift(response.body)
        this.$toast.success('The todo has updated, the list will be updated later.')
        this.sortedTodoList()
      }, response => {
        this.$toast.error('Added failed, please retry later.')
      })
    },
    removeTodo (todoId) {
      this.alert.open = true
      this.alert.id = todoId
      this.$on('confirm-delete', function () {
        this.alert.open = false
        this.$http.delete(URI + '/' + this.alert.id + '/', HTTPCONFIG).then(response => {
          if (response.ok) {
            this.todoList = this.todoList.filter(todo => todo.id !== this.alert.id)
            this.$toast.success('This todo has been deleted.')
            this.$off('confirm-delete')
            this.sortedTodoList()
          }
        }, response => {
          this.$toast.error('Delete failed, please try again.')
        })
      })
    },
    expandTodo (todoId) {
      this.panel = todoId.toString() === this.panel ? '' : todoId.toString()
    },
    getTodoList () {
      this.$http.get(URI + '/' + '?page=' + this.page.current, HTTPCONFIG).then(response => {
        this.showList = true
        this.todoList = response.body.todos
        this.tempTodoList = response.body.todos
        this.page = response.body.page
        this.sortedTodoList()
      }, response => {
        if (response.status === 0) {
          this.$toast.error('Connection timeout, please retry.')
        }
      })
    }
  }
}
</script>
