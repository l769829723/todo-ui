<template>
  <div class="markdown-body" v-html="renderedContent" v-highlight>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
export default {
  props: [
    'content'
  ],
  computed: {
    renderedContent () {
      return marked(this.content)
    }
  },
  directives: {
    highlight (el) {
      let blocks = el.querySelectorAll('pre code')
      blocks.forEach((block) => {
        hljs.highlightBlock(block)
      })
    }
  }
}
</script>

<style>
@import 'github-markdown-css';
@import 'highlight.js/styles/atom-one-dark.css';
</style>
