<style lang="scss" scoped>
</style>

<script>
import template from './meeting.slim'
import draggable from 'vuedraggable'
import Top from './top.vue'
export default {
  name: 'Meeting',
  components: {
    draggable,
    Top
  },
  props: ['meeting', 'organizationview'],
  mixins: [template],
  methods: {
    deleteAction(item) {
      if (confirm("Wirklich aus der Tagesordnung entfernen?")) {
        if (typeof this.$route.params.meeting_id != 'undefined') {
          this.$store.dispatch("meetings/removeAction", {
            action: item,
            meeting: this.meeting
          })
        } else {
          this.$store.dispatch("removeAction", {
            action: item,
            meeting: this.meeting
          })
        }
      }
    }
  },
  computed: {
    Actions: {
      get() {
        return this.meeting.actions
      },
      set(value) {
        let actions = [];
        let newactions = [];
        for (let v of value) {
          let m = v;
          if (v.type == "tops") {
            m = {
              top: v,
              meeting: this.meeting
            };
            newactions.push(m)
          } else
            actions.push(m);
        }
        this.$store.dispatch('updateActionsMeetings', {
          meeting: {
            ...this.meeting,
            organization: {
              type: "organizations",
              id: this.$route.params.org_id
            }
          },
          actions: actions,
          newactions: newactions
        })
        //this.$store.commit('updateTops', value)
      }
    }
  }
}
</script>
