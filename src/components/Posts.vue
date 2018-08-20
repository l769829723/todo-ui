<template>
<v-flex xs12 sm8 md12 style="height: 100%">
  <v-tabs
    v-model="active"
    light
    right
    slider-color="grey">
    <v-tab ripple>
      Posts
    </v-tab>
    <v-tab-item lazy>
      <template v-if="postsList.length >= 1">
        <v-data-table
          :headers="headers"
          :items="postsList"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>
              <v-tooltip bottom>
                <router-link slot="activator" :to="{ name: 'postDetail', params: { id: props.item.id} }">
                  {{ props.index + 1 }}
                </router-link>
                <span>View post detail</span>
              </v-tooltip>
            </td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.channel }}</td>
            <td>
              <timeago :since="props.item.updateTime"></timeago>
            </td>
            <td>
              <timeago :since="props.item.publishTime"></timeago>
            </td>
          </template>
          <template slot="no-data">
            <div>
              <p class="text-md-center">No data available.</p>
            </div>
          </template>
        </v-data-table>
      </template>
      <template v-else>
        No more data showing.
      </template>
    </v-tab-item>

    <v-tab>
      Write
    </v-tab>
    <v-tab-item>
      <v-card flat>
        <v-card-text>
          <v-form ref="form" v-model="postForm.valid" lazy-validation>
            <v-text-field
              autofocus
              v-model="postForm.name"
              :rules="postNameRules"
              label="Title"
              required
            ></v-text-field>
            <v-select
              v-model="postForm.channel"
              :items="channels"
              :rules="postChannelRules"
              label="Channel"
              required
            ></v-select>
            <markdown-editor
              :configs="editor.configs"
              v-model="postForm.content"
              :highlight="true"
              ref="markdownEditor"
              preview-class="markdown-body"
            ></markdown-editor>
            <v-flex align-content-end>
              <v-switch
                label="Publish now"
                v-model="postForm.isPublished"
              ></v-switch>
            </v-flex>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="clear">Clear</v-btn>
              <v-btn
                class="primary"
                :disabled="!postForm.valid"
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</v-flex>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import hljs from 'highlight.js'
window.hljs = hljs
export default {
  data () {
    return {
      active: 0,
      loading: true,
      postsList: [],
      channels: [],
      postForm: {
        valid: true,
        name: '',
        channel: '',
        content: '',
        isPublished: ''
      },
      postNameRules: [
        v => !!v || 'Required a title',
        v => /\S{5,}/.test(v) || 'Has not content and must be more than 5 letters.'
      ],
      postChannelRules: [
        v => !!v || 'Required a channel'
      ],
      headers: [
        {
          text: '# Id',
          align: 'left',
          value: 'id'
        },
        { text: 'Title', value: 'name', align: 'left' },
        { text: 'Channel', value: 'channel', align: 'left' },
        { text: 'PublishTime', value: 'publishTime', align: 'left' },
        { text: 'UpdateTime', value: 'updateTime', align: 'left' }
      ],
      editor: {
        configs: {
          spellChecker: false,
          toolbar: [
            'bold',
            'italic',
            'strikethrough',
            'heading-2',
            '|',
            'quote',
            'code',
            'unordered-list',
            'ordered-list',
            'horizontal-rule',
            '|',
            'link',
            'image',
            'table',
            '|',
            'clean-block',
            'preview',
            'guide'
          ]
        }
      }
    }
  },
  created () {
    this.getPosts()
    this.getChannels()
  },
  components: {
    markdownEditor
  },
  methods: {
    getPosts () {
      this.$http.get('posts/').then(response => {
        this.postsList = response.body
        this.loading = false
      }, faild => {
        this.$toasted.error('Connection error, please retry.')
      })
    },
    getChannels () {
      this.$http.get('channels/').then(response => {
        this.channels = []
        response.body.forEach(channel => {
          console.log(channel.name)
          this.channels.push(channel.name)
        })
      }, faild => {
        this.$toasted.error('Connection error, please refresh.')
      })
    },
    clear () {
      this.$refs.form.reset()
      this.postForm = {
        valid: true,
        name: '',
        channel: '',
        content: '',
        isPublished: ''
      }
    },
    save () {
      if (this.$refs.form.validate()) {
        this.$http.post('posts/', JSON.stringify(this.postForm)).then(response => {
          this.postsList.unshift(response.body)
          this.clear()
          this.$toasted.success('Success, post ' + response.body.name + ' has been saved.')
        }, faild => {
          this.$toasted.error('Connection error, please retry.')
        })
      }
    },
    deletePost (postId) {
      console.log(postId)
    },
    editPost (postId) {
      console.log(postId)
    }
  }
}
</script>

<style>
@import 'simplemde/dist/simplemde.min.css';
@import 'github-markdown-css';
@import 'highlight.js/styles/atom-one-dark.css';
.CodeMirror {
  font-size: 1.2em;
}
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
  font-size: 1.2em;
}
code {
  box-shadow: none;
  color: inherit;
  font-weight: 100;
}
code::before {
  content: '';
}
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
