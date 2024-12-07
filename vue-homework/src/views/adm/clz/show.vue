<script setup>
import { ref, onMounted } from 'vue';
import { getClz } from '@/axios/index.js';

const classes = ref([]);

onMounted(() => {
  getClz((data) => {
    classes.value = data;  // 将返回的班级数据保存在 `classes` 中
  }, (message, code, url) => {
    console.error('获取班级信息失败:', message);
  });
});
</script>

<template>
  <div>
    <h3>班级信息</h3>
    <table border="1">
      <thead>
        <tr>
          <th>班级编号</th>
          <th>班级名称</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(clz, index) in classes" :key="index">
          <td>{{ clz.clzno }}</td>
          <td>{{ clz.clzname }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
  padding: 5px;
  border: 1px solid #ccc;
}
</style>