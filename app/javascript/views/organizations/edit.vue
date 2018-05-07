<style lang="scss" scoped>
</style>

<script>
import template from './edit.slim'
import {
  mapGetters,
  mapActions,
  mapState
} from 'vuex'
import {
  mapFields
} from 'vuex-map-fields';

export default {
  name: 'Organization',
  mixins: [template],
  methods: {
    submit() {
      console.log(this);
      this.$store.dispatch('updateOrg', {
        title: this.title,
        description: this.description,
        meetinginvitationtemplate: this.meetinginvitationtemplate,
        id: this.$route.params.org_id
      }).then(() => {
        //verknüpfen, falls meeting_id angegeben
        if (this.$route.params.meeting_id) {
          alert("Füge zu " + this.$route.params.meeting_id)
        }
        this.$router.push({
          name: 'organization',
          params: {
            org_id: this.$route.params.org_id
          }
        })
      })
    }
  },
  computed: {
    ...mapFields(["organization.description", "organization.title","organization.meetinginvitationtemplate"])
  },
  created() {
    this.$store.dispatch('getOrganization', {
      id: this.$route.params.org_id
    })
  }
}
</script>
