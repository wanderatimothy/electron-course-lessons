<template>

  <div>
    <h6>Hello try this</h6>
    <br>
    <table>
      <tr>
        <td>
         <textarea  v-model="text"   ></textarea>
        </td>
        <td>
          {{ text }}
        </td>
      </tr>
    </table>
  </div>

</template>

<script setup>
    import { ref } from 'vue'
   const  text = ref('')
</script>