<template>
  <div class="demo-wrap">
    <div class="editor-wrap">
      <div class="editor">
        <markdown-editor
          v-model="content"
          :highlight="true"
          preview-class="markdown-body"></markdown-editor>
      </div>
    </div>
  </div>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import hljs from 'highlight.js'
window.hljs = hljs
export default {
  name: 'index',
  components: {
    markdownEditor
  },
  data () {
    return {
      content: '``` \nconsole.log("lalala") \n```',
      configs: {
        status: false,
        toolbar: ['image']
      },
      output: '',
      type: 'markdown'
    }
  },
  computed: {
    simplemde () {
      return this.$refs.markdownEditor.simplemde
    }
  },
  methods: {
    handleInput (val) {
      this.output = val
    },
    handleOutputHTML () {
      this.type = 'html'
      this.output = this.simplemde.markdown(this.content)
    },
    handleOutputMARKDOWN () {
      this.type = 'markdown'
      this.output = this.content
    }
  }
}
</script>

<style>
@import 'simplemde/dist/simplemde.min.css';
@import 'highlight.js/styles/atom-one-dark.css';
@import 'github-markdown-css';
</style>
