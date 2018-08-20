<template>
  <v-flex xs12 sm8 md12 fill-height>
    <v-card color="blue" class="white--text">
      <v-card-title primary-title>
        <div class="headline">Posts in channels</div>
      </v-card-title>
      <v-card-text>
        <v-list two-line>
          <template v-if="channels.length >= 1">
            <template v-for="(item) in channels">
              <v-subheader
                v-if="item.header"
                :key="item.header"
              >
                {{ item.header }}
              </v-subheader>
              <v-list-tile
                v-else
                :key="item.name"
                avatar
              >
                <v-list-tile-content>
                  <v-list-tile-title>Channel: {{ item.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>
                    This channel {{ item.name }} has
                    <v-chip label>{{ item.posts }}</v-chip>
                    posts.
                    </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </template>
          <template v-else>
            <v-container>
              <v-alert
              :value="true"
              color="info"
              icon="info"
              outline
              >
                No data available.
              </v-alert>
            </v-container>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    getChannels () {
      this.$http.get('channels/').then(response => {
        this.channels = response.body
      })
    }
  }
}
</script>
