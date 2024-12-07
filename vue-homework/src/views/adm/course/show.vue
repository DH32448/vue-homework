<script setup>
import { ref, onMounted } from 'vue';
import { getCourse } from '@/axios/index.js';

const courses = ref([]);

onMounted(() => {
  getCourse((data) => {
    courses.value = data;  // 将课程数据存储到 courses 变量中
  }, (message, code, url) => {
    console.error(`获取课程信息失败: ${message}`);
  });
});
</script>

<template>
  <div>
    <h3>课程信息</h3>
    <table border="1" cellspacing="0" cellpadding="5">
      <thead>
      <tr>
        <th>课程编号</th>
        <th>课程名称</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(course, index) in courses" :key="index">
        <td>{{ course.cno }}</td>
        <td>{{ course.cname }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>