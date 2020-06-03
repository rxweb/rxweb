<template>
  <div class="container">
    <SignUp />
  </div>
</template>

<script>
// @ is an alias to /src
import SignUp from '@/components/SignUp.vue'

export default {
  name: 'Home',
  components: {
    SignUp
  }
}
</script>
