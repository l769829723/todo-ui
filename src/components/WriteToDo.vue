<template>
  <mu-container>
    <mu-dialog transition="slide-bottom" fullscreen :open.sync="open">
      <mu-appbar color="primary" title="Write Todo">
        <mu-button slot="left" icon @click.stop="$emit('update:open', false)">
          <mu-icon value="close"></mu-icon>
        </mu-button>
        <mu-button slot="right" flat @click="saveToDo">
          <mu-icon value="save"></mu-icon>
          Save
        </mu-button>
      </mu-appbar>
      <mu-row>
        <mu-col span="1" md="2" sm="1"></mu-col>

        <mu-col span="10" md="8" sm="10">
          <div style="padding: 25px 0"></div>
          <mu-card style="padding: 20px">
            <mu-card-header title="Write your todo" sub-title="Something content.">
            </mu-card-header>
            <mu-card-text>
              <mu-form
                :model="todo"
                class="mu-demo-form"
                :label-position="labelPosition"
                label-width="100">
                <mu-form-item
                  prop="input"
                  label="Content">
                  <mu-text-field
                    v-model="todo.name"
                    placeholder="Write your todo content."
                    autofocus
                  ></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="switch" label="Important ?">
                  <mu-switch v-model="todo.isImportant"></mu-switch>
                </mu-form-item>
                <!-- <mu-form-item
                  prop="textarea"
                  label="Content">
                  <mu-text-field
                    multi-line
                    :rows="3"
                    :rows-max="10"
                    v-model="todo.task"
                    placeholder="Input your content."
                  ></mu-text-field>
                </mu-form-item> -->
              </mu-form>
            </mu-card-text>
          </mu-card>
        </mu-col>

        <mu-col span="1" md="2" sm="1"></mu-col>
      </mu-row>
    </mu-dialog>
  </mu-container>
</template>

<script>
export default {
  name: 'WriteToDo',
  data () {
    return {
      labelPosition: 'top',
      todo: {
        name: '',
        isDone: false,
        isImportant: false
      }
    }
  },
  props: {
    open: {
      type: Boolean,
      required: true,
      default () {
        return {
          message: false
        }
      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:open', false)
    },
    saveToDo () {
      this.$emit('update:todo', this.todo)
      this.todo = {
        name: '',
        isDone: false,
        isImportant: false
      }
    }
  }
}
</script>
