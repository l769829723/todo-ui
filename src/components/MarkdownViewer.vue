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
