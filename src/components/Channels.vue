<template>
  <mu-container style="margin-top: 80px">
    <mu-container>
      <mu-card>
        <mu-card-text>
          <mu-flex justify-content="start">
            <mu-flex justify-content="center" fill>
              <mu-form ref="searchForm" :model="search">
                <mu-form-item label="SEARCH" help-text="Enter text to search." prop="username">
                  <mu-text-field v-model="search.value" prop="username" full-width></mu-text-field>
                </mu-form-item>
              </mu-form>
            </mu-flex>
          </mu-flex>
          <mu-flex justify-content="end">
            <mu-flex justify-content="center">
              <mu-button color="red" :disabled="cannotDelete" @click="confirmDelete">
                DELETE
                <mu-icon right value="delete"></mu-icon>
              </mu-button>
            </mu-flex>
          </mu-flex>
        </mu-card-text>
      </mu-card>
    </mu-container>
    <div style="padding: 5px 0"></div>
    <mu-container>
      <mu-paper :z-depth="1">
        <mu-data-table selectable select-all :selects.sync="selects" checkbox :loading="loading" :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="channels">
          <template slot="empty">
            <mu-flex justify-content="center">
              <mu-flex justify-content="center" style="padding: 50px 0">No more</mu-flex>
            </mu-flex>
          </template>
          <template slot-scope="scope">
            <td>{{scope.$index + 1}}</td>
            <td class="is-left">{{scope.row.name}}</td>
          </template>
        </mu-data-table>
      </mu-paper>
    </mu-container>
  </mu-container>
</template>

<script>
export default {
  data () {
    return {
      empty: '',
      resource: this.$resource('channels/'),
      search: {
        value: ''
      },
      loading: true,
      cannotDelete: true,
      sort: {
        name: '',
        order: 'asc'
      },
      selects: [],
      channels: [],
      columns: [
        { title: '# Serial NO', name: 'id', align: 'left', sortable: true },
        { title: 'Name', name: 'name', align: 'left', sortable: true }
      ]
    }
  },
  watch: {
    selects () {
      this.selects.length >= 1 ? this.cannotDelete = false : this.cannotDelete = true
    }
  },
  created () {
    this.resource.get().then(response => {
      this.channels = response.body
      this.loading = false
    }, response => {
      this.$toast.error('Channels list loaded failed, please refresh and try later.')
    })
  },
  methods: {
    confirmDelete () {
      this.$confirm('Are you sure delete this channel?', 'Confirm').then(p => {
        if (p.result) {
          this.removeFromSelects()
        } else {
          this.$toast.info('You made a condicition choose.')
        }
      })
    },
    removeFromSelects () {
      this.selects.forEach(element => {
        // this.resource.delete({name: element.toString()}).then(response => {
        //   this.channels.filter()
        // }, response => {

        // })
      })
      this.selects = []
      this.$toast.success('Selected items have been already deleted.')
    },
    handleSortChange ({name, order}) {
      this.channels = this.channels.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name])
    }
  }
}
</script>
