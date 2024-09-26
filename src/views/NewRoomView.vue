<script setup>
import { nextTick } from 'vue';

import router from '@/router';

nextTick(() => {
  router.push({
    name: 'Room',
    params: {
      id: Math.random().toString(16).substr(2, 8)
    }
  });
});
</script>
