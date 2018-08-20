<template>
  <v-flex xs12 sm8 md12 fill-height>
    <!-- dialog -->
    <v-dialog v-model="confirm" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>
        <v-card-text>If you keep going, Data will can't recover.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click.native="deletePost">Yes</v-btn>
          <v-btn color="primary" flat @click.native="confirm = false">Let me see</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ renderedTitle }}</h3>
          <div>
            Publish at:
            <timeago :since="this.post.publishTime"></timeago>
          </div>
        </div>
      </v-card-title>

      <v-card-text class="markdown-body">
        <markdown-viewer :content="post.content"></markdown-viewer>
      </v-card-text>

      <v-card-actions>
        <v-tooltip bottom>
          <v-btn icon flat color="primary" slot="activator">
            <v-icon>edit</v-icon>
          </v-btn>
          <span>Edit this post.</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn icon flat color="error" slot="activator" @click="confirm = true">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>Delete this post?</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import MarkdownViewer from '@/components/MarkdownViewer'
export default {
  data () {
    return {
      confirm: false,
      post: {
        id: 0,
        name: '',
        content: '',
        publishTime: Date.now()
      }
    }
  },
  created () {
    this.getPost()
  },
  computed: {
    renderedTitle () {
      return this.post.name.charAt(0).toUpperCase() + this.post.name.slice(1).toLowerCase()
    }
  },
  methods: {
    getPost () {
      this.$http.get('posts/' + this.$route.params.id.toString() + '/').then(response => {
        this.post = response.body
      })
    },
    deletePost () {
      this.$http.delete('posts/' + this.post.id.toString() + '/').then(response => {
        this.$router.replace({ name: 'posts' })
        this.$toasted.success('Post [' + this.post.name + '] has already deleted.')
      }, failed => {
        this.$toasted.error('Post [' + this.post.name + '] has delete failed.')
      })
      this.confirm = false
    }
  },
  components: {
    MarkdownViewer
  }
}
</script>
