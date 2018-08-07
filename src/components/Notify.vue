<template>
  <mu-snackbar :position="bottom" :open.sync="true">
    This is a snackbar.
    <mu-button flat slot="action" color="secondary" @click="false">Close</mu-button>
  </mu-snackbar>
</template>
