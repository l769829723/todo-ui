<template>
  <mu-expansion-panel :expand="panel" @change="$emit('todo-expand')">
    <mu-flex inline slot="header" class="flex-wrapper" align-items="center">
      <mu-flex justify-content="center" fill>
        <mu-tooltip :content="isImportant ? 'important' : 'unimportant'">
          <mu-button :disabled="isDone ? true : false" icon :color="isImportant ? 'red' : ''" @click.stop="$emit('todo-important')">
            <mu-icon :value="isImportant ? 'lens' : 'panorama_fish_eye'"></mu-icon>
          </mu-button>
        </mu-tooltip>
      </mu-flex>
      &nbsp;&nbsp;
      <mu-flex justify-content="center" fill>
        <div :style="isDone ? 'color: gray' : 'color:black'">
          &nbsp;&nbsp;{{ name|truncate }}
        </div>
      </mu-flex>
    </mu-flex>
    <mu-container>
      <mu-container>
        {{name}}
      </mu-container>
      <br>
      Status:
      <mu-chip :color="isDone ? '' : 'green' ">
        {{isDone ? "DONE" : "PROCESSING"}}
      </mu-chip>
      <br>
      Published:
      <timeago :since="publishTime" :auto-update="60" locale="zh-CN"></timeago>
    </mu-container>
    <mu-flex slot="action" class="flex-wrapper" align-items="center">
      <mu-flex justify-content="center" fill>
        <mu-button :disabled="isDone ? true : false" icon small color="green" @click="$emit('todo-done')">
          <mu-icon value="check"></mu-icon>
        </mu-button>
      </mu-flex>
      <mu-flex justify-content="center" fill>
        <mu-button icon small color="red" @click="$emit('todo-delete')">
          <mu-icon value="delete"></mu-icon>
        </mu-button>
      </mu-flex>
    </mu-flex>
  </mu-expansion-panel>
</template>

<script>
export default {
  name: 'ToDoItem',
  props: {
    id: {
      type: Number,
      required: true,
      default () {
        return 0
      }
    },
    name: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    isDone: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    },
    isImportant: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    },
    publishTime: {
      type: String,
      required: false
    },
    panel: {
      type: Boolean,
      required: true,
      default () {
        return false
      }
    }
  },
  filters: {
    truncate (value) {
      var len = value.match(/[^ -~]/g) == null ? value.length : value.length + value.match(/[^ -~]/g).length
      const MAXLENGTH = 35
      const MORE = '...'
      if (len <= MAXLENGTH) {
        return value
      }
      return value.toString().slice(0, MAXLENGTH) + MORE
    }
  }
}
</script>
